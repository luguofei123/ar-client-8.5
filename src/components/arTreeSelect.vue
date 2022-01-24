<!-- 树形组件封装，所有的树都是用这个组件 -->
<template>
  <div v-clickoutside="handleDropDownClose">
    <el-input
      :clearable="clearable"
      v-model="selectLabel"
      :placeholder="placeholder"
      ref="reference"
      @click.native="toggleDropDown"
      suffix-icon="el-icon-caret-bottom"
      :disabled="disabled"
    ></el-input>

    <transition name="el-zoom-in-top">
      <select-drop-down ref="popper" v-show="visible" class="select-drop-down">
        <el-input v-model="searchValue" suffix-icon="el-icon-search"></el-input>
        <el-scrollbar tag="div" wrap-class="el-select-dropdown__wrap" view-class="el-select-dropdown__list" class="is-empty">
          <el-tree
            ref="tree"
            :filter-node-method="filterNode"
            default-expand-all
            highlight-current
            :data="treeData"
            @node-click="handleNodeClick"
            :node-key="defaultProps.id"
            :props="defaultProps"
          >
          </el-tree>
        </el-scrollbar>
      </select-drop-down>
    </transition>
  </div>
</template>
<script type="text/babel">
// import Emitter from 'element-ui/src/mixins/emitter'
// import Locale from 'element-ui/src/mixins/locale'
import selectDropDown from 'element-ui/packages/select/src/select-dropdown.vue'
// import scrollBar from 'element-ui/packages/scrollbar/index.js'
import Clickoutside from 'element-ui/src/utils/clickoutside'
import { addClass, removeClass, hasClass } from 'element-ui/src/utils/dom'
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'
import treeter from '../commonUtils/utils/treeter'

export default {
  name: 'arTreeSelect',
  mixins: [treeter],
  props: {
    defaultProps: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label',
          id: 'id'
        }
      }
    },
    treeData: {
      type: Array,
      default() {
        return []
      }
    },
    placeholder: {
      type: String,
      default() {
        return ''
      }
    },
    clearable: {
      type: Boolean,
      default() {
        return true
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    value: {}
  },
  components: {
    selectDropDown
  },
  directives: {
    Clickoutside
  },
  data() {
    return {
      visible: false,
      inputWidth: 0,
      selectLabel: '',
      selectId: '',
      searchValue: ''
    }
  },
  mounted() {
    addResizeListener(this.$el, this.handleResize)
  },
  watch: {
    visible(flag) {
      let icon = this.$el.querySelector('.el-input__icon')
      if (flag) {
        addClass(icon, 'is-reverse')
        this.searchValue = ''
      } else {
        removeClass(icon, 'is-reverse')
      }
    },
    // v-model传的值过来的
    value: {
      handler(newVal, oldVal) {
        if (typeof newVal === 'string' && newVal) {
          this.selectTreeNode(newVal)
        }
      },
      deep: true,
      immediate: true
    },
    searchValue(val) {
      this.$refs.tree.filter(val)
    }
  },
  beforeDestroy() {
    if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize)
  },
  methods: {
    // 设置选中的数据
    selectTreeNode(id) {
      let obj = this.findFromTree(this.treeData, id, this.defaultProps.id, this.defaultProps.children)
      this.selectLabel = obj[this.defaultProps.label]
      this.selectId = obj[this.defaultProps.id]
      this.$emit('change', obj)
    },
    handleNodeClick(obj) {
      console.log(obj)
      this.visible = false
      this.selectLabel = obj[this.defaultProps.label]
      this.selectId = obj[this.defaultProps.id]
      this.$emit('change', obj)
    },
    // 树模糊搜索
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    handleResize() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width
    },
    toggleDropDown() {
      this.visible = !this.visible
    },
    handleDropDownClose() {
      this.visible = false
    }
  }
}
</script>
<style scoped>
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms, opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
  transform-origin: center top;
}
.el-zoom-in-top-enter,
.el-zoom-in-top-leave-active {
  opacity: 0;
  transform: scaleY(0);
}
/* .select-drop-down {
  padding: 5px;
} */
</style>
