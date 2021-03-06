const K_CIRCLE_SIZE = 10;
const K_STICK_SIZE = 10;
const K_STICK_WIDTH = 3;

const circlePositionStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: "absolute",
  width: K_CIRCLE_SIZE,
  height: K_CIRCLE_SIZE + K_STICK_SIZE,
  left: -K_CIRCLE_SIZE / 2,
  top: -K_CIRCLE_SIZE - K_STICK_SIZE,
};

const circleStyle = {
  position: "absolute",
  left: 0 - 3,
  top: 0 - 3.5,
  width: K_CIRCLE_SIZE,
  height: K_CIRCLE_SIZE,
  lineHeight: `${K_CIRCLE_SIZE}px`,
  border: "3px solid black",
  borderRadius: K_CIRCLE_SIZE,
  backgroundColor: "lightblue",
  textAlign: "center",
  color: "black",
  fontSize: 12,
  fontWeight: "bold",
  padding: 0,
  cursor: "pointer",
  boxShadow: "0 0 0 1px white",
};

const circleStyleHover = {
  ...circleStyle,
  border: "3px solid #3f51b5",
  color: "blue",
};

export {
  circlePositionStyle,
  circleStyle,
  circleStyleHover,
  K_CIRCLE_SIZE,
  K_STICK_SIZE,
};
