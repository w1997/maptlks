import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AsyncImport } from "./common/tools";
import * as PropTypes from "prop-types";


function Routes(props) {
  const { routes } = props;

  if (Array.isArray(routes) && routes.length) {
    return (
      // 二级目录配置
      // <BrowserRouter basename="/map">
      <BrowserRouter>
        <Switch>
          {/* 路由生成 */}
          {
            routes.map(item => {
              return (
                <Route
                  strict
                  exact
                  path={`/${item.path}`}
                  component={AsyncImport(() => import(`./pages/${item.path}/index.jsx`), {route: item})}
                  key={item.label}
                />
              );
            })
          }
          {/* 访问根路由重定向 */}
          <Redirect from="/" to="/home" />
        </Switch>
      </BrowserRouter>
    );
  } else {
    return null;
  }
}

Routes.propTypes = {
  routes: PropTypes.array.isRequired
};

export default Routes;
