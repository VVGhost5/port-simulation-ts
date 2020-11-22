import { Colors } from "../enums/Colors";

//Getting random number (0-1), that define type of new ship (red or green)
function getRandomInt() {
  const result = Math.floor(Math.random() * Math.floor(2));

  if (result) {
    return {
      type: "green",
      isLoaded: false,
      color: Colors.green,
      bg: Colors.white,
      direction: "toPort",
    };
  }

  return {
    type: "red",
    isLoaded: true,
    color: Colors.red,
    bg: Colors.red,
    direction: "toPort",
  };
}

export default getRandomInt;
