<!-- 树形组件封装，所有的树都是用这个组件 -->
<template>
  <div v-clickoutside="handleDropDownClose">
    <el-input clearable v-model="selectLabel" ref="reference" @click.native="toggleDropDown" suffix-icon="el-icon-caret-bottom"></el-input>

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

export default {
  name: 'selectDropdown',
  // mixins: [Emitter, Locale],
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
    }
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
      searchValue: '',
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ]
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
    searchValue(val) {
      this.$refs.tree.filter(val)
    }
  },
  beforeDestroy() {
    if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize)
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
      this.visible = false
      this.selectLabel = data[this.defaultProps.label]
      this.$emit('change', data)
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
