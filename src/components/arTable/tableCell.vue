<template>
  <div>
    <template v-if="item.dataType === '01'">
      <el-input v-model="scope.row[item.arField]"></el-input>
    </template>
    <template v-if="item.dataType === '08'">
      <el-date-picker format="yyyy-MM-dd" v-model="scope.row[item.arField]" type="date" :placeHolder="item.elementHint" @change="onChange"></el-date-picker>
    </template>
    <template v-if="item.dataType === '10'">
      <el-date-picker
        format="yyyy-MM-dd HH:mm"
        v-model="scope.row[item.arField]"
        type="datetime"
        :placeHolder="item.elementHint"
        @change="onChange"
      ></el-date-picker>
    </template>
  </div>
</template>
<script>
export default {
  name: 'tableCell',
  props: ['item', 'scope'],
  data() {
    return {}
  },
  methods: {
    //日期赋值
    onChange(value) {
      // this.value = new Date(value).getTime()
      // this.$emit('tdChange', this.value, this.col, this.index, this.row)
    }
  }
}
</script>
