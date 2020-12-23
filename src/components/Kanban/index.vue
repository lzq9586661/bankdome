<template>
  <div class="board-column">
    <div class="board-column-header">
      {{ headerText }}
    </div>
    <draggable :list="list" v-bind="$attrs" class="board-column-content" :set-data="setData">
      <div v-for="element in list" :key="element.id" class="board-item">{{ element.name }} {{ element.id }}</div>
    </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    name: 'DragKanbanDemo',
    components: {
      draggable
    },
    props: {
      headerText: {
        type: String,
        default: 'Header'
      },
      options: {
        type: Object,
        default() {
          return {}
        }
      },
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      setData(dataTransfer) {
        // to avoid Firefox bug
        // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        dataTransfer.setData('Text', '')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .board-column {
    min-width: 300px;
    height: auto;
    min-height: 100px;
    overflow: hidden;
    background: #f0f0f0;
    border-radius: 3px;
    .board-column-header {
      height: 50px;
      padding: 0 20px;
      overflow: hidden;
      line-height: 50px;
      color: #fff;
      text-align: center;
      background: #333;
      border-radius: 3px 3px 0 0;
    }
    .board-column-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      height: auto;
      min-height: 60px;
      overflow: hidden;
      border: 10px solid transparent;
      .board-item {
        box-sizing: border-box;
        width: 100%;
        height: 64px;
        padding: 5px 10px;
        margin: 5px 0;
        line-height: 54px;
        text-align: left;
        cursor: pointer;
        background-color: #fff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
      }
    }
  }
</style>
