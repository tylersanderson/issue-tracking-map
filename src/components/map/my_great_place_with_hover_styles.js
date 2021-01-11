const K_CIRCLE_SIZE = 30;
const K_STICK_SIZE = 10;
const K_STICK_WIDTH = 3;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: "absolute",
  width: K_CIRCLE_SIZE,
  height: K_CIRCLE_SIZE + K_STICK_SIZE,
  left: -K_CIRCLE_SIZE / 2,
  top: -K_CIRCLE_SIZE - K_STICK_SIZE,
};

const greatPlaceCircleStyle = {
  position: "absolute",
  left: 0 - 3,
  top: 0 - 3.5,
  width: K_CIRCLE_SIZE,
  height: K_CIRCLE_SIZE,
  lineHeight: `${K_CIRCLE_SIZE}px`,
  border: "3px solid black",
  borderRadius: K_CIRCLE_SIZE,
  backgroundColor: "white",
  textAlign: "center",
  color: "black",
  fontSize: 12,
  fontWeight: "bold",
  padding: 0,
  cursor: "pointer",
  boxShadow: "0 0 0 1px white",
};

const greatPlaceCircleStyleHover = {
  ...greatPlaceCircleStyle,
  border: "3px solid #3f51b5",
  color: "blue",
};

const greatPlaceStickStyleShadow = {
  position: "absolute",
  left: K_CIRCLE_SIZE / 2 - K_STICK_WIDTH / 2,
  top: K_CIRCLE_SIZE,
  width: K_STICK_WIDTH,
  height: K_STICK_SIZE,
  backgroundColor: "#f44336",
  boxShadow: "0 0 0 1px white",
};

const greatPlaceStickStyle = {
  position: "absolute",
  left: K_CIRCLE_SIZE / 2 - K_STICK_WIDTH / 2,
  top: K_CIRCLE_SIZE,
  width: K_STICK_WIDTH,
  height: K_STICK_SIZE,
  backgroundColor: "black",
};

const greatPlaceStickStyleHover = {
  ...greatPlaceStickStyle,
  backgroundColor: "blue",
};

export {
  greatPlaceStyle,
  greatPlaceCircleStyle,
  greatPlaceCircleStyleHover,
  greatPlaceStickStyle,
  greatPlaceStickStyleHover,
  greatPlaceStickStyleShadow,
  K_CIRCLE_SIZE,
  K_STICK_SIZE,
};
