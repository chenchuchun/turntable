<script setup>
// 还有一个防止组件穿透的效果
//  import {defineAsyncComponent} from 'vue';
//  const HelloWorld = defineAsyncComponent(()=>import('./components/HelloWorld.vue'));
//  const Chart = defineAsyncComponent(()=>import('./components/chart.vue'));
</script>

<template>
  <div>
    <router-view></router-view>
    <!-- <Suspense>
      <template #default>
        <div>
          <HelloWorld msg="Vite + Vue" />
        </div>
      </template>
      <template #fallback>
        <div>
          loading.....
        </div>
      </template>
    </Suspense> -->
    <!-- <Chart style="width: 300px;height: 300px;"></Chart> -->
    <!-- 有一点独立出来的意思 -->
    <!-- <Teleport to="body">
      <span style="color: red;" class="tbody"> this is test for you  </span>
    </Teleport> -->
  </div>
</template>

<style>
body{
    margin: 0;
}
</style>
