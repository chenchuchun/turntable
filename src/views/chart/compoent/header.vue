<template>
  <div class="title">
    <div style="font-size: 20px;margin-left: 55px;margin-bottom: 40px;">{{ formattedTime }}</div>
    <div style="padding: 10px;">{{ title }}</div>
  </div>
</template>

<script setup>
import { defineProps,onMounted,toRefs,ref } from 'vue'
const props = defineProps({title:String})
const{title} = toRefs(props)
const currentTime = ref(null);
const formattedTime = ref(null)
const setNowTime =()=>{
  currentTime.value = new Date();
  formattedTime.value = currentTime.value.toLocaleString('zh-CN', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
}
onMounted(()=>{
  setInterval(()=>{
    setNowTime();
  },1000)
})
</script>

<style scoped>
.title{
  font-size: 40px;
  font-weight: 800;
  color: white;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-image: url("../img/topbg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  text-shadow: 0.1em 0.1em blue;
  gap: 35%;
}

</style>