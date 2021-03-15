import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { ConfigProvider, message, Skeleton } from "antd";
import store from "./store";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
import "./main.less";

import Routes from "./routes";
import { ProjectUtils } from "./common/tools";


// 全局上下文
export const ConfigContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);

    if (process.env.NODE_ENV === "production") {
      this.API = window.API["prod"];
      console.info("env production");
    } else {
      this.API = window.API["dev"];
      console.info("env development");
    }

    if (window.API.env) {
      this.API = window.API[window.API.env];
    }

    /** route规范
    * @param label 页面title
    * @param path 页面路由，需与pages路径保持一致
    * @param titlePath 页面标题图片路径，相对于assets的路径
    */
    this.routes = [{
      label: "首页",
      path: "home",
      titlePath: "title.png"
    }];

    ProjectUtils.dispatchState("CONFIG", {// 全局配置
      config: {
        routes: this.routes,// 路由参数
        projectName: "maptalks",// 项目名称
      }
    });
  }

  componentDidMount() {
    document.querySelector("body").setAttribute("theme", "bigscreen");
  }

  render () {
    if (!this.routes.length) {
      message.warning("未获取到路由信息！");

      // 渲染骨架屏
      return (
        <>
          <div style={{ display: "flex" }}>
            <div style={{ flexShrink: 0, margin: 8 }}>
              <Skeleton active paragraph={{ rows: 2, width: [300, 300] }} avatar={{ size: "large", shape: "circle" }} title={false} />
            </div>
            <div style={{ flexGrow: 1, margin: 8 }}>
              <Skeleton active paragraph={{ rows: 2, width: ["100%", "100%"] }} title={false} />
            </div>
          </div>
          <div style={{ display: "flex", margin: 8 }}>
            <div style={{ flexShrink: 0 }}>
              <Skeleton active paragraph={{ rows: 10, width: [240, 240, 200, 200, 240, 240, 240, 200, 200, 200] }} title={false} />
            </div>
            <div style={{ flexGrow: 1, marginLeft: 30 }}>
              <Skeleton active paragraph={{ rows: 6 }} title={false} />
              <Skeleton active paragraph={{ rows: 5 }} />
              <Skeleton active />
            </div>
          </div>
        </>
      );
    } else {
      return (
        <ConfigContext.Provider value={null}>
          <ConfigProvider autoInsertSpaceInButton={false} locale={zh_CN}>
            <Routes routes={this.routes} />
          </ConfigProvider>
        </ConfigContext.Provider>
      );
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById("root")
);
