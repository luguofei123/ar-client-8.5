<template>
  <div class="ztree-component">
    <div class="tree-search" v-show="isShowSearch">
      <el-input v-model="likeName" placeholder="请输入关键字" @change="searchTree">
        <i slot="suffix" class="iconfont iconsousuo" @click="searchTree"></i>
      </el-input>
    </div>
    <div class="tree-list">
      <div class="ztree" :id="treeId"></div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'

export default {
  name: 'zTree',
  data() {
    return {
      zTreeObj: {}, // 树对象
      treeId: 'ztree_' + parseInt(Math.random() * 1e10),
      likeName: '', // 模糊查询参数
      treeNodes: [], // 树节点
      selectNode: {}, // 选中树节点
      checkNode: [], // 勾选的树节点（不包含父节点）
      checkAllNodes: [], // 勾选的所有树节点（包含父节点）
      setting: {
        //树配置信息
        view: {
          dblClickExpand: false,
          showIcon: false, // 是否显示节点
          showLine: false, // 是否显示连线
          addHoverDom: this.addHoverDom, // 移入树节点显示自定义按钮
          removeHoverDom: this.removeHoverDom // 移出树节点删除自定义按钮
        },
        check: {
          enable: this.checkFlag,
          nocheckInherit: false,
          chkboxType: { Y: 'ps', N: 'ps' }
        },
        data: {
          simpleData: {
            enable: true,
            idKey: 'id',
            pIdKey: this.parentId
          },
          key: {
            children: this.children,
            name: this.name,
            title: this.title
          }
        },
        callback: {
          onClick: this.zTreeOnClick,
          onCheck: this.zTreeOnCheck,
          onExpand: this.onExpand
        },
        ...this.settingTree
      }
    }
  },
  props: {
    // 初始化接口
    url: String,
    // 初始化参数
    params: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 是否展示搜索
    isShowSearch: {
      type: Boolean,
      default: true
    },
    // 是否开启多选
    checkFlag: {
      type: Boolean,
      default: false
    },
    // 展开的接口
    expandUrl: {
      type: String
    },
    // 展开的参数
    expandParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 树自定义配置参数
    settingTree: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 是否有全部节点
    showAll: {
      type: Boolean,
      default: false
    },
    // 树默认子节点属性
    children: {
      type: String,
      default: 'sonList'
    },
    // 树默认name属性值
    name: {
      type: String,
      default: 'codeName'
    },
    // 树默认title属性值
    title: {
      type: String,
      default: 'title'
    },
    // 树默认pId属性
    parentId: {
      type: String,
      default: 'pId'
    },
    // 树的数据
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 根据选中的值展开
    nodeId: {
      type: String,
      default: 'pId'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initTree(this.treeData)
    })
  },
  created() {},
  methods: {
    searchTree() {
      this.initTree(this.treeData)
    },
    // 初始化树节点
    initTree(data) {
      /*this.treeNodes = treeData.data
      this.zTreeObj = $.fn.zTree.init($('#' + this.treeId), this.setting, this.treeNodes)*/
      // this.zTreeObj.expandAll(true)
      // 如果传了url，就调用接口，否则就走数据
      if (this.url) {
        axios
          .get(this.url, {
            params: this.params
          })
          .then(res => {
            if (res.data.flag === 'SUCCESS') {
              let allTree = [{ title: '全部', name: '全部', code: '-1', id: '-1', isLeaf: 'N', children: res.data.data }]
              this.treeNodes = this.showAll ? allTree : res.data.data
              this.treeNodes.forEach(item => {
                item.isParent = item[this.children] && item[this.children].length > 0 ? true : false
              })
              this.$nextTick(() => {
                $.fn.zTree.init($('#' + this.treeId), this.setting, this.treeNodes)
                this.zTreeObj = $.fn.zTree.getZTreeObj(this.treeId)

                this.$emit('initZtree', this.zTreeObj)

                if (this.showAll) {
                  this.zTreeObj.expandNode(this.zTreeObj.getNodeByParam('id', '-1'))
                }
              })
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      } else {
        let allTree = [{ title: '全部', name: '全部', code: '-1', id: '-1', isLeaf: 'N', children: data }]
        this.treeNodes = this.showAll ? allTree : data
        this.treeNodes.forEach(item => {
          item.isParent = item[this.children] && item[this.children].length > 0 ? true : false
        })
        this.$nextTick(() => {
          $.fn.zTree.init($('#' + this.treeId), this.setting, this.treeNodes)
          this.zTreeObj = $.fn.zTree.getZTreeObj(this.treeId)
          var node = this.zTreeObj.getNodeByParam('id', this.nodeId, null)
          this.$emit('initZtree', this.zTreeObj)

          if (this.showAll) {
            this.zTreeObj.expandNode(this.zTreeObj.getNodeByParam('id', '-1'))
          }
          if (this.nodeId) {
            this.expandNode(node)
          }
        })
      }
    },
    expandNode(node) {
      if (node) {
        this.zTreeObj.expandNode(node, true, true, true)
      }
    },
    zTreeOnClick(event, treeId, treeNode) {
      this.selectNode = treeNode
      this.$emit('selectedNode', treeNode)
    },
    zTreeOnCheck(event, treeId, treeNode) {
      this.checkNode = treeNode
      const zTree = $.fn.zTree.getZTreeObj(this.treeId)
      this.checkAllNodes = zTree.getCheckedNodes(true)
      this.$emit('checkedNode', treeNode, this.checkAllNodes)
    },
    // 展开树节点
    onExpand(event, treeId, treeNode) {
      if (treeNode.isLeaf === 'Y' || (treeNode[this.children] && treeNode[this.children].length > 0)) {
        // 子节点或者是父节点里有childeren，就不走接口
        return
      }
      axios.get(this.expandUrl, { params: this.expandParams }).then(result => {
        if (result.data) {
          result.data.forEach(item => {
            item.isParent = item.isLeaf !== 'Y' // N是父节点
            if (treeNode.checked) {
              this.zTree.checkNode(item, true, true)
            }
          })
          const treeObj = $.fn.zTree.getZTreeObj(this.treeId)
          const parentZNode = treeObj.getNodeByParam('id', treeNode.id, null)
          treeNode.children = []
          treeObj.refresh()
          treeObj.addNodes(parentZNode, result.data, false)
        }
      })
    },
    addHoverDom(treeId, treeNode) {
      this.$emit('addHoverDom', treeId, treeNode, this.zTreeObj)
    },
    removeHoverDom(treeId, treeNode) {
      this.$emit('removeHoverDom', treeId, treeNode, this.zTreeObj)
    }
  },
  watch: {
    treeData: {
      handler(newVal) {
        this.initTree(newVal)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.tree-search .el-input__suffix {
  top: 4px !important;
}
</style>
