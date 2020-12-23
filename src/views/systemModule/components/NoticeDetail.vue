<template>
  <div class="notice-content">
    <h3 class="notice-title">{{ noticeInfo.noticeTitle }}</h3>
    <p class="notice-sub-title">
      <span class="notice-time">时间：{{ noticeInfo.createDate }}</span>
      <span class="notice-user">发布人：{{ noticeInfo.createName }}</span>
    </p>
    <p class="notice-msg" v-html="noticeInfo.noticeContent"></p>
  </div>
</template>

<script>
  export default {
    name: 'NoticeDetail',
    props: {
      noticeInfo: {
        type: Object,
        required: true,
        default() {
          return {
            noticeTitle: '',
            createDate: '',
            createName: '',
            noticeContent: ''
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .notice-content {
    margin: -30px 0 -10px;
    .notice-title {
      margin: 10px;
      font-size: 30px;
      text-align: center;
    }
    .notice-sub-title {
      padding-bottom: 10px;
      border-bottom: 1px solid #dcdfe6;
      .notice-time {
        margin-right: 30px;
        font-size: 16px;
      }
      .notice-user {
        font-size: 16px;
      }
    }
    .notice-msg {
      height: 660px;
      overflow: auto;
      font-size: 16px;
    }
  }
</style>
