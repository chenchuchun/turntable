// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation

export const getParametricEquation = (startRatio, endRatio, isSelected, isHovered, k, h) => {
  // 计算
  let midRatio = (startRatio + endRatio) / 2;
  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;
  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = true;
  }
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== "undefined" ? k : 1 / 3;
  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.05 : 1;
  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },
    x: function (u, v) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    y: function (u, v) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1;
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    },
  };
};

//获取3d并图的最高扇区的高度
export const getHeight3D = (series, height) => {
  series.sort((a, b) => {
    return b.pieData.value - a.pieData.value;
  });
  return (height * 75) / series[0].pieData.value;
};

export const getPie3D = (data, pieData, internalDiameterRatio) => {
  //internalDiameterRatio:透明的空心占比
  let series = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  let k = internalDiameterRatio;
  pieData.sort((a, b) => {
    return b.value - a.value;
  });
  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;
    let seriesItem = {
      name: typeof pieData[i].name === "undefined" ? `series${i}` : pieData[i].name,
      type: "surface",
      parametric: true,
      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k,
      },
      radius: "50%",
      center: ["10%", "50%"],
    };

    if (typeof pieData[i].itemStyle != "undefined") {
      let itemStyle = {};
      typeof pieData[i].itemStyle.color != "undefined" ? (itemStyle.color = pieData[i].itemStyle.color) : null;
      typeof pieData[i].itemStyle.opacity != "undefined" ? (itemStyle.opacity = pieData[i].itemStyle.opacity) : null;
      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。

  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    );
    startValue = endValue;
  }
  console.log("series", series);
  let boxHeight = getHeight3D(series, 15); //通过传参设定3d饼/环的高度，26代表26px
  // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
  series.push({
    name: "mouseoutSeries",
    type: "surface",
    parametric: true,
    wireframe: {
      show: false,
    },
    itemStyle: {
      opacity: 0.2,
      color: "#0000FF",
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20,
      },
      x: function (u, v) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.5;
      },
      y: function (u, v) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.5;
      },
      z: function (u, v) {
        return Math.cos(v) > 0 ? -1 : -1;
      },
    },
  });
  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  let option = {
    backgroundColor: "rgba(0,0,0,0)",
    labelLine: {
      show: false,
      lineStyle: {
        color: "#fff",
      },
    },
    legend: {
      data: data.dataList,
      itemWidth: 15, //色标图宽
      itemHeight: 7, //色标图高
      orient: "vertical", //垂直显示
      top: "middle",
      right: 40,
      itemGap: 25, //色标间隔
      textStyle: {
        color: "#fff",
        fontSize: 18,
      },
    },
    tooltip: {
      show: true,
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: {
        color: "#FFF",
        fontSize: 20,
      },
      formatter: (params) => {
        if (params.seriesName !== "mouseoutSeries" && params.seriesName !== "pie2d") {
          let bfb = ((option.series[params.seriesIndex].pieData.endRatio - option.series[params.seriesIndex].pieData.startRatio) * 100).toFixed(2);
          let value = option.series[params.seriesIndex].pieData.value;
          return (
            `${params.seriesName}<br/>` +
            `${value} 个<br/>` +
            `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
            `${bfb}%`
          );
        }
      },
    },
    xAxis3D: {
      min: -1,
      max: 1,
    },
    yAxis3D: {
      min: -1,
      max: 1,
    },
    zAxis3D: {
      min: -1,
      max: 1,
    },
    grid3D: {
      show: false,
      boxHeight: boxHeight, //圆环的高度
      left: -50,
      top: 20, //3d饼图的位置
      viewControl: {
        //3d效果可以放大、旋转等，请自己去查看官方配置
        alpha: 40, //角度
        distance: 250, //调整视角到主体的距离，类似调整zoom
        rotateSensitivity: 1, //设置为0无法旋转
        zoomSensitivity: 0, //设置为0无法缩放
        panSensitivity: 0, //设置为0无法平移
        autoRotate: true, //自动旋转
      },
    },
    series: series,
  };
  return option;
};
//是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
// option.series.push({
//   name: "pie2d",
//   type: "pie",
//   labelLine: {
//     length: 30,
//     length2: 30,
//   },
//   label: {
//     opacity: 1,
//     show: false,
//     position: "outside",
//     color: "#fff",
//     alignTo: "edge",
//     minMargin: 5,
//     edgeDistance: 10,
//     lineHeight: 15,
//     rich: {
//       b: {
//         fontSize: 16,
//         lineHeight: 30,
//         // fontWeight: 'bold',
//         color: "#fff",
//         padding: [0, 0, 10, 0],
//       },
//       a: {
//         fontSize: 22,
//         color: "#41c1ff",
//         fontFamily: "QTypeCond-Book",
//       },
//       c: {
//         fontSize: 18,
//         color: "#fff",
//         // width:10,
//         fontFamily: "QTypeCond-Book",
//       },
//     },
//     align: "center",
//     // formatter: '{b|{b}}\n{a|{c}} (个)  {c|{d}}%',
//     formatter: function (data) {
//       return `{b|${data.name}}\n{a|${data.value}}（个）  {c|${data.percent.toFixed(0)}%}`;
//     },
//   },
//   // labelLayout: function (params) {
//   //   const isLeft = params.labelRect.x < chart.getWidth() / 2;
//   //   const points = params.labelLinePoints;
//   //   // Update the end point.
//   //   points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width;
//   //   return {
//   //     labelLinePoints: points,
//   //   };
//   // },
//   startAngle: -25, //起始角度，支持范围[0, 360]。
//   clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
//   radius: ["25%", "50%"],
//   // center: ["55%", "48%"], //指示线的位置
//   data: data.chartData,
//   itemStyle: {
//     opacity: 0,
//   },
// });
