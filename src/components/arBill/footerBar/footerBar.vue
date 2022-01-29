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
      <el-button>按钮</el-button>
      <el-button>按钮</el-button>
      <el-button>按钮</el-button>
      <el-button>按钮</el-button>
      <el-button>按钮</el-button>
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
  padding: 0 10px 0 15px;
  .footMsg {
    font-size: 12px;
    span {
      margin-right: 6px;
    }
  }
}
</style>
