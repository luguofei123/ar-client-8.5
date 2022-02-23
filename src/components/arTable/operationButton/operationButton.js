// 表格操作按钮公共逻辑
export const operationButton = {
    data() {
        return {
            commonData: {}
        }
    },
    props: {
        scope: {},
        homeMenu: [],
        tabType: '',
        currentTab: {},
        pageName: ''
    },
    created() {
        this.commonData = this.$getCommonData
    },
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
    }
}