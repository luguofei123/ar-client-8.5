<template>
  <div>
    <ux-grid
      :data="tableData"
      :height="tableHeight"
      border
      stripe
      ref="table"
      keep-source
      :edit-config="{ trigger: 'click', mode: 'cell', showIcon: false }"
      show-overflow
      show-header-overflow
      widthResize
      :show-summary="isShowSum"
      :summary-method="getSummaries"
    >
      <ux-table-column fixed="left" type="checkbox" header-align="center" align="center" width="50" v-if="isShowCheckbox"> </ux-table-column>
      <ux-table-column fixed="left" type="index" header-align="center" align="center" width="50" title="序号" v-if="isShowIndex"></ux-table-column>
      <template v-for="(item, index) in columnList">
        <tableColumn :key="index" :item="item" @tdChange="tdChange" :isEdit="isEdit"></tableColumn>
      </template>
      <ux-table-column fixed="right" header-align="center" align="center" title="操作" :width="operateWidth">
        <template>
          <div class="oparation" style="display: inline-block; white-space: nowrap">
            <span type="text">查看</span>
            <span type="text">编辑</span>
            <span type="text">编辑</span>
          </div>
        </template>
      </ux-table-column>
    </ux-grid>
  </div>
</template>

<script>
import tableColumn from './tableColumn.vue'
import { toThousandFix } from '../../commonUtils/utils/util'
export default {
  name: 'editTable',
  data() {
    return {
      operateWidth: 60, // 操作宽度自适应
      tableHeight: 200
    }
  },
  props: ['isShowCheckbox', 'isShowIndex', 'columnList', 'tableData', 'isEdit', 'isShowSum'],
  methods: {
    tdChange(obj) {
      this.$emit('tdChange', obj)
    },
    setTableHeight() {
      console.log(this.$refs.table.$el.getBoundingClientRect())
      console.log($(window).height())
      let h = $(window).height() - this.$refs.table.$el.getBoundingClientRect().top - 65
      // if(h>300){
      //    this.tableHeight =
      // }
      this.tableHeight = h
    },
    // 表格操作列根据按钮，自适应显示宽度
    SetOperateWidth() {
      let arr = []
      this.operateWidth = 60
      setTimeout(() => {
        let widthArr = $('.col--last').find('.oparation')
        widthArr.each((index, item) => {
          arr.push($(item)[0].offsetWidth)
        })
        if (Math.max(...arr) + 20 < 60) {
          this.operateWidth = 60
        } else {
          this.operateWidth = Math.max(...arr) + 22
        }
        this.$refs.table.reloadData(this.tableData)
      }, 100)
    },
    // 获取合计
    getSummaries(param) {
      let vm = this
      debugger
      const { columns, data } = param
      const sums = []
      let itemData = {}
      let dataType = ''
      let num = 0
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 1) {
          sums[index] = ''
          return
        }
        itemData = vm.columnList.find(i => i.dataItem === column.property)
        if (!itemData) {
          sums[index + num] = ''
          return
        }
        dataType = itemData['dataType']
        const values = data.map(item => item[itemData.dataItem])
        if (!values.every(value => isNaN(value))) {
          sums[index + num] = values.reduce((prev, curr) => {
            const value = parseFloat(curr)
            if (!isNaN(value)) {
              return parseFloat(prev) + parseFloat(curr)
            } else {
              return parseFloat(prev)
            }
          }, 0)
          if (dataType === '03') {
            sums[index + num] = toThousandFix(sums[index + num])
          } else {
            sums[index + num] = ''
          }
        }
      })
      return [sums]
    }
  },
  mounted() {},
  watch: {
    tableData: {
      handler(newV, oldV) {
        this.$nextTick(() => {
          this.SetOperateWidth()
          this.setTableHeight()
        })
      },
      deep: true
    }
  },
  components: {
    tableColumn
  }
}
</script>
<style lang="scss" src="./arTable.scss"></style>
