<template>
  <div class="myBill_container">
    <div class="myBill_top">
      <div class="card">
        <p>
          <img class="img-size-14" src="../../../../assets/img/reimbursement.png" alt="" />
          <b>新增报销</b>
          <img class="img-size-14" @click="settingLabel('APPLY')" src="../../../../assets/img/private_set.png" alt="" />
        </p>
        <div ref="scroll-content">
          <arCarousel :carouselArr="carouselArr" :carouselWidth="carouselWidth" :carouselSize="16"> </arCarousel>
        </div>
      </div>
    </div>
    <div class="myBill_tap">
      <div class="tab"></div>
      <div class="search"></div>
      <div class="table">
        <arTable :tableData="tableData" :columnList="tableColumn" @tdChange="tdChange" :isEdit="false" :isShowCheckbox="false" :isShowIndex="false"></arTable>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, prev, pager, next, sizes"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog :close-on-click-modal="false" title="测试" :visible.sync="showDialog" size="large">
      <arTransfer v-if="showDialog" :TransferDataList="TransferDataList" :isShowMove="false" :isShowFixed="false"></arTransfer>
      <span slot="footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import arCarousel from '../../../../components/arCarousel'
import arTable from '../../../../components/arTable/arTable.vue'
import arTab from '../../../../components/arTab.vue'
import arTransfer from '../../../../components/arTransfer.vue'
import { myBill } from './myBillAPI'
export default {
  data() {
    return {
      showDialog: false,
      carouselArr: [],
      TransferDataList: [],
      carouselWidth: 0,
      tabList: [],
      currentTab: {},
      searchKeyWord: '',
      currentPage: 1,
      pageSizes: [10, 20, 50, 100, 500],
      pageSize: 10,
      total: 0,
      tableData: [],
      tableColumn: [
        {
          dataType: '01',
          infoId: 'EXPENSE_TYPE',
          arField: 'expenseType',
          infoName: '单行文本',
          isNotEmpty: 'N'
        },
        {
          dataType: '02',
          infoId: 'EXPENSE_TYPE2',
          arField: 'expenseType2',
          infoName: '多行文本',
          isNotEmpty: 'N'
        },
        {
          dataType: '03',
          infoId: 'EXPENSE_TYPE3',
          arField: 'expenseType3',
          infoName: '金额',
          isNotEmpty: 'N'
        },
        {
          dataType: '04',
          infoId: 'EXPENSE_TYPE4',
          arField: 'expenseType4',
          infoName: '整数',
          isNotEmpty: 'N'
        },
        {
          dataType: '05',
          infoId: 'EXPENSE_TYPE5',
          arField: '浮点',
          infoName: '费用名称',
          isNotEmpty: 'N'
        },
        {
          dataType: '06',
          infoId: 'EXPENSE_TYPE6',
          arField: 'expenseType6',
          infoName: '百分比',
          isNotEmpty: 'N'
        },
        {
          dataType: '07',
          infoId: 'EXPENSE_TYPE7',
          arField: 'expenseType7',
          infoName: '汇率',
          isNotEmpty: 'N'
        },
        {
          dataType: '08',
          infoId: 'EXPENSE_TYPE8',
          arField: 'expenseType8',
          infoName: '日期',
          isNotEmpty: 'N'
        },
        {
          dataType: '09',
          infoId: 'EXPENSE_TYPE9',
          arField: 'expenseType9',
          infoName: '日期区间',
          isNotEmpty: 'N'
        },
        {
          dataType: '10',
          infoId: 'EXPENSE_TYPE10',
          arField: 'expenseType10',
          infoName: '时间',
          isNotEmpty: 'N'
        },
        {
          dataType: '11',
          infoId: 'EXPENSE_TYPE11',
          arField: 'expenseType11',
          infoName: '费用名称',
          isNotEmpty: 'N'
        },
        {
          dataType: '12',
          infoId: 'EXPENSE_TYPE12',
          arField: 'expenseType12',
          infoName: '单选下拉',
          isNotEmpty: 'N'
        },
        {
          dataType: '13',
          infoId: 'EXPENSE_TYPE13',
          arField: 'expenseType13',
          infoName: '多选下拉',
          isNotEmpty: 'N'
        },
        {
          dataType: '14',
          infoId: 'EXPENSE_TYPE14',
          arField: 'expenseType14',
          infoName: '树引用',
          isNotEmpty: 'N'
        },
        {
          dataType: '15',
          infoId: 'EXPENSE_TYPE15',
          arField: 'expenseType15',
          infoName: '单选列表',
          isNotEmpty: 'N'
        },
        {
          dataType: '16',
          infoId: 'EXPENSE_TYPE16',
          arField: 'expenseType16',
          infoName: '多选列表',
          isNotEmpty: 'N'
        },
        {
          dataType: '17',
          infoId: 'EXPENSE_TYPE17',
          arField: 'expenseType17',
          infoName: '单选框',
          isNotEmpty: 'N'
        },
        {
          dataType: '18',
          infoId: 'EXPENSE_TYPE18',
          arField: 'expenseType18',
          infoName: '复选框',
          isNotEmpty: 'N'
        },
        {
          dataType: '19',
          infoId: 'EXPENSE_TYPE19',
          arField: 'expenseType19',
          infoName: '区划信息（国内）',
          isNotEmpty: 'N'
        },
        {
          dataType: '20',
          infoId: 'EXPENSE_TYPE20',
          arField: 'expenseType20',
          infoName: '搜索文本下拉',
          isNotEmpty: 'N'
        },
        {
          dataType: '21',
          infoId: 'EXPENSE_TYPE21',
          arField: 'expenseType21',
          infoName: '树形下拉',
          isNotEmpty: 'N'
        },
        {
          dataType: '22',
          infoId: 'EXPENSE_TYPE22',
          arField: 'expenseType22',
          infoName: '多选树形下拉',
          isNotEmpty: 'N'
        },
        {
          dataType: '23',
          infoId: 'EXPENSE_TYPE23',
          arField: 'expenseType23',
          infoName: '列表引用单选',
          isNotEmpty: 'N'
        },
        {
          dataType: '24',
          infoId: 'EXPENSE_TYPE24',
          arField: 'expenseType24',
          infoName: '列表引用多选',
          isNotEmpty: 'N'
        },
        {
          dataType: '25',
          infoId: 'EXPENSE_TYPE25',
          arField: 'expenseType25',
          infoName: '费用名称',
          isNotEmpty: 'N'
        },
        {
          dataType: '26',
          infoId: 'EXPENSE_TYPE26',
          arField: 'expenseType26',
          infoName: '树形下拉全称',
          isNotEmpty: 'N'
        },
        {
          dataType: '27',
          infoId: 'EXPENSE_TYPE27',
          arField: 'expenseType27',
          infoName: '区域信息（全球）',
          isNotEmpty: 'N'
        },
        {
          dataType: '28',
          infoId: 'EXPENSE_TYPE28',
          arField: 'expenseType28',
          infoName: '时间（小时）',
          isNotEmpty: 'N'
        },
        {
          dataType: '29',
          infoId: 'EXPENSE_TYPE29',
          arField: 'expenseType29',
          infoName: '选择/录入',
          isNotEmpty: 'N'
        },
        {
          dataType: '30',
          infoId: 'EXPENSE_TYPE30',
          arField: 'expenseType30',
          infoName: '支付令',
          isNotEmpty: 'N'
        }
      ]
    }
  },
  mounted() {
    this.carouselWidth = this.$refs['scroll-content'].offsetWidth
    this.initCarousle()
    this.initTabs()
  },
  methods: {
    tdChange(obj) {
      this.$set(this.tableData[obj.rowIndex], obj.field, obj.value)
      console.log(obj)
    },
    initCarousle() {
      let param = {
        pTypes: 'EXPENSE,REPAY,LOAN'
      }
      myBill.queryTypeByPtype(param).then(res => {
        if (res.data.flag === 'SUCCESS') {
          this.carouselArr = res.data.data
        }
      })
    },
    initTabs() {
      myBill.getArBusinssTabs().then(res => {
        if (res.data.flag === 'SUCCESS') {
          this.tabList = res.data.data
          this.currentTab = this.tabList[0]
          this.getTableColumn(this.currentTab)
        }
      })
    },
    tabClick(item) {
      this.currentTab = item
      this.currentPage = 1
      this.searchKeyWord = ''
      this.getTableColumn(this.currentTab)
    },
    getTableColumn(item) {
      myBill.getTableColumn(item).then(res => {
        if (res.data.flag === 'SUCCESS') {
          let result = res.data.data.cols
          result.forEach((item, index) => {
            item.align = 'left'
            item.width = item.dataLen
            if (item.dataType === 'TEXT') {
              item.dataType = '01'
            }
            if (item.dataType === 'MONEY') {
              item.dataType = '03'
              item.align = 'right'
            }
            if (item.dataType === 'DATE') {
              item.dataType = '08'
            }
            if (item.dataItem === 'billNo') {
              item.isLink = true
            }
            item.arField = item.dataItem
            item.infoName = item.dataItemNa
          })
          this.tableColumn = result
          this.getTableData(item)
        }
      })
    },
    getTableData(item) {
      let param = {
        endDate: new Date(this.$getCommonData.svTransDate.replace(/-/g, '/')).getTime(),
        limit: this.pageSize,
        offset: this.currentPage,
        reportType: item.sourceCode,
        roleIdLs: this.$getCommonData.svRoleId,
        searchKeyWord: this.searchKeyWord,
        startDate: new Date(this.$getCommonData.svTransDate.replace(/-/g, '/')).getTime(),
        userId: this.$getCommonData.svUserCode
      }
      myBill.getTableData(param).then(res => {
        if (res.data.flag === 'SUCCESS') {
          let result = res.data.data.content
          if (item.sourceCode === 'HOME_BG') {
            this.tableData = this.doPageByFront(result, this.pageSize, this.currentPage)
            this.total = result.length
          } else {
            this.tableData = result
            this.total = res.data.data.totalElements
          }
        }
      })
    },
    // 前端分页
    doPageByFront(data, pageSize, currentPage) {
      console.log(data, pageSize, currentPage)
      return data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    },
    // 分页条数改变
    sizeChange(val) {
      this.pageSize = val
      this.getTableData(this.currentTab)
    },
    // 当前页码改变
    currentChange(val) {
      this.currentPage = val
      this.getTableData(this.currentTab)
    },
    settingLabel() {
      this.TransferDataList = this.carouselArr
      this.showDialog = true
    },
    confirmDialog() {
      console.log(this.TransferDataList)
    }
  },
  components: {
    arCarousel,
    arTable,
    arTab,
    arTransfer
  }
}
</script>

<style lang="scss" scoped>
.myBill_container {
  padding: 10px;
  .myBill_top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .card {
      width: 100%;
      border-radius: 3px;
      box-shadow: 0px 1px 2px 0px rgb(0 0 0 / 20%);
      p {
        padding-left: 10px;
        height: 40px;
        background: #e5efff;
        line-height: 40px;
        span {
          margin-left: 10px;
          font-size: 12px;
        }
        b {
          margin-left: 5px;
        }
        img {
          position: relative;
          top: 1px;
        }
        img:last-child {
          float: right;
          margin-top: 12px;
          margin-right: 10px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
  .myBill_tap {
    background: white;
    padding: 10px 10px;
    border-radius: 3px;
    box-shadow: 0px 1px 2px 0px rgb(0 0 0 / 20%);
    .table {
      margin-top: 10px;
    }
    .pagination {
      display: flex;
      justify-content: flex-end;
      margin-right: -20px;
      margin-top: 10px;
    }
  }
}
</style>
