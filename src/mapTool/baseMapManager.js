import * as maptalks from "maptalks";
import 'maptalks/dist/maptalks.css';

//底图初始化
const initMapLayer = function initMapLayer() {

  let Base_Layer = new maptalks.TileLayer('Base_Layer', {
    visible: true,
    minZoom: 0,
    maxZoom: 18,
    urlTemplate: 'https://api.mapbox.com/styles/v1/lgx/ck0ugmm06be381cqr6baf7vlf/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGd4IiwiYSI6ImNqdmtzb3RndjB1b2Y0OWw2N3c1MHB1c3UifQ.gxPbeGiE9o5-D6b2zaH_KA',
    subdomains: ['a', 'b', 'c', 'd'],
    opacity: 1
  });

  let Tdt_YXT_Layer = new maptalks.TileLayer('天地图影像图', {
    visible: false,
    minZoom: 0,
    maxZoom: 18,
    urlTemplate: 'https://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=4513b858f412fe66b69158ce7ade62c9',
    subdomains: ['0', '1', '2', '3', '4', '5'],
    opacity: 1
  });


  let Tdt_YXT_Layer_Bz = new maptalks.TileLayer('影像图标注', {
    visible: false,
    minZoom: 0,
    maxZoom: 18,
    urlTemplate: 'https://t{s}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=4513b858f412fe66b69158ce7ade62c9',
    subdomains: ['1', '2', '3', '4', '5'],
    opacity: 1
  });

  let Tdt_DXT_Layer = new maptalks.TileLayer('天地图地形图', {
    visible: false,
    minZoom: 0,
    maxZoom: 18,
    urlTemplate: 'https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=4513b858f412fe66b69158ce7ade62c9',
    subdomains: ['0', '1', '2', '3', '4', '5'],
  });

  let Tdt_DXT_Layer_Bz = new maptalks.TileLayer('天地图标注', {
    visible: false,
    minZoom: 0,
    maxZoom: 18,
    urlTemplate: 'https://t{s}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=4513b858f412fe66b69158ce7ade62c9',
    subdomains: ['1', '2', '3', '4', '5'],
    opacity: 1
  });

  let Dark_CSS_Layer = new maptalks.TileLayer('暗黑蓝调地图', {
    visible: true,
    minZoom: 0,
    maxZoom: 18,
    urlTemplate: 'https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=6410617a7159c514e66a7704a8c080e7',
    subdomains: ['0', '1', '2', '3', '4', '5'],
    cssFilter: 'sepia(95%) invert(90%)',
  });

  let Dark_CSS_Layer_Bz = new maptalks.TileLayer('暗黑蓝调地图标注', {
    visible: true,
    minZoom: 0,
    maxZoom: 18,
    urlTemplate: 'https://t{s}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=4513b858f412fe66b69158ce7ade62c9',
    subdomains: ['1', '2', '3', '4', '5'],
    cssFilter: 'sepia(95%) invert(90%)',
  });

  // let ArcGIS_GW_label_Layer = new maptalks.ArcGISTileLayer('ArcGIS_GW_label', {
  //   urlTemplate: 'http://183.129.204.238:15100/arcgis/rest/services/Lm_LongShan_Gs/MapServer',
  //   visible: true,
  //   maxZoom: 25,
  //   minZoom: 17,
  //   forceRenderOnMoving: true,
  //   forceRenderOnRotating: true,
  //   forceRenderOnZooming: true,

  // });

  // let ArcGIS_GW_Layer = new maptalks.ArcGISTileLayer('ArcGIS_GW', {
  //   urlTemplate: 'http://183.129.204.238:15100/arcgis/rest/services/Lm_LongShan_Gs/MapServer',
  //   visible: false,
  //   // maxZoom: 25,
  //   // minZoom: 5,
  //   forceRenderOnMoving: true,
  //   forceRenderOnRotating: true,
  //   forceRenderOnZooming: true,
  // });




  let baseLayersArray = {
    "Base_Layer": Base_Layer,
    "天地图影像图": Tdt_YXT_Layer,
    "影像图标注": Tdt_YXT_Layer_Bz,
    "天地图地形图": Tdt_DXT_Layer,
    "天地图标注": Tdt_DXT_Layer_Bz,
    "暗黑蓝调地图": Dark_CSS_Layer,
    "暗黑蓝调地图标注": Dark_CSS_Layer_Bz,
    // "ArcGIS_GW_label_Layer": ArcGIS_GW_label_Layer,
    // "ArcGIS_GW": ArcGIS_GW_Layer

  };

  return baseLayersArray;

}

// const BaseMaponChange =  function BaseMaponChange(CurrBaseMap) {

//   if (CurrBaseMap) {

//     CloseAllBasicLayer();

//     // eslint-disable-next-line default-case
//     switch (CurrBaseMap) {
//       case "Base_Layer":
//         map.getLayer("Base_Layer").options.visible = true;
//         break;
//       case "暗黑蓝调地图":
//         map.getLayer("暗黑蓝调地图").options.visible = true;
//         map.getLayer("暗黑蓝调地图标注").options.visible = true;
//         break;
//       case "天地图地形图":
//         map.getLayer("天地图地形图").options.visible = true;
//         map.getLayer("天地图标注").options.visible = true;

//         break;
//       case "天地图影像图":
//         map.getBaseLayer("天地图影像图").options.visible = true;
//         map.getLayer("影像图标注").options.visible = true;
//         break;
//     }
//   }
// }

//关闭所有【底图】
// function CloseAllBasicLayer() {
//   map.getLayer("Base_Layer").options.visible = false;

//   map.getBaseLayer("天地图影像图").options.visible = false;
//   map.getLayer("影像图标注").options.visible = false;

//   map.getLayer("暗黑蓝调地图").options.visible = false;
//   map.getLayer("暗黑蓝调地图标注").options.visible = false;

//   map.getLayer("天地图地形图").options.visible = false;
//   map.getLayer("天地图标注").options.visible = false;

// }


// function ArcGISLayerOnChange(State, layerName) {
//   if (State && layerName === "ArcGIS_GW") {
//     map.getLayer("ArcGIS_GW").options.visible = true;
//     map.animateTo({
//       zoom: MapConfig.Map.zoom - 1,
//       center: [117.24534874447045, 32.24260408844643],
//       pitch: MapConfig.Map.pitch,
//       bearing: MapConfig.Map.bearing
//     }, {
//       duration: 2000
//     });

//   } else if (!State && layerName === "ArcGIS_GW") {
//     map.getLayer("ArcGIS_GW").options.visible = false;
//   }
// }
export {initMapLayer};
// export {BaseMaponChange};