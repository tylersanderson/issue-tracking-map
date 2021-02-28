import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  markerStyle,
  markerCircleStyle,
  markerCircleStyleHover,
  markerStickStyle,
  markerStickStyleHover,
  markerStickStyleShadow,
} from "./marker-styles.js";

export default class MarkerWithStick extends Component {
  static propTypes = {
    // GoogleMap pass $hover props to hovered components
    // to detect hover it uses internal mechanism, explained in x_distance_hover example
    $hover: PropTypes.bool,
    text: PropTypes.string,
    zIndex: PropTypes.number,
  };

  static defaultProps = {};

  render() {
    const { text, zIndex } = this.props;

    const style = {
      ...markerStyle,
      zIndex: this.props.$hover ? 1000 : zIndex,
    };

    const circleStyle = this.props.$hover
      ? markerCircleStyleHover
      : markerCircleStyle;
    const stickStyle = this.props.$hover
      ? markerStickStyleHover
      : markerStickStyle;

    return (
      <div style={style}>
        <div style={markerStickStyleShadow} />
        <div style={circleStyle}>{text}</div>
        <div style={stickStyle} />
      </div>
    );
  }
}
