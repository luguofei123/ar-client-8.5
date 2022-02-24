<!-- 单据模板 -->
<template>
  <div class="arBill">
    <!-- 单据头部 -->
    <headAre :tplData="tplData"></headAre>
    <div class="leftBox">
      <div v-for="(item, index) in tplData.areaLeft" :key="index" :id="item.areaType" class="spread">
        <!-- 关联区域 -->
        <div v-if="item.areaType === 'RELATION'">
          <relationAre :tplData="tplData" :itemData="item"></relationAre>
        </div>
        <!-- 基础区域 -->
        <div v-if="item.areaType === 'BASE'">
          <baseAre :tplData="tplData" :itemData="item"></baseAre>
        </div>
        <!-- 费用区域 -->
        <div v-if="item.areaType === 'DETAIL'">
          <expenseAre :tplData="tplData" :itemData="item"></expenseAre>
        </div>
        <!-- 指标区域 -->
        <div v-if="item.areaType === 'BUDGET'">
          <budgetAre :tplData="tplData" :itemData="item"></budgetAre>
        </div>
        <!-- 附件区域 -->
        <div v-if="item.areaType === 'FILE'">
          <fileAre :tplData="tplData" :itemData="item"></fileAre>
        </div>
        <!-- 结算区域 -->
        <div v-if="item.areaType === 'SETTMENT'">
          <settlementAre :tplData="tplData" :itemData="item"></settlementAre>
        </div>
      </div>
    </div>
    <rightBar></rightBar>
    <footerBar></footerBar>
    <div class="pullRightButton" @click="collapseRightBar">
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
  <!--  -->
</template>

<script>
import { commonAPI } from '../../service/api/commonAPI'
import { arBillAPI } from './arBillAPI'
const headAre = () => import('./headAre/headAre.vue')
const baseAre = () => import('./baseAre/baseAre.vue')
const budgetAre = () => import('./budgetAre/budgetAre.vue')
const expenseAre = () => import('./expenseAre/expenseAre.vue')
const fileAre = () => import('./fileAre/fileAre.vue')
const relationAre = () => import('./relationAre/relationAre.vue')
const settlementAre = () => import('./settlementAre/settlementAre.vue')
const rightBar = () => import('./rightBar/rightBar.vue')
const footerBar = () => import('./footerBar/footerBar.vue')
export default {
  name: 'arBill',
  data() {
    return {
      commonData: {},
      systemData: {},
      routeQuery: {},
      tplData: {},
      showRightSideFlag: true
    }
  },
  props: {},
  created() {
    // 获取登录信息
    this.commonData = this.$getCommonData
    // 获取系统数据
    commonAPI.getAllSysConfig().then(res => {
      if (res.data.flag === 'SUCCESS') {
        this.systemData = res.data.data
      }
    })
    // 获取查询参数
    this.routeQuery = this.getRouteQuery()
  },
  mounted() {
    this.initTemplate()
  },
  watch: {},
  methods: {
    // 获取url上的参数
    getRouteQuery() {
      let obj = {}
      if (this.$route.query) {
        let objQuery = this.$route.query
        let obj = {}
        Object.keys(objQuery).forEach(key => {
          obj[key] = objQuery[key]
        })
        return obj
      }
      return obj
    },
    initTemplate() {
      let params = {
        billId: '',
        billType: 'EXP_TRIP',
        coCode: this.commonData.svAgencyCode,
        roleCode: this.commonData.svRoleCode,
        templetCode: '',
        urlType: 'todo'
      }
      arBillAPI.getBillTemplate(params).then(res => {
        if (res.data.flag === 'SUCCESS') {
          this.tplData = res.data.data
        }
      })
    },
    collapseRightBar() {
      let leftBox = document.querySelector('.arBill>.leftBox')
      let rightBox = document.querySelector('.arBill>.rightBox')
      let pullRightButton = document.querySelector('.arBill>.pullRightButton')
      let footBox = document.querySelector('.arBill>.footBox')
      let icon = document.querySelector('.arBill>.pullRightButton>i')
      if (this.showRightSideFlag) {
        rightBox.style.width = '0'
        pullRightButton.style.right = '0'
        leftBox.style.width = '100%'
        footBox.style.width = '100%'
        icon.setAttribute('class', 'el-icon-arrow-left')
      } else {
        rightBox.style.width = `300px`
        pullRightButton.style.right = '300px'
        leftBox.style.width = `calc(100% - 300px)`
        footBox.style.width = `calc(100% - 310px)`
        icon.setAttribute('class', 'el-icon-arrow-right')
      }
      this.showRightSideFlag = !this.showRightSideFlag
    }
  },
  components: {
    headAre,
    baseAre,
    budgetAre,
    expenseAre,
    fileAre,
    relationAre,
    settlementAre,
    rightBar,
    footerBar
  }
}
</script>
<style scoped lang="scss">
.arBill {
  position: relative;
  width: 100%;
  height: 100%;
  .leftBox {
    padding: 8px 8px 0px;
    overflow: auto;
    position: absolute;
    width: calc(100% - 300px);
    bottom: 50px;
    top: 80px;
    left: 0;
    .spread {
      margin-bottom: 8px;
      box-shadow: 0px 0px 6px 0px rgb(0 0 0 / 20%);
    }
    ::v-deep .el-collapse-item__header {
      height: 40px;
      line-height: 40px;
      color: #333;
    }
  }
  .pullRightButton {
    position: absolute;
    right: 300px;
    top: 50%;
    color: #06f;
    .el-icon-arrow-left,
    .el-icon-arrow-right {
      position: absolute;
      right: -2px;
      top: 18px;
    }
    &::before {
      box-sizing: content-box;
      width: 0px;
      height: 35px;
      position: absolute;
      right: 0px;
      top: 0%;
      padding: 0;
      border-right: 12px solid #ffffff;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      display: block;
      content: '';
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
