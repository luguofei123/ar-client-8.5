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
import { operationButton } from '../operationButton'
export default {
  name: 'optHomebg',
  mixins: [operationButton],
  // data() {
  //   return {
  //     commonData: {}
  //   }
  // },
  // props: {
  //   scope: {},
  //   homeMenu: []
  // },
  // created() {
  //   this.commonData = this.$getCommonData
  // },
  mounted() {},
  methods: {},
  watch: {}
}
</script>
<style scoped lang="scss"></style>
