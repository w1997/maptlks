/*
 * @Descripttion: mapVisual工具方法库
 * @Author: wxc
 * @Date: 2021-02-02 14:38:43
 * @LastEditTime: 2021-02-23 14:26:18
 */
import { map } from "../init";
import { message } from "antd";
import store from "../../../store";
import { ACTION_TYPE } from "../../../def";


export default {
  /**
   * @name: fullScreenElement
   * @description: 获取当前全屏的元素
   * @param null
   * @return {element | null}
   */
  fullScreenElement() {
    return document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement ||
      document.mozFullScreenElement ||
      null;
  },

  /**
   * @name: isFullscreen
   * @description: 判断当前浏览器是否处于全屏状态
   * @param null
   * @return {boolean}
   */
  isFullScreen() {
    return window.fullScreen ||
      document.webkitIsFullScreen ||
      document.msFullscreenEnabled ||
      this.fullScreenElement() ||
      false;
  },

  /**
   * @name: enterFullScreen
   * @description: 进入全屏
   * @param {element} el
   * @return {boolean}
   */
  enterFullScreen(el) {
    const rfs = el.requestFullScreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;

    typeof rfs !== "undefined" ?
      !this.isFullScreen() ?
      rfs.call(el) :
      this.exitFullScreen() :
      message.warning("当前浏览器不支持部分全屏");

    return this.isFullScreen();
  },

  /**
   * @name: exitFullScreen
   * @description: 离开全屏
   * @param null
   * @return null
   */
  exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  },

  /**
   * @name: dispatchState
   * @description: 发送状态到store
   * @param {string} type
   * @param {object} state
   * @return null
   */
  dispatchState(type, state) {
    store.dispatch({
      type: ACTION_TYPE[type],
      ...state
    });
  },

  /**
   * @name: devicePixelRatio
   * @description: 获取设备像素比
   * @return {number}
   */
  devicePixelRatio() {
    return map.getDevicePixelRatio();
  },

  /**
   * @name: coordinateValidate
   * @description: 经纬度坐标验证
   * @param {number} value
   * @param {boolean} isXValue 是否经度坐标
   * @return {boolean}
   */
  coordinateValidate(value, isXValue) {
    const xReg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/,
      yReg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;

    return isXValue ? xReg.test(value) : yReg.test(value);
  }
};