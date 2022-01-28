<template>
  <div class="baseAre">
    <el-collapse v-model="activeName">
      <el-collapse-item>
        <template slot="title">
          <collapseTitle :aliasName="itemData.aliasName"> </collapseTitle>
        </template>
        <div class="baseForm" id="base-form">
          <arForm :itemsSource="itemData.infoList" :dataSource="{}" ref="zform"> </arForm>
          <arForm :itemsSource="itemData.infoList" :dataSource="{}" ref="zform"> </arForm>
          <arForm :itemsSource="itemData.infoList" :dataSource="{}" ref="zform"> </arForm>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
const arForm = () => import('../../arForm/arForm.vue')
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
.baseForm {
  padding-right: 48px;
  font-size: 14px;
}
</style>
