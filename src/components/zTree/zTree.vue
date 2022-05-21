<template>
  <div>
    <div v-show="isShowSearch">
      <el-input v-model="likeName" placeholder="请输入关键字" @change="searchTree">
        <i slot="suffix" class="iconfont iconsousuo" @click="searchTree"></i>
      </el-input>
    </div>
    <div class="">
      <div class="" :id="treeId"></div>
    </div>
  </div>
</template>

<script>
// import 'ztree'
// import './assets/zTree/css/metroStyle/metroStyle.css'
// 	import './assets/zTree/js/jquery-1.4.4.min.js'
// 	import './assets/zTree/js/jquery.ztree.all.js'
// 	import './assets/zTree/js/jquery.ztree.exhide.js'

import 'ztree/css/metroStyle/metroStyle.css'
import 'ztree/js/jquery.ztree.all'
import 'ztree/js/jquery.ztree.exhide.js'

import myAxios from '@/service/http'

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
      },
      nodes: []
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
      if (!this.likeName) {
        this.initTree(this.treeData)
      } else {
        // this.searchFun(this.likeName)
        $.fn.zTree.init($('#' + this.treeId), this.setting, this.treeNodes)
        this.zTreeObj = $.fn.zTree.getZTreeObj(this.treeId)

        if (this.showAll) {
          this.zTreeObj.expandNode(this.zTreeObj.getNodeByParam('id', '-1'))
        }

        this.$nextTick(() => {
          this.searchFun(this.likeName, null, true)
        })
      }
    },
    // 初始化树节点
    initTree(data) {
      /*this.treeNodes = treeData.data
      this.zTreeObj = $.fn.zTree.init($('#' + this.treeId), this.setting, this.treeNodes)*/
      // this.zTreeObj.expandAll(true)
      // 如果传了url，就调用接口，否则就走数据
      if (this.url) {
        myAxios
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
                debugger
                $.fn.zTree.init($('#' + this.treeId), this.setting, this.treeNodes)
                this.zTreeObj = $.fn.zTree.getZTreeObj(this.treeId)

                this.$emit('initZtree', this.zTreeObj)

                if (this.showAll) {
                  this.zTreeObj.expandNode(this.zTreeObj.getNodeByParam('id', '-1'))
                }
              })
            }
          })
          .catch(function (error) {
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
    },
    // 以下是模糊匹配的方法
    searchFun(val, isHighLight, isExpand) {
      var key = val.replace(/(^\s*)|(\s*$)/g, '')
      this.nodesShow = []
      isHighLight = isHighLight === false ? false : true
      isExpand = isExpand ? true : false
      // var nodes = this.zTreeObj.transformToArray(this.zTreeObj.getNodes())
      let allNodes = this.zTreeObj.transformToArray(this.zTreeObj.getNodes())

      this.filterzTree(key, allNodes, isExpand, isHighLight)
      if (this.keyValue === '') {
        this.noData = false
      } else {
        if (this.nodesShow.length === 0) {
          this.noData = true
        } else {
          this.noData = false
        }
      }
      this.showNodesFun(this.nodesShow, key)
    },
    // queryFun(node) {
    //   for (var i in node) {
    //     this.nodes.push(node[i])
    //     if (node[i][this.children] && node[i][this.children].length > 0) {
    //       this.queryFun(node[i].children)
    //     }
    //   }
    //   return this.nodes
    // },
    filterzTree(key, nodes, isExpand, isHighLight) {
      var metaChar = '[\\[\\]\\\\^\\$\\.\\|\\?\\*\\+\\(\\)]'
      var rexMeta = new RegExp(metaChar, 'gi')
      var nameKey = 'name'
      for (var i = 0; i < nodes.length; i++) {
        debugger
        if (nodes[i] && nodes[i].oldname && nodes[i].oldname.length > 0) {
          debugger
          nodes[i][nameKey] = nodes[i].oldname
        }
        this.zTreeObj.updateNode(nodes[i])
        if (key === '') {
          this.initzTree()
          break
        } else {
          if (nodes[i][nameKey] && nodes[i][nameKey].toLowerCase().indexOf(key.toLowerCase()) !== -1 && nodes[i].isLeaf === 'Y') {
            if (isHighLight) {
              var newKeywords = key.replace(rexMeta, matchStr => {
                return '//' + matchStr
              })
              nodes[i].oldname = nodes[i][nameKey]
              var rexGlobal = new RegExp(newKeywords, 'gi')
              debugger
              nodes[i][nameKey] = nodes[i].oldname.replace(rexGlobal, originalText => {
                var highLightText = '<span style="color: whitesmoke;background-color: darkred;">' + originalText + '</span>'
                // name = setting.view.nameIsHTML ? nameStr : nameStr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return highLightText
              })
              this.zTreeObj.updateNode(nodes[i])
            }
            this.zTreeObj.showNode(nodes[i])
            this.nodesShow.push(nodes[i])
          } else {
            this.zTreeObj.hideNode(nodes[i])
          }
        }
      }
    },
    showNodesFun(nodesShow, key) {
      if (key.length > 0) {
        nodesShow.forEach(node => {
          var pathOfOne = node.getPath()
          if (pathOfOne && pathOfOne.length > 0) {
            for (var i = 0; i < pathOfOne.length - 1; i++) {
              this.zTreeObj.showNode(pathOfOne[i])
              this.zTreeObj.expandNode(pathOfOne[i], true)
            }
          }
        })
      } else {
        var rootNodes = this.zTreeObj.getNodesByParam('level', '0')
        rootNodes.forEach(node => {
          this.zTreeObj.expandNode(node, true)
        })
      }
    }

    // searchFun(value) {
    //   let allNode = this.zTreeObj.transformToArray(this.zTreeObj.getNodes())
    //   this.zTreeObj.hideNodes(allNode) //隐藏所有节点
    //   let hiddenNodes = this.zTreeObj.getNodesByParamFuzzy('name', value, null) //搜索含有value关键字的节点
    //   hiddenNodes = this.zTreeObj.transformToArray(hiddenNodes) //转化为数组
    //   for (let n in hiddenNodes) {
    //     //遍历
    //     this.findParent(this.zTreeObj, hiddenNodes[n], hiddenNodes) //找到其父节点
    //   }
    //   this.zTreeObj.showNodes(hiddenNodes) //显示满足的所有节点
    //   this.highlightAndExpand_ztree(hiddenNodes)
    // },
    // findParent(treeObj, node, hiddenNodes) {
    //   treeObj.expandNode(node, true, true, true) //展开treeObj中所有节点并获得焦点
    //   let pNode = node.getParentNode() //获取父节点
    //   this.findNextNode(node, hiddenNodes) //后一个节点
    //   this.findPreNode(node, hiddenNodes) //前一个节点
    //   if (pNode != null) {
    //     hiddenNodes.push(pNode) //
    //     this.findParent(treeObj, pNode, hiddenNodes) //递归查询上上一级父节点
    //   }
    // },
    // findNextNode(node, hiddenNodes) {
    //   let nextNode = node.getNextNode()
    //   if (nextNode != null) {
    //     if (nextNode.level === 1) {
    //       return
    //     }
    //     hiddenNodes.push(nextNode)
    //     let children = nextNode[this.children]
    //     if (children) {
    //       for (let i in children) {
    //         hiddenNodes.push(children[i])
    //       }
    //     }
    //     this.findNextNode(nextNode, hiddenNodes) //递归获取
    //   }
    // },
    // findPreNode(node, hiddenNodes) {
    //   let preNode = node.getPreNode()
    //   if (preNode != null) {
    //     if (preNode.level === 1) {
    //       return
    //     }
    //     hiddenNodes.push(preNode)
    //     let children = preNode[this.children] //获取节点的子节点集合
    //     if (children) {
    //       for (let i in children) {
    //         hiddenNodes.push(children[i])
    //       }
    //     }
    //     this.findPreNode(preNode, hiddenNodes)
    //   }
    // },
    // highlightAndExpand_ztree(highlightNodes) {
    //   debugger
    //   //先把全部节点更新为普通样式
    //   for (let i = 0; i < highlightNodes.length; i++) {
    //     highlightNodes[i].highlight = false
    //     this.zTreeObj.updateNode(highlightNodes[i])
    //   }
    //   //把指定节点的样式更新为高亮显示，并展开
    //   if (highlightNodes != null) {
    //     for (let i = 0; i < highlightNodes.length; i++) {
    //       //高亮显示节点，并展开
    //       highlightNodes[i].highlight = true
    //       let t = highlightNodes[i].name
    //       t = "<span style='color:red'>" + t + '</span>' //改变颜色
    //       highlightNodes[i].name = t
    //       this.zTreeObj.updateNode(highlightNodes[i]) //执行修改
    //       this.zTreeObj.expandNode(highlightNodes[i], true, true, true)
    //     }
    //   }
    // }
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
