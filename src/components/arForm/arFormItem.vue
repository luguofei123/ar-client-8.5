<!--
动态表单组件
@author huanghe
-->
<template>
  <div class="formItemWapper">
    <span class="formItemLabel">
      <el-popover placement="top" trigger="hover" class="label" :disabled="item.infoName.length < 7">
        <span> {{ item.infoName }} </span>
        <span slot="reference"><i class="must" v-if="item.isNotEmpty === 'Y'">*</i> {{ item.infoName }}</span>
      </el-popover>
      <span class="sign"> </span>
    </span>
    <span :class="['formItemValue arForm', isError ? 'is-error' : '']" :style="dateWidth(item)">
      <!--    <el-popover placement="top" trigger="hover" class="value" :disabled="isShowTips(value, item)">-->
      <el-tooltip effect="dark" placement="top" :disabled="isShowTips(value, item)">
        <template slot="content" v-if="value">
          <template v-if="item.dataType === '01' || item.dataType === '02' || item.dataType === '03' || item.dataType === '04' || item.dataType === '05'">
            {{ value }}
          </template>
          <template v-else-if="item.dataType === '08'">{{ moment(parseInt(value)).format('YYYY-MM-DD') }} </template>
          <template v-else-if="item.dataType === '12'">{{ value | listGetName(item, billType) }} </template>
          <template v-else-if="item.dataType === '19' || item.dataType === '27'">{{ value | listGetName(item, billType, '', '', transObj) }} </template>
          <template v-else-if="item.dataType === '21'">
            <span v-if="item.infoId !== 'BUSINESS_MAN'">{{ value | listGetName(item) }}</span>
          </template>
        </template>
        <template>
          <!-- 单行文本 -->
          <template v-if="item.dataType === '01'">
            <el-input
              v-model="value"
              :placeholder="item.elementHint"
              :disabled="isDisabled()"
              :class="isDisabled() ? 'disabled' : ''"
              @input="itemChange(value)"
              @blur="itemBlur(value)"
            ></el-input>
          </template>
          <!-- 多行文本 -->
          <template v-else-if="item.dataType === '02'">
            <el-input
              v-model="value"
              type="textarea"
              autosize
              :placeholder="item.elementHint"
              :disabled="isDisabled()"
              :class="isDisabled() ? 'disabled' : ''"
              @input="itemChange(value)"
              @blur="itemBlur(value)"
            ></el-input>
          </template>
          <!-- 各种金额 -->
          <template v-else-if="item.dataType === '03'">
            <el-input
              v-model="value"
              :placeholder="item.elementHint"
              :disabled="isDisabled()"
              :class="[isDisabled() ? 'disabled' : '', 'specialTexare']"
              @blur="itemBlur(value)"
            ></el-input>
            <!-- <a-input-number
              :disabled="isDisabled()"
              :class="isDisabled() ? 'disabled' : ''"
              :placeholder="item.elementHint"
              :formatter="val => formatterNumReg(val).formatterReg"
              :parser="val => formatterNumReg(val).parserReg"
              :precision="formatterNumReg().precision"
              :step="formatterNumReg().step"
              :value="value"
              @change="itemChange($event)"
              @blur="itemBlur(value)"
            /> -->
          </template>
          <!-- 整数 -->
          <template v-else-if="item.dataType === '04'">
            <el-input
              v-model="value"
              :placeholder="item.elementHint"
              :disabled="isDisabled()"
              :class="isDisabled() ? 'disabled' : ''"
              @input="itemChange(value)"
              @keyup.native="$emit('pressPeople')"
              @blur="itemBlur(value)"
            ></el-input>
          </template>
          <!-- 浮点数类型 -->
          <template v-else-if="item.dataType === '05'">
            <el-input
              v-model="value"
              :placeholder="item.elementHint"
              :disabled="isDisabled()"
              :class="isDisabled() ? 'disabled' : ''"
              @keyup.native="$emit('regNumFloat', $event, item.arField)"
              @input="itemChange(value)"
              @blur="itemBlur(value)"
            ></el-input>
          </template>
          <!-- 百分比 -->
          <template v-else-if="item.dataType === '06'">
            <el-input
              v-model="value"
              :placeholder="item.elementHint"
              :disabled="isDisabled()"
              :class="isDisabled() ? 'disabled' : ''"
              @input="itemChange(value)"
            ></el-input>
          </template>
          <!-- 汇率 -->
          <template v-else-if="item.dataType === '07'">
            <el-input
              v-model="value"
              :placeholder="item.elementHint"
              :disabled="isDisabled()"
              :class="isDisabled() ? 'disabled' : ''"
              @input="itemChange(value)"
            ></el-input>
          </template>
          <!-- 日期 -->
          <template v-else-if="item.dataType === '08'">
            <el-date-picker
              format="yyyy-MM-dd"
              style="width: 100%"
              type="date"
              v-model="value"
              :disabled="isDisabled()"
              :placeholder="getPlaceholder(item)"
              @change="itemChange(value)"
            >
            </el-date-picker>
          </template>
          <!-- 日期区间 -->
          <template v-else-if="item.dataType === '09'">
            <el-date-picker
              format="yyyy-MM-dd"
              style="width: 100%"
              type="daterange"
              v-model="value"
              :disabled="isDisabled()"
              :placeholder="getPlaceholder(item)"
              @change="itemChange(value)"
            >
            </el-date-picker>
          </template>
          <!-- 时间 -->
          <template v-else-if="item.dataType === '10'">
            <el-date-picker
              format="yyyy-MM-dd HH:mm"
              style="width: 100%"
              type="datetime"
              v-model="value"
              :disabled="isDisabled()"
              :placeholder="getPlaceholder(item)"
              @change="itemChange(value)"
            >
            </el-date-picker>
          </template>
          <!-- 时间区间 -->
          <template v-else-if="item.dataType === '11'">
            <el-date-picker
              format="yyyy-MM-dd HH:mm"
              style="width: 100%"
              type="daterange"
              v-model="value"
              :disabled="isDisabled()"
              :placeholder="getPlaceholder(item)"
              @change="itemChange(value)"
            >
            </el-date-picker>
          </template>
          <!-- 单选 -->
          <template v-else-if="item.dataType === '12'">
            <!-- 附件密级 -->
            <el-select
              v-model="formData[item.arField]"
              v-if="item.infoId === 'SECURITY_LEVEL'"
              :placeholder="item.elementHint"
              clearable
              style="width: 100%"
              @change="changeLevel"
              :disabled="isDisabled()"
            >
              <el-option v-for="ele in item.data.refListData" :key="ele.id" :label="ele.sourceName" :value="ele.sourceCode"> </el-option>
            </el-select>
            <!-- 报销人（借款人）新组件 -->
            <!-- <app-id-card
              v-if="item.infoId === 'APP_ID'"
              :selectDisabled="isDisabled()"
              v-model="value"
              :ref="item.arField"
              :formInput="value"
              :appName="formData['appName']"
              :itemInfo="item"
              :disabled="isDisabled()"
              @changeAppId="param => $emit('changeAppId', param)"
            ></app-id-card> -->
            <!-- 团长级别 -->
            <!-- <generalSelectComponent
              v-if="item.infoId === 'SERVICE_GRADE'"
              :disabled="item.isRead === 'Y'"
              :selectId="item.infoId"
              :ref="item.arField"
              :key="item.codeStr"
              :billType="billType"
              :areaStr="'baseArea'"
              selectStyle="width: 100%;"
              :infoId="item.infoId"
              :tplData="item"
              :selectDisabled="isDisabled() || diffWay"
              :areaInfoCode="item.areaInfoCode"
              :formSelected="formData[item.arField]"
              v-model="formData[item.arField]"
              :selectMeeting="selectMeeting"
              @updataFormData="param => $emit('updataFormData', param)"
              :billId="billId"
              :fromBasebillType="billType"
            >
            </generalSelectComponent> -->
            <!-- 其他 -->
            <!-- <generalSelectComponent
              v-if="item.infoId !== 'SERVICE_GRADE' && item.infoId !== 'SECURITY_LEVEL' && item.infoId !== 'APP_ID'"
              :disabled="item.isRead === 'Y'"
              :selectId="item.infoId"
              :ref="item.arField"
              :billType="billType"
              :key="item.codeStr"
              :refData="item.data"
              :areaStr="'baseArea'"
              :infoId="item.infoId"
              :tplData="item"
              @changeBillMan="$emit('changeBillMan')"
              :selectDisabled="isDisabled()"
              :areaInfoCode="item.areaInfoCode"
              :formSelected="formData[item.arField]"
              v-model="formData[item.arField]"
              :selectMeeting="selectMeeting"
              @updataFormData="param => $emit('updataFormData', param)"
              :billId="billId"
              :fromBasebillType="billType"
              :isStandardAffect="item.isStandardAffect"
              @change="itemChange(formData[item.arField])"
            >
            </generalSelectComponent> -->
          </template>
          <!-- 多选 -->
          <template v-else-if="item.dataType === '13'">
            <el-select
              :disabled="isDisabled()"
              :class="[isDisabled() ? 'disable-multiple-select' : 'multiple-select']"
              v-model="formData[item.arField]"
              multiple
              @change="itemChange(value)"
              :placeholder="'请选择' + item.infoName"
              style="width: 100%"
            >
              <el-option v-for="item1 in item.data.refListData" :key="item1.sourceCode" :label="item1.sourceName" :value="item1.sourceCode"> </el-option>
            </el-select>
          </template>
          <!-- 树引用 -->
          <template v-else-if="item.dataType === '14'">
            <!-- <el-cascader
              filterable
              :disabled="isDisabled()"
              :options="cascaderOptionData"
              :props="{ checkStrictly: true }"
              v-model="value"
              @visible-change="itemChange(value)"
            >
            </el-cascader> -->
          </template>
          <!-- 单选列表 -->
          <template v-else-if="item.dataType === '15'">
            <!-- 等于预算单号的时候走dxtable1  其他走dxtable -->
            <el-input autosize :disabled="isDisabled()" :placeholder="item.elementHint" v-if="item.infoId === 'APPLY_BILLNO'" v-model="formData[item.arField]">
              <el-button :disabled="isDisabled()" size="small" slot="append"
                ><span style="margin-right: 10px" v-show="formData[item.arField]" @click="$emit('deleteInput', item)">x</span
                ><i @click="$emit('dxTable1', item)" class="cursor el-icon-more"></i
              ></el-button>
            </el-input>
            <!-- 会议计划/培训计划/在华国际会议/出国申请 -->
            <div v-else>
              <el-input
                autosize
                :placeholder="item.elementHint"
                v-model="value"
                @focus.stop="$emit('handlePlan', value, item)"
                :class="
                  item.infoId === 'CULTIVATE_PLAN' || item.infoId === 'MEETING_PLAN' || item.infoId === 'MEETING_GLOBAL' || item.infoId === 'GOABROAD_PLAN'
                    ? 'plan-input'
                    : ''
                "
              >
              </el-input>
              <div :disabled="isDisabled()" style="position: absolute; top: -3px; right: 8px">
                <span style="margin-right: 10px; cursor: pointer" v-show="formData[item.arField]" @click="$emit('deleteInput', item)">x</span
                ><i @click="$emit('dxTable', item)" class="cursor el-icon-more"></i>
              </div>
            </div>
          </template>
          <!-- 多选选列表 -->
          <template v-else-if="item.dataType === '16'">
            <el-input
              autosize
              :disabled="isDisabled()"
              @change="itemChange($event.target.value)"
              @blur="itemBlur($event.target.value)"
              :placeholder="item.elementHint"
              v-model="value"
            >
            </el-input>
          </template>
          <!-- 单选框 -->
          <template v-else-if="item.dataType === '17'">
            <el-radio-group
              v-model="value"
              :disabled="isDisabled()"
              @change="
                e => {
                  itemChange(e.target.value)
                  itemBlur(e.target.value)
                }
              "
            >
              <el-radio v-for="radio in item.assetCommons" :key="radio.id" :label="radio.code">{{ radio.name }}</el-radio>
            </el-radio-group>
          </template>
          <!-- 复选框 -->
          <template v-else-if="item.dataType === '18'">
            <el-switch active-value="1" inactive-value="0" v-model="value" @change="itemChange(value)"></el-switch>
          </template>
          <!-- 区划信息(19国内 27全球) -->
          <template v-else-if="item.dataType === '19' || item.dataType === '27'">
            <!-- <el-cascader
              filterable
              :ref="item.arField"
              :disabled="isDisabled()"
              :options="cascaderOptionData"
              v-model="value"
              :props="{ checkStrictly: billType.includes('EXP_INT') || billType.includes('APPLY_INT') ? false : true }"
              @change="
                value => {
                  if (value && value.length > 0) {
                    itemChange(value)
                  } else {
                    // itemChange([])
                  }
                }
              "
            >
            </el-cascader> -->
          </template>
          <!-- 树形下拉 21-->
          <template v-else-if="item.dataType === '21'">
            <!-- 出差人 -->
            <!-- <new-tree-select
              v-if="item.infoId === 'BUSINESS_MAN'"
              :ALLisRead="isDisabled()"
              :item="item"
              :normalizer="normalizerForBusiness"
              :businessManTreeData="businessManTreeData"
              multiple="false"
              :value="formData[item.arField]"
              :scope="{}"
              noChildrenText="此部门下无人员信息"
              noResultsText="暂无数据"
              @changeTree="param => $emit('changeTree', param)"
              @deChangeTree="param => $emit('changeTree', param)"
            /> -->
            <!-- 政府经济分类、部门经济分类 -->
            <!-- <expecoCodeTree
              v-else-if="item.infoId === 'EXPECO_CODE' || item.infoId === 'GOV_EXPECO_CODE'"
              v-model="value"
              :disabled="isDisabled()"
              :tplData="item"
              :itemData="formData"
              placeholder="请选择"
              expecpArea="BASE"
              @changeExpEco="param => $emit('changeExpEco', param, item)"
            ></expecoCodeTree> -->
            <!-- <el-select-tree
              v-else
              :baseData="formData"
              v-model="value"
              :disabled="isDisabled()"
              :key="item.arField"
              :tplData="item"
              :billType="billType"
              :ref="item.infoId"
              :isRead="true"
              :isSearch="true"
              :isBaseOrSettlement="'2'"
              @changeOrgCode="param => $emit('changeOrgCode', param)"
              clearable
              style="width: 100%"
              placeholder="请选择"
            >
            </el-select-tree> -->
          </template>
          <!-- 多选树形下拉 22 -->
          <template v-else-if="item.dataType === '22'">
            <!-- <TreeSelect
              class="busnessMan-tree"
              v-if="item.infoId !== 'BUSINESS_MAN'"
              :disabled="isDisabled()"
              :options="selectTreeData"
              v-model="formData[item.arField]"
              :normalizer="normalizer"
              :clearOnSelect="true"
              :multiple="true"
              @input="$emit('changeTree')"
              :placeholder="item.elementHint"
              noChildrenText="此部门下无人员信息"
              noResultsText="暂无数据"
              :disable-branch-nodes="true"
            /> -->
            <!-- <new-tree-select
              v-if="item.infoId === 'BUSINESS_MAN'"
              :ALLisRead="isDisabled()"
              :item="item"
              :normalizer="normalizerForBusiness"
              :businessManTreeData="businessManTreeData"
              multiple="true"
              :value="formData[item.arField]"
              :scope="{}"
              noChildrenText="此部门下无人员信息"
              noResultsText="暂无数据"
              @changeTree="param => $emit('changeTree', param)"
              @deChangeTree="param => $emit('changeTree', param)"
            /> -->
          </template>
          <template v-else-if="item.dataType === '23' || item.dataType === '24'">
            <!-- 列表引用新组件 -->
            <div class="huiqian">
              <el-table :class="{ 'is-read': item.isRead === 'Y' || ALLisRead === 'Y' }" :data="item.refListData" style="flex: 1" class="list">
                <el-table-column prop="businessRefName" label="businessRefName">
                  <template slot-scope="scope">
                    <div class="cell1">
                      <span style="cursor: pointer; color: #42a5f5" @click="jumpUrl(scope.row.businessRefUrl, $event)">{{
                        scope.row[scope.column.property]
                      }}</span>
                      <i style="cursor: pointer" v-show="ALLisRead === 'N'" @click="$emit('deleteList', scope, item)">x</i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="moreBtn" @click="$emit('listClick', item)">
                <i class="el-icon-more"></i>
              </div>
            </div>
          </template>
          <!-- 人员引用库 人员左树右表 26 -->
          <template v-else-if="item.dataType === '26'">
            <!-- <new-tree-and-table
              :selectDisabled="isDisabled()"
              :formInput="value"
              :itemInfo="item"
              v-model="value"
              @showBussnessDialog="param => $emit('showBussnessDialog', param)"
              :billType="billType"
              @changeName="param => $emit('changeName', param)"
            ></new-tree-and-table> -->
          </template>
          <template v-else-if="item.dataType === '29'">
            <!-- <selectAndFill
              v-model="value"
              :itemInfo="item"
              :infoId="item.infoId"
              :itemKey="item.arField"
              :elementHint="item.elementHint"
              :areaStr="'baseArea'"
              :selectDisabled="isDisabled()"
              :formInput="value"
              @changeSelect="
                param => {
                  $emit('changeSelect', param)
                  itemChange(param.val)
                  itemBlur(param.val)
                }
              "
            >
            </selectAndFill> -->
          </template>
          <!-- 多选级联 32-->
          <template v-else-if="item.dataType === '32'">
            <!-- <ElCascaderMuti
              :ref="`muti${item.arField}`"
              :disabled="isDisabled()"
              :options="cascaderOptionData"
              :props="{ multiple: true, checkStrictly: true, emitPath: false }"
              collapse-tags
              filterable
              v-model="formData[item.arField]"
              popper-class="mutiCascader"
              @presentTags="
                $event => {
                  $emit('presentTags', item, $event, value)
                }
              "
            >
            </ElCascaderMuti> -->
          </template>
          <!-- 外部链接iframe 33 -->
          <template v-else-if="item.dataType === '33'">
            <div>
              <el-input autosize :disabled="true" :placeholder="item.elementHint" v-model="formData[item.arField]"> </el-input>
              <div style="position: absolute; top: -3px; right: 8px">
                <i @click="$emit('openExternalLinks', item)" class="cursor el-icon-more"></i>
              </div>
            </div>
          </template>
        </template>
      </el-tooltip>
      <!--      </el-popover>-->
      <!-- <span
        class="errorText"
        :style="{ top: item.type === 'textarea' && item.height ? item.height - 1 + 'px' : '31px' }"
        v-if="showErrorNo && isError === true"
      >
        {{ errorText }}
      </span> -->
    </span>
    <el-popover placement="top" trigger="hover" class="label" v-if="item.ruleTip">
      <span>{{ item.ruleTip }}</span>
      <span class="help iconfont icon-icon-help" slot="reference"></span>
    </el-popover>
  </div>
</template>

<script>
import moment from 'moment'
import arForm from './arFormService'
// import newTreeAndTable from '../newTreeAndTable'
// import selectTree from '../treeSelect.vue'
// import appIdCard from '../appIdCard' // 报销人组件
// import generalSelectComponent from '../generalSelectComponent.vue'
// import newTreeSelect from '../newTreeSelect.vue'
// import selectAndFill from '../selectAndFill'
// import ElCascaderMuti from '../../../../multi-cascader/packages/cascader' // 多选值级组件
// import '@riophae/vue-treeselect/dist/vue-treeselect.css'
// import TreeSelect from '@riophae/vue-treeselect'
// import expecoCodeTree from '../expecoCodeTree.vue' // 部门经济分类，政府经济分类组件
export default {
  name: 'arFormItem',
  props: {
    item: {
      // form表单的每项item
      type: Object
    },
    value: [String, Number, Array], // item数据
    itemWidth: Number,
    showErrorNo: {
      // 是否要显示错误提示
      type: Boolean,
      default: true
    },
    ALLisRead: Boolean,
    isError: Boolean,
    errorText: String,
    formData: {
      // 完整的表单数据
      type: Object
    },
    allData: {
      // 详情数据
      type: Object
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
    prop: 'value',
    event: 'change'
  },
  // components: { vMultiTree },
  data() {
    return {
      multiTreeStatus: false, // 多选树下拉状态,true展开，false折叠
      isClick: false, // false时不可点击, 可以手输的时候取消input的点击事件
      multiTreeIcon: false, // 多选树展开按钮是否显示
      yearDateValue: '', // 年度选择
      completeData: [], // 提示下拉（textPlus类型）
      cascaderOptionData: [], // 地点数据
      diffWay: false, // 组团方式不为参团时的状态
      transObj: {},
      normalizer(node) {
        if (!node.sonList) {
          delete node.sonList
        }
        return {
          id: node.sourceCode,
          label: node.sourceName,
          children: node.sonList
        }
      },
      normalizerForBusiness(node) {
        return {
          id: node.sourceCode,
          label: node.sourceName,
          children: node.sonList
        }
      }
    }
  },
  components: {
    // 'new-tree-and-table': newTreeAndTable,
    // 'el-select-tree': selectTree,
    // 'app-id-card': appIdCard,
    // generalSelectComponent,
    // ElCascaderMuti,
    // 'new-tree-select': newTreeSelect,
    // TreeSelect,
    // selectAndFill,
    // expecoCodeTree
  },
  computed: {
    // 范围类型的输入框
    inputGroupValue: {
      get: function () {
        let valArray = []
        if (this.value) {
          valArray = this.value.split(',')
        }
        return valArray
      },
      set: function (value) {
        // this.value = value.join(',')
      }
    },
    // 下拉列表默认值
    listValue: {
      get: function () {
        let val
        if (this.value == null || this.value === '') {
          val = undefined
        } else {
          if (this.item.multiChoice === '1') {
            val = this.value.split(',')
          } else {
            val = this.value
          }
        }
        return val
      },
      set: function (value) {
        // this.value = value.join(',')
      }
    },
    // 开关值
    swtichValue: {
      get: function () {
        let val
        if (this.value == null || this.value === '') {
          val = undefined
        } else {
          if (this.value === '1') {
            val = true
          } else {
            val = false
          }
        }
        return val
      },
      set: function (value) {
        // this.value = value.join(',')
      }
    },
    // 日期类型
    dateValue: {
      get: function () {
        let date
        if (this.item.extent === '1') {
          date = arForm.formatDate('rangePicker', this.value, this.item.type, this.item.dateFormat)
        } else {
          date = arForm.formatDate('datePicker', this.value, this.item.type, this.item.dateFormat)
        }
        return date
      },
      set: function (value) {
        // this.value = value.join(',')
      }
    }
  },
  created() {
    this.initItem(this.item)
    if (this.item.dataType === '19' || this.item.dataType === '27' || this.item.dataType === '32' || this.item.dataType === '14') {
      if (this.billType.includes('INT_')) {
        this.cascaderOptionData = JSON.parse(localStorage.getItem('fullCountryData'))
      } else {
        this.cascaderOptionData = JSON.parse(localStorage.getItem('fullAreaData'))
      }
      this.transObj[this.item.infoId] = this.transExpData(this.cascaderOptionData, 'cascader')
    }
  },
  methods: {
    transExpData(data, code) {
      let transData = []
      let newItem = {}

      function go(data) {
        if (!data) return []
        for (let item of data) {
          if (code === 'cascader') {
            let { label, value, children } = item
            newItem = {
              label,
              value
            }
            transData.push(newItem)
            if (children) {
              go(children)
            }
          } else if (code === 'business') {
            let { sourceCode, sourceName, sonList } = item
            newItem = {
              sourceCode,
              sourceName
            }
            transData.push(newItem)
            if (sonList) {
              go(sonList)
            }
          } else {
            let { expenseType, expenseTypeName, scanRegulationsEnabled, sonList } = item
            newItem = {
              expenseType,
              expenseTypeName,
              scanRegulationsEnabled
            }
            transData.push(newItem)
            if (sonList) {
              go(sonList)
            }
          }
        }
      }

      go(data)
      return transData
    },
    // 初始化item
    moment,
    initItem(item) {
      // 判断是否可手填，1是可手填
      if (item.editType === '0') {
        this.isClick = false
      } else if (item.editType === '1') {
        this.isClick = true
      }
    },
    // item是否禁用
    isDisabled() {
      let disabled = false
      if (this.item.isRead === 'Y' || this.ALLisRead === 'Y') {
        disabled = true
      }
      return disabled
    },
    // 是否有提示
    isShowTips(value, item) {
      let disabled = false
      if (!value) {
        disabled = true
      }
      if (item.infoId === 'EXPECO_CODE' || item.infoId === 'GOV_EXPECO_CODE') {
        return true
      }
      if (
        item.infoId === 'APP_ID' ||
        item.infoId === 'ORG_CODE' ||
        item.dataType === '03' ||
        item.dataType === '04' ||
        item.dataType === '13' ||
        item.dataType === '15' ||
        item.dataType === '18' ||
        item.dataType === '22' ||
        item.dataType === '26' ||
        item.dataType === '29' ||
        item.dataType === '32' ||
        item.dataType === '33'
      ) {
        disabled = true
      }
      // 文本输入超过长度超过26个的时候显示tips
      if (item.dataType === '01' && value && value.length < 26) {
        disabled = true
      }
      if (Array.isArray(value) && value.length === 0) {
        disabled = true
      }
      return disabled
    },
    // form的item发生变化
    itemChange(value, ttt) {
      this.$emit('itemChange', this.item, value)
    },
    // formItem 失去焦点
    itemBlur(value) {
      this.$emit('itemBlur', this.item, value)
    },
    // 数字类型格式输入设置，正则
    formatterNumReg(value) {
      return this.common.formatInputValue(this.item.type, value, this.item.negative)
    },
    // 计算number类型最大值
    getNumberMax(maxLength) {
      if (maxLength !== null && maxLength !== undefined && maxLength !== '') {
        return Math.pow(10, Number(maxLength)) - 1
      }
    },
    // 获取输入框（选择框等）提示语
    getPlaceholder(item) {
      let placeholder = null
      if (item.placeholder) {
        placeholder = item.placeholder
      } else {
        if (item.edit === '1') {
          if (
            item.type === 'text' ||
            item.type === 'mob' ||
            item.type === 'citId' ||
            item.type === 'textarea' ||
            item.type === 'int' ||
            item.type === 'money' ||
            item.type === 'float' ||
            item.type === 'percent'
          ) {
            placeholder = `请输入${item.title}`
          } else {
            placeholder = `请选择${item.title}`
          }
        } else {
          placeholder = ''
        }
      }
      return placeholder
    },
    // form宽度
    dateWidth(item) {
      let styleWidth = { width: 'calc(100% - 130px)' }
      // if (item.colNum === '8') {
      //   styleWidth.width = parseInt(item.colNum) * 32 + 'px'
      // }
      // if (item.colNum === '12') {
      //   styleWidth.width = parseInt(item.colNum) * 32 + 'px'
      // }
      // // if (item.colNum === '24') {
      // //   styleWidth.width = '100%'
      // // }
      // if (!item.colNum) {
      //   styleWidth.width = 12 * 32 + 'px'
      // }
      return styleWidth
    },
    // 下拉搜索
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    inputForceUp(value, item) {
      this.$set(this.formData, item.arField, value)
      this.$forceUpdate()
    },
    // 整数
    regNum(e) {
      let boolean = new RegExp('^[1-9][0-9]*$').test(e.target.value)
      if (!boolean) {
        e.target.value = ''
      }
    },
    // 浮点
    // /^\d+\.\d\d$/.test(a)
    regFloat(e) {
      let boolean = new RegExp('^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^([^0][0-9]+|0)$').test(e.target.value)
      if (!boolean) {
        e.target.value = ''
      }
    }
  },
  watch: {
    item: {
      handler(newVal) {
        this.initItem(this.item)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.formItemValue.is-error {
  .el-input__inner,
  .el-textarea__inner,
  .ant-input {
    border-bottom: 1px solid red !important;
  }
}
// 单选列表
.huiqian .el-table .cell {
  padding-left: 8px;
}
</style>
