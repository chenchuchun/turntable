<script setup>
import { onMounted, ref } from 'vue'
const getList=()=>{
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      resolve("sb")
    }, 2000);
  })
}
const baseMessage = ref("")
onMounted(async()=>{
  baseMessage.value = await getList()
})
</script>

<template>
  <div class="app">
    {{ baseMessage }}
    <!-- <Suspense>
      <template #default>
        {{ baseMessage }}
      </template>
      <template #fallback>
        loading.........
      </template>
      <template #error>
        error.....
      </template>
    </Suspense> -->
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
