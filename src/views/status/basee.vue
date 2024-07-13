<template>
  <div class="app-container">
    <el-button type="success" @click="getPro">进入填写</el-button>
  </div>
</template>

<script setup>
import localforage from 'localforage'
import { ElMessage, ElMessageBox } from 'element-plus'
import {useRouter} from 'vue-router'
const router = useRouter()
const getPro = () =>{
  const myIndexedDB = localforage.createInstance({
    name: 'myIndexedDB',
  })
  myIndexedDB.getItem("statusActive").then(function (value) {
   if(value){
      ElMessageBox.alert('注意到你上次有未填完的内容,是否继续?', '提示', {
        confirmButtonText: '确定',
        callback: (action) => {
          router.push(`/status/${value}`)
        },
      })
    }else{
      router.push({path:"/status/first"})
    }
  }).catch(function (err) {
    console.log(err);
  });
}
</script>

<style lang="scss" scoped>

</style>