/*
 * @Descripttion: map初始化方法
 * @Author: wxc
 * @Date: 2021-01-29 08:43:19
 * @LastEditTime: 2021-02-20 23:07:08
 */
import * as maptalks from "maptalks";
import * as THREE from "three";
import { ThreeLayer } from "maptalks.three";
import mapConfig from "./config/map.config";
import { baseLayerConfig } from "./config/baseLayer.config";
// import variableConfig from "./config/variable.config";
import { mapTool } from "./tools";
import { layerApi } from "./api";
// import { mapApi } from "./api";
import "maptalks/dist/maptalks.css";


const {
  center,
  zoom,
  pitch,
  minZoom,
  maxZoom,
  bearing,
  fog,
  spatialReference,
  resolutions
} = mapConfig.Map;

export let
  map, // 地图实例
  stats, // stats实例
  swipeLayer, // 卷帘图层
  threeLayer,
  threeCustomLayer;

// 初始化地图
const initMapVisual = () => {
  const _baseLayerConfig = Object.values(baseLayerConfig)
    .reduce((prev, item) => [...prev, ...item.layers], []);

  map = new maptalks.Map("map", {
    center: center,
    zoom: zoom,
    pitch: pitch, // 俯仰角
    minZoom: minZoom, // 最小缩放比例
    maxZoom: maxZoom, // 最大缩放比例
    bearing: bearing, // 方位
    fog: fog,
    centerCross: false,
    doubleClickZoom: false, // 双击缩放,
    seamlessZoom: true, // 是否使用无缝缩放模式
    attribution: false,
    spatialReference: {
      projection: spatialReference,
      resolutions: resolutions
    },
    layers: _baseLayerConfig,
  });

  layerApi.showLayerByGroupName("暗黑图");
  swipeLayer = map.getLayer("天地图地形图");
  // 

  // three
  threeLayer = new ThreeLayer("ThreeLayer", {
    forceRenderOnMoving: true,
    forceRenderOnRotating: true,
    forceRenderOnZooming: true,
    animation: true
  });

  threeCustomLayer = new ThreeLayer("ThreeCustomLayer", {
    forceRenderOnMoving: true,
    forceRenderOnRotating: true,
    forceRenderOnZooming: true,
    animation: true
  });

  threeLayer.addTo(map);
  threeCustomLayer.addTo(map);

  threeCustomLayer.prepareToDraw = function(gl, scene, camera) {
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, -10, 10).normalize();

    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff));
  };

  threeLayer.prepareToDraw = function(gl, scene, camera) {
    stats = mapTool.setStats(); // 显示帧数和渲染时间
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, -10, 10).normalize();

    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff));

    // loadAllLayer();    //加载所有可视化图层

    // mapApi.mapInitAnimation();
    animation(); //帧循环
  };

  return map;
};

// 地图初始进入动画效果
const animation = () => {
  threeLayer._needsUpdate = !threeLayer._needsUpdate;
  if (threeLayer._needsUpdate) {
    threeLayer._renderer.clearCanvas();
    threeLayer.renderScene();
  }

  threeCustomLayer._needsUpdate = !threeCustomLayer._needsUpdate;
  if (threeCustomLayer._needsUpdate) {
    threeCustomLayer._renderer.clearCanvas();
    threeCustomLayer.renderScene();
  }

  stats.update();
  requestAnimationFrame(animation);
};

// 初始化插件
const initPlugins = () => {
  mapTool.setScaleBar(); // 比例尺
  mapTool.setZoomBar(); // 缩放控件
  mapTool.setCompass(); // 指北针
};

export { initMapVisual, initPlugins };