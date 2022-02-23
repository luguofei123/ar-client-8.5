<!--
 * @Author: luguofei
 * @LastEditors: Please set LastEditors
 * @Description: 数据源设置界面
 * @FilePath: /ar-client-8.30/src/views/fin/modules/dataSource/dataSource.vue
-->
<template>
  <div class="boxShadow dataSourceBox">
    <div class="dataSource common-listfin workspace" style="margin-top: 0; padding: 0 16px">
      <!-- 页面顶部信息 -->
      <div>
        <div class="Information_box">
          <div style="display: flex; align-items: center"></div>
          <div style="display: flex; align-items: center" v-if="!(curentIndex === 1)">
            <el-button type="primary" @click="newData()">新增</el-button>
            <el-button type="default" @click="uploadfl()">保存</el-button>
            <el-button type="default" @click="delData()">删除</el-button>
          </div>
        </div>
      </div>
      <div id="dataSource">
        <el-row>
          <!-- 左侧信息树，物理表，视图，接口，值集 -->
          <el-col :span="4" style="border: 1px solid #bbb; min-height: 535px; border-left: 0; border-bottom: 0">
            <el-collapse v-model="activeNames" accordion @change="upparentId" style="border: 0">
              <el-collapse-item title="物理表" name="1" v-show="true">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText1"> </el-input>
                <el-tree
                  :data="pardata1"
                  highlight-current
                  :props="defaultProps"
                  @node-click="data => handleNodeClick(data, 1)"
                  default-expand-all
                  :filter-node-method="filterNode"
                  ref="tree1"
                  style="max-height: 350px; overflow: auto"
                  node-key="id"
                  :render-content="renderContent"
                >
                </el-tree>
              </el-collapse-item>
              <el-collapse-item title="视图" name="2" v-show="true">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText2"> </el-input>
                <el-tree
                  :data="pardata2"
                  highlight-current
                  :props="defaultProps"
                  @node-click="data => handleNodeClick(data, 2)"
                  default-expand-all
                  :filter-node-method="filterNode"
                  ref="tree2"
                  style="max-height: 350px; overflow: auto"
                  node-key="id"
                  :render-content="renderContent"
                ></el-tree>
              </el-collapse-item>
              <el-collapse-item title="接口" name="3" v-show="true">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText3"> </el-input>
                <el-tree
                  :data="pardata3"
                  highlight-current
                  :props="defaultProps"
                  @node-click="data => handleNodeClick(data, 3)"
                  default-expand-all
                  :filter-node-method="filterNode"
                  ref="tree3"
                  style="max-height: 350px; overflow: auto"
                  node-key="id"
                  :render-content="renderContent"
                ></el-tree>
              </el-collapse-item>
              <el-collapse-item title="值集" name="4">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText4"> </el-input>
                <el-tree
                  :data="pardata4"
                  highlight-current
                  :props="defaultProps"
                  @node-click="data => handleNodeClick(data, 4)"
                  default-expand-all
                  :filter-node-method="filterNode"
                  ref="tree4"
                  style="max-height: 350px; overflow: auto"
                  node-key="id"
                  :render-content="renderContent"
                ></el-tree>
              </el-collapse-item>
            </el-collapse>
          </el-col>
          <!-- 右侧信息及表格数据 -->
          <el-col :span="20">
            <el-form
              label-width="120px"
              :model="form"
              style="width: 100%; min-height: 90px; border-bottom: 1px solid #c1c1c1; display: flex; flex-wrap: wrap; padding: 0 10px"
            >
              <el-col :span="12">
                <el-form-item label="分类">
                  <el-select v-model="form.parentId" placeholder="请选择活动区域" @change="dSparentchange" :disabled="checkId != ''" style="width: 100%">
                    <el-option-group v-for="parentIdHeads in parentIdHead" :key="parentIdHeads.label" :label="parentIdHeads.label">
                      <el-option v-for="item in parentIdHeads.options" :key="item.id" :label="item.sourceName" :value="item.id"> </el-option>
                    </el-option-group>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="编码">
                  <el-input v-model="form.sourceCode" :disabled="curentIndex === 1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="名称">
                  <el-input v-model="form.sourceName" :disabled="curentIndex === 1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="dStabNameName" v-show="dStabNameShow">
                  <el-input v-model="form.tableName" :disabled="checkId !== ''" @blur="tableNameblur"></el-input>
                </el-form-item>
              </el-col>
              <div style="clear: both"></div>
            </el-form>
            <el-table :data="tableData" class="elementuiTable" border stripe height="414" v-if="false" style="margin: 5px; width: calc(100% - 10px)">
              <el-table-column fixed="left" label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" icon="el-icon-plus" @click="pushtab(scope.$index, tableData)"></el-button>
                  <el-button type="warning" size="mini" icon="el-icon-delete" @click="delthis(scope.$index, tableData)"></el-button>
                </template>
              </el-table-column>
              <el-table-column fixed="left" label="名称" width="220" header-align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sourceName"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="排序号" width="120" header-align="center">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.sequNo"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="编码" width="220" header-align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sourceCode"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="分组名称" width="220" header-align="center" v-if="dStabcolShow">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.tableGroup"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="是否显示" width="100" header-align="center" v-if="dStabcolShow">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isShow" active-value="Y" inactive-value="N"> </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="备注" v-if="!dStabcolShow" width="220" header-align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.description"></el-input>
                </template>
              </el-table-column>
              <!-- <el-table-column label="数据类型" width="120" header-align="center" v-if="dStabcolShow">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.fieldDataType" clearable>
                    <el-option
                      v-for="fieldDataTypeDatas in fieldDataTypeData"
                      :key="fieldDataTypeDatas.id"
                      :label="fieldDataTypeDatas.sourceName"
                      :value="fieldDataTypeDatas.id"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column> -->
              <el-table-column label="字段长度" width="100" header-align="center" v-if="dStabcolShow && false">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.fieldLength"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="小数位" width="100" header-align="center" v-if="dStabcolShow && false">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.fieldDecimal"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="默认值" width="120" header-align="center" v-if="dStabcolShow && false">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.defaultValue"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="字段类型" width="160" header-align="center" clearable>
                <template slot-scope="scope">
                  <el-select v-model="scope.row.fieldType" clearable>
                    <el-option label="基础数据表代码" value="0"></el-option>
                    <el-option label="基础数据表名称" value="1"></el-option>
                    <el-option label="超链接" value="2"></el-option>
                    <el-option label="父级节点" value="3"></el-option>
                    <!-- <el-option label="版本字段" value="2"></el-option>
                <el-option label="自动序号字段" value="3"></el-option>
                <el-option label="上级字段" value="4"></el-option> -->
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="字段显示名称" width="120" header-align="center" v-if="dStabcolShow && false">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dispFieldName"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="是否主键" width="120" header-align="center" v-if="dStabcolShow">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isKey" active-value="Y" inactive-value="N"> </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="是否为查询条件" width="120" header-align="center" v-if="dStabcolShow">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isSearchCondition" active-value="Y" inactive-value="N"> </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="是否可为空" width="120" header-align="center" v-if="dStabcolShow">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isNull" active-value="Y" inactive-value="N"> </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="引用表编码" width="100" header-align="center" v-if="dStabcolShow && false">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.refTable"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="宽度" width="120" header-align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.fieldLength"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="备注" width="200" header-align="center" v-if="dStabcolShow">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.description"></el-input>
                </template>
              </el-table-column>
            </el-table>
            <ux-grid
              border
              show-header-overflow
              keep-source
              widthResize
              stripe
              highlight-current-row
              :data="tableData"
              :height="464"
              style="margin: 5px; width: calc(100% - 10px)"
              row-id="id"
              :edit-config="{ trigger: 'click', mode: 'cell', showIcon: false }"
            >
              <ux-table-column type="index" align="center" title="序号" width="50" fixed="left"></ux-table-column>
              <ux-table-column v-if="curentIndex === 2 || curentIndex === 4" title="操作" align="center" fixed="left" resizable width="80">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" icon="el-icon-plus" @click="pushtab(scope.$index, tableData)"></el-button>
                  <el-button type="warning" size="mini" icon="el-icon-delete" @click="delthis(scope.$index, tableData)"></el-button>
                </template>
              </ux-table-column>
              <template v-for="(item, index) in tableColumnArr">
                <ux-table-column
                  v-if="item.dataType === '01'"
                  :min-width="200"
                  :title="item.infoName"
                  header-align="center"
                  align="center"
                  show-overflow
                  :edit-render="!(curentIndex === 1)"
                  resizable
                  :key="item.infoCode + index + '' + curentIndex"
                >
                  <template v-slot:edit="scope">
                    <el-input v-model="scope.row[item.infoCode]"></el-input>
                  </template>
                  <template v-slot="scope">
                    <span>{{ scope.row[item.infoCode] }}</span>
                  </template>
                </ux-table-column>
                <ux-table-column
                  v-if="item.dataType === '04'"
                  :min-width="100"
                  :title="item.infoName"
                  header-align="center"
                  align="center"
                  show-overflow
                  :edit-render="!(curentIndex === 1)"
                  resizable
                  :key="item.infoCode + index + '' + curentIndex"
                >
                  <template v-slot:edit="scope">
                    <el-input v-model="scope.row[item.infoCode]"></el-input>
                  </template>
                  <template v-slot="scope">
                    <span>{{ scope.row[item.infoCode] }}</span>
                  </template>
                </ux-table-column>
                <ux-table-column
                  v-if="item.dataType === '12'"
                  :min-width="100"
                  :title="item.infoName"
                  header-align="center"
                  align="center"
                  show-overflow
                  :edit-render="!(curentIndex === 1)"
                  resizable
                  :key="item.infoCode + index + '' + curentIndex"
                >
                  <template v-slot:edit="scope">
                    <el-select v-model="scope.row[item.infoCode]" placeholder="请选择">
                      <el-option v-for="(it, ind) in item.refListData" :key="ind" :title="it.sourceName" :label="it.sourceName" :value="it.sourceCode">
                      </el-option>
                    </el-select>
                  </template>
                  <template v-slot="scope">
                    <span>{{ scope.row[item.infoCode] | filterDataById(item, scope) }}</span>
                  </template>
                </ux-table-column>
                <ux-table-column
                  v-if="item.dataType === '18'"
                  :min-width="100"
                  :title="item.infoName"
                  header-align="center"
                  align="center"
                  show-overflow
                  :edit-render="!(curentIndex === 1)"
                  resizable
                  :key="item.infoCode + index + '' + curentIndex"
                >
                  <template v-slot:edit="scope">
                    <el-switch v-model="scope.row[item.infoCode]" active-value="Y" inactive-value="N"> </el-switch>
                  </template>
                  <template v-slot="scope">
                    <span>{{ scope.row[item.infoCode] === 'Y' ? '是' : '否' }}</span>
                  </template>
                </ux-table-column>
              </template>
            </ux-grid>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { billSourceAPI } from '../../service/dataSource'
export default {
  data() {
    return {
      filterText1: '', // 左侧物理表过滤字段
      filterText2: '', // 左侧视图过滤字段
      filterText3: '', // 左侧接口过滤字段
      filterText4: '', // 左侧值集过滤字段
      textarea: '', // 没用到，可以删除
      // 表格中的一条初始化数据
      emptyData: {
        sourceCode: '', // 编码
        sourceName: '', // 编码名称
        fieldDataType: '01', // 默认的数据类型  01是单行文本
        fieldLength: '', // 字段宽度
        fieldDecimal: '', // 该字段的小数点位数
        defaultValue: '', // 字段的默认值
        fieldType: '', // 字段类型
        isKey: '0', // 是否是主键
        isNull: '1', // 是否可以为空
        isRef: '1',
        refTable: '', // 引用表编码
        dispFieldName: '', // 字段显示名称
        sequNo: '', // 排序号
        description: '' // 备注
      },
      pardata1: [], // 物理表的树形数据集合
      pardata2: [], // 视图的树形数据集合
      pardata3: [], // 值集的树形数据集合
      pardata4: [], // 接口的树形数据集合
      parhead1: [
        // 物理表对应的上级分类
        {
          label: '主要素区',
          options: [{ id: '1', sourceName: '物理表' }]
        },
        {
          label: '分类',
          options: []
        }
      ],
      parhead2: [
        // 视图对应的上级分类
        {
          label: '主要素区',
          options: [{ id: '2', sourceName: '视图' }]
        },
        {
          label: '分类',
          options: []
        }
      ],
      parhead3: [
        // 值集对应的上级分类
        {
          label: '主要素区',
          options: [{ id: '3', sourceName: '接口' }]
        },
        {
          label: '分类',
          options: []
        }
      ],
      parhead4: [
        // 接口对应的上级分类
        {
          label: '主要素区',
          options: [{ id: '4', sourceName: '值集' }]
        },
        {
          label: '分类',
          options: []
        }
      ],
      // fieldDataTypeData: [], // 字段数据类型集合
      parentIdHead: [], // 右侧头部的下拉选择数据，左侧树点击时会重新赋值
      defaultProps: {
        children: 'children',
        label: 'sourceName'
      },
      // parentId 点击的上级id， sourceCode 编码， sourceName 编码名称 ，tableName 表名
      form: {
        sourceCode: '',
        sourceName: '',
        parentId: '',
        tableName: ''
      },
      activeNames: '1', // 点击的左侧哪个折叠版
      tableData: [],
      checkId: '', // 如果左侧树选择后，那么右侧上面的上级分类选择框数据自动填充，不能手选
      dStabShow: true, // 对表格中的操作项进行是否显示的控制
      dStabNameShow: true, // 对表名进行控制
      dStabNameName: '表名',
      dStabcolShow: true, // 数据源属性控制
      tableColumnArr: [],
      curentIndex: 1, // 当前选择的那种表类型
      // 01 文本 18 开关 12 下拉单选
      tableColumnArr1: [
        {
          dataType: '01',
          infoName: '字段编码',
          infoCode: 'sourceCode'
        },
        {
          dataType: '01',
          infoName: '字段名称',
          infoCode: 'sourceName'
        },
        {
          dataType: '18',
          infoName: '是否主键',
          infoCode: 'isKey'
        },
        {
          dataType: '18',
          infoName: '是否可空',
          infoCode: 'isNull'
        },
        {
          dataType: '12',
          infoName: '数据类型',
          infoCode: 'fieldDataType',
          refListData: [
            { sourceCode: '01', sourceName: '文本' },
            { sourceCode: '03', sourceName: '金额' },
            { sourceCode: '05', sourceName: '浮点' },
            { sourceCode: '08', sourceName: '日期' },
            { sourceCode: '04', sourceName: '整型' },
            { sourceCode: '02', sourceName: '长文本' }
          ]
        },
        {
          dataType: '04',
          infoName: '字段长度',
          infoCode: 'fieldLength'
        },
        {
          dataType: '04',
          infoName: '小数位数',
          infoCode: 'fieldDecimal'
        },
        {
          dataType: '01',
          infoName: '来源字段',
          infoCode: 'description'
        }
      ],
      tableColumnArr2: [
        {
          dataType: '01',
          infoName: '字段编码',
          infoCode: 'sourceCode'
        },
        {
          dataType: '01',
          infoName: '字段名称',
          infoCode: 'sourceName'
        },
        {
          dataType: '12',
          infoName: '数据类型',
          infoCode: 'fieldDataType',
          refListData: [
            { sourceCode: '01', sourceName: '文本' },
            { sourceCode: '03', sourceName: '金额' },
            { sourceCode: '05', sourceName: '浮点' },
            { sourceCode: '08', sourceName: '日期' },
            { sourceCode: '04', sourceName: '整型' },
            { sourceCode: '02', sourceName: '长文本' }
          ]
        },
        {
          dataType: '12',
          infoName: '字段类型',
          infoCode: 'fieldType',
          refListData: [
            { sourceCode: '0', sourceName: '编码' },
            { sourceCode: '1', sourceName: '名称' },
            { sourceCode: '2', sourceName: '超链接' },
            { sourceCode: '3', sourceName: '父级节点' }
          ]
        }
      ],
      tableColumnArr3: [
        {
          dataType: '01',
          infoName: '字段编码',
          infoCode: 'sourceCode'
        },
        {
          dataType: '01',
          infoName: '字段名称',
          infoCode: 'sourceName'
        },
        {
          dataType: '12',
          infoName: '数据类型',
          infoCode: 'fieldDataType',
          refListData: [
            { sourceCode: '01', sourceName: '文本' },
            { sourceCode: '03', sourceName: '金额' },
            { sourceCode: '05', sourceName: '浮点' },
            { sourceCode: '08', sourceName: '日期' },
            { sourceCode: '04', sourceName: '整型' },
            { sourceCode: '02', sourceName: '长文本' }
          ]
        }
      ],
      tableColumnArr4: [
        {
          dataType: '01',
          infoName: '字段编码',
          infoCode: 'sourceCode'
        },
        {
          dataType: '01',
          infoName: '字段名称',
          infoCode: 'sourceName'
        },
        {
          dataType: '01',
          infoName: '显示顺序',
          infoCode: 'sequNo'
        },
        {
          dataType: '18',
          infoName: '启用状态',
          infoCode: 'isUsed'
        }
      ]
    }
  },
  mounted() {
    // 获取左侧物理表 视图 接口 值集 树形数据
    this.getbillsource()
    // 点击左侧数据，更新右侧上级分类的下拉数据
    this.upparentId()
    // 表格添加一条空数据
    this.tableData.push(this.emptyData)
  },
  created() {},
  watch: {
    // 监控表格的数据，对页面高度实时调整
    tableData() {
      let H = document.querySelector('.boxShadow')
      H.style.height = ''
      setTimeout(() => {
        if (H.offsetHeight < window.innerHeight) {
          document.body.style.height = window.innerHeight + 'px'
          H.style.height = window.innerHeight - 15 + 'px'
        } else {
          document.body.style.height = H.offsetHeight + 'px'
          H.style.height = ''
        }
      }, 300)
    },
    filterText1(val) {
      this.$refs.tree1.filter(val)
    },
    filterText2(val) {
      this.$refs.tree2.filter(val)
    },
    filterText3(val) {
      this.$refs.tree3.filter(val)
    },
    filterText4(val) {
      this.$refs.tree4.filter(val)
    }
  },
  methods: {
    // 左侧树渲染，添加提示及信息popover
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <el-popover trigger="hover" placement="top">
            <span>{node.label}</span>
            <div class="bill-title" slot="reference">
              {node.label}
            </div>
          </el-popover>
        </span>
      )
    },
    // 左侧树模糊搜索
    filterNode(value, data) {
      if (!value) return true
      return data.sourceName.indexOf(value) !== -1
    },
    // 左侧树点击事件，获取右侧的头部信息和表格数据
    handleNodeClick(data, type) {
      // this.data1 = data // 这个有用吗，其他地方没有发现用到这个变量
      let that = this
      this.curentIndex = type
      if (type === 1) {
        this.tableColumnArr = this.tableColumnArr1
        this.dStabNameName = '物理表名'
        this.dStabNameShow = true
      } else if (type === 2) {
        this.tableColumnArr = this.tableColumnArr2
        this.dStabNameName = '视图名称'
        this.dStabNameShow = true
      } else if (type === 3) {
        this.tableColumnArr = this.tableColumnArr3
        this.dStabNameName = '接口地址'
        this.dStabNameShow = true
      } else {
        this.tableColumnArr = this.tableColumnArr4
        this.dStabNameName = '接口地址'
        this.dStabNameShow = false
      }
      billSourceAPI.billSourceNode(data.id).then(res => {
        that.form = res.data.data.head
        if (res.data.data.body.length === 0) {
          that.tableData = [that.emptyData]
        } else {
          that.tableData = res.data.data.body
        }
        that.checkId = res.data.data.head.id
      })
    },
    // 失焦时判断表名是否重复
    tableNameblur() {
      billSourceAPI.checkTable(this.form.tableName).then(res => {
        if (res.data === '1') {
          this.$message('表名' + this.form.tableName + '已存在，不允许重复设置')
        } else if (res.data.length === 0) {
          this.tableData = this.tableData
        } else {
          this.tableData = res.data
        }
      })
    },
    // 删除表格数据
    delData() {
      if (this.checkId === '') {
        this.form = {
          sourceCode: '',
          sourceName: '',
          parentId: this.activeNames,
          tableName: ''
        }
        this.tableData = [this.emptyData]
      } else {
        billSourceAPI.deleteSource(this.checkId).then(res => {
          if (res.data.flag === 'SUCCESS') {
            this.$message.success('删除成功')
            this.getbillsource()
            this.upparentId()
            this.form = {
              sourceCode: '',
              sourceName: '',
              parentId: this.activeNames,
              tableName: ''
            }
            this.tableData = [this.emptyData]
            this.checkId = ''
          }
        })
      }
    },
    // 保存数据
    uploadfl() {
      var params = {
        head: this.form,
        body: this.tableData
      }
      if (!this.form.sourceCode) {
        return this.$message('请选择左侧数据！')
      }
      // 是否显示=是:分组名称要么全部为空要么全部有值，为了区分使用默认分组，还是自动分组
      let isNull = false
      let isNotNull = false
      this.tableData.forEach(item => {
        if (item.isShow === 'Y') {
          if (item.tableGroup) {
            isNotNull = true
          } else {
            isNull = true
          }
        }
      })
      // 这个永远不会执行
      if (isNull && isNotNull) {
        this.$message('分组名称要么全为空，要么非空')
        return
      }
      billSourceAPI.saveNode(params).then(res => {
        if (res.flag === 'SUCCESS') {
          this.$message('保存成功')
          this.getbillsource()
          this.upparentId()
          this.form = {
            sourceCode: '',
            sourceName: '',
            parentId: this.activeNames,
            tableName: ''
          }
          this.checkId = ''
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 新增数据
    newData() {
      this.form = {
        sourceCode: '',
        sourceName: '',
        parentId: this.activeNames,
        tableName: ''
      }
      this.tableData = [this.emptyData]
      this.checkId = ''
    },
    // 获取左侧物理表 视图 接口 值集 树形数据
    getbillsource() {
      this.pardata1 = []
      this.pardata2 = []
      this.pardata3 = []
      this.pardata4 = []
      this.parhead1 = [
        {
          label: '主要素区',
          options: [{ id: '1', sourceName: '物理表' }]
        },
        {
          label: '分类',
          options: []
        }
      ]
      this.parhead2 = [
        {
          label: '主要素区',
          options: [{ id: '2', sourceName: '视图' }]
        },
        {
          label: '分类',
          options: []
        }
      ]
      this.parhead3 = [
        {
          label: '主要素区',
          options: [{ id: '3', sourceName: '接口' }]
        },
        {
          label: '分类',
          options: []
        }
      ]
      this.parhead4 = [
        {
          label: '主要素区',
          options: [{ id: '4', sourceName: '值集' }]
        },
        {
          label: '分类',
          options: []
        }
      ]
      billSourceAPI.billSource().then(res => {
        for (var i = 0; i < res.data.treeList.length; i++) {
          if (res.data.treeList[i].parentId === '1') {
            this.pardata1.push(res.data.treeList[i])
            this.parhead1[1].options.push(res.data.treeList[i])
          } else if (res.data.treeList[i].parentId === '2') {
            this.pardata2.push(res.data.treeList[i])
            this.parhead2[1].options.push(res.data.treeList[i])
          } else if (res.data.treeList[i].parentId === '3') {
            this.pardata3.push(res.data.treeList[i])
            this.parhead3[1].options.push(res.data.treeList[i])
          } else if (res.data.treeList[i].parentId === '4') {
            this.pardata4.push(res.data.treeList[i])
            this.parhead4[1].options.push(res.data.treeList[i])
          }
        }
        this.data = res.data.treeList
        // 模拟点击
        if (this.parhead1[1].options && this.parhead1[1].options.length > 0) {
          this.$nextTick(() => {
            this.handleNodeClick(this.getFirstChildrenNode(this.parhead1[1].options), 1)
            this.$refs.tree1.setCurrentKey(this.getFirstChildrenNode(this.parhead1[1].options))
          })
        }
      })
    },
    // 一个方法，找到第一个子节点
    getFirstChildrenNode(arr) {
      if (!Array.isArray(arr)) return
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children) {
          return this.getFirstChildrenNode(arr[i].children)
        } else {
          return arr[i]
        }
      }
    },
    // 表内点击增加一条数据
    pushtab(index, tableData) {
      tableData.push({
        sourceCode: '',
        sourceName: '',
        fieldDataType: '01',
        fieldLength: '',
        fieldDecimal: '',
        defaultValue: '',
        fieldType: '',
        isKey: '0',
        isNull: '1',
        isRef: '1',
        refTable: '',
        dispFieldName: '',
        sequNo: '',
        description: ''
      })
    },
    // 表内点击删除
    delthis(index, tableData) {
      tableData.splice(index, 1)
      if (tableData.length === 0) {
        tableData.push({
          sourceCode: '',
          sourceName: '',
          fieldDataType: '01',
          fieldLength: '',
          fieldDecimal: '',
          defaultValue: '',
          fieldType: '',
          isKey: '0',
          isNull: '1',
          isRef: '1',
          refTable: '',
          dispFieldName: '',
          sequNo: '',
          description: ''
        })
      }
    },
    // 折叠版打开事件
    upparentId() {
      if (this.activeNames === '1') {
        this.parentIdHead = this.parhead1
      } else if (this.activeNames === '2') {
        this.parentIdHead = this.parhead2
      } else if (this.activeNames === '3') {
        this.parentIdHead = this.parhead3
      } else if (this.activeNames === '4') {
        this.parentIdHead = this.parhead4
      }
    },
    // 上级分类下拉切换事件
    dSparentchange() {
      if (this.checkId === '') {
        this.tableData = [
          {
            sourceCode: '',
            sourceName: '',
            fieldDataType: '01',
            fieldLength: '',
            fieldDecimal: '',
            defaultValue: '',
            fieldType: '',
            isKey: '0',
            isNull: '1',
            isRef: '1',
            refTable: '',
            dispFieldName: '',
            sequNo: '',
            description: ''
          }
        ]
      }
      if (this.activeNames === '4') {
        const _this = this
        this.dStabShow = false
        this.dStabcolShow = false
        setTimeout(function () {
          if (_this.form.parentId === '1' || _this.form.parentId === '2' || _this.form.parentId === '3' || _this.form.parentId === '4') {
            _this.dStabShow = false
            _this.dStabNameShow = false
          } else {
            _this.dStabShow = true
            _this.dStabNameShow = true
          }
        }, 200)
        this.dStabNameName = '引用名称'
      } else {
        const _this = this
        this.dStabShow = false
        this.dStabcolShow = true
        setTimeout(function () {
          if (_this.form.parentId === '1' || _this.form.parentId === '2' || _this.form.parentId === '3' || _this.form.parentId === '4') {
            _this.dStabShow = false
            _this.dStabNameShow = false
          } else {
            _this.dStabShow = true
            _this.dStabNameShow = true
          }
        }, 200)
        this.dStabNameName = '表名'
      }
    }
  },
  filters: {
    filterDataById(val, item, scope, transExpDataObj) {
      if (!val) return ''
      if (scope.row[item.infoCode].length === 0) return ''
      if (item.dataType === '12') {
        let refListData = item.refListData
        let ids = scope.row[item.infoCode]
        let text = []
        refListData.forEach((item, index) => {
          if (ids.indexOf(item.sourceCode) !== -1) {
            text.push(item.sourceName)
          }
        })
        return text.join('、')
      }
      if (item.dataType === '21') {
        let refListData = transExpDataObj[item.infoCode]
        let ids = scope.row[item.infoCode]
        let text = []
        refListData.forEach((item, index) => {
          if (ids.indexOf(item.chrId) !== -1) {
            text.push(item.chrName)
          }
        })
        return text.join('、')
      }
    }
  },
  components: {}
}
</script>
<style lang="scss">
.dataSourceBox {
  .el-table__fixed {
    height: 100% !important;
    width: 319px !important;
  }
  .el-form-item {
    margin-bottom: 0px !important;
  }
}
</style>
<style scoped lang="scss">
#dataSource {
  background: #fff;
  border: 1px solid #dfe6ec;
  margin-top: 20px;
  padding-top: 15px;
  .el-table .el-switch {
    margin-top: -5px;
    height: 26px;
  }
}
.com-title {
  color: #333333;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #dfe6ec;
  margin-bottom: 10px;
  .title {
    border-bottom: 3px solid #108ee9;
    font-size: 16px;
    font-weight: normal;
    height: 38px;
    line-height: 38px;
    display: inline-block;
  }
}
.workspace {
  min-height: 100%;
  padding-bottom: 10px;
  position: relative;
  display: block;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px !important;
  background-color: #ffffff;
}
.boxShadow {
  padding: 0 16px 10px;
}
.el-tabs__item {
  color: #2f353b !important;
  font-size: 16px !important;
}
.Information_box {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  border-bottom: 1px solid #ccc;
}
.Information {
  float: left;
  margin-right: 10px;
  font-size: 16px;
  line-height: 42px;
  border-bottom: 3px solid #42a5f5;
}
.newAdd {
  float: right;
  margin: 5px 10px;
}
</style>
