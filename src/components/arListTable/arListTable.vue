<template>
  <div class="arList_container">
    <div class="arList_top">
      <div class="card">
        <p>
          <img class="img-size-14" src="../../assets/img/reimbursement.png" alt="" />
          <b>新增报销</b>
          <img class="img-size-14" @click="settingLabel('APPLY')" src="../../assets/img/private_set.png" alt="" />
        </p>
        <div ref="scroll-content">
          <arCarousel :carouselArr="carouselArr" :carouselWidth="carouselWidth" :carouselSize="16"> </arCarousel>
        </div>
      </div>
    </div>
    <div class="arList_tap">
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
          :pageName="pageName"
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
import arCarousel from '../arCarousel'
import arTable from '../arTable/arTable.vue'
import arTab from '../arTab.vue'
import arSearch from '../arSearch.vue'
import arTransfer from '../arTransfer.vue'
import { arList } from './arListTableAPI'
import { commonAPI } from '../../service/api/commonAPI'

export default {
  props: ['pageName'],
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
      tableColumn: [],
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
          arList.getPayStatus(this.payTypes).then(res => {
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
      arList.queryTypeByPtype(param).then(res => {
        if (res.data.flag === 'SUCCESS') {
          this.carouselArr = res.data.data
          this.initSelectData()
        }
      })
    },
    initTabs() {
      arList.getTabAndCol(this.pageName).then(res => {
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
      arList.getTableColumnOrSeachCloumn(item, 'searchSet').then(res => {
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
      arList.getTableData(params).then(res => {
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
.arList_container {
  padding: 10px;
  .arList_top {
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
  .arList_tap {
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
