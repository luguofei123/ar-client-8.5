<!-- 单据头部 -->
<template>
  <div class="rightBox">
    <div class="title">
      <span>标题1</span>
      <span>标题2</span>
      <span>标题3</span>
    </div>
    <div class="content">的得分</div>
    <div class="pullRightButton">
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rightBar',
  data() {
    return {
      nowIndex: 0
    }
  },
  props: ['tplData'],
  methods: {},
  mounted() {},
  watch: {}
}
</script>
<style scoped lang="scss">
.rightBox {
  position: absolute;
  width: 300px;
  top: 80px;
  bottom: 0;
  right: 0px;
  background: #fff;
  box-shadow: -2px 0px 4px 0px #ececec;
  border-radius: 3px;
  margin: 8px 0;
  overflow: auto;
}
</style>
