
const capitalApplication = r => require.ensure([], () => r(require('@/views/bxgl/ywjb/capitalApplication/capitalApplication')), 'capitalApplication') // 业务经办
const myBill = r => require.ensure([], () => r(require('@/views/bxgl/ywjb/myBill/myBill')), 'myBill') // 我的报销单
const applysBill = r => require.ensure([], () => r(require('@/views/bxgl/applysBill')), 'applysBill') // 申请单
const expenseBill = r => require.ensure([], () => r(require('@/views/bxgl/expenseBill')), 'expenseBill') // 报销单
const loanBill = r => require.ensure([], () => r(require('@/views/bxgl/loanBill')), 'loanBill') // 借款单
const repayBill = r => require.ensure([], () => r(require('@/views/bxgl/repayBill')), 'repayBill') // 还款单
const zteePage = r => require.ensure([], () => r(require('@/views/testPage/ztreePage')), 'repayBill') // 还款单
const finRoutes = [
  {
    path: '/capitalApplication',
    name: 'capitalApplication',
    component: capitalApplication
  },
  {
    path: '/myBill',
    name: 'myBill',
    component: myBill
  },
  {
    path: '/applysBill',
    name: 'applysBill',
    component: applysBill
  },
  {
    path: '/expenseBill',
    name: 'expenseBill',
    component: expenseBill
  },
  {
    path: '/loanBill',
    name: 'loanBill',
    component: loanBill
  },
  {
    path: '/repayBill',
    name: 'repayBill',
    component: repayBill
  },
  {
    path: '/zteePage',
    name: 'zteePage',
    component: zteePage
  }
]
export default finRoutes