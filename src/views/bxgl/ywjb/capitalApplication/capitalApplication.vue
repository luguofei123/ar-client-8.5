<template>
  <div class="cap_container">
    <div class="cap_top">
      <div class="card">
        <p>
          <img class="img-size-14" src="../../../../assets/img/capital_icon_blue.png" alt="" />
          <b>资金申请</b>
          <span>事前申请业务</span>
          <img class="img-size-14" src="../../../../assets/img/private_set.png" alt="" />
        </p>
        <div ref="scroll-content">
          <carousel :carouselArr="carouselArr" :carouselWidth="carouselWidth" :carouselSize="6"> </carousel>
        </div>
      </div>
      <div class="card">
        <p>
          <img class="img-size-14" src="../../../../assets/img/capital_icon_blue.png" alt="" />
          <b>资金申请</b>
          <span>事前申请业务</span>
          <img class="img-size-14" src="../../../../assets/img/private_set.png" alt="" />
        </p>
        <div ref="scroll-content">
          <carousel :carouselArr="carouselArr" :carouselWidth="carouselWidth" :carouselSize="6"> </carousel>
        </div>
      </div>
    </div>
    <div class="cap_tap">
      <arTab>
        <div style="display: flex">
          <el-button style="margin-right: 10px">委托收单</el-button>
          <el-input class="w-300" v-model="test">
            <i slot="suffix" class="iconfont iconsousuo"></i>
          </el-input>
        </div>
      </arTab>
      <div class="table">
        <arTable></arTable>
      </div>
      <div class="pagination">
        <el-pagination :current-page="1" :page-sizes="[10, 20, 50, 100, 500]" :page-size="10" layout="total, prev, pager, next, sizes" :total="0">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import carousel from '../../../../components/carousel'
import arTable from '../../../../components/arTable/arTable.vue'
import arTab from '../../../../components/arTab.vue'
export default {
  data() {
    return {
      carouselArr: [
        { id: 1, name: '差旅费申请1' },
        { id: 2, name: '差旅费申请2' },
        { id: 3, name: '差旅费申请3' },
        { id: 4, name: '差旅费申请4' },
        { id: 5, name: '差旅费申请5' },
        { id: 6, name: '差旅费申请6' },
        { id: 7, name: '差旅费申请7' },
        { id: 8, name: '差旅费申请8' },
        { id: 9, name: '差旅费申请9' },
        { id: 10, name: '差旅费申请10' },
        { id: 11, name: '差旅费申请11' },
        { id: 12, name: '差旅费申请12' },
        { id: 13, name: '差旅费申请13' }
      ],
      carouselWidth: 0,
      test: ''
    }
  },
  mounted() {
    this.carouselWidth = this.$refs['scroll-content'].offsetWidth
  },
  components: {
    carousel,
    arTable,
    arTab
  }
}
</script>

<style lang="scss" scoped>
.cap_container {
  padding: 10px;
  .cap_top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .card {
      width: 100%;
      flex-basis: 49.5%;
      border-radius: 3px;
      box-shadow: 0px 1px 2px 0px rgb(0 0 0 / 20%);
      p {
        padding-left: 10px;
        height: 40px;
        background: #e5efff;
        line-height: 40px;
        span {
          margin-left: 10px;
          font-size: 12px;
        }
        b {
          margin-left: 5px;
        }
        img {
          position: relative;
          top: 1px;
        }
        img:last-child {
          float: right;
          margin-top: 12px;
          margin-right: 10px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
  .cap_tap {
    background: white;
    padding: 10px 10px;
    border-radius: 3px;
    box-shadow: 0px 1px 2px 0px rgb(0 0 0 / 20%);
    .table {
      margin-top: 10px;
    }
    .pagination {
      display: flex;
      justify-content: flex-end;
      margin-right: -20px;
      margin-top: 10px;
    }
  }
}
</style>
