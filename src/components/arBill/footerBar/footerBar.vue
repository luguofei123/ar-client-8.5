<!-- 单据头部 -->
<template>
  <div class="footBox">
    <div class="footMsg">
      <span>AR01-报销制单</span>
      <span>|</span>
      <span>二级部门A1</span>
      <span>|</span>
      <span>2022-01-29</span>
    </div>
    <div class="footButton">
      <span>暂存</span>
      <span class="blue">暂存</span>
      <span>暂存</span>
      <span>暂存</span>
      <span>暂存</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footerBar',
  data() {
    return {}
  },
  props: ['tplData'],
  methods: {},
  mounted() {},
  watch: {}
}
</script>
<style scoped lang="scss">
.footBox {
  position: fixed;
  bottom: 0;
  width: calc(100% - 310px);
  left: 0px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  background: #fff;
  border-top: 1px solid #bbb;
  align-items: center;
  padding: 0 0px 0 15px;
  .footMsg {
    font-size: 12px;
    span {
      margin-right: 6px;
    }
  }
  .footButton {
    span {
      display: inline-block;
      min-width: 72px;
      margin-right: 8px;
      padding: 0 16px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: white;
      color: #333333;
      border-radius: 4px;
      border: 1px solid #bbbbbb;
      &:hover {
        cursor: pointer;
      }
    }
    span.blue {
      background: #0066ff;
      color: #fff;
      border: 1px solid #0066ff;
    }
  }
}
</style>
