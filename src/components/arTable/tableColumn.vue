<template>
  <ux-table-column
    :field="item.arField"
    :header-align="item.align ? item.align : 'center'"
    :align="item.align ? item.align : 'center'"
    :title="item.infoName"
    :min-width="item.width ? item.width : '150'"
    :resizable="true"
    :edit-render="isEdit"
    :sortable="sortable"
  >
    <template v-slot:header>
      <i class="must" v-if="item.isNotEmpty === 'Y'">*</i><span>{{ item.infoName }}</span></template
    >
    <template v-slot:edit="scope">
      <tableCell :scope="scope" :item="item" @tdChange="tdChange"></tableCell>
    </template>
    <template v-slot="{ row }">
      <span v-if="item.dataType === '01'">{{ row[item.arField] }}</span>
      <span v-if="item.dataType === '03'">{{ row[item.arField] | moneyFormat }}</span>
      <span v-if="item.dataType === '08' || item.dataType === '10'">{{ row[item.arField] | timestampToTime(item) }}</span>
    </template>
  </ux-table-column>
</template>
<script>
import tableCell from './tableCell.vue'
export default {
  name: 'tableColumn',
  props: ['item', 'isEdit', 'sortable'],
  data() {
    return {}
  },
  methods: {
    tdChange(obj) {
      this.$emit('tdChange', obj)
    }
  },
  components: {
    tableCell
  }
}
</script>
