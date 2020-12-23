<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews.slice()
      },
      key() {
        return this.$route.fullPath
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-main {
    position: relative;
    width: 100%;
    min-height: calc(100vh - 72px);
    overflow: hidden;
  }
  .fixed-header + .app-main {
    padding-top: 72px;
  }
  .hasTagsView {
    .app-main {
      /* 106 = navbar + tags-view = 72 + 44 */
      min-height: calc(100vh - 116px);
    }
    .fixed-header + .app-main {
      padding-top: 116px;
    }
  }
</style>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      // padding-right: 15px;
    }
  }
</style>
