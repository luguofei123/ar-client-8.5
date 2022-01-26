<!-- 借款单据 -->
<template>
  <arBill> </arBill>
</template>

<script>
const arBill = () => import('../../components/arBill/arBill.vue')
export default {
  name: 'loanBill',
  data() {
    return {
      billVisible: false,
      showSheduleP: false
    }
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
