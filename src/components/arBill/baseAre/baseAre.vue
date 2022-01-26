<template>
  <div class="baseAre">
    <el-collapse v-model="activeName">
      <el-collapse-item>
        <template slot="title">
          <div class="base-header" @click.stop="cancelHeaderClickFn">
            <img src="../../../assets/img/decorate_icon_normal.png" alt="" />
            <span class="title-class">{{ '基本信息' }}</span>
          </div>
        </template>
        <div class="base-form" id="base-form">
          <arForm :itemsSource="itemData.infoList" :dataSource="{}" ref="zform"> </arForm>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
const arForm = () => import('../../arForm/arForm.vue')
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
    arForm
  }
}
</script>
<style scoped lang="scss">
.baseAre {
  ::v-deep .el-collapse-item__header {
    height: 40px;
    line-height: 40px;
  }
}
</style>
