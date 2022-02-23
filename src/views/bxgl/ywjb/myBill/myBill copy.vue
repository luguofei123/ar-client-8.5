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
      <arTab :tabList="tabList" @tabClick="tabClick" cssType="line">
        <div style="display: flex; height: 34px">
          <el-button>委托收单</el-button>
          <el-button>委托收单</el-button>
          <el-button>委托收单</el-button>
          <el-button>委托收单</el-button>
        </div>
      </arTab>
      <arSearch ref="arSearch" :searchFieldList="allSerchData" @formChange="formChange">
        <div style="display: flex; height: 34px; align-self: center">
          <el-button type="primary" @click="getTableData(currentTab)">查询</el-button>
          <el-button icon="el-icon-setting" @click="settingLabel('APPLY')"></el-button>
        </div>
      </arSearch>
      <div class="table">
        <arTable
          :tableData="tableData"
          :columnList="tableColumn"
          @tdChange="tdChange"
          :isShowSum="true"
          :isEdit="false"
          :isShowCheckbox="true"
          :isShowIndex="true"
          :sortable="true"
          :isSettingColumn="true"
          :pageType="'list'"
          :pageName="'AR_BILL'"
          :homeMenu="homeMenu"
          :currentTab="currentTab"
        ></arTable>
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
import arSearch from '../../../../components/arSearch.vue'
import arTransfer from '../../../../components/arTransfer.vue'
import { myBill } from './myBillAPI'
import { commonAPI } from '../../../../service/api/commonAPI'

export default {
  data() {
    return {
      commonData: {},
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
      ],
      allSerchData: [
        // {
        //   infoName: '部门经济',
        //   arField: 'department',
        //   order: 0,
        //   dataItem: 'department',
        //   dataType: '21'
        // },
        {
          infoName: '预算单位',
          arField: 'coCode',
          order: 0,
          dataItem: 'coCode',
          dataType: '21'
        },
        {
          infoName: '单据日期',
          arField: 'daterange',
          order: 0,
          dataItem: 'daterange',
          dataType: '09'
        },
        {
          infoName: '单据类型',
          arField: 'billType',
          order: 0,
          dataItem: 'billType',
          dataType: '12'
        },
        {
          infoName: '模糊搜索',
          arField: 'searchKeyWord',
          order: 0,
          dataItem: 'searchKeyWord',
          dataType: '01'
        },
        {
          infoName: '支付状态',
          arField: 'payState',
          order: 0,
          dataItem: 'payState',
          dataType: '12'
        },
        {
          infoName: '打印状态',
          arField: 'isPrint',
          order: 0,
          dataItem: 'isPrint',
          dataType: '12'
        }
      ],
      searchParams: {},
      pTypes: ['EXPENSE', 'REPAY', 'LOAN'],
      payTypes: 'PAY_STATE_SEARCH',
      homeMenu: []
    }
  },
  mounted() {
    this.commonData = this.$getCommonData
    this.carouselWidth = this.$refs['scroll-content'].offsetWidth
    this.initCarousle()
    this.initTabs()
    // this.initSelectData()
    // 获取menu
    commonAPI.getHomeMenu().then(res => {
      if (res.data.flag === 'SUCCESS') {
        this.homeMenu = res.data.data
      } else {
        this.$message.error(res.data.msg)
      }
    })
  },
  methods: {
    // 初始化下拉值
    initSelectData() {
      // 单据类型下拉塞值
      this.allSerchData.forEach(item => {
        if (item.arField === 'billType') {
          item.data = this.carouselArr
            .filter(item => {
              return item.isUsed === 'Y'
            })
            .map(item => {
              return {
                sourceName: item.billName,
                sourceCode: item.billType
              }
            })
        } else if (item.arField === 'payState') {
          myBill.getPayStatus(this.payTypes).then(res => {
            if (res.data.flag === 'SUCCESS') {
              item.data = res.data.data
            }
          })
        }
      })
    },
    tdChange(obj) {
      this.$set(this.tableData[obj.rowIndex], obj.field, obj.value)
      console.log(obj)
    },
    formChange(data) {
      console.log(data)
      this.searchParams = data
    },
    initCarousle() {
      let param = {
        pTypes: this.pTypes.join()
      }
      myBill.queryTypeByPtype(param).then(res => {
        if (res.data.flag === 'SUCCESS') {
          this.carouselArr = res.data.data
          this.initSelectData()
        }
      })
    },
    initTabs() {
      myBill.getTabAndCol().then(res => {
        if (res.data.flag === 'SUCCESS' && res.data.data.hasTab) {
          this.tabList = res.data.data.tabs
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
      item.cols.forEach((item, index) => {
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
      this.tableColumn = item.cols
      this.getSearchData(item)
    },
    getSearchData(item) {
      myBill.getTableColumnOrSeachCloumn(item, 'searchSet').then(res => {
        if (res.data.flag === 'SUCCESS') {
          let data = res.data.data
          if (data && data.tabSet) {
          } else {
          }

          this.getTableData(item)
        }
      })
    },
    getTableData(item) {
      // 获取查询参数
      let getSearchParams = this.$refs.arSearch.searchData
      console.log(getSearchParams)
      let params = {}
      Object.keys(getSearchParams).forEach(key => {
        if (getSearchParams[key]) {
          params[key] = getSearchParams[key]
        }
      })
      params = {
        billType: '',
        coCode: this.commonData.svAgencyCode,
        endDate: 1642867200000,
        inputorId: 'AR01',
        invoiceStatus: '',
        isOrder: 'N',
        isPrint: '',
        limit: 10,
        menuCode: '140101001002',
        offset: 1,
        orgName: '',
        parentBillType: 'EXPENSE',
        payState: '',
        posi: '10',
        queryCondi: {},
        roleIdLs: '9588',
        searchKeyWord: '',
        startDate: 1640966400000,
        tabCondition: item.condiStr,
        workFlowStatus: item.workFlowStatus
      }
      myBill.getTableData(params).then(res => {
        if (res.data.flag === 'SUCCESS') {
          let result = res.data.data.content
          this.tableData = result
          this.total = res.data.data.totalElements
        }
      })
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
    arSearch,
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
    .pagination {
      display: flex;
      justify-content: flex-end;
      margin-right: -20px;
      margin-top: 10px;
    }
  }
}
</style>
