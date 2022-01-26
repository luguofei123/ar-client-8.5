<!-- 单据模板 -->
<template>
  <div>
    <!-- 单据头部 -->
    <headAre :tplData="tplData"></headAre>
    <div class="leftBox">
      <div v-for="(item, index) in tplData.areaLeft" :key="index" :id="item.areaType" class="spread">
        <!-- 关联区域 -->
        <div v-if="item.areaType === 'RELATION'">
          <relationAre></relationAre>
        </div>
        <!-- 基础区域 -->
        <div v-if="item.areaType === 'BASE'">
          <baseAre :tplData="tplData" :itemData="item"></baseAre>
        </div>
        <!-- 费用区域 -->
        <div v-if="item.areaType === 'DETAIL'">
          <expenseAre></expenseAre>
        </div>
        <!-- 指标区域 -->
        <div v-if="item.areaType === 'BUDGET'">
          <budgetAre></budgetAre>
        </div>
        <!-- 附件区域 -->
        <div v-if="item.areaType === 'FILE'">
          <fileAre></fileAre>
        </div>
        <!-- 结算区域 -->
        <div v-if="item.areaType === 'SETTMENT'">
          <settlementAre></settlementAre>
        </div>
      </div>
    </div>
  </div>
  <!--  -->
</template>

<script>
import { arBillAPI } from './arBillAPI'
const headAre = () => import('./headAre/headAre.vue')
const baseAre = () => import('./baseAre/baseAre.vue')
const budgetAre = () => import('./budgetAre/budgetAre.vue')
const expenseAre = () => import('./expenseAre/expenseAre.vue')
const fileAre = () => import('./fileAre/fileAre.vue')
const relationAre = () => import('./relationAre/relationAre.vue')
const settlementAre = () => import('./settlementAre/settlementAre.vue')
export default {
  name: 'arBill',
  data() {
    return {
      tplData: {}
    }
  },
  props: {},
  created() {},
  mounted() {
    this.initTemplate()
  },
  watch: {},
  methods: {
    initTemplate() {
      let params = {
        billId: '',
        billType: 'EXP_TRIP',
        coCode: '999001',
        roleCode: '999001',
        templetCode: '',
        urlType: 'todo'
      }
      arBillAPI.getBillTemplate(params).then(res => {
        if (res.data.flag === 'SUCCESS') {
          this.tplData = res.data.data
        }
      })
    }
  },
  components: {
    headAre,
    baseAre,
    budgetAre,
    expenseAre,
    fileAre,
    relationAre,
    settlementAre
  }
}
</script>
<style scoped lang="scss">
.leftBox {
  padding: 8px 8px 0px;
  .spread {
    margin-bottom: 8px;
    box-shadow: 0px 0px 6px 0px rgb(0 0 0 / 20%);
  }
}
</style>
