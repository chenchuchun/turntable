<template>
  <div class="app">
    <!-- <div style="margin: 20px;">
    </div> -->
    <div class="map" id="map" style="width: 100vw;height:100vh;"></div>
    <Header title="轮渡调度中心" class="headertop"/>
    <div class="left-box" style="padding: 5px;">
      <baseTitle :title="'巡航路线:'"/>
      <div style="margin:10px 0px; display: flex;align-items: center;">
        <div style="margin: 20px;font-weight: 800;">巡航路线</div>
        <input id="checkbox" v-model="playFlag" type="checkbox" @change="getPlay" />
        <label class="switch" for="checkbox">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="slider">
            <path
              d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"
            ></path>
          </svg>
        </label>
        <!-- <el-button type="primary" @click="playLine">播放路线</el-button>
        <el-button type="primary" @click="stepLine">当前位置</el-button> -->
      </div>
      <baseTitle :title="'年龄分布'"/>
      <useAge/>
      <!-- <baseTitle :title="'服务满意度'"/> -->
       <!-- <Line></Line> -->
      <baseTitle :title="'人流统计'"/>
    </div>
    <!-- <div class="chartbox" style="display: flex;gap: 20px;height: 200px;">
    </div> -->
  </div>
</template>

<script setup name="chart">
import Line from './compoent/line.vue'
import Header from './compoent/header.vue'
import baseTitle from './compoent/baseTitle.vue';
import useAge from './compoent/useAge.vue'
// import { animate } from "maptalks";
import * as maptalks from 'maptalks';
// import { Marker, Icon } from 'maptalks';
import { WMTSTileLayer } from 'maptalks.wmts'
import { onMounted,reactive,ref } from "vue";
import baseLine from './line'
const chart = ref();
const mapOption = reactive({
  map:null,
  line:null,
  marker:null
})
const playTimer = ref(null)
const playFlag = ref(false)
const getPlay = (e) =>{
 if(playFlag.value){
  playLine()
 }else{
  stepLine()
 }
}
const initMap = () =>{
  const mapNode = document.getElementById('map');
  const map = new maptalks.Map(mapNode, {
    crossOrigin: "Anonymous",
    center: [119.33, 74.755], //地图的初始中心
    zoom: 12, // 设置初始缩放级别
    dragPitch: true, //是否可以倾斜（Ctrl+鼠标操作实现）
    dragRotate: true, //是否可以旋转
    dragRotatePitch: false, //是否旋转倾斜可以同时操作
    styleOptions: {
      theme: 'dark'
    },
    baseLayer: new WMTSTileLayer(mapNode, {
        urlTemplate: 'http://t0.tianditu.gov.cn/img_c/wmts?tk=',
        subdomains: ['a', 'b', 'c'],
    })
  });
  map.setPitch(45);
  mapOption.map = map
  // map.on('click', function(e) {
  //     console.log(e);
  // });
  var line = new maptalks.LineString([  
    [119.29, 74.751], // 线的起点坐标  
    [119.33, 74.755], // 线的中间点坐标  
    [119.44, 74.75] // 线的终点坐标  
  ], {  
    symbol: {  
      'lineColor': '#FF0000', // 线的颜色  
      'lineWidth': 3 // 线的宽度  
    }  
  });
  mapOption.line = line
  const customIcon = {
    // 图标的 URL
    markerFile: '/boat.png',
    // 图标的宽度和高度
    markerWidth: 100,
    markerHeight: 100,
  };
  var marker = new maptalks.Marker([119.4285, 74.7499], {
    symbol: customIcon
  })
  const layer = new maptalks.VectorLayer('marker-layer').addGeometry(marker).addTo(map);
  marker.on('click', (e) => {
    let infoWindow = marker.getInfoWindow();
    // infoWindow.closeMsg = closeMsg;
    // const closeBtn = infoWindow.content.querySelector('button');
    // closeBtn.addEventListener('click', () => {
    //   marker.closeInfoWindow();
    // });
    marker.setInfoWindow({
      content: `<div style="color:white;background-color:black">
          <div>轮渡一号</div>
          <div>测试</div>
          <div>
            <button id="close-btn">关闭</button>
          </div>
        </div>`,
      // autoPan: true,
      width: 300,
      minHeight: 300,
    })
    marker.openInfoWindow();
    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click',()=>{
      marker.closeInfoWindow();
    })
    // console.log(closeBtn);
    // 在这里执行其他操作，如显示信息窗口等  
  });  

  mapOption.marker = marker
  // baseLine(line,marker)  
  // 偏移量计算方式
}
const playLine=()=>{
  baseLine(mapOption.line,mapOption.marker,0)
  // setInterval(()=>{
  //   baseLine(mapOption.line,mapOption.marker,0)
  // },5000)
}
// closeBtn.addEventListener('click', () => {
//   marker.closeInfoWindow();
// });
const closeMsg =() =>{
  console.log('6');
  // mapOption.marker.closeInfoWindow()
}
const stepLine=()=>{
  mapOption.marker.setCoordinates([119.4285, 74.7499])
}
onMounted(()=>{
  initMap();
})

</script>
<style>
.maptalks-msgBox{
  background-color: black;
  color: white;
  /* display: none; */
}
.maptalks-close{
  text-decoration: none;
  float: right;
  color: red;
  font-size: 30px;
  margin-top: -10px;
  display: none;
}
.maptalks-attribution{
  display: none;
}
</style>
<style lang="scss" scoped>
.app{
  font-size: 20px;
  color: white;
}
.chartbox{
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  width: 500px;
  height: 98vh;
  /* opacity: 0.; */
  /* background-color: rgba(41,59,105,0.5); */
  display: flex;
  flex-direction: column;
  align-items: center;
}
.headertop{
  position: absolute;
  top: 0px;
}
.left-box{
  position: absolute;
  top: 30px;
  right: 0px;
  height: 94vh;
  width: 23vw;
  background-color: rgba(33,65,80,0.8);
  overflow-y: scroll;
  overflow-x: hidden;
}
#checkbox {
  display: none;
}

.switch {
  position: relative;
  width: 70px;
  height: 70px;
  background-color: rgb(99, 99, 99);
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgb(126, 126, 126);
  box-shadow: 0px 0px 3px rgb(2, 2, 2) inset;
}
.switch svg {
  width: 1.2em;
}
.switch svg path {
  fill: rgb(48, 48, 48);
}
#checkbox:checked + .switch {
  box-shadow: 0px 0px 1px rgb(151, 243, 255) inset,
    0px 0px 2px rgb(151, 243, 255) inset, 0px 0px 10px rgb(151, 243, 255) inset,
    0px 0px 40px rgb(151, 243, 255), 0px 0px 100px rgb(151, 243, 255),
    0px 0px 5px rgb(151, 243, 255);
  border: 2px solid rgb(255, 255, 255);
  background-color: rgb(146, 180, 184);
}
#checkbox:checked + .switch svg {
  filter: drop-shadow(0px 0px 5px rgb(151, 243, 255));
}
#checkbox:checked + .switch svg path {
  fill: rgb(255, 255, 255);
}

/* .maptalks-msgBox{
  border: 1px solid black;
  background-color: black;
  color: white;
} */
/* .maptalks-msgBox{
  border: 1px solid black !important;
} */
</style>