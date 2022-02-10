<template>
  <div>
    <template v-if="tabType === 'HOME_BG'">
      <optHomebg :scope="scope" :homeMenu="homeMenu"></optHomebg>
    </template>
    <template v-if="tabType === 'HOME_APPLY' || tabType === 'HOME_LOAN' || tabType === 'HOME_EXP'">
      <optHomebgex :scope="scope" :homeMenu="homeMenu" :tabType="tabType"></optHomebgex>
    </template>
  </div>
</template>

<script>
import optHomebg from './optHomebg.vue'
import optHomebgex from './optHomebgex.vue'
export default {
  name: 'optHome',
  data() {
    return {}
  },
  props: {
    scope: {},
    homeMenu: [],
    tabType: ''
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {},
  components: {
    optHomebg,
    optHomebgex
  }
}
</script>
<style scoped lang="scss"></style>
