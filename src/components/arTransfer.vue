<!-- 穿梭门 -->
<template>
  <div class="box">
    <div class="left">
      <p>可使用数据</p>
      <el-input v-model="filterWordLeft" placeholder="请输入关键字"> </el-input>
      <ul>
        <li v-for="(item, index) in leftDataList" :key="index" v-show="item.isShow !== 'Y' && item.billName.includes(filterWordLeft)">
          <span>{{ item.billName }}</span>
          <span>
            <i slot="reference" class="el-icon-minus" @click="toRight(item, index)"></i>
          </span>
        </li>
      </ul>
    </div>
    <div class="right">
      <p>已使用数据</p>
      <el-input v-model="filterWordRight" placeholder="请输入关键字"> </el-input>
      <ul>
        <li v-for="(item, index) in rightDataList" :key="index" v-show="item.billName.includes(filterWordRight)">
          <span>{{ item.billName }}</span>
          <span>
            <el-switch
              v-if="isShowFixed"
              @change="changeFixed(item)"
              v-model="item.fixed"
              active-value="Y"
              inactive-value="N"
              :width="50"
              style="margin-right: 10px"
            >
            </el-switch>
            <i v-if="isShowMove" slot="reference" :class="['el-icon-top', index === 0 ? 'disable' : '']" @click="logMove('UP', item, index)"></i>
            <i
              v-if="isShowMove"
              slot="reference"
              :class="['el-icon-bottom', index === rightDataList.length - 1 ? 'disable' : '']"
              @click="logMove('DOWN', item, index)"
            ></i>
            <i slot="reference" class="el-icon-minus" @click="toLeft(item, index)"></i>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'carousel',
  props: ['TransferDataList', 'isShowMove', 'isShowFixed'],
  data() {
    return {
      leftDataList: [],
      rightDataList: [],
      filterWordLeft: '',
      filterWordRight: ''
    }
  },
  mounted() {
    this.leftDataList = this.TransferDataList.filter(item => item.isUsed === 'N')
    this.rightDataList = this.TransferDataList.filter(item => item.isUsed === 'Y')
  },
  computed: {},
  watch: {},
  methods: {
    // 删除左侧数据，移动到右侧
    toRight(item, index) {
      this.leftDataList.splice(index, 1)
      item.isUsed = 'Y'
      this.rightDataList.push(item)
    },
    toLeft(item, index) {
      this.rightDataList.splice(index, 1)
      item.isUsed = 'N'
      this.leftDataList.push(item)
    },
    logMove(type, item, index) {
      let tem = null
      if (type === 'UP') {
        tem = JSON.parse(JSON.stringify(this.rightDataList[index - 1]))
        this.$set(this.rightDataList, index - 1, item)
        this.$set(this.rightDataList, index, tem)
      }
      if (type === 'DOWN') {
        tem = JSON.parse(JSON.stringify(this.rightDataList[index + 1]))
        this.$set(this.rightDataList, index + 1, item)
        this.$set(this.rightDataList, index, tem)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: space-between;
  & > div {
    width: 49%;
    & > p {
      margin-bottom: 5px;
    }
    & > ul {
      height: 250px;
      display: flex;
      margin-top: 10px;
      flex-direction: column;
      border: 1px solid #dedede;
      padding-bottom: 10px;
      overflow-y: auto;

      li {
        display: flex;
        padding: 4px 10px 4px 10px;
        justify-content: space-between;
        border-bottom: 1px solid #dedede;
        &:hover {
          background: #f1f6ff;
        }
        i {
          display: inline-block;
          width: 20px;
          &:hover {
            cursor: pointer;
          }
        }
        i.disable {
          pointer-events: auto !important;
          cursor: not-allowed !important;
        }
      }
    }
  }
}
</style>
