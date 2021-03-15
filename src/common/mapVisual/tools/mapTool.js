/*
 * @Descripttion: 地图插件方法库
 * @Author: wxc
 * @Date: 2021-01-29 08:43:19
 * @LastEditTime: 2021-02-20 16:36:45
 */
import * as maptalks from "maptalks";
import Stats from "stats.js";
import { map } from "../init";
import { CompassControl } from "#/maptalks.plugin/maptalks.control.compass/maptalks.control.compass.es";
import "#/maptalks.plugin/maptalks.control.compass/maptalks.control.compass.css";


export default {
  setScaleBar() { // 比例尺
    const scaleBar = new maptalks.control.Scale({
      position: {
        bottom: "20",
        right: "60"
      },
      maxWidth: 150,
      metric: true,
      imperial: false
    });
    map.addControl(scaleBar);
  },
  setZoomBar() { // 缩放工具
    const zoomBar = new maptalks.control.Zoom({
      position: {
        bottom: "20",
        right: "15"
      },
      slider: false,
      zoomLevel: true
    });

    map.addControl(zoomBar);
  },
  setCompass() { // 指北针
    new CompassControl({
      position: "top-right",
      backgroundColor: "#000",
      transform: "translate(10%, 10%)"
    }).addTo(map);
  },
  setStats() { // 帧数和渲染时间
    const stats = new Stats();
    stats.domElement.style.zIndex = 100;
    document.getElementById("map").appendChild(stats.domElement);

    return stats;
  }
};