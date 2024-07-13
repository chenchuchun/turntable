<template>
  <div class="base" style="width: 20vw;">
    <div style="margin-bottom: 10px;">
      状态机 保存上一次编辑离开的数据和恢复到当时的数据
    </div>
    <el-form :model="formInline" class="demo-form-inline">
      <el-form-item label="name">
        <el-input v-model="formInline.name" placeholder="base" clearable />
      </el-form-item>
      <el-form-item label="age">
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
import { onMounted, reactive,ref } from 'vue';
import {useRouter} from 'vue-router'
const formInline = reactive({
  name:"",
  age:""
})
const router = useRouter()
const myIndexedDB = ref(null)
// 打算通过pinia 来管理的当前的逻辑
const onSubmit = ()=>{
  const statusB = new Status('first')
  myIndexedDB.value.setItem("statusActive", statusB.nowStatus());
  const nextStatus = statusB.changeStatus("next")
  myIndexedDB.value.setItem("statusActive", nextStatus.nowStatus());
  myIndexedDB.value.setItem("statusActiveFirst",JSON.stringify(formInline))
  router.push({path:"/status/second"})
}
onMounted(()=>{
  myIndexedDB.value = localforage.createInstance({
    name: 'myIndexedDB',
  })
})

</script>

<style lang="scss" scoped>

</style>