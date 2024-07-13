<template>
  <div style="margin: 20px;">
    <div class="chart" id="chart" ref="chart" style="width: 300px;height: 300px;"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
onMounted(()=>{
  var myChart = echarts.init(document.getElementById('chart'));
  myChart.setOption({
    title: {
      text: ''
    },
    tooltip: {},
    xAxis: {
      show:false,
      data: ['0-2分', '2-4分', '4-6分', '6-8分', '8-10分']
    },
    yAxis: {
      show:false
    },
    series: [
      {
        show:false,
        name: '评分',
        type: 'bar',
        data: [5, 20, 36, 10, 10]
      }
    ],
    graphic: [
      {
        type: 'image',
        style: {
          image: 'https://pic.zhangshichun.top/pic/circle.png',
          width: 300,
          height: 300
        },
        transition: 'rotation',
        originX: 150,
        originY: 150,
        keyframeAnimation: {
          duration: 3000,
          loop: true,
          keyframes: [
          {
              percent: 0.5,
              easing: 'linear',
              rotation: Math.PI
          }, {
              percent: 1,
              easing: 'linear',
              rotation: Math.PI * 2
          }]
        },
        top: 'middle',
        left: 'center',
      },
    ]
  });
})
</script>
