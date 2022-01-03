<template>
  <div class="tabBox">
    <div class="tab">
      <span v-for="(item, index) in tabList" :key="index" @click="tabClick(item, index)" :class="[currentIndex === index ? 'currentClass' : '']">{{
        item.name
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
      tabList: [
        { name: '页面设置1', id: '1231' },
        { name: '页面设置2', id: '1232' },
        { name: '页面设置3', id: '1233' },
        { name: '页面设置4', id: '1234' }
      ],
      currentIndex: 0
    }
  },
  props: {},
  methods: {
    tabClick(item, index) {
      this.currentIndex = index
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style scoped lang="scss">
.tabBox {
  display: flex;
  justify-content: space-between;
}
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
</style>
