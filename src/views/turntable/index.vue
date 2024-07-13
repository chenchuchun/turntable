<template>
  <div>
    <turntable :baseData="baseData" :btnOption="btnOption" :backOption="backOption"></turntable>
  </div>
</template>

<script setup>
import {ref,reactive} from 'vue'
import turntable from './turntable.vue'
const baseData = ref( [{
    label:"上班",
    color:"#FFE7E8",
    backImage:"/download (1).png"
  },
  {
    label:"摸鱼1",
    color:"#FFFFFF",
    backImage:"/download (2).png"
  },
  {
    label:"摸鱼2",
    color:"#FFE7E8",
    backImage:"/download (3).png"
  },
  {
    label:"摸鱼3",
    color:"#FFFFFF",
    backImage:"/download (4).png"
  },
  {
    label:"摸鱼4",
    color:"#FFE7E8",
    backImage:"/black.png"
  },
  {
    label:"摸鱼5",
    color:"#FFFFFF",
    backImage:"/download (5).png"
  },
])
const btnOption = reactive({
  type:"image", // btn or image
  backGroud:"/btn-back.png", // src or colors
  backGroudSecond:"white", // 指针的背景颜色
  pointerColor:"white", // 指针颜色
})
const backOption = reactive({
  type:"image", // image or default
  backGroud:"/bg3.png" // src or colors
})
</script>