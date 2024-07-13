<template>
  <div class="app">
    <div class="echarts" id="chart" ref="chart" style="width: 300px;height: 300px;"></div>
    <div></div>
  </div>
</template>

<script setup name="chart">
import * as echarts from "echarts";
import { onMounted,ref } from "vue";
const chart = ref();
onMounted(()=>{
  var myChart = echarts.init(document.getElementById('chart'));
  // 绘制图表
  myChart.setOption({
    title: {
      text: ''
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  });
})

</script>

<style scoped>
</style>