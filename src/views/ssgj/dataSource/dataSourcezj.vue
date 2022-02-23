<template>
  <div class="boxShadow">
    <div class="dataSource common-listfin workspace" style="margin-top: 0; padding: 0 16px">
      <div>
        <div class="Information_box">
          <div style="display: flex; align-items: center">
            <span class="Information">值集管理</span>
          </div>

          <div style="display: flex; align-items: center">
            <el-button type="primary" @click="newData()">新增</el-button>
            <el-button type="default" @click="uploadfl()">保存</el-button>
            <el-button type="default" @click="delData()">删除</el-button>
          </div>
        </div>
      </div>
      <div id="dataSource">
        <el-row>
          <el-col :span="4" style="border: 1px solid #c1c1c1; min-height: 535px; border-left: 0; border-bottom: 0">
            <el-collapse v-model="activeNames" accordion @change="upparentId" style="border: 0">
              <el-collapse-item title="值集" name="4">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
                <el-tree
                  :data="pardata4"
                  :props="defaultProps"
                  @node-click="handleNodeClick"
                  default-expand-all
                  :filter-node-method="filterNode"
                  ref="tree2"
                  style="max-height: 350px; overflow: auto"
                ></el-tree>
              </el-collapse-item>
            </el-collapse>
          </el-col>
          <el-col :span="20">
            <el-form label-width="120px" :model="form" style="width: 100%; min-height: 120px; border-bottom: 1px solid #c1c1c1">
              <el-col :span="12">
                <el-form-item label="上级分类">
                  <el-select v-model="form.parentId" placeholder="请选择活动区域" @change="dSparentchange" style="width: 100%">
                    <el-option-group v-for="parentIdHeads in parentIdHead" :key="parentIdHeads.label" :label="parentIdHeads.label">
                      <el-option v-for="item in parentIdHeads.options" :key="item.sourceId" :label="item.sourceName" :value="item.sourceId"> </el-option>
                    </el-option-group>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="编码">
                  <el-input v-model="form.sourceCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="名称">
                  <el-input v-model="form.sourceName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="dStabNameName" v-show="dStabNameShow">
                  <el-input v-model="form.tableName" :disabled="checkId !== ''" @blur="tableNameblur"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
            <el-table :data="tableData" border stripe height="414" v-if="dStabShow" class="elementuiTable">
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
              <el-table-column label="编码" width="220" header-align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sourceCode"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="数据类型" width="120" header-align="center" v-if="dStabcolShow">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.fieldDataType" clearable>
                    <el-option
                      v-for="fieldDataTypeDatas in fieldDataTypeData"
                      :key="fieldDataTypeDatas.sourceId"
                      :label="fieldDataTypeDatas.sourceName"
                      :value="fieldDataTypeDatas.sourceId"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
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
              <el-table-column label="字段类型" width="160" header-align="center" clearable v-if="dStabcolShow">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.fieldType" clearable>
                    <el-option label="基础数据表代码" value="0"></el-option>
                    <el-option label="基础数据表名称" value="1"></el-option>
                    <el-option label="版本字段" value="2"></el-option>
                    <el-option label="自动序号字段" value="3"></el-option>
                    <el-option label="上级字段" value="4"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="是否主键" width="120" header-align="center" v-if="dStabcolShow">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isKey" active-value="1" inactive-value="0"> </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="是否可为空" width="120" header-align="center" v-if="dStabcolShow">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isNull" active-value="1" inactive-value="0"> </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="是否显示" width="100" header-align="center" v-if="dStabcolShow">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isRef" active-value="1" inactive-value="0"> </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="引用表编码" width="100" header-align="center" v-if="dStabcolShow && false">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.refTable"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="字段显示名称" width="120" header-align="center" v-if="dStabcolShow">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.dispFieldName"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="排序号" width="100" header-align="center">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.sequNo"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="备注" width="100" header-align="center" v-if="dStabcolShow">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.Description"></el-input>
                </template>
              </el-table-column>
            </el-table>
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
      filterText: '',
      textarea: '',
      emptyData: {
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
        Description: ''
      },
      pardata1: [],
      pardata2: [],
      pardata3: [],
      pardata4: [],
      parhead1: [
        {
          label: '主要素区',
          options: [{ sourceId: '1', sourceName: '物理表' }]
        },
        {
          label: '分类',
          options: []
        }
      ],
      parhead2: [
        {
          label: '主要素区',
          options: [{ sourceId: '2', sourceName: '视图' }]
        },
        {
          label: '分类',
          options: []
        }
      ],
      parhead3: [
        {
          label: '主要素区',
          options: [{ sourceId: '3', sourceName: '接口' }]
        },
        {
          label: '分类',
          options: []
        }
      ],
      parhead4: [
        {
          label: '主要素区',
          options: [{ sourceId: '4', sourceName: '值集' }]
        },
        {
          label: '分类',
          options: []
        }
      ],
      fieldDataTypeData: [],
      parentIdHead: [],
      defaultProps: {
        children: 'children',
        label: 'sourceName'
      },
      form: {},
      activeNames: '1',
      tableData: [],
      checkId: '',
      dStabShow: true,
      dStabNameShow: true,
      dStabNameName: '表名',
      dStabcolShow: true
    }
  },
  mounted() {
    this.getbillsource()
    this.upparentId()
    this.tableData.push(this.emptyData)
    billSourceAPI.arBillAssembly().then(res => {
      if (res.flag === 'SUCCESS') {
        this.fieldDataTypeData = res.data
      }
    })
  },
  created() {},
  watch: {
    tableData() {
      let H = document.querySelector('.boxShadow')
      H.style.height = ''
      setTimeout(() => {
        // console.log(H.offsetHeight)
        if (H.offsetHeight < window.innerHeight) {
          document.body.style.height = window.innerHeight + 'px'
          H.style.height = window.innerHeight - 15 + 'px'
        } else {
          document.body.style.height = H.offsetHeight + 'px'
          H.style.height = ''
        }
      }, 300)
    },
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.sourceName.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      if (data.sourceId === this.checkId) {
      } else {
        billSourceAPI.billSourceNode(data.sourceId).then(res => {
          this.form = res.data.data.head
          if (res.data.data.body.length === 0) {
            this.tableData = [this.emptyData]
          } else {
            this.tableData = res.data.data.body
          }
          this.checkId = res.data.data.head.sourceId
        })
      }
    },
    tableNameblur() {
      billSourceAPI.checkTable().then(res => {
        if (res.data === '1') {
          this.$message('表名' + this.form.tableName + '在数据源中已存在')
        }
      })
    },
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
            alert('删除成功')
            this.pardata1 = []
            this.pardata2 = []
            this.pardata3 = []
            this.pardata4 = []
            this.parhead1 = [
              {
                label: '主要素区',
                options: [{ sourceId: '1', sourceName: '物理表' }]
              },
              {
                label: '分类',
                options: []
              }
            ]
            this.parhead2 = [
              {
                label: '主要素区',
                options: [{ sourceId: '2', sourceName: '视图' }]
              },
              {
                label: '分类',
                options: []
              }
            ]
            this.parhead3 = [
              {
                label: '主要素区',
                options: [{ sourceId: '3', sourceName: '接口' }]
              },
              {
                label: '分类',
                options: []
              }
            ]
            this.parhead4 = [
              {
                label: '主要素区',
                options: [{ sourceId: '4', sourceName: '值集' }]
              },
              {
                label: '分类',
                options: []
              }
            ]
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
    uploadfl() {
      this.$confirm('是否保存?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var params = {
            head: this.form,
            body: this.tableData
          }
          billSourceAPI.saveNode(params).then(res => {
            if (res.flag === 'SUCCESS') {
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              this.pardata1 = []
              this.pardata2 = []
              this.pardata3 = []
              this.pardata4 = []
              this.parhead1 = [
                {
                  label: '主要素区',
                  options: [{ sourceId: '1', sourceName: '物理表' }]
                },
                {
                  label: '分类',
                  options: []
                }
              ]
              this.parhead2 = [
                {
                  label: '主要素区',
                  options: [{ sourceId: '2', sourceName: '视图' }]
                },
                {
                  label: '分类',
                  options: []
                }
              ]
              this.parhead3 = [
                {
                  label: '主要素区',
                  options: [{ sourceId: '3', sourceName: '接口' }]
                },
                {
                  label: '分类',
                  options: []
                }
              ]
              this.parhead4 = [
                {
                  label: '主要素区',
                  options: [{ sourceId: '4', sourceName: '值集' }]
                },
                {
                  label: '分类',
                  options: []
                }
              ]
              this.getbillsource()
              this.upparentId()
            } else {
              this.$message({
                type: 'error',
                message: '保存失败!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          })
        })
    },
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
    getbillsource() {
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
        this.form.parentId = '4'
      })
    },
    //
    pushtab(index, tableData) {
      // tableData.splice(index + 1, 0, {
      //   sourceCode: '',
      //   sourceName: '',
      //   fieldDataType: '01',
      //   fieldLength: '',
      //   fieldDecimal: '',
      //   defaultValue: '',
      //   fieldType: '',
      //   isKey: '0',
      //   isNull: '1',
      //   isRef: '1',
      //   refTable: '',
      //   dispFieldName: '',
      //   sequNo: '',
      //   Description: ''
      // })
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
        Description: ''
      })
    },
    delthis(index, tableData) {
      tableData.splice(index, 1)
    },
    upparentId() {
      //   if (this.activeNames === '1') {
      //     this.parentIdHead = this.parhead1
      //   } else if (this.activeNames === '2') {
      //     this.parentIdHead = this.parhead2
      //   } else if (this.activeNames === '3') {
      //     this.parentIdHead = this.parhead3
      //   } else if (this.activeNames === '4') {
      this.parentIdHead = this.parhead4
      // }
    },
    dSparentchange() {
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
  components: {}
}
</script>
<style lang="scss">
.el-table__fixed {
  height: 100% !important;
  width: 319px !important;
}

.dataSource {
  .table-com {
    // .el-table__header {
    //   .cell {
    //     height: 40px;
    //     line-height: 40px;
    //     font-size: 14px;
    //   }
    // }
    .el-table__body {
      td {
        // height: 36px;
        // font-size: 14px;
        .txt-btn {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
<style scoped lang="scss">
#dataSource {
  background: #fff;
  border: 1px solid #dfe6ec;
  margin-top: 20px;
  padding-top: 15px;
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
// .el-input__inner{
//   width: 100% !important;
//   border: none !important;
// }
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
