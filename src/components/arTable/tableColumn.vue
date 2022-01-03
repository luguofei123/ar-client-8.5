<template>
  <ux-table-column :field="item.arField" align="center" title="item.infoName" edit-render>
    <template v-slot:header>
      <i class="must" v-if="item.isNotEmpty === 'Y'">*</i><span>{{ item.infoName }}</span></template
    >
    <template v-slot:edit="scope">
      <tableCell :scope="scope" :item="item"></tableCell>
    </template>
    <template v-slot="{ row }">
      <span>
        <template v-if="item.dataType === '01'">{{ row[item.arField] }}</template>
        <template v-if="item.dataType === '08' || item.dataType === '10'">{{ row[item.arField] | timestampToTime(item) }}</template>
      </span>
    </template>
  </ux-table-column>
</template>
<script>
import tableCell from './tableCell.vue'
export default {
  name: 'tableColumn',
  props: ['item'],
  data() {
    return {}
  },
  components: {
    tableCell
  }
}
</script>
