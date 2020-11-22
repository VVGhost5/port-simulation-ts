
import TWEEN from "@tweenjs/tween.js";

import getRandomInt from "./helpers/getRandomIntFunc";

import { createShip } from "./helpers/ship";


//Initialization, creating a new ship and starting a counter that create new ship every 8 sec
window.onload = function () {
  createShip(getRandomInt());

  setInterval(() => {
    createShip(getRandomInt());
  }, 8000);

  animate();
};

//Animate a moving of ships
function animate(time?: any) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

