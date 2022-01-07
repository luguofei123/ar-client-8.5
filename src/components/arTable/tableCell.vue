<template>
  <div>
    <template v-if="item.dataType === '01'">
      <el-input v-model="value" @blur="handleChange($event.target.value, 'tdBlur')" @change="v => handleChange(v, 'tdChange')"></el-input>
    </template>
    <template v-if="item.dataType === '08'">
      <el-date-picker
        format="yyyy-MM-dd"
        v-model="value"
        value-format="timestamp"
        type="date"
        :placeHolder="item.elementHint"
        @change="v => handleChange(v, 'tdChange')"
      ></el-date-picker>
    </template>
    <template v-if="item.dataType === '10'">
      <el-date-picker
        format="yyyy-MM-dd HH:mm"
        v-model="value"
        value-format="timestamp"
        type="datetime"
        :placeHolder="item.elementHint"
        @change="v => handleChange(v, 'tdChange')"
      ></el-date-picker>
    </template>
  </div>
</template>
<script>
export default {
  name: 'tableCell',
  props: ['item', 'scope'],
  data() {
    return {
      value: ''
    }
  },
  created() {
    this.value = this.scope.row[this.item.arField]
  },
  methods: {
    //日期赋值
    handleChange(value, changeType) {
      debugger
      this.value = value
      this.$emit('tdChange', {
        changeType: changeType,
        value: value,
        row: this.scope.row,
        field: this.item.arField,
        rowIndex: this.scope.$rowIndex,
        columnIndex: this.scope.$columnIndex,
        data: this.scope.data,
        item: this.item,
        scope: this.scope
      })
    }
  }
}
</script>
