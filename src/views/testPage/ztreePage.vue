<template>
  <div class="ztree">
    <z-tree></z-tree>
  </div>
</template>

<script>
import zTree from '@/components/zTree/zTree'
export default {
  name: 'editTable',
  data() {
    return {}
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
