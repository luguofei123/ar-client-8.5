<!-- 树形组件封装，所有的树都是用这个组件 -->
<template>
  <div v-clickoutside="handleDropDownClose">
    <el-input clearable v-model="selectValue" ref="reference" @click.native="toggleDropDown" suffix-icon="el-icon-caret-bottom"></el-input>

    <transition name="el-zoom-in-top">
      <select-drop-down ref="popper" v-show="visible" class="select-drop-down">
        <el-input v-model="searchValue" suffix-icon="el-icon-date"></el-input>
        <el-scrollbar tag="div" wrap-class="el-select-dropdown__wrap" view-class="el-select-dropdown__list" class="is-empty">
          <el-tree ref="tree" default-expand-all highlight-current :data="treeData" :node-key="defaultProps.id" :props="defaultProps"> </el-tree>
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
  props: [],
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
      selectValue: '',
      searchValue: '',
      treeData: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
        id: 'id'
      }
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
      } else {
        removeClass(icon, 'is-reverse')
      }
    }
  },
  beforeDestroy() {
    if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize)
  },
  methods: {
    handleResize() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width
    },
    toggleDropDown() {
      this.visible = !this.visible
      if (!this.visible) {
        this.searchValue = ''
      }
    },
    handleDropDownClose() {
      this.searchValue = ''
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
