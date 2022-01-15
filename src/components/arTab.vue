<template>
  <div :class="['tabBox', cssType === 'line' ? 'lineStlye' : 'buttonStlye']">
    <div class="tab">
      <span v-for="(item, index) in tabList" :key="index" @click="tabClick(item, index)" :class="[currentIndex === index ? 'currentClass' : '']">{{
        item.sourceName || item.tabName
      }}</span>
    </div>
    <!-- 按钮组或搜索框 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'arTab',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    tabList: {
      type: Array,
      default() {
        return []
      }
    },
    cssType: {
      type: String,
      default: ''
    }
  },
  methods: {
    tabClick(item, index) {
      this.currentIndex = index
      this.$emit('tabClick', item)
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style scoped lang="scss">
.tabBox.buttonStlye {
  display: flex;
  justify-content: space-between;
  .tab {
    display: inline-block;
    background: #f3f3f3;
    border-radius: 20px;
    font-size: 14px;
    font-family: 'AlibabaPuHuiTi-Regular,AlibabaPuHuiTi;';
    color: #333333;
    span {
      display: inline-block;
      padding: 6px 20px;
      &:hover {
        cursor: pointer;
        background: #0066ff;
        border-radius: 20px;
        color: white;
      }
    }
    span.currentClass {
      background: #0066ff;
      border-radius: 20px;
      color: white;
    }
  }
}
.tabBox.lineStlye {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dedede;
  align-items: baseline;
  .tab {
    display: inline-block;
    font-size: 14px;
    font-family: 'AlibabaPuHuiTi-Regular,AlibabaPuHuiTi;';
    color: #333333;
    span {
      display: inline-block;
      padding: 15px 20px;
      &:hover {
        cursor: pointer;
      }
    }
    span.currentClass {
      color: #0066ff;
      border-bottom: 2px solid #0066ff;
    }
  }
}
</style>
