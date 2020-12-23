<template>
  <div :style="{ zIndex: zIndex, height: height, width: width }" class="pan-item">
    <div class="pan-info">
      <div class="pan-info-roles-container">
        <slot />
      </div>
    </div>
    <!-- eslint-disable-next-line -->
    <div :style="{backgroundImage: `url(${image})`}" class="pan-thumb"></div>
  </div>
</template>

<script>
  export default {
    name: 'PanThumb',
    props: {
      image: {
        type: String,
        required: true
      },
      zIndex: {
        type: Number,
        default: 1
      },
      width: {
        type: String,
        default: '150px'
      },
      height: {
        type: String,
        default: '150px'
      }
    }
  }
</script>

<style scoped>
  .pan-item {
    position: relative;
    display: inline-block;
    width: 200px;
    height: 200px;
    cursor: default;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  .pan-info-roles-container {
    padding: 20px;
    text-align: center;
  }
  .pan-thumb {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-position: center center;
    background-size: cover;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
    transform-origin: 95% 40%;
  }
  /* .pan-thumb:after {
  content: '';
  width: 8px;
  height: 8px;
  position: absolute;
  border-radius: 50%;
  top: 40%;
  left: 95%;
  margin: -4px 0 0 -4px;
  background: radial-gradient(ellipse at center, rgba(14, 14, 14, 1) 0%, rgba(125, 126, 125, 1) 100%);
  box-shadow: 0 0 1px rgba(255, 255, 255, 0.9);
} */
  .pan-info {
    position: absolute;
    width: inherit;
    height: inherit;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
  }
  .pan-info h3 {
    position: relative;
    height: 85px;
    padding: 22px 0 0 0;
    margin: 0 60px;
    font-family: 'Open Sans', Arial, sans-serif;
    font-size: 18px;
    color: #fff;
    text-shadow: 0 0 1px #fff, 0 1px 2px rgba(0, 0, 0, 0.3);
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .pan-info p {
    padding: 10px 5px;
    margin: 0 30px;
    font-size: 12px;
    font-style: italic;
    color: #fff;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
  }
  .pan-info p a {
    display: block;
    width: 80px;
    height: 80px;
    padding-top: 24px;
    margin: 7px auto 0;
    font-family: 'Open Sans', Arial, sans-serif;
    font-size: 9px;
    font-style: normal;
    font-weight: 700;
    color: #333;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    opacity: 0;
    transition: transform 0.3s ease-in-out 0.2s, opacity 0.3s ease-in-out 0.2s, background 0.2s linear 0s;
    transform: translateX(60px) rotate(90deg);
  }
  .pan-info p a:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  .pan-item:hover .pan-thumb {
    transform: rotate(-110deg);
  }
  .pan-item:hover .pan-info p a {
    opacity: 1;
    transform: translateX(0) rotate(0deg);
  }
</style>
