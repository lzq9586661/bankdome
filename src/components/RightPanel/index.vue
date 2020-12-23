<template>
  <div ref="rightPanel" :class="{ show: show }" class="rightPanel-container">
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <div class="handle-button" :style="{ top: buttonTop + 'px', 'background-color': theme }" @click="show = !show">
        <i :class="show ? 'el-icon-close' : 'el-icon-setting'" />
      </div>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
  import { addClass, removeClass } from '@/utils'

  export default {
    name: 'RightPanel',
    props: {
      clickNotClose: {
        default: false,
        type: Boolean
      },
      buttonTop: {
        default: 300,
        type: Number
      }
    },
    data() {
      return {
        show: false
      }
    },
    computed: {
      theme() {
        return this.$store.state.settings.theme
      }
    },
    watch: {
      show(value) {
        if (value && !this.clickNotClose) {
          this.addEventClick()
        }
        if (value) {
          addClass(document.body, 'showRightPanel')
        } else {
          removeClass(document.body, 'showRightPanel')
        }
      }
    },
    mounted() {
      this.insertToBody()
    },
    beforeDestroy() {
      const elx = this.$refs.rightPanel
      elx.remove()
    },
    methods: {
      addEventClick() {
        window.addEventListener('click', this.closeSidebar)
      },
      closeSidebar(evt) {
        const parent = evt.target.closest('.rightPanel')
        if (!parent) {
          this.show = false
          window.removeEventListener('click', this.closeSidebar)
        }
      },
      insertToBody() {
        const elx = this.$refs.rightPanel
        const body = document.querySelector('body')
        body.insertBefore(elx, body.firstChild)
      }
    }
  }
</script>

<style>
  .showRightPanel {
    position: relative;
    width: calc(100% - 15px);
    overflow: hidden;
  }
</style>

<style lang="scss" scoped>
  .rightPanel-background {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    background: rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  }
  .rightPanel {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 40000;
    width: 100%;
    max-width: 260px;
    height: calc(100vh);
    background: #fff;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
    transform: translate(100%);
  }
  .show {
    transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
    .rightPanel-background {
      z-index: 20000;
      width: 100%;
      height: 100%;
      opacity: 1;
    }
    .rightPanel {
      transform: translate(0);
    }
  }
  .handle-button {
    position: absolute;
    left: -48px;
    z-index: 0;
    width: 48px;
    height: 48px;
    font-size: 24px;
    line-height: 48px;
    color: #fff;
    text-align: center;
    pointer-events: auto;
    cursor: pointer;
    border-radius: 6px 0 0 6px !important;
    i {
      font-size: 24px;
      line-height: 48px;
    }
  }
</style>
