<template>
  <div class="cap_container">
    <div class="cap_top">
      <div class="card">
        <p>
          <img class="img-size-14" src="../../../../assets/img/capital_icon_blue.png" alt="" />
          <b>资金申请</b>
          <span>事前申请业务</span>
          <img class="img-size-14" src="../../../../assets/img/private_set.png" alt="" />
        </p>
        <div ref="scroll-content">
          <carousel :carouselArr="carouselArr" :carouselWidth="carouselWidth" :carouselSize="6"> </carousel>
        </div>
      </div>
      <div class="card">
        <p>
          <img class="img-size-14" src="../../../../assets/img/capital_icon_blue.png" alt="" />
          <b>资金申请</b>
          <span>事前申请业务</span>
          <img class="img-size-14" src="../../../../assets/img/private_set.png" alt="" />
        </p>
        <div ref="scroll-content">
          <carousel :carouselArr="carouselArr" :carouselWidth="carouselWidth" :carouselSize="6"> </carousel>
        </div>
      </div>
    </div>
    <div class="cap_tap">
      <arTab>
        <div style="display: flex">
          <el-button style="margin-right: 10px">委托收单</el-button>
          <el-input class="w-300" v-model="test">
            <i slot="suffix" class="iconfont iconsousuo"></i>
          </el-input>
        </div>
      </arTab>
      <div class="table">
        <arTable :tableData="tableData" :columnList="tableColumn" @tdChange="tdChange" :isShowCheckbox="true" :isShowIndex="true"></arTable>
      </div>
      <div class="pagination">
        <el-pagination :current-page="1" :page-sizes="[10, 20, 50, 100, 500]" :page-size="10" layout="total, prev, pager, next, sizes" :total="0">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import carousel from '../../../../components/carousel'
import arTable from '../../../../components/arTable/arTable.vue'
import arTab from '../../../../components/arTab.vue'
export default {
  data() {
    return {
      carouselArr: [
        { id: 1, name: '差旅费申请1' },
        { id: 2, name: '差旅费申请2' },
        { id: 3, name: '差旅费申请3' },
        { id: 4, name: '差旅费申请4' },
        { id: 5, name: '差旅费申请5' },
        { id: 6, name: '差旅费申请6' },
        { id: 7, name: '差旅费申请7' },
        { id: 8, name: '差旅费申请8' },
        { id: 9, name: '差旅费申请9' },
        { id: 10, name: '差旅费申请10' },
        { id: 11, name: '差旅费申请11' },
        { id: 12, name: '差旅费申请12' },
        { id: 13, name: '差旅费申请13' }
      ],
      carouselWidth: 0,
      test: '',
      tableData: [{ expenseType: 'hahha', real: '好的的额', startTime: '', startTimes: null }, {}, {}],
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
  },
  methods: {
    tdChange(obj) {
      this.$set(this.tableData[obj.rowIndex], obj.field, obj.value)
      console.log(obj)
    }
  },
  components: {
    carousel,
    arTable,
    arTab
  }
}
</script>

<style lang="scss" scoped>
.cap_container {
  padding: 10px;
  .cap_top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .card {
      width: 100%;
      flex-basis: 49.5%;
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
  .cap_tap {
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
