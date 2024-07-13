<template>
  <div class="mycharts" ref="myChartsDom"></div>
</template>

<script setup>
import * as Echarts from "echarts";
import "echarts-gl";
import { reactive, onMounted, ref, watch } from "vue";
import {
  getHeight3D,
  getPie3D,
} from "./echart-option/right-center.js";
const myChartsDom = ref(null);
const data = reactive({
  dataList: [
    { name: "0-20岁", value: 10, itemStyle: { color: "#ef8137", opacity: 1 } },
    {
      name: "20-40岁",
      value: 30,
      itemStyle: { color: "#f6c65a", opacity: 1 },
    },
    {
      name: "40-60岁",
      value: 40,
      itemStyle: { color: "#89ccf1", opacity: 1 },
    },
    {
      name: "60岁以上",
      value: 80,
      itemStyle: { color: "#25989e", opacity: 1 },
    },
  ],
});
let chart = null;
// watch(
//   () => data.dataList,
//   (newVal, oldVal) => {
//     if (data.dataList.length != 0) initChart();
//   },
//   { deep: true }
// );

onMounted(() => {
  chart = Echarts.init(myChartsDom.value);
  initChart();
});


function initChart() {
  let option = getPie3D(data, data.dataList, 0.3);
  chart.setOption(option);
}
</script>

<style lang="scss" scoped>
.mycharts {
  width: 100%;
  height: 300px;
}
</style>
