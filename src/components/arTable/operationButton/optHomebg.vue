<template>
  <div>
    <template v-if="scope.row.applyBillType && scope.row.applyBillType.length > 0">
      <el-popover placement="bottom" width="150" trigger="click" v-if="scope.row.applyBillType && scope.row.applyBillType.length > 1">
        <span slot="reference">申请</span>
        <ul class="popoverUl" v-if="scope.row.applyBillType.length !== 0">
          <li v-for="(item, index) in scope.row.applyBillType" :key="index">
            <span @click="billClick($event, item, scope.row)">{{ item.billName }}</span>
          </li>
        </ul>
      </el-popover>
      <template v-if="scope.row.applyBillType && scope.row.applyBillType.length === 1">
        <span @click="billClick($event, item, scope.row.applyBillType[0])">申请</span>
      </template>
    </template>
    <template v-if="scope.row.loanBillType && scope.row.loanBillType.length > 0">
      <el-popover placement="bottom" width="150" trigger="click" v-if="scope.row.loanBillType && scope.row.loanBillType.length > 1">
        <span slot="reference">借款</span>
        <ul class="popoverUl" v-if="scope.row.loanBillType.length !== 0">
          <li v-for="(item, index) in scope.row.loanBillType" :key="index">
            <span @click="billClick($event, item, scope.row)">{{ item.billName }}</span>
          </li>
        </ul>
      </el-popover>
      <template v-if="scope.row.applyBillType && scope.row.loanBillType.length === 1">
        <span @click="billClick($event, scope.row.loanBillType[0], scope.row)">借款</span>
      </template>
    </template>
    <template v-if="scope.row.expBillType && scope.row.expBillType.length > 0">
      <el-popover placement="bottom" width="150" trigger="click" v-if="scope.row.expBillType && scope.row.expBillType.length > 1">
        <span slot="reference">直接报销</span>
        <ul class="popoverUl" v-if="scope.row.expBillType.length !== 0">
          <li v-for="(item, index) in scope.row.expBillType" :key="index">
            <span @click="billClick($event, item, scope.row)">{{ item.billName }}</span>
          </li>
        </ul>
      </el-popover>
      <template v-if="scope.row.applyBillType && scope.row.expBillType.length === 1">
        <span @click="billClick($event, scope.row.expBillType[0], scope.row)">直接报销</span>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'optHomebg',
  data() {
    return {
      commonData: {}
    }
  },
  props: {
    scope: {},
    homeMenu: []
  },
  created() {
    this.commonData = this.$getCommonData
  },
  mounted() {},
  methods: {
    // 跳转到制单页时路由所需要的的menuid获取
    getMenu(billType, item) {
      let menu = ''
      if (this.homeMenu[0] && billType.includes(this.homeMenu[0].sourceCode)) {
        menu = this.homeMenu[0].sourceName
      } else {
        if (this.homeMenu[1]) {
          menu = this.homeMenu[1].sourceName
        }
      }
      if (menu !== null && menu !== undefined && menu !== '') {
        return menu
      } else {
        // Apply代表的单据类型是请款单 read
        if (item.parentBillType === 'APPLY') {
          menu = '135101001001'
        } else {
          menu = '140101001001'
        }
        return menu
      }
    },
    // 跳转详情页
    getUrl(billType) {
      let billUrl = ''
      if (billType === undefined) {
        return ''
      }
      if (billType.indexOf('EXP') !== -1) {
        // 报销单
        billUrl = 'expenseBill'
      } else if (billType.indexOf('LOAN') !== -1) {
        // 借款单
        billUrl = 'loanBill'
      } else if (billType.indexOf('APPLY') !== -1) {
        // 申请单
        billUrl = 'applysBill'
      } else if (billType.indexOf('REPAY') !== -1) {
        // 还款单
        billUrl = 'repayBill'
      }
      return billUrl
    },
    billClick(e, item, row) {
      let url = `/A/ar/resources/${this.getUrl(item.billType)}?billType=${item.billType}&bgId=${row.bgItemId}&menuid=${this.getMenu(
        item.billType,
        item
      )}&expenseType=${row.expenseType.expenseType}&expenseTypeName=${row.expenseType.expenseTypeName}&roleCode=${this.commonData.svAgencyCode}`
      $(e.target)[0].dataset.href = url
      e.target.setAttribute('data-title', item.billName)
      console.log($(e.target))

      // window.parent.openNewMenu($(e.target))
    }
  },
  watch: {}
}
</script>
<style scoped lang="scss"></style>
