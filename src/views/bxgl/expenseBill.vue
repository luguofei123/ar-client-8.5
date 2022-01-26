<!-- 报销单据 -->
<template>
  <arBill> </arBill>
</template>

<script>
const arBill = () => import('../../components/arBill/arBill.vue')
export default {
  name: 'expenseBill',
  data() {
    return {}
  },
  props: [],
  components: {
    arBill
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped></style>
