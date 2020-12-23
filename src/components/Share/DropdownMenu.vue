<template>
  <div :class="{ active: isActive }" class="share-dropdown-menu">
    <div class="share-dropdown-menu-wrapper">
      <span class="share-dropdown-menu-title" @click.self="clickTitle">
        {{ title }}
      </span>
      <div v-for="(item, index) of items" :key="index" class="share-dropdown-menu-item">
        <a v-if="item.href" :href="item.href" target="_blank">
          {{ item.title }}
        </a>
        <span v-else>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        default: function () {
          return []
        }
      },
      title: {
        type: String,
        default: 'vue'
      }
    },
    data() {
      return {
        isActive: false
      }
    },
    methods: {
      clickTitle() {
        this.isActive = !this.isActive
      }
    }
  }
</script>

<style lang="scss">
  $n: 9; //和items.length 相同
  $t: 0.1s;
  .share-dropdown-menu {
    position: relative;
    z-index: 1;
    width: 250px;
    height: auto !important;
    &-title {
      z-index: 2;
      display: block;
      width: 100%;
      height: 60px;
      font-size: 20px;
      line-height: 60px;
      color: white;
      text-align: center;
      cursor: pointer;
      background: black;
      transform: translate3d(0, 0, 0);
    }
    &-wrapper {
      position: relative;
    }
    &-item {
      position: absolute;
      width: 100%;
      height: 60px;
      overflow: hidden;
      font-size: 18px;
      line-height: 60px;
      color: #000;
      text-align: center;
      cursor: pointer;
      background: #e0e0e0;
      opacity: 1;
      transition: transform 0.28s ease;
      &:hover {
        color: white;
        background: black;
      }
      @for $i from 1 through $n {
        &:nth-of-type(#{$i}) {
          z-index: -1;
          transition-delay: $i * $t;
          transform: translate3d(0, -60px, 0);
        }
      }
    }
    &.active {
      .share-dropdown-menu-wrapper {
        z-index: 1;
      }
      .share-dropdown-menu-item {
        @for $i from 1 through $n {
          &:nth-of-type(#{$i}) {
            transition-delay: ($n - $i) * $t;
            transform: translate3d(0, ($i - 1) * 60px, 0);
          }
        }
      }
    }
  }
</style>
