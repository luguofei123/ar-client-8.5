<!-- 按钮组或搜索框
改组件专门为搜索区域使用，本来想和表单组件合成一个，但是两者字段差异性较大，故分开做了
 -->
<template>
  <div class="serachBox arForm">
    <div class="searchCondition">
      <template v-for="(item, index) in searchFieldList">
        <div class="searchItem" :key="index">
          <span>{{ item.infoName }}</span>
          <div style="width: 264px">
            <template v-if="item.dataType === '01'">
              <el-input v-model="searchData[item.arField]"></el-input>
            </template>
            <template v-else-if="item.dataType === '09'">
              <el-date-picker
                v-model="searchData[item.arField]"
                type="daterange"
                :picker-options="pickerOptions"
                placeholder="选择日期范围"
                format="yyyy-MM-dd"
                value-format="timestamp"
                align="left"
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
              <arAgency
                v-model="searchData[item.arField]"
                @change="
                  data => {
                    formChange(data, item)
                  }
                "
              ></arAgency>
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
import arAgency from './arSelectAgency.vue'
export default {
  name: 'arSearch',
  components: {
    arAgency
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
      }
    }
  },
  props: {
    searchFieldList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    formChange(data, item) {
      this.$emit('formChange', data)
      this.searchData[item.arField] = data.id
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
