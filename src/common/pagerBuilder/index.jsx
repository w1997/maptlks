import React from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { MapVisual } from "../mapVisual";
import "./index.less";


const mapStateToProps = (state) => {
  return { config: state.config };
};

// 创建页面内容
const PageBuilder = (Childs) => {
  return connect(mapStateToProps)(class extends React.Component {
    static propTypes = {
      config: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired
    }

    constructor(props) {
      super(props);
    }

    componentDidMount() {
      const { route, config } = this.props;
      document.title = `${route.label} | ${config.projectName}`;
      document.getElementById("loading").style.display = "none";
    }

    render() {
      // const { route } = this.props;

      return (
        <>
          <MapVisual />
          <div className="main">
            {/* <header className="page-header">
              <img src={require(`../../../assets/${route.titlePath}`)} />
            </header> */}
            <Childs {...this.props} />
          </div>
        </>
      );
    }
  });
};

export default PageBuilder;
