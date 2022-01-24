<template>
  <div>
    <arTreeSelect
      v-model="cocode"
      :treeData="resourceTree"
      :defaultProps="defaultProps"
      clearable
      ref="agency"
      :disabled="disabled"
      @change="changeAgency"
      placeholder="请选择单位"
      :isClearable="isClearable"
    >
    </arTreeSelect>
  </div>
</template>

<script>
import arTreeSelect from './arTreeSelect.vue'
import { commonAPI } from '../service/api/commonAPI'
export default {
  name: 'arSelectAgency',
  components: {
    arTreeSelect
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    // value: {
    //   // 有些场景下需要取传进来的值，开放此入口
    //   type: String,
    //   default: ''
    // },
    // allowSetValue: {
    //   // 是否允许手动设置值（默认取缓存），配合value使用，因为光靠value的有无判断是否设置值不够牢靠
    //   type: Boolean,
    //   default: false
    // },
    isClearable: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      commonData: {},
      cocode: '',
      resourceTree: [], // 下拉树数据
      defaultProps: {
        children: 'sonList',
        label: 'name',
        id: 'id'
      }
    }
  },
  mounted() {
    this.commonData = this.$getCommonData
    this.getTreeData()
  },
  methods: {
    getTreeData() {
      let that = this
      commonAPI.getAgencyList().then(res => {
        if (res.data.flag === 'SUCCESS') {
          that.resourceTree = res.data.data
          this.cocode = this.commonData.svAgencyCode
          // 需求 如果是sa登录需要显示系统默认20210619 CWYXM-26407
          if (that.commonData.svUserCode === 'sa') {
            that.resourceTree.unshift({
              id: '*',
              isLeaf: 'Y',
              name: '系统默认'
            })
          }
          // 根据当前登陆用户的svAgencyCode值默认选中单位
          // ie11 强行赋值默认单位， 暂时没有更好的办法

          // this.$nextTick(() => {
          //   if (this.allowSetValue) {
          //     that.cocode = this.value
          //   } else {
          //     that.cocode = that.commonData.svAgencyCode
          //   }
          //   function fn(arr, id, ref) {
          //     if (Array.isArray(arr) && arr.length > 0) {
          //       arr.forEach((v, i) => {
          //         if (v.chrCode === id) {
          //           ref.agency.selectedLabel = v.codename
          //           // console.log(ref)
          //           return
          //         } else if (v.children) {
          //           fn(v.children, id, ref)
          //         }
          //       })
          //     }
          //   }
          //   if (!!window.ActiveXObject || 'ActiveXObject' in window) {
          //     setTimeout(() => {
          //       fn(that.resourceTree, that.commonData.svAgencyCode, that.$refs)
          //     }, 1000)
          //   }
          // })
        }
      })
    },
    changeAgency(val) {
      this.$emit('changeAgency', val)
    }
  }
}
</script>
<style></style>
