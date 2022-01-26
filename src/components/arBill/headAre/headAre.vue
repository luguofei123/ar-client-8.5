<!-- 单据头部 -->
<template>
  <div class="headAre">
    <div class="headMoney">
      <span class="title">
        <i class="iconfont iconbaoxiaodan"></i>
        <span>经费报销单</span>
      </span>
      <div class="money">
        <span>
          <em>报销金额</em>
          <i>¥0.00</i>
        </span>
        <span>|</span>
        <span>
          <em>报销金额</em>
          <i>¥0.00</i>
        </span>
      </div>
    </div>
    <div class="navBar">
      <i class="el-icon-arrow-left" v-if="false"></i>
      <ul>
        <li :key="index" v-for="(item, index) in tplData.areaLeft" :class="nowIndex === index ? 'active-now' : ''">
          <span @click="toStepNormal(index)">{{ item.aliasName }}</span>
          <i></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headAre',
  data() {
    return {
      nowIndex: 0
    }
  },
  props: ['tplData'],
  methods: {
    toStepNormal(index) {
      this.nowIndex = index
      // setTimeout(() => {
      //   $('.el-step__line-inner').css({
      //     width: '100%'
      //   })
      // })
      // if (ind === 0) {
      //   this.$nextTick(() => {
      //     $('.left-room-box').get(0).scrollTop = '0'
      //   })
      // } else {
      //   this.$nextTick(() => {
      //     $('.left-room-box').get(0).scrollTop = this.sidesTopArr[ind]
      //   })
      // }
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style scoped lang="scss">
.headAre {
  background: #fff;
  .headMoney {
    position: relative;
    background: #e5efff;
    line-height: 40px;
    height: 40px;
    .title {
      position: absolute;
      height: 40px;
      left: 16px;
      .iconfont {
        color: #06f;
      }
      span {
        font-size: 14px;
        font-weight: 600;
        margin-left: 10px;
      }
    }
    .money {
      text-align: center;
      height: 30px;
      padding-top: 5px;
      span {
        em {
          font-style: normal;
          font-weight: 600;
          margin-right: 5px;
        }
        i {
          font-style: normal;
          color: #f3830b;
        }
      }
      & > span:nth-child(2) {
        margin-right: 10px;
        margin-left: 10px;
        color: #e8e8e8;
      }
    }
  }
  .navBar {
    height: 40px;
    ul {
      display: flex;
      padding-left: 7%;
      height: 100%;
      align-items: center;
      justify-content: center;
      position: relative;
      li {
        width: 180px;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          flex: 1;
          display: block;
          height: 1px;
          background: #bbbbbb;
          margin: 0 20px;
        }
        span {
          padding: 0 8px;
          width: 88px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 28px;
          line-height: 28px;
          border-radius: 15px;
          cursor: pointer;
          border: 1px solid #bbbbbb;
          color: #333;
        }
      }
      & > li:last-child {
        display: inline-block;
        i {
          display: none;
        }
      }
      li.active-now {
        span {
          color: #fff;
          background: #0066ff;
          border-radius: 15px;
          border: 1px solid #0066ff;
        }
      }
    }
  }
}
</style>
