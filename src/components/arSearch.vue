<template>
  <div class="serachBox arForm">
    <div class="searchCondition">
      <template v-for="(item, index) in allSerchData">
        <div class="searchItem" :key="index">
          <span>{{ item.infoName }}</span>
          <el-input v-model="value"></el-input>
        </div>
      </template>
    </div>
    <!-- 按钮组或搜索框 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'arSearch',
  data() {
    return {
      allSerchData: [
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
