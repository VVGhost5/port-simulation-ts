//Функция получения случайного числа (0-1) и определение какой тип корабля появится (red или green) 
function getRandomInt() {
  let result = Math.floor(Math.random() * Math.floor(2));
  if (result) {
    return { type: 'green', isLoaded: false, color: 0x00ff00, bg: 0xffffff, direction: 'toPort' }
  }
  return { type: 'red', isLoaded: true, color: 0xff0000, bg: 0xff0000, direction: 'toPort' }
}

export default getRandomInt;