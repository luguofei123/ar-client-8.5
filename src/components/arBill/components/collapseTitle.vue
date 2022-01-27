<!-- 折叠版头部自定义-->
<template>
  <div class="baseAreHead" @click.stop="cancelHeaderClickFn">
    <div class="title">
      <img src="../../../assets/img/decorate_icon_normal.png" alt="" />
      <span class="text">{{ aliasName }}</span>
    </div>
    <div class="button">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'collapseTitle',
  props: ['aliasName'],
  methods: {
    cancelHeaderClickFn() {
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.baseAreHead {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  .title {
    font-weight: 600;
    margin-left: 10px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    img {
      margin-right: 5px;
    }
    .text {
      color: #333 !important;
    }
  }
  .button {
    span {
      margin: 0 8px;
      color: rgb(0, 102, 255);
      &:hover {
        cursor: pointer;
      }
    }
  }
  &:hover {
    cursor: default;
  }
}
</style>
