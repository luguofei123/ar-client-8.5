<template>
  <div class="ztree">
    <z-tree ref="zTree" :url="roleTreeUrl" :params="roleTreeParams" :children="'child'" :name="'name'"> </z-tree>
  </div>
</template>

<script>
import zTree from '@/components/zTree/zTree'
export default {
  name: 'editTable',
  data() {
    return {
      roleTreeUrl: '/sysset/menuButtonNew/getButtonRoleTree',
      roleTreeParams: {}
    }
  },
  props: [],
  methods: {},
  mounted() {},
  watch: {},
  components: {
    'z-tree': zTree
  }
}
</script>
<style lang="scss" scoped>
</style>
