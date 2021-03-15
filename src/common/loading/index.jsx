import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as PropTypes from "prop-types";
import "./index.less";


let isInit = true;

function Loading(props) {
  useEffect(() => {
    isInit = false;
  }, []);

  const propsLoading = props.show && isInit;
  const loadingState = Boolean(useSelector(state => state.loading));

  if (propsLoading || loadingState) {
    return (
      <div className="loading-container">
        <div className="loading-wrapper">
          <span className="loading-dot loading-dot-spin">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </span>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

Loading.propTypes = {
  show: PropTypes.bool.isRequired
};

export default Loading;