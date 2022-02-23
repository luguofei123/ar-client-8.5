<template>
  <div>
    <!-- 我的报销单 -->
    <template v-if="pageName === 'AR_BILL'">
      <span v-if="scope.row.billStatus !== '5'">复制</span>
      <span v-if="scope.row.billStatus === '10' || scope.row.billStatus === '5'">提交</span>
      <span v-if="(scope.row.billStatus === '20' || scope.row.billStatus === '60') && scope.row.isCanPrint === 'Y'">打印</span>
      <span v-if="currentTab.workFlowStatus === 'done' && scope.row.billStatus === '20'">收回</span>
      <span v-if="scope.row.billStatus !== '0' && scope.row.billStatus !== '10' && scope.row.workFlow">流程</span>
    </template>

    <span v-if="currentTab.tabId === 'PAY_RECORD' && currentTab.tabStatus === 'PAY_FAIL'">调整收款人</span>
    <!-- 
    <span type="text" v-if="workFlowStatus === 'todo' && isAudit" @click="approveThisBill(scope.row)">同意</span>
    <span type="text" v-if="workFlowStatus === 'todo' && isAudit" @click="regect(scope.row)">退回</span>
    <span
      v-if="workFlowStatus === 'done' && isAudit && scope.row.billStatus === '60' && TabsbtnList.indexOf('btn-un-audit') !== -1"
      @click="reActive(scope.row)"
      >销审</span
    >
    <span v-if="workFlowStatus === 'todo' && isAudit && $route.query.isShowAudit" @click="ylAudit(scope.row)">预览</span>
    <span v-if="operationBtn === 'applyBill' && scope.row.billStatus === '60' && scope.row.isDealed !== 'Y'" @click="bj(scope.row)">办结</span>
    <span v-if="operationBtn === 'applyBill' && scope.row.billStatus === '60' && scope.row.isDealed === 'Y'" @click="closeBj(scope.row)">取消办结</span>
    <span v-if="cashier && workFlowStatus === 'todo'" @click="payBill('one', scope.row)">支付</span>
    <span v-if="cashier && workFlowStatus === 'done' && payMethod === 'ONPAY_DOWNTAG'" @click="cancelPay('one', scope.row)">取消支付</span>
    <span v-if="isBusinessCollect && tabStatus === 'TOPAY'" @click="refund(scope.row)">还款</span>
    <span v-if="isBusinessCollect && tabStatus === 'TOPAY'" @click="cancelSummary(scope.row)">取消汇总</span> -->
    <!-- <span
                      v-if="
                        scope.row.billStatus === '60' &&
                        scope.row.billType === 'LOAN_GENERAL' &&
                        $route.query.type === 'LOAN_QUERY' &&
                        scope.row.balAmt > 0 &&
                        btnList.indexOf('btn-repay') !== -1
                      "
                      data-title="个人还款单"
                      :data-href="
                        '/A/ar/resources/' +
                        scope.row.url +
                        '?billType=REPAY_GENERAL' +
                        '&relabillId=' +
                        scope.row.id +
                        '&menuid=' +
                        getMenu1(scope.row.billType)
                      "
                      @click="billClick1($event, scope.row, item)"
                      >还款</span
                    >
                    <el-popover
                      placement="bottom"
                      width="150"
                      trigger="click"
                      v-if="
                        operationBtn === 'applyBill' &&
                        scope.row.billStatus === '60' &&
                        scope.row.relatedTypes &&
                        scope.row.relatedTypes.EXPENSE &&
                        scope.row.relatedTypes.EXPENSE.length > 1 &&
                        scope.row.isDealed !== 'Y'
                      "
                    >
                      <span slot="reference">报销</span>
                      <template
                        v-if="
                          scope.row.relatedTypes &&
                          scope.row.relatedTypes.EXPENSE &&
                          scope.row.relatedTypes.EXPENSE.length > 1 &&
                          scope.row.billStatus === '60' &&
                          scope.row.isDealed !== 'Y'
                        "
                      >
                        <ul class="popoverUl" v-if="scope.row.isItemApply === 'Y'">
                          <li v-for="(item, ind) in scope.row.relatedTypes.EXPENSE" :key="ind">
                            <span
                              :data-title="item.billName"
                              :title="item.billName"
                              :data-href="
                                '/A/ar/resources/' +
                                scope.row.url +
                                '?billType=' +
                                item.billType +
                                '&relabillId=' +
                                scope.row.id +
                                '&isItemApply=Y&menuid=' +
                                getMenu1(item.billType, item) +
                                '&roleCode=' +
                                roleCode1
                              "
                              @click="relBillClick($event, item, scope.row)"
                              >{{ item.billName }}</span
                            >
                          </li>
                        </ul>
                        <ul class="popoverUl" v-if="scope.row.isItemApply === 'N'">
                          <li v-for="(item, ind) in scope.row.relatedTypes.EXPENSE" :key="ind">
                            <span
                              :data-title="item.billName"
                              :title="item.billName"
                              :data-href="
                                '/A/ar/resources/' +
                                scope.row.url +
                                '?billType=' +
                                item.billType +
                                '&relabillId=' +
                                scope.row.id +
                                '&menuid=' +
                                getMenu1(item.billType, item) +
                                '&roleCode=' +
                                roleCode1
                              "
                              @click="relBillClick($event, item, scope.row)"
                              >{{ item.billName }}</span
                            >
                          </li>
                        </ul>
                      </template>
                    </el-popover>
                    <span
                      v-if="
                        operationBtn === 'applyBill' &&
                        scope.row.relatedTypes &&
                        scope.row.relatedTypes.EXPENSE &&
                        scope.row.relatedTypes.EXPENSE.length === 1 &&
                        scope.row.billStatus === '60' &&
                        scope.row.isDealed !== 'Y' &&
                        scope.row.isItemApply === 'N'
                      "
                      :data-title="scope.row.relatedTypes.EXPENSE[0].billName"
                      :data-href="
                        '/A/ar/resources/' +
                        scope.row.url +
                        '?billType=' +
                        scope.row.relatedTypes.EXPENSE[0].billType +
                        '&relabillId=' +
                        scope.row.id +
                        '&menuid=' +
                        getMenu1(scope.row.relatedTypes.EXPENSE[0].billType, scope.row.relatedTypes.EXPENSE[0]) +
                        '&roleCode=' +
                        roleCode1
                      "
                      @click="relBillClick($event, item, scope.row)"
                    >
                      报销
                    </span>
                    <span
                      v-if="
                        operationBtn === 'applyBill' &&
                        scope.row.relatedTypes &&
                        scope.row.relatedTypes.EXPENSE &&
                        scope.row.relatedTypes.EXPENSE.length === 1 &&
                        scope.row.billStatus === '60' &&
                        scope.row.isDealed !== 'Y' &&
                        scope.row.isItemApply === 'Y'
                      "
                      :data-title="scope.row.relatedTypes.EXPENSE[0].billName"
                      :data-href="
                        '/A/ar/resources/' +
                        scope.row.url +
                        '?billType=' +
                        scope.row.relatedTypes.EXPENSE[0].billType +
                        '&relabillId=' +
                        scope.row.id +
                        '&isItemApply=Y&menuid=' +
                        getMenu1(scope.row.relatedTypes.EXPENSE[0].billType, scope.row.relatedTypes.EXPENSE[0]) +
                        '&roleCode=' +
                        roleCode1
                      "
                      @click="relBillClick($event, item, scope.row)"
                    >
                      报销
                    </span>
                    <el-popover
                      placement="bottom"
                      width="150"
                      trigger="click"
                      v-if="
                        operationBtn === 'applyBill' &&
                        scope.row.billStatus === '60' &&
                        scope.row.relatedTypes &&
                        scope.row.relatedTypes.LOAN &&
                        scope.row.relatedTypes.LOAN.length > 1
                      "
                    >
                      <span slot="reference" type="text">借款</span>
                      <template
                        v-if="scope.row.relatedTypes && scope.row.relatedTypes.LOAN && scope.row.relatedTypes.LOAN.length > 1 && scope.row.isDealed !== 'Y'"
                      >
                        <ul class="popoverUl" v-if="scope.row.isItemApply === 'N'">
                          <li v-for="(item, ind) in scope.row.relatedTypes.LOAN" :key="ind">
                            <span
                              :data-title="item.billName"
                              :title="item.billName"
                              :data-href="
                                '/A/ar/resources/' +
                                scope.row.url +
                                '?billType=' +
                                item.billType +
                                '&relabillId=' +
                                scope.row.id +
                                '&menuid=' +
                                getMenu1(item.billType, item) +
                                '&roleCode=' +
                                roleCode1
                              "
                              @click="relBillClick($event, item, scope.row)"
                              >{{ item.billName }}</span
                            >
                          </li>
                        </ul>
                        <ul class="popoverUl" v-if="scope.row.isItemApply === 'Y'">
                          <li v-for="(item, ind) in scope.row.relatedTypes.LOAN" :key="ind">
                            <span
                              :data-title="item.billName"
                              :title="item.billName"
                              :data-href="
                                '/A/ar/resources/' +
                                scope.row.url +
                                '?billType=' +
                                item.billType +
                                '&relabillId=' +
                                scope.row.id +
                                '&isItemApply=Y&menuid=' +
                                getMenu1(item.billType, item) +
                                '&roleCode=' +
                                roleCode1
                              "
                              @click="relBillClick($event, item, scope.row)"
                              >{{ item.billName }}</span
                            >
                          </li>
                        </ul>
                      </template>
                    </el-popover>
                    <span
                      v-if="
                        operationBtn === 'applyBill' &&
                        scope.row.relatedTypes &&
                        scope.row.relatedTypes.LOAN &&
                        scope.row.relatedTypes.LOAN.length === 1 &&
                        scope.row.billStatus === '60' &&
                        scope.row.isItemApply === 'N' &&
                        scope.row.isDealed !== 'Y'
                      "
                      :data-title="scope.row.relatedTypes.LOAN[0].billName"
                      :data-href="
                        '/A/ar/resources/' +
                        scope.row.url +
                        '?billType=' +
                        scope.row.relatedTypes.LOAN[0].billType +
                        '&relabillId=' +
                        scope.row.id +
                        '&menuid=' +
                        getMenu1(scope.row.relatedTypes.LOAN[0].billType, scope.row.relatedTypes.LOAN[0]) +
                        '&roleCode=' +
                        roleCode1
                      "
                      @click="relBillClick($event, item, scope.row)"
                    >
                      借款
                    </span>
                    <span
                      v-if="
                        operationBtn === 'applyBill' &&
                        scope.row.relatedTypes &&
                        scope.row.relatedTypes.LOAN &&
                        scope.row.relatedTypes.LOAN.length === 1 &&
                        scope.row.billStatus === '60' &&
                        scope.row.isItemApply === 'Y' &&
                        scope.row.isDealed !== 'Y'
                      "
                      :data-title="scope.row.relatedTypes.LOAN[0].billName"
                      :data-href="
                        '/A/ar/resources/' +
                        scope.row.url +
                        '?billType=' +
                        scope.row.relatedTypes.LOAN[0].billType +
                        '&relabillId=' +
                        scope.row.id +
                        '&isItemApply=Y&menuid=' +
                        getMenu1(scope.row.relatedTypes.LOAN[0].billType, scope.row.relatedTypes.LOAN[0]) +
                        '&roleCode=' +
                        roleCode1
                      "
                      @click="relBillClick($event, item, scope.row)"
                    >
                      借款
                    </span> -->
  </div>
</template>

<script>
import { operationButton } from '../operationButton'
export default {
  name: 'optHomebgex',
  mixins: [operationButton],
  props: {},
  mounted() {},
  methods: {},
  watch: {}
}
</script>
<style scoped lang="scss"></style>
