/*
 * @Descripttion: 项目工具方法库
 * @Author: wxc
 * @Date: 2021-02-23 14:25:28
 * @LastEditTime: 2021-02-23 14:27:39
 */
import store from "../../store";
import { ACTION_TYPE } from "../../def";

export default {
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
  }
};