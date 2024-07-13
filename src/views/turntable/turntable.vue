<template>
  <div style="display: flex;justify-content: center;align-items: center;margin-top: 200px;">
     <canvas id="canvas" width="600" height="600"></canvas>
  </div>
</template>



<script setup>
// 开始写逻辑
// 首先设置转速 然后设置文字分割
// 拆分 将背景拆分 将按钮拆分 然后将每个旋转的内容拆分 还有控制旋转最后的位置拆分
import {onMounted,ref,reactive, toRefs,defineProps } from 'vue'

const props = defineProps({
  baseData:{
    type:Array,
    default:[],
    requred:true
  },
  btnOption:{
    type:Object,
    default:{}
  },
  backOption:{
    type:Object,
    default:{}
  }
})

// props 
const {baseData,btnOption,backOption} = toRefs(props)

const ballOptions = reactive(baseData.value);
const backBtnImage = reactive(btnOption.value);
const backImageOption = reactive(backOption.value)

// const baseAngle = ref(100);
const canvasOptions = reactive({
  ctx:null,
  canvas:null,
  angle:0.1,
  speed:0.1,
  mustIndex:null
})
const isAnimal = ref(false)
const {ctx,canvas,angle,speed,mustIndex} = toRefs(canvasOptions)
const animateFlag = ref(null);
const speedFlag = ref(null);
const downSpeed = ref(0.0001);
const startAngle = ref(null);
const endAngle = ref(0)
// let rotationAngle = 0;
const stopAnimate = () =>{
  // 计算减缓速度 设置减缓的时间
  // 设置一个延时暂停然后
  // 后门计算说谁谁必中
  if(mustIndex.value){
    if(!startAngle.value){
      mustIndex.value = ballOptions.length-mustIndex.value-2
    }
    startAngle.value = ((mustIndex.value)*Math.PI*2)/ballOptions.length; // 指针应该停的位置
    endAngle.value = ((mustIndex.value+1)*Math.PI*2)/ballOptions.length; // 指针应该挺的位置
    let startAngle1 = startAngle.value;
    let endAngle1  = endAngle.value
    let stopAngle = (startAngle1+endAngle1)/2; // 暂停的中间值
    let baseAngle = angle.value % (2*Math.PI) // 当前的旋转的所在的位置
    // console.log(stopAngle);
    downSpeed.value = stopAngle<baseAngle?(2*Math.PI-baseAngle+stopAngle)/1000:(stopAngle-baseAngle)/1000;
    subSpeed();
  }else{
    // console.log(startAngle.value);
    // console.log("6");
    subSpeed();
  }
}

const subSpeed=()=>{
  // downSpeed.value -= 0.00001
  speed.value -= downSpeed.value;
  // console.log();
  // console.log(angle.value !=null);
  // console.log(startAngle.value);
  // console.log(angle.value % (2*Math.PI));
  // if(speed.value>0){
  //   speedFlag.value = requestAnimationFrame(subSpeed);
  // }else{
  //   cancelAnimationFrame(animateFlag.value)
  //   cancelAnimationFrame(speedFlag.value)
  // }
  if(mustIndex.value){
    if(!(angle.value % (2*Math.PI)>startAngle.value
        &&
      angle.value % (2*Math.PI)<endAngle.value)){
      speedFlag.value = requestAnimationFrame(subSpeed);
    }else if(speed.value<0){
      // console.log("6");
      cancelAnimationFrame(animateFlag.value)
      cancelAnimationFrame(speedFlag.value)
    }
    else{
      // angle.value = startAngle.value;
      cancelAnimationFrame(animateFlag.value)
      cancelAnimationFrame(speedFlag.value)
    }
  }else{
    if(speed.value<0){
      cancelAnimationFrame(animateFlag.value)
      cancelAnimationFrame(speedFlag.value)
      // console.log("6");
    }else{
      speedFlag.value = requestAnimationFrame(subSpeed);
    }
  }
}

const startAnimate = ()=>{
  isAnimal.value = true
  animate();
  speed.value = 0.1
}

// 绘制一个基础圆盘好圆心 
const drawBall = (beginPointX,beginPointY,radius,startAngle,endAngle,backgroudColor) =>{
  const ctx = canvasOptions.ctx
  ctx.beginPath();
  ctx.arc(beginPointX,beginPointY,radius,startAngle,endAngle);
  ctx.fillStyle = backgroudColor;
  ctx.fill();
}

const drawArc=(beginPointX,beginPointY,radius,startAngle,endAngle,backgroudColor,item)=>{
  const centerX = 300;
  const centerY = 300;
  const orbitRadius = 200
  const ctx = canvasOptions.ctx
  ctx.beginPath();
  ctx.arc(beginPointX,beginPointY,radius,startAngle,endAngle);
  if(backgroudColor){
    ctx.fillStyle = backgroudColor;
    ctx.strokeStyle ="white";
    // ctx.stroke();
  }else{
    ctx.fillStyle = "rgba(0,0,0,0)";
    // ctx.strokeStyle = "rgba(0,0,0,0)";
    // ctx.stroke();
  }
  ctx.fill();
  ctx.beginPath()
  ctx.moveTo(300,300)
  const startX = centerX + orbitRadius * Math.cos(startAngle);  
  const startY = centerY + orbitRadius * Math.sin(startAngle);
  const endX = centerX + orbitRadius * Math.cos(endAngle);  
  const endY = centerY + orbitRadius * Math.sin(endAngle);
  ctx.lineTo(startX,startY)
  ctx.lineTo(endX,endY);
  ctx.closePath();
  ctx.fillStyle = backgroudColor;
  ctx.strokeStyle = backgroudColor
  ctx.stroke();
  ctx.fill();
  // let index = ballOptions.findIndex(ite=>ite.label == item.label);
  // const fontAngle = 2*Math.PI/ballOptions.length;
  // ctx.translate((startX+endX)/2, (startY+endY)/2);
  
  // console.log(index);
  // ctx.save();
  // let baseAngle = (((startX+endX)/2)/((startY+endY)/2))
  // let index = ballOptions.findIndex(ite=>ite.label == item.label);
  // const fontAngle = (index+1)*Math.PI/6;
  // ctx.translate(300,300)
  // ctx.transform(Math.cos(fontAngle), Math.sin(fontAngle), -Math.sin(fontAngle), Math.cos(fontAngle), 10, 0);
  // ctx.rotate(((startX+endX)/2)/((startY+endY)/2));
  // ctx.transform(1, 0, 0.267, 1, 0, 0);
  // 保存字体样式
  ctx.save();
  ctx.translate((startX+endX)/2, (startY+endY)/2);
  // 根据圆的弧度计算文字旋转角度
  let angle = 0
      // if()
  let index = ballOptions.findIndex(ite =>ite.label == item.label);
  if(index != ballOptions.length-1){
    angle = (startAngle + endAngle) / 2 + Math.PI/2;
  }else{
    angle = (startAngle + endAngle) / 2 - Math.PI/2;
  }
  // 旋转画布
  ctx.rotate(angle);
  ctx.font = '24px Arial bold';
  ctx.fillStyle = '#AA625B';
  ctx.textAlign = "center"
  ctx.fillText(item.label, 0,0);
  ctx.restore();
  if("backImage" in item){
    let img = new Image();
    img.src = item.backImage;
    img.onload=()=>{
      ctx.save();
      ctx.translate(((startX+endX)/2+300)/2, ((startY+endY)/2+300)/2);
      let angle = 0
      // if()
      let index = ballOptions.findIndex(ite =>ite.label == item.label);
      if(index != ballOptions.length-1){
        angle = (startAngle + endAngle) / 2 + Math.PI/2;
      }else{
        angle = (startAngle + endAngle) / 2 - Math.PI/2;
      }
      // 旋转画布
      ctx.rotate(angle);
      drawRoundImage(0,0,60,0,Math.PI*2,img)
      ctx.restore();
    }
  }
}

const drawMark = (color)=>{
  const ctx = canvasOptions.ctx
  ctx.beginPath();
  const orbitRadius = 40
  const centerX = 300;
  const centerY = 300;
  const startX = centerX + orbitRadius * Math.cos(Math.PI/3+Math.PI);  
  const startY = centerY - orbitRadius * Math.sin(Math.PI/3);
  const endX = centerX + orbitRadius * Math.cos(Math.PI/3);  
  const endY = centerY - orbitRadius * Math.sin(Math.PI/3);
  const tempX = (startX+endX)/2;
  const tempY = (startY+endY)/2;
  const targetX = tempX*2 - 300;
  const targetY = tempY*2 - 300
  ctx.moveTo(startX,startY);
  ctx.lineTo(targetX,targetY);
  ctx.lineTo(endX,endY);
  ctx.fillStyle = color
  ctx.fill();
  ctx.font = '24px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = "center"
  ctx.fillText('开始', 300, 308);
}

// 绘制旋转line 啓用
// const drawLine = (angle) =>{
//   // const orbitRadius = 100; // 轨道半径 
//   // const centerX = 300;
//   // const centerY = 300;
//   // const ballX = centerX + orbitRadius * Math.cos(angle);  
//   // const ballY = centerY + orbitRadius * Math.sin(angle);
//   // const ctx = canvasOptions.ctx;
//   // ctx.beginPath();
//   // ctx.moveTo(300,300);
//   // ctx.lineTo(ballX,ballY);
//   // ctx.lineWidth = 5;
//   // ctx.strokeStyle = 'white'
//   // ctx.stroke();
// }

const drawRoundImage = (beginPointX,beginPointY,radius,startAngle,endAngle,backImage) =>{
  const ctx = canvasOptions.ctx
  // const img = new Image();
  // img.src = backImage;
  // backImage.onload = function() {
    let temp = Math.min(backImage.width,backImage.height);
    let scale = radius / temp;
    ctx.rect(beginPointX-backImage.width*scale, beginPointX-backImage.height*scale, beginPointX+radius, beginPointY+backImage.width*scale.height*scale);
    // ctx.strokeStyle = 'white'
    // ctx.stroke();
    ctx.drawImage(backImage, beginPointX-backImage.width*scale/2, beginPointY-backImage.height*scale/2,backImage.width*scale,backImage.height*scale);
  // }
}

const animate=async()=>{
  // drawBall(300,300,220,0,Math.PI*2,"green")
  if(backImageOption.type == 'image'){
    const img = new Image();
    img.src = backImageOption.backGroud
    // 设置层级
    img.onload = async function() {
      await drawRoundImage(300,300,480,0,Math.PI*2,img)
      for (const [index,item] of ballOptions.entries()){
        let startAngle = 0;
        let endAngle = 0;
        if(index){
          startAngle = 2*Math.PI*(index/ballOptions.length);
        }
        if(index !=ballOptions.length-1){
          endAngle = 2*Math.PI*((index+1)/ballOptions.length);
        }
        await drawArc(300,300,200,startAngle+angle.value,endAngle+angle.value,item.color,item)
      }
    }
  }else{
    drawBall(300,300,220,0,Math.PI*2,backImageOption.backGroud)
    for (const [index,item] of ballOptions.entries()){
        let startAngle = 0;
        let endAngle = 0;
        if(index){
          startAngle = 2*Math.PI*(index/ballOptions.length);
        }
        if(index !=ballOptions.length-1){
          endAngle = 2*Math.PI*((index+1)/ballOptions.length);
        }
        await drawArc(300,300,200,startAngle+angle.value,endAngle+angle.value,item.color,item)
      }
  }
  if(backBtnImage.type == 'image'){
    const img2 = new Image();
    img2.src = backBtnImage.backGroud
    img2.onload = async function() {
      await drawRoundImage(300,300,100,0,Math.PI*2,img2)
    }
  }else{
    // bugger 当结束的时候还是不显示
    await drawBall(300,300,50,0,Math.PI*2,backBtnImage.backGroud)
    await drawBall(300,300,40,0,Math.PI*2,backBtnImage.backGroudSecond)
    await drawMark(backBtnImage.pointerColor);
  }
  if(isAnimal.value){
    speed.value += 0.0005;
    angle.value += speed.value;
    // console.log(angle.value);
    animateFlag.value = requestAnimationFrame(animate);
  }
  if(speed.value > 0.32){
    stopAnimate();
  }
}

// 点击事件 判断点中心
const eventOfCanvas = () =>{
  const canvas = canvasOptions.canvas
  canvas.addEventListener('click', (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (
        x >= 260 &&
        x <= 340 &&
        y >= 260 &&
        y <= 340
      ) {
        startAnimate();
      }
    })
}


onMounted(async()=>{
  canvasOptions.canvas = document.getElementById('canvas')
  canvasOptions.ctx = canvasOptions.canvas.getContext('2d')
  // await drawRoundImage(300,300,480,0,Math.PI*2,"/wheel-border.jpg")
  await animate();
  await eventOfCanvas()
  console.log(baseData);
  // stopAnimate();
})
</script>

<style scoped>
</style>