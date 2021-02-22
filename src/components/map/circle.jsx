import React, { Component } from "react";
import PropTypes from "prop-types";
//import shouldPureComponentUpdate from "react-pure-render/function";

import {
  circlePositionStyle,
  circleStyle,
  circleStyleHover,
} from "./circle-styles.js";

export default class Circle extends Component {
  static propTypes = {
    // GoogleMap pass $hover props to hovered components
    // to detect hover it uses internal mechanism, explained in x_distance_hover example
    $hover: PropTypes.bool,
    text: PropTypes.string,
    zIndex: PropTypes.number,
  };

  static defaultProps = {};

  //shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const { text, zIndex } = this.props;

    const style = {
      ...circlePositionStyle,
      zIndex: this.props.$hover ? 1000 : zIndex,
    };

    const circleMarkerStyle = this.props.$hover
      ? circleStyleHover
      : circleStyle;

    return (
      <div style={style}>
        <div style={circleMarkerStyle}>{text}</div>
      </div>
    );
  }
}
