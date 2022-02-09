<template>
  <div>
    <span v-if="scope.row.isCanPrint === 'Y'">打印 </span>
    <span v-if="scope.row.billStatus === '5' || scope.row.billStatus === '10'">提交 </span>
    <span v-if="tabType === 'HOME_APPLY' && scope.row.billStatus === '60'">办结 </span>
    <span v-if="scope.row.workFlow">流程 </span>
    <!--  请款单的借款按钮 start  -->
    <template
      v-if="
        tabType === 'HOME_APPLY' &&
        scope.row.billStatus === '60' &&
        scope.row.relatedTypes &&
        scope.row.relatedTypes.LOAN &&
        scope.row.relatedTypes.LOAN.length > 0
      "
    >
      <el-popover placement="bottom" width="150" trigger="click" v-if="scope.row.relatedTypes.LOAN.length > 1">
        <span slot="reference">借款</span>
        <ul class="popoverUl">
          <li v-for="(item, index) in scope.row.relatedTypes.LOAN" :key="index">
            <span @click="billClick($event, item, scope.row)">{{ item.billName }}</span>
          </li>
        </ul>
      </el-popover>
      <template v-if="scope.row.relatedTypes.LOAN.length === 1">
        <span @click="billClick($event, scope.row.relatedTypes.LOAN[0], scope.row)">借款</span>
      </template>
    </template>
    <!--  请款单的借款按钮 end  -->
    <!--  借款单的报销按钮 start  -->
    <template
      v-if="
        tabType === 'HOME_LOAN' &&
        scope.row.billStatus === '60' &&
        scope.row.relatedTypes &&
        scope.row.relatedTypes.EXPENSE &&
        scope.row.relatedTypes.EXPENSE.length > 0
      "
    >
      <el-popover placement="bottom" width="150" trigger="click" v-if="scope.row.relatedTypes.EXPENSE.length > 1">
        <span slot="reference">报销</span>
        <ul class="popoverUl">
          <li v-for="(item, index) in scope.row.relatedTypes.EXPENSE" :key="index">
            <span @click="billClick($event, item, scope.row)">{{ item.billName }}</span>
          </li>
        </ul>
      </el-popover>
      <template v-if="scope.row.relatedTypes.EXPENSE.length === 1">
        <span @click="billClick($event, scope.row.relatedTypes.EXPENSE[0], scope.row)">报销</span>
      </template>
    </template>
    <!--  借款单的报销按钮 end  -->
    <!--  借款单的还款按钮 start  -->
    <template
      v-if="
        tabType === 'HOME_LOAN' &&
        scope.row.billStatus === '60' &&
        scope.row.relatedTypes &&
        scope.row.relatedTypes.REPAY &&
        scope.row.relatedTypes.REPAY.length > 0
      "
    >
      <el-popover placement="bottom" width="150" trigger="click" v-if="scope.row.relatedTypes.REPAY.length > 1">
        <span slot="reference">还款</span>
        <ul class="popoverUl">
          <li v-for="(item, index) in scope.row.relatedTypes.REPAY" :key="index">
            <span @click="billClick($event, item, scope.row)">{{ item.billName }}</span>
          </li>
        </ul>
      </el-popover>
      <template v-if="scope.row.relatedTypes.REPAY.length === 1">
        <span @click="billClick($event, scope.row.relatedTypes.REPAY[0], scope.row)">还款</span>
      </template>
    </template>
    <!--  借款单的还款按钮 end  -->
  </div>
</template>

<script>
import { operationButton } from './operationButton'
export default {
  name: 'optHomebgex',
  mixins: [operationButton],
  // data() {
  //   return {
  //     commonData: {}
  //   }
  // },
  // props: {
  //   scope: {},
  //   homeMenu: [],
  //   tabType: ''
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
