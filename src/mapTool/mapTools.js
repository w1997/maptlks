export function initPlugins() {
  // //比例尺
  // map.addControl(getScale());
  // //缩放控件
  // map.addControl(getZoomTools());
  // //指北针
  // addCompassControl();
  // //测距离
  // distanceTool = getDistanceTool();
  // distanceTool.addTo(map).disable();
  // //测面积
  // areaTool = getAreaTool();
  // areaTool.addTo(map).disable();

  // //坐标定位
  // initLocationControl();

  // coordinateShow();
};


//鼠标监听事件  右下角坐标显示
// export function coordinateShow() {
//   //鼠标监听事件  右下角坐标显示
//   map.on('mousemove', function (param) {
//     document.getElementById('statusInfo').innerHTML = '<div>' + param.coordinate.x.toFixed(8) + "," + param.coordinate.y.toFixed(8) +
//       ' ' + map.getPitch().toFixed(1) + ' ' + map.getBearing().toFixed(1) + ' ' + map.getZoom().toFixed(1) + '</div>';
//   });
// }
