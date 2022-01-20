<template>
  <div class="serachBox arForm">
    <div class="searchCondition">
      <template v-for="(item, index) in allSerchData">
        <div class="searchItem" :key="index">
          <span>{{ item.infoName }}</span>
          <div style="width: 264px">
            <template v-if="item.dataType === '01'">
              <el-input v-model="searchData[item.arField]"></el-input>
            </template>
            <template v-else-if="item.dataType === '08'">
              <el-date-picker
                v-model="searchData[item.arField]"
                type="daterange"
                :picker-options="pickerOptions"
                placeholder="选择日期范围"
                format="yyyy-MM-dd"
                align="right"
                style="width: 100%"
                unlink-panels
                :default-time="['00:00:00', '23:59:59']"
              >
              </el-date-picker>
            </template>
            <template v-else-if="item.dataType === '12'">
              <el-select clearable v-model="searchData[item.arField]" filterable placeholder="请选择结算方式" style="width: 100%">
                <el-option v-for="(item, index) in settlementTypeList" :key="index" :label="item.sourceName" :value="item.sourceCode"></el-option>
              </el-select>
            </template>
            <template v-else-if="item.dataType === '21'">
              <arTreeSelect></arTreeSelect>
            </template>
          </div>
        </div>
      </template>
    </div>
    <!-- 按钮组或搜索框 -->
    <slot></slot>
  </div>
</template>

<script>
import arTreeSelect from './arTreeSelect.vue'
export default {
  name: 'arSearch',
  components: {
    arTreeSelect
  },
  data() {
    return {
      searchData: {},
      settlementTypeList: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      allSerchData: [
        {
          infoName: '部门经济',
          arField: 'department',
          order: 0,
          dataItem: 'department',
          dataType: '21'
        },
        {
          infoName: '预算单位',
          arField: 'coCode',
          order: 0,
          dataItem: 'coCode',
          dataType: '12'
        },
        {
          infoName: '单据日期',
          arField: 'startDate',
          order: 0,
          dataItem: 'startDate',
          dataType: '08'
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
      ]
    }
  },
  props: {
    tabList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    tabClick(item, index) {
      this.currentIndex = index
      this.$emit('tabClick', item)
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style scoped lang="scss">
.serachBox {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  .searchCondition {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 80%;
    .searchItem {
      display: flex;
      align-items: baseline;
      width: 30%;
      margin-bottom: 20px;
      span {
        width: 85px;
        margin-right: 10px;
        text-align: right;
      }
    }
  }
}
</style>
