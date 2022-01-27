<template>
  <div>
    <el-collapse>
      <el-collapse-item>
        <template slot="title">
          <collapseTitle :aliasName="itemData.aliasName">
            <span>+测试</span>
            <span>+测试</span>
            <span>+测试</span>
          </collapseTitle>
        </template>
        <div class="base-form" id="base-form"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
const collapseTitle = () => import('../components/collapseTitle.vue')
export default {
  name: 'fileAre',
  props: ['tplData', 'itemData'],
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  watch: {},
  components: {
    collapseTitle
  }
}
</script>
<style scoped lang="scss"></style>
