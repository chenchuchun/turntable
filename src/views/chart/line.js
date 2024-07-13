

let i = 0;
let lineCoords = [];
let marker = null
let useLine = null;
// import { animate } from "maptalks";
function baseLine(line,markerr,index){
  useLine = line
  // line 获取行进路线
  // marker marker进行设置
  lineCoords = [...line._coordinates];
  marker = markerr
  i = index
  replay();
}

function replay() {
  let start = lineCoords[i];
  let offset = getOffset(i);
  marker.setCoordinates(start);
  marker.bringToFront().animate({
    translate: offset
  }, {
    duration: 2000,
    focus: true
  });

  i++;
  if (i < lineCoords.length) {
    setTimeout(replay, 2000); // 2秒后执行下一段动画
  }
}

function getOffset(index) {
  if (index === lineCoords.length - 1) {
    return [0, 0]; // 最后一个点不需要偏移
  } else {
    let dx = lineCoords[index + 1].x - lineCoords[index].x;
    let dy = lineCoords[index + 1].y - lineCoords[index].y;
    return [dx, dy];
  }
}
export default baseLine;