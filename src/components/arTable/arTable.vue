<template>
  <div class="tableBox">
    <ux-grid
      :data="tableData"
      :max-height="tableHeight"
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
      <ux-table-column fixed="left" type="index" header-align="center" align="center" width="50" title="序号" v-if="isShowIndex">
        <template v-slot:header="{ column }" v-if="isSettingColumn">
          <span title="设置表头" @click="$emit('settingColumn', column)">
            <i class="el-icon-s-operation"></i>
          </span>
        </template>
      </ux-table-column>
      <template v-for="(item, index) in columnList">
        <tableColumn :key="index" :item="item" @tdChange="tdChange" :isEdit="isEdit" :sortable="sortable"></tableColumn>
      </template>
      <ux-table-column fixed="right" header-align="center" align="left" title="操作" :width="operateWidth">
        <template slot-scope="scope">
          <div class="oparation" style="display: inline-block; white-space: nowrap">
            <!-- 业务办理 -->
            <template v-if="tabType === 'HOME_BG'">
              <optHomebg :scope="scope" :homeMenu="homeMenu"></optHomebg>
            </template>
            <template v-if="tabType === 'HOME_APPLY' || tabType === 'HOME_LOAN' || tabType === 'HOME_EXP'">
              <optHomebgex :scope="scope" :homeMenu="homeMenu" :tabType="tabType"></optHomebgex>
            </template>
          </div>
        </template>
      </ux-table-column>
    </ux-grid>
  </div>
</template>

<script>
import tableColumn from './tableColumn.vue'
import { toThousandFix } from '../../commonUtils/utils/util'
import optHomebg from './operationButton/optHomebg.vue'
import optHomebgex from './operationButton/optHomebgex.vue'
export default {
  name: 'editTable',
  data() {
    return {
      operateWidth: 60, // 操作宽度自适应
      tableHeight: 200
    }
  },
  props: ['isShowCheckbox', 'isShowIndex', 'isSettingColumn', 'columnList', 'tableData', 'isEdit', 'isShowSum', 'sortable', 'tabType', 'homeMenu'],
  methods: {
    tdChange(obj) {
      this.$emit('tdChange', obj)
    },
    setTableHeight() {
      console.log(this.$refs.table.$el.getBoundingClientRect())
      console.log($(window).height())
      let h = $(window).height() - this.$refs.table.$el.getBoundingClientRect().top
      if (h > 320) {
        this.tableHeight = 310
      } else {
        this.tableHeight = h
      }
      // 再次计算表格高度，重新定位分页组件的位置
      setTimeout(() => {
        let h1 = $('.tableBox').height()
        let hTable = $('.tableBox').find('.singleTable').height()
        $('.tableBox').css('paddingBottom', hTable - h1)
      })
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
    tableColumn,
    optHomebg,
    optHomebgex
  }
}
</script>
<style lang="scss" src="./arTable.scss"></style>
