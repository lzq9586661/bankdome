<template>
  <div class="navbar">
    <hamburger v-if="showHamburger" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb v-if="showBreadcrumb" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!-- <div class="right-menu-item">
          <span>{{ setTime }}</span>
        </div> -->
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <span class="username">{{ realname }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapState } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import Screenfull from '@/components/Screenfull'

  export default {
    components: {
      Breadcrumb,
      Hamburger,
      Screenfull
    },
    data() {
      return {
        setTime: ''
      }
    },

    computed: {
      ...mapGetters(['sidebar', 'realname', 'device']),
      ...mapState({
        showHamburger: (state) => state.settings.showHamburger,
        showBreadcrumb: (state) => state.settings.showBreadcrumb
      })
    },
    mounted() {
      // 不满10前面加0
      function dateFilter(date) {
        if (date < 10) {
          return '0' + date
        }
        return date
      }
      const myDate = new Date()
      const year = myDate.getFullYear() // 获取完整的年份(4位)
      const month = myDate.getMonth() + 1 // 获取当前月份(0-11,0代表1月)
      const date = myDate.getDate() // 获取当前日(1-31)
      const day = myDate.getDay() // 获取当前星期几(0(周日)-6(周六))
      const weekDayArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      const weekDay = weekDayArr[day]
      this.setTime = dateFilter(year) + '年' + dateFilter(month) + '月' + dateFilter(date) + '日' + '　' + weekDay
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        await this.$store.dispatch('tagsView/delAllViews')
        await this.$store.dispatch('Logout')
        if (process.env.NODE_ENV === 'development') {
          this.$router.push(`/login`)
        } else {
          this.$router.push(`/login`)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    position: relative;
    height: 72px;
    overflow: hidden;
    // user-select: none;
    background: #fff;
    .hamburger-container {
      float: left;
      height: 100%;
      line-height: 72px;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;
      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
    .breadcrumb-container {
      float: left;
      line-height: 72px;
    }
    .right-menu {
      float: right;
      height: 100%;
      line-height: 72px;
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        height: 100%;
        padding: 0 8px;
        font-size: 20px;
        color: #606266;
        vertical-align: text-bottom;
        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;
          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }
      .avatar-container {
        margin-right: 30px;
        .avatar-wrapper {
          position: relative;
          .el-icon-caret-bottom {
            position: absolute;
            top: 24px;
            right: -24px;
            font-size: 20px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
