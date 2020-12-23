<template>
  <a :class="className" class="link--mallki" href="#">
    {{ text }}
    <span :data-letters="text" />
    <span :data-letters="text" />
  </a>
</template>

<script>
  export default {
    props: {
      className: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: 'vue-element-admin'
      }
    }
  }
</script>

<style>
  /* Mallki */
  .link--mallki {
    position: relative;
    display: inline-block;
    overflow: hidden;
    font-family: 'Dosis', sans-serif;
    font-weight: 800;
    line-height: 1;
    color: #4dd9d5;
    text-decoration: none;
    outline: none;
    -webkit-transition: color 0.5s 0.25s;
    transition: color 0.5s 0.25s;
  }
  .link--mallki:hover {
    color: transparent;
    -webkit-transition: none;
    transition: none;
  }
  .link--mallki::before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 6px;
    margin: -3px 0 0 0;
    content: '';
    background: #3888fa;
    -webkit-transition: -webkit-transform 0.4s;
    transition: transform 0.4s;
    -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
  .link--mallki:hover::before {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
  .link--mallki span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    overflow: hidden;
  }
  .link--mallki span::before {
    position: absolute;
    left: 0;
    width: 100%;
    color: red;
    color: #3888fa;
    content: attr(data-letters);
    -webkit-transition: -webkit-transform 0.5s;
    transition: transform 0.5s;
  }
  .link--mallki span:nth-child(2) {
    top: 50%;
  }
  .link--mallki span:first-child::before {
    top: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
  .link--mallki span:nth-child(2)::before {
    bottom: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  .link--mallki:hover span::before {
    -webkit-transition-delay: 0.3s;
    transition-delay: 0.3s;
    -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
</style>
