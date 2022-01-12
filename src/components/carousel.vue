<!-- 顶部轮播组件 -->
<template>
  <div ref="scroll-box" class="scroll-box">
    <span @click="prev">
      <img class="img-size-20" src="../assets/img/left.png" />
    </span>
    <span @click="next">
      <img class="img-size-20" src="../assets/img/right.png" />
    </span>
    <div ref="scroll-box-wrap" class="scroll-box-wrap" :style="{ width: carouselWidth * (carouselArrNew.length + 1) + 'px' }">
      <div v-for="(arr, index) in carouselArrNew" :key="index">
        <ul :style="{ width: carouselWidth + 'px' }">
          <li v-for="item in arr" :key="item.id" :title="item.billName">{{ item.billName }}</li>
        </ul>
      </div>
      <div v-for="(arr, index) in carouselArrNew" :key="index + 'a'">
        <ul :style="{ width: carouselWidth + 'px' }" v-if="index === 0">
          <li v-for="item in arr" :key="item.id">{{ item.billName }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'carousel',
  props: {
    carouselArr: {
      type: Array,
      default() {
        return []
      }
    },
    carouselWidth: {
      type: Number,
      default: 0
    },
    carouselSize: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      now: 0,
      len: 0,
      carouselArrNew: []
    }
  },
  mounted() {},
  computed: {},
  watch: {
    carouselArr: {
      handler(v) {
        this.carouselArrNew = []
        for (let i = 0; i < v.length; i += this.carouselSize) {
          this.carouselArrNew.push(v.slice(i, i + this.carouselSize))
        }
        this.len = this.carouselArrNew.length
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    prev() {
      if (this.len === 1) {
        return
      }
      // 后退
      this.now--
      this.tab()
    },
    next() {
      if (this.len === 1) {
        return
      }
      // 前进
      this.now++
      this.tab()
    },
    tab() {
      debugger
      let len = this.len
      // 此处移动的动画使用了jq的animate，省去css移动效果编写
      let el = this.$refs['scroll-box-wrap']
      if (this.now === len) {
        $(el)
          .stop()
          .animate(
            {
              left: -this.carouselWidth * this.now + 'px'
            },
            () => {
              $(el).css({
                left: '0px'
              })
            }
          )
        this.now = 0
      } else if (this.now === -1) {
        $(el).css({
          left: -this.carouselWidth * this.len + 'px'
        })
        this.now = this.len - 1
        $(el)
          .stop()
          .animate({
            left: -this.carouselWidth * this.now + 'px'
          })
      } else {
        $(el)
          .stop()
          .animate({
            left: -this.carouselWidth * this.now + 'px'
          })
      }
    }
  }
}
</script>

<style lang="scss">
.scroll-box {
  .img-size-20 {
    width: 20px;
    height: 20px;
  }
  position: relative;
  height: 100px;
  overflow: hidden;
  background: white;
  box-shadow: 0px 1px 2px 0px rgb(0 0 0 / 20%);
  border-radius: 3px;
  & > span {
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    text-align: center;
    transform: translateY(-50%);
  }
  & > span:nth-of-type(1) {
    position: absolute;
    left: 16px;
    top: 50%;
    cursor: pointer;
    z-index: 11;
  }
  & > span:nth-of-type(2) {
    position: absolute;
    right: 16px;
    top: 50%;
    cursor: pointer;
    z-index: 11;
  }
  .scroll-box-wrap {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    ul {
      margin: 10px 0;
      display: flex;
      float: left;
      flex-wrap: wrap;
      align-items: flex-start;
      height: 80px;
      padding: 0 50px;
      & > li:nth-of-type(3n + 1) {
        margin-left: 0;
      }
      li {
        padding-left: 14px;
        width: 20%;
        position: relative;
        margin: 8px 0;
        margin-left: 20%;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        cursor: pointer;
        &::before {
          content: '';
          position: absolute;
          left: 0px;
          top: 6px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #0066ff;
          border: 2px solid #e5efff;
        }
      }
    }
  }
}
</style>
