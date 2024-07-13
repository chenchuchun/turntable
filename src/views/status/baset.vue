<template>
  <div class="base" style="width: 20vw;">
  <el-button @click="goback"> 返回上一级 </el-button>
    <el-form :model="formInline" class="demo-form-inline">
      <el-form-item label="name1">
        <el-input v-model="formInline.name" placeholder="base" clearable />
      </el-form-item>
      <el-form-item label="age1">
        <el-input v-model="formInline.age" placeholder="base" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<!-- localForage 主要是想实现一个状态机器的功能 -->
<script setup>
import localforage from 'localforage' 
import Status from '../../hooks/status'
import { nextTick, onMounted, reactive,ref } from 'vue';
import {useRouter} from 'vue-router'
const formInline = reactive({
  name:"",
  age:""
})
const myIndexedDB = ref(null)
const router = useRouter();
// 打算通过pinia 来管理的当前的逻辑
const onSubmit = async()=>{
  // const statusB = new Status('first')
  const message = await myIndexedDB.value.getItem("statusActive")
  const statusB = await new Status(message);
  // const nextStatus =  await statusB.changeStatus("next")
  // const base = statusB.changeStatus("next")
  // myIndexedDB.value.setItem("statusActive", nextStatus.nowStatus());
  myIndexedDB.value.setItem("statusActiveSecond",JSON.stringify(formInline))
  // const beforeStatus =  statusB.changeStatus("before")
  // router.push({path:"/"})
}
const getIndexDbValue=(key)=>{
  myIndexedDB.value.getItem(key).then(function (value) {
   const message =(JSON.parse(value));
   formInline.name = message.name;
   formInline.age = message.age;
  }).catch(function (err) {
    console.log(err);
  });
}
const goback = () =>{
  
}
// 包括获取当前的状态 和 所需要数据的页面
// 如果最后一页成交了删除数据库 如果没到提交的部分 就保存数据源当判断是否有这个数据的时候去操作
onMounted(async()=>{
  myIndexedDB.value = await localforage.createInstance({
    name: 'myIndexedDB',
  })
  getIndexDbValue('statusActiveSecond')
  // nextTick(async()=>{
  //   const baseMesaage = await getIndexDbValue('statusActiveSecond')
  //   console.log(baseMesaage);
  // })
  // formInline.name = baseMesaage.name;
  // formInline.age = baseMesaage.age;
  // getIndexDbValue('statusActive')
  // 获取单前的值然后重置
})

</script>

<style lang="scss" scoped>

</style>