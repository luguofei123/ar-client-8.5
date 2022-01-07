<template>
  <div>
    <ux-grid :data="tableData" border keep-source :edit-config="{ trigger: 'click', mode: 'cell', showIcon: false }" widthResize>
      <ux-table-column fixed="left" type="checkbox" header-align="center" align="center" width="50" v-if="isShowCheckbox"> </ux-table-column>
      <ux-table-column fixed="left" type="index" header-align="center" align="center" width="50" title="序号" v-if="isShowIndex"></ux-table-column>
      <template v-for="(item, index) in columnList">
        <tableColumn :key="index" :item="item" @tdChange="tdChange"></tableColumn>
      </template>
      <ux-table-column fixed="right" header-align="center" align="center" title="操作" width="120">
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
    return {}
  },
  props: ['isShowCheckbox', 'isShowIndex', 'columnList', 'tableData'],
  methods: {
    tdChange(obj) {
      this.$emit('tdChange', obj)
    }
  },
  mounted() {},
  watch: {},
  components: {
    tableColumn
  }
}
</script>
<style lang="scss" src="./arTable.scss"></style>
