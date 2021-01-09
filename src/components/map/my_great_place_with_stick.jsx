import React from "react";
//import shouldPureComponentUpdate from 'react-pure-render/function';

import {
  greatPlaceStyle,
  greatPlaceCircleStyle,
  greatPlaceCircleStyleHover,
  greatPlaceStickStyle,
  greatPlaceStickStyleHover,
  greatPlaceStickStyleShadow,
} from "./my_great_place_with_hover_styles.js";

// export default class MyGreatPlaceWithStick extends Component {
//   static propTypes = {
//     // GoogleMap pass $hover props to hovered components
//     // to detect hover it uses internal mechanism, explained in x_distance_hover example
//     $hover: PropTypes.bool,
//     text: PropTypes.string,
//     zIndex: PropTypes.number
//   };

//   static defaultProps = {};

//   shouldComponentUpdate = shouldPureComponentUpdate;

//   constructor(props) {
//     super(props);
//   }

export function MyGreatPlaceWithStick() {
  // const { text, zIndex } = this.props;

  // const style = {
  //   ...greatPlaceStyle,
  //   zIndex: this.props.$hover ? 1000 : zIndex,
  // };

  // const circleStyle = this.props.$hover
  //   ? greatPlaceCircleStyleHover
  //   : greatPlaceCircleStyle;
  // const stickStyle = this.props.$hover
  //   ? greatPlaceStickStyleHover
  //   : greatPlaceStickStyle;

  const text = "1";
  const zIndex = 1;
  const style = {
    ...greatPlaceStyle,
    zIndex: zIndex,
  };
  const circleStyle = greatPlaceCircleStyle;
  const stickStyle = greatPlaceStickStyle;

  return (
    <div style={style}>
      <div style={greatPlaceStickStyleShadow} />
      <div style={circleStyle}>{text}</div>
      <div style={stickStyle} />
    </div>
  );
}

export default MyGreatPlaceWithStick;
