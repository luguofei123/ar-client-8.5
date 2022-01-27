<template>
  <div class="baseAre">
    <el-collapse v-model="activeName">
      <el-collapse-item>
        <template slot="title">
          <collapseTitle :aliasName="itemData.aliasName">
            <span>测试</span>
            <span>测试</span>
            <span>测试</span>
          </collapseTitle>
        </template>
        <div class="base-form" id="base-form">
          <arForm :itemsSource="itemData.infoList" :dataSource="{}" ref="zform"> </arForm>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
const arForm = () => import('../../arForm/arForm.vue') // collapseTitle
const collapseTitle = () => import('../components/collapseTitle.vue')
export default {
  name: 'baseAre',
  props: ['tplData', 'itemData'],
  data() {
    return {
      activeName: ['myAreName', '2', '3']
    }
  },
  methods: {
    cancelHeaderClickFn() {
      debugger
      return false
    }
  },
  mounted() {},
  watch: {},
  components: {
    collapseTitle,
    arForm
  }
}
</script>
<style scoped lang="scss">
.baseAre {
  ::v-deep .el-collapse-item__header {
    height: 40px;
    line-height: 40px;
    color: #333;
  }
}
</style>
