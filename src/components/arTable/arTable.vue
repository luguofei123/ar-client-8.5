<template>
  <div>
    <ux-grid :data="tableData" border keep-source :edit-config="{ trigger: 'click', mode: 'cell', showIcon: false }">
      <ux-table-column fixed="left" type="checkbox" header-align="center" align="center" width="50" v-if="isShowCheckbox"> </ux-table-column>
      <ux-table-column fixed="left" type="index" header-align="center" align="center" width="50" title="序号" v-if="isShowIndex"></ux-table-column>
      <template v-for="(item, index) in columns">
        <tableColumn :key="index" :item="item"></tableColumn>
      </template>
      <ux-table-column fixed="right" title="操作">
        <template>
          <span type="text">查看</span>
          <span type="text">编辑</span>
          <span type="text">删除</span>
        </template>
      </ux-table-column>
    </ux-grid>
  </div>
</template>

<script>
import tableColumn from './tableColumn.vue'
export default {
  name: 'editTable',
  data() {
    return {
      columns: [
        {
          dataType: '01',
          infoId: 'EXPENSE_TYPE',
          arField: 'expenseType',
          infoName: '费用名称',
          isNotEmpty: 'N'
        },
        {
          dataType: '08',
          infoId: 'EXPENSE_TYPE1',
          arField: 'startTime',
          infoName: '日期',
          isNotEmpty: 'Y'
        },
        {
          dataType: '10',
          infoId: 'EXPENSE_TYPE2',
          arField: 'startTimes',
          infoName: '时间',
          isNotEmpty: 'Y'
        }
      ],
      tableData: [{ expenseType: 'hahha', real: '好的的额', startTime: '', startTimes: null }, {}, {}]
    }
  },
  props: ['isShowCheckbox', 'isShowIndex'],
  methods: {},
  mounted() {},
  watch: {},
  components: {
    tableColumn
  }
}
</script>
<style lang="scss" src="./arTable.scss"></style>
