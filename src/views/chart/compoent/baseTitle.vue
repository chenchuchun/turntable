<template>
  <div class="header">
    <div class="first-title">
      <div style="margin: 0px 10px;padding-bottom: 5px;">{{ title }}</div>
      <div class="bottom-line"></div>
    </div>
    <div class="bottom-lines"></div>
  </div>
</template>

<script setup>
import { defineProps,onMounted,toRefs,ref } from 'vue'
const props = defineProps({title:String})
const{title} = toRefs(props)
</script>

<style lang="scss" scoped>
.base-img{
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.header{
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
}
.first-title{
  display: flex;
  flex-direction: column;
  // width: 200px;
  color: white;
  font-weight: 500
}
.bottom-line{
  @extend .base-img;
  background-image: url("../img/line1.png");
  // height: 5px;
  width: 100%;
  padding-bottom: 5px;
  padding-right: 20px
}
.bottom-lines{
  @extend .base-img;
  background: url(../img/line2.png) no-repeat bottom right;
  height: 12px;
  width: 300px;
  margin-bottom: 5px;
}
</style>