<!--
动态表单组件
@author huanghe
-->
<template>
  <div class="formContainer" ref="formContainer">
    <ul class="formMain" ref="formMain">
      <slot name="avatar"></slot>
      <template v-for="(item, index) in formItems">
        <li
          class="formItem"
          ref="formItem"
          :style="dateWidth(item)"
          :class="{ formItemTextarea: (item.dataType === '02' || item.dataType === '32' || item.colNum === '24') && showErrorNo }"
          v-if="item.isShow === 'Y'"
          :domId="item.arField"
          :key="item.arField"
        >
          <arFormItem
            :ref="'arFormItem' + item.arField"
            :item="item"
            v-model="formData[item.arField]"
            :isError="item.isError"
            :errorText="item.errorText"
            :itemWidth="parentWidth"
            :showErrorNo="showErrorNo"
            :allData="allData"
            :formData="formData"
            @itemChange="(i, value) => itemChange(i, value, index)"
            @itemBlur="(i, value) => itemBlur(i, value, index)"
            @showBussnessDialog="param => $emit('showBussnessDialog', param)"
            @changeName="param => $emit('changeName', param)"
            :isAddingType="isAddingType"
            :billType="billType"
            :ALLisRead="ALLisRead"
            @listClick="param => $emit('listClick', param)"
            @deleteList="(param1, param2) => $emit('deleteList', param1, param2)"
            @changeAppId="param => $emit('changeAppId', param)"
            @changeOrgCode="param => $emit('changeOrgCode', param)"
            @deleteInput="param => $emit('deleteInput', param)"
            @dxTable1="param => $emit('dxTable1', param)"
            @dxTable="param => $emit('dxTable', param)"
            @handlePlan="(param1, param2) => $emit('handlePlan', param1, param2)"
            @updataFormData="param => $emit('updataFormData', param)"
            @changeBillMan="$emit('changeBillMan')"
            @changeTree="param => $emit('changeTree', param)"
            @presentTags="(param1, param2, param3) => $emit('presentTags', param1, param2, param3)"
            @regNumFloat="(param1, param2) => $emit('regNumFloat', param1, param2)"
            @pressPeople="$emit('pressPeople')"
            @openExternalLinks="param => $emit('openExternalLinks', param)"
            @changeSelect="param => $emit('changeSelect', param)"
            @changeExpEco="(param1, param2) => $emit('changeExpEco', param1, param2)"
            :dropdownData="dropdownData"
            :selectTreeData="selectTreeData"
            :businessManTreeData="businessManTreeData"
          />
          <span v-if="item.unit" class="unit">{{ item.unit }}</span>
        </li>
      </template>
    </ul>
    <!-- 树 -->
    <!-- <vTree
      v-model="treeDialogVisible"
      :title="treeDialogTitle"
      :allData="allData"
      :allTabs="allTabs"
      :tabId="tabId"
      :dialogData="dialogData"
      :eleCode="eleCode"
      :itemField="itemField"
      :checkFlag="checkFlag"
      :oldCheckNode="oldCheckNode"
      :showCheck="showCheck"
      :tabObjName="tabObjName"
      @treeFlag="handleDialog"
      ref="tree"
    ></vTree> -->
  </div>
</template>

<script>
import arForm from './arFormService'
import arFormItem from './arFormItem'
import { mapState } from 'vuex'

export default {
  name: 'arForm',
  props: {
    getItemsByUrl: {
      // 是否从通用请求获取数据
      type: Boolean,
      default: false
    },
    itemsSource: {
      // 表单数据
      type: Array,
      default: () => {
        return []
      }
    },
    dataSource: {
      // 表单数据
      type: Object,
      default: () => {
        return {}
      }
    },
    allData: {
      // 所有数据
      type: Object,
      default: () => {
        return {}
      }
    },
    formatter: {
      // 是否需要表单校验
      type: Boolean,
      default: true
    },
    billType: {
      type: String,
      default() {
        return ''
      }
    },
    isAddingType: {
      type: String,
      default() {
        return ''
      }
    },
    billId: String, // 单据ID
    billName: String, // 单据对应的后台名称
    cardStatus: String, // 卡片状态
    parentWidth: Number, // 自定义item的宽度
    showErrorNo: {
      // 是否要显示错误提示
      type: Boolean,
      default: true
    },
    tabObjName: String, // 视图code
    tabId: String, // 页签id
    viewId: String, // 视图id
    isDisabled: Boolean, // 是否可编辑-上传图片
    ALLisRead: Boolean,
    dropdownData: {
      type: Array,
      default() {
        return []
      }
    },
    selectTreeData: {
      type: Array,
      default() {
        return []
      }
    },
    businessManTreeData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  model: {
    prop: 'dataSource',
    event: 'change'
  },
  components: { arFormItem },
  data() {
    return {
      formItems: [], // 表单字段
      formData: {}, // 表单数据
      item: '', // 当前操作的item
      itemIndex: '', // 当前操作的item的下标
      treeDialogVisible: false, // 弹框树是否可见
      treeDialogTitle: '', // 弹框树title
      showCheck: false, // 是否显示多选的值
      checkFlag: false, // 是否开启多选
      oldCheckNode: [], // 选中的树节点 暂时无用
      treeName: {}, // 单选树接口参数dataelementCode
      userLikeName: '', // 使用人模糊搜索
      userData: [], // 使用人数据
      singleDialogVisible: false, // 表格弹框显示
      singleDialogTitle: '', // 表格弹框标题
      itemType: '', // 获取type类型，后期可能删除

      dialogData: {}, // 通用弹框的数据
      dialogShow: false, // 显示通用弹框
      dialogTitle: '', // 通用弹框的标题
      viewType: '', // 弹框类型，0是表单，1是可编辑表格，2是不可编辑表格，3个左树，右表
      dialogId: '', // 查询弹框模板id
      params: {}, // 查询的参数
      curDialogName: '', // 当前弹框的propertyName
      commonDialogData: [], // 弹框返回的数据
      eleCode: '', // 树弹框需要的code
      billBtnFlag: false, // 判断是表单顶部按钮点击的返回
      buttonFlag: false,
      resultType: 'a', //  处理结果方式（a：直接复制；b：再次查询后赋值）
      itemField: {}, // 正在操作的field
      oterData: [] // 通用弹框确认时带着其他区域的值
    }
  },
  computed: {
    ...mapState({
      selectedList: state => state.listData.selectedList
    }),
    // 选中的树节点
    selectedNode: {
      get: function () {
        let nodes = []
        if (this.item.type === 'tree') {
          const columnName = arForm.toCamelCase(this.item.columnName)
          const keyId = columnName + 'Id'
          const keyCode = columnName + 'Code'
          const keyName = columnName + 'Name'
          if (this.formData[keyName]) {
            const ids = this.formData[keyId].split(',')
            const codes = this.formData[keyCode].split(',')
            const names = this.formData[keyName].split(',')
            ids.forEach((id, index) => {
              nodes.push({
                id: id,
                code: codes[index],
                name: names[index]
              })
            })
          }
        }
        return nodes
      },
      set: function (value) {
        // this.value = value.join(',')
      }
    }
  },
  created() {
    this.formData = JSON.parse(JSON.stringify(this.dataSource))
  },
  methods: {
    // 初始化表单方法
    init() {
      if (this.getItemsByUrl) {
        arForm.getFormItems().then(res => {
          this.formItems = res
          const formData = {}
          this.formItems.forEach(item => {
            if (item.defaultValue) {
              formData[item.arField] = item.defaultValue
            }
          })
          this.formData = JSON.parse(JSON.stringify(formData))
        })
      } else {
        debugger
        this.formItems = JSON.parse(JSON.stringify(this.itemsSource))
        // this.formItems = zForm.formatFormItems(this.formItems)
        const formData = {}
        this.formItems.forEach(item => {
          if (item.defaultValue) {
            formData[item.arField] = item.defaultValue
          } else {
            formData[item.arField] = ''
          }
        })
        this.formData = JSON.parse(JSON.stringify(formData))
      }
    },
    // form的item发生变化
    itemChange(item, value, index, objName, dialogData) {
      this.item = item
      this.itemIndex = index
      if (item.dataType === '01' || item.dataType === '02' || item.dataType === '03' || item.dataType === '04' || item.dataType === '05') {
        this.$set(this.formData, item.arField, value)
      }
      if (item.dataType === '08' || item.dataType === '10') {
        if (value) {
          this.$set(this.formData, item.arField, new Date(value).getTime())
        } else {
          this.$set(this.formData, item.arField, '')
        }
      }
      if (item.dataType === '12' || item.dataType === '18') {
        this.$set(this.formData, item.arField, value)
      }
      if (item.dataType === '19' || item.dataType === '27' || item.dataType === '29') {
        this.$set(this.formData, item.arField, value)
      }
      this.$emit('itemChange', item, value, index, this.formData, this.tabObjName, objName, dialogData)
      const newItem = arForm.formatter(item, value, this.formData)
      this.$set(this.formItems, index, newItem)
      this.$refs['arFormItem' + item.arField][0].$forceUpdate()
    },
    // form的item失去焦点
    itemBlur(item, value, index, objName, dialogData) {
      if (item.dataType === '03') {
        this.$set(this.formData, item.arField, this.$moneyToDecimal(parseFloat((value + '').replace(/,/g, '')) / 1))
      }
      this.$emit('itemBlur', item, value, index, this.formData, this.tabObjName, objName, dialogData)
      const newItem = arForm.formatter(item, value, this.formData)
      this.$set(this.formItems, index, newItem)
      this.$refs['arFormItem' + item.arField][0].$forceUpdate()
    },
    // 设置double类型数据
    setDoubleValue(item, value) {
      let val = ['', '']
      if (value) {
        val = value.split(',')
      }
      this.formData[zForm.toCamelCase(item.columnName)] = value
      // this.formData[zForm.toCamelCase(item.columnName) + 'StartValue'] = val[0];
      // this.formData[zForm.toCamelCase(item.columnName) + 'EndValue'] = val[1];
    },
    // 直接校验整个form true表示校验通过，false校验不通过
    formatterForm() {
      return new Promise((resolve, reject) => {
        this.formItems = arForm.formatterAll(this.formItems, this.formData)
        let item = {}
        let isPasseCheck = true // 是否通过校验
        let errorText = ''
        for (let i = 0; i < this.formItems.length; i++) {
          if (this.formItems[i].isError) {
            isPasseCheck = false
            item = this.formItems[i]
            errorText = this.formItems[i].errorText
            break
          } else {
            isPasseCheck = true
          }
        }
        resolve({
          items: this.formItems,
          item: item,
          isPasseCheck: isPasseCheck,
          errorText: errorText
        })
      })
    },
    dateWidth(item) {
      let styleWidth = { width: '' }
      if (item.colNum === '12') {
        styleWidth.width = '50%'
      } else if (item.colNum === '8') {
        styleWidth.width = '32%'
      } else if (item.colNum === '24') {
        styleWidth.width = '100%'
      } else {
        styleWidth.width = '50%'
      }
      return styleWidth
    }
  },
  mounted() {
    arForm.initVue(this)
    this.init()
    const vm = this
    let that = this
    this.$nextTick(() => {
      // vm.common.getTextareaWidth()
      window.onresize = function windowResize() {
        // vm.common.getTextareaWidth()
        that.$forceUpdate()
      }
    })
    // const items = JSON.parse(JSON.stringify(this.itemsSource))
    //  this.formItems = zForm.formatFormItems(items)
    // const newData = JSON.parse(JSON.stringify(this.dataSource))
    // this.formData = Object.assign(this.formData, newData)
    // this.$emit('change', this.formData)
  },
  watch: {
    itemsSource: {
      handler: function (newVal, oldVal) {
        const items = JSON.parse(JSON.stringify(newVal))
        this.formItems = arForm.formatFormItems(items)
      },
      deep: true
    },
    dataSource: {
      handler: function (newVal, oldVal) {
        this.formData = JSON.parse(JSON.stringify(newVal))
      },
      deep: true
    },
    formItems: {
      handler: function (newVal, oldVal) {},
      deep: true
    }
  }
}
</script>

<style lang="scss" type="text/css" src="./arForm.scss" />
