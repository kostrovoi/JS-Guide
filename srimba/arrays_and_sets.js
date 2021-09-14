// JS неявно приводит  к строке все типы в ключах обЪекта

const nums = {
  1: 1,
  true: true,
};

console.log(Object.keys(nums));

// получаем массив ключей из строк
// и тип "символ" тоже  приводится к строке
// а объект Map не меняет тип ключа и оставляет как есть - str, num, boolean, symbol
const map1 = new Map([
  [1, 1],
  [true, true],
]);

map1.set('key', 'value');

console.log([...map1.keys()]);

// с помощью метода set()  добавляем в Мапу пару  ключ - значение
// Мапа мутирует и обновляется хоть и объявлена через const
// с помощью ...spread оператора получаем массив ключей
// типы переменных в ключах остались оригинальными
// Мапа сохраняет последовательность ключей,  обычный объект этого не гарантирует
// чтобы использовать объект как ключ , но не тянуть весь объект используют  WeakMap
const user1 = { name: 'john' };
const secretKey1 = 'asldjfalskdjf';

const secretKeyMap = new WeakMap([[user1, secretKey1]]);

const key = secretKeyMap.get(user1);
console.log(key);

// чтобы получить длину объекта - запрашиваем длину массива с ключами этого объекта
Object.keys(nums).length;

// у Мапы это метод size()

const userMap = new Map([
  ['name', 'john'],
  ['verified', true],
]);

console.log(userMap.size);

// работа с объктом это работа с его ключами
// Массив:
// работа с массивом это работа с его  индексами - с  упорядоченной, то есть последовательно проиндексированной коллекцией данных.
// чекаем существование элемента в массиве

const temperaturesNums = [69, 82, 73, 64]; // 0, 1, 2, 3; -1

console.log(temperaturesNums.indexOf(50)); // -1 элемент отсутствует
console.log(temperaturesNums.indexOf(50) > -1); // false отсутствие элемента  привели к булевому значению

// второй метод  проверки элемента в массиве:
console.log(temperaturesNums.includes(50)); //false

// эти методы подходят для поиска в массиве состоящем из примитивных типов

// Vitalii, [06.09.21 09:53]
// чекаем существование элемента в массиве состоящем из объектов

const temperatures = [
  { degrees: 69, isRecordTemp: false },
  { degrees: 82, isRecordTemp: true },
  { degrees: 73, isRecordTemp: false },
  { degrees: 64, isRecordTemp: false },
];

const resultAny = temperatures.some(
  (temperature) => temperature.isRecordTemp === true
);
// true / false  так как мы смотрим в ключ  isRecordTemp значения которого булевые то сравнение с === true избыточно
console.log(resultAny);

// в методе some() вызываем коллбэк в котором итерируемся по каждому объекту, обозвав его temperature и смотрим в свойство объекта
// проверяем есть ли хоть 1 элемент в массиве с такой парой ключ-значение temperature.isRecordTemp === true
// при первом же true метод some()  прекращает  выполнение
// иначе дойдёт до конца массива и вернёт false
// Метод every() - чекнем все ли значения false в ключе isRecordTemp

const result = temperatures.every((temperature) => !temperature.isRecordTemp); // true / false
console.log(result);

//  \!temperature.isRecordTemp  можно заменить для простоты на  temperature.isRecordTemp === false

// indexof() includes() some() every() методы проверки существ-ия эл-та в массиве

// методы итерации по массиву
// Array.prototype.map()
// Метод map не изменяет массив, для которого он был вызван (хотя функция callback может это делать).

console.log(temperatures);

const newTemps = temperatures.map((temperature) => {
  temperature.isRecordTemp = true;
  // если раскоментить строку выше , то она трансформирует начальный массив
  // temperature.isHigh = true;
  //  return temperature;
  return temperature.degrees > 70
    ? { ...temperature, isHigh: true }
    : temperature;
});
console.log(newTemps);

const tempsHigh = temperatures.map((temperature) =>
  temperature.degrees > 70 ? { ...temperature, isHigh: true } : temperature
);
console.log(tempsHigh);

// создаём новый массив  методом map()
// метод итерации по массиву forEach() просто применяет колбэк к каждому элементу массива

newTemps.forEach((temperature) => {
  if (temperature.isHigh) {
    console.log(
      `Temperature ${temperature.degrees} was a record high last week!`
    );
  }
});

// получить подмножества массивов
// метод map() возвращает массив той же длины,
// чтобы получить подмножество массива применяется метод filter()
// в подмассив войдут только те элементы, что прошли проверку условия в коллбэке
const restaurants = [
  { name: 'Cap City Diner', milesAway: 2.2 },
  { name: 'Chop Shop', milesAway: 4.1 },
  { name: 'Northstar Cafe', milesAway: 0.9 },
  { name: 'City Tavern', milesAway: 0.5 },
  { name: 'Shake Shack', milesAway: 5.3 },
];

const nameStarts_C = restaurants.filter((restaurant) =>
  restaurant.name.startsWith('C')
);
console.log(nameStarts_C);
// задаём условие выражением - в текущем объекте значение свойства 'name' начинается с заглавной буквы 'C'
// если выражение вернёт значение true то элемент проходит фильтр в новый подмассив
// подмассив не меняет начальный массив
const nameStarts_Z = restaurants.filter((restaurant) =>
  restaurant.name.startsWith('Z')
);
console.log(nameStarts_Z);
// если нет элементов прошедших условие, вернётся пустой массив
// по принципу возвращаемого значения true or false метод похож на some() and every()
// если явно зададим true то просто скопируем весь массив
const restaurantsCopy = restaurants.filter((restaurant) => true);
console.log(restaurantsCopy);

//условий может быть больше одного
const results = restaurants.filter(
  (restaurant) => restaurant.name.startsWith('C') && restaurant.milesAway < 3.0
);
console.log(results);
// если надо вернуть лишь 1 элемент из всего массива то применяется метод find() - вернёт первое совпадение
const firstMatch = restaurants.find(
  (restaurant) => restaurant.name.startsWith('C') && restaurant.milesAway < 3.0
);
console.log('firstMatch', firstMatch);

// вернёт первый эемент прошедший условие
const anotherFirstMatch = restaurants.find(
  (restaurant) =>
    restaurant.name.toLowerCase().includes('city') && restaurant.milesAway < 3
);
console.log('anotherFirstMatch', anotherFirstMatch);
// если соответствия условиям нет - вернёт undefined
const noMatch = restaurants.find((restaurant) => false);
console.log('noMatch', noMatch);

//  метод reduce() вернёт значение любого типа , что нам надо
const menuItems = [
  { item: 'Blue Cheese Salad', price: 8 },
  { item: 'Spicy Chicken Rigatoni', price: 18 },
  { item: 'Ponzu Glazed Salmon', price: 23 },
  { item: 'Philly Cheese Steak', price: 13 },
  { item: 'Baked Italian Chicken Sub', price: 12 },
  { item: 'Pan Seared Ribeye', price: 31 },
];

const total = menuItems.reduce((accumulator, menuItem) => {
  console.log(`
    accumulator: ${accumulator},
    menu item price: ${menuItem.price}
  `);
  return accumulator + menuItem.price;
}, 0);
console.log(total);

// создадим новый массив с помощью  reduce()  и удвоим значение каждого элемента
const numbers = [1, 2, 3, 4, 5, 6, 1];

const doubledNumbers = numbers.reduce((acc, num) => {
  acc.push(num * 2);
  return acc;
}, []);
console.log('doubled numbers', doubledNumbers);
console.log('numbers', numbers);

// перепишем reduce() на map() - частный случай reduce()
const doubledMap = numbers.map((number) => number * 2);
console.log('doubledoubledMap', doubledMap);

// частный случай  filter()
const moreThan3 = numbers.reduce((acc, num) => {
  // acc.push(num * 2);
  if (num > 3) {
    acc.push(num);
  }
  return acc;
}, []);

console.log(moreThan3);
// препишем на filter()
const greaterNumbers = numbers.filter((num) => num > 3);
console.log(greaterNumbers);

// .push()  в одну строку не отрабатывает, меняем на  concat()
const moreThan3_ternary = numbers.reduce(
  (acc, num) => (num > 3 ? acc.concat(num) : acc),
  []
);
console.log(moreThan3_ternary);

// избегаем мутации начального массива с помощью  concat()
const lunchMenuIdeas = ['Harvest Salad', 'Southern Fried Chicken'];

const allMenuIdeas = lunchMenuIdeas.concat('Club Sandwich');
allMenuIdeas.push('whatever');

console.log(lunchMenuIdeas);
console.log(allMenuIdeas);

//  или клонируем массив с помощью оператора ...spread
const cloneMenu = [...lunchMenuIdeas];
cloneMenu.push('Red Hot Chilly Peppers');
console.log(cloneMenu);

const wrongThing = { thing: 'wrong' };
// выдаст ошибку в этих 2 случаях так как объект не итерабельный и не развернётся в массив.
// объект перебирается по ключам , а ключи - строки
const whatHappens = [].concat(numbers, wrongThing);
// const whatHappens = [...numbers, ...wrongThing];
console.log(whatHappens);

numbers.push(wrongThing);
console.log(numbers);

// удаляем или заменяем любой элемент массива по значению элемента
const breakfastMenuIdeas = ['Buckwheat Pancakes'];
const dinnerMenuIdeas = ['Glazed Salmon', 'Meatloaf', 'American Cheeseburger'];

const menuIdeas = [
  ...breakfastMenuIdeas,
  'Harvest Salad',
  'Southern Fried Chicken',
  ...dinnerMenuIdeas,
];

// const harvestSaladIndex = menuIdeas.findIndex(
//   (item) => item === 'Harvest Salad'
// );
// console.log(harvestSaladIndex);

// const newMenu = [
//   ...menuIdeas.slice(0, harvestSaladIndex),
//   ...menuIdeas.slice(harvestSaladIndex + 1)
// ]
// console.log(newMenu);

const meatloafIndx = menuIdeas.findIndex(item => item === 'Meatloaf');
console.log(meatloafIndx);
const updateMenu = [
  ...menuIdeas.slice(0, meatloafIndx),
  'Yami',
  ...menuIdeas.slice(meatloafIndx + 1)
]
console.log(updateMenu);

// destructuring новый способ присвоить элементам массива имя переменной
const finalMenuItems = [
  "American Cheeseburger",
  "Southern Fried Chicken",
  "Glazed Salmon"
];

let [first, second] = finalMenuItems;
console.log('before', { first },{ second });
// меняем местами имена переменных и показываем их как объекты
[second, first] = [first, second];
console.log('after', { first },{ second });

// пусть первый элемент массива - первый подаётся к столу , ОСТАЛЬНЫЕ элементы позже в отдельном подмассиве
let [winner, ...restOrder] = finalMenuItems;
// выведем в  виде объекта
console.log({winner, restOrder});


const fishDishes = ['Salmon Rillettes', 'Grilled Tuna Provencal', 'Fish and Chips']
const meatDishes = ['Lasagna', 'Spaghetti', 'Satay Chicken Skewers']

// Modify these four variables first
 let chefsFishDishes = fishDishes.filter(elem => elem[0].toLowerCase() === 's');
 console.log(chefsFishDishes);
let regularFishDishes = fishDishes.filter(elem => elem[0].toLowerCase() !== 's');
console.log(regularFishDishes);

let chefsMeatDishes = meatDishes.filter(elem => elem[0].toLowerCase() === 's');
console.log(chefsMeatDishes);
let regularMeatDishes = meatDishes.filter(elem => elem[0].toLowerCase() !== 's');
console.log(regularMeatDishes);
let str = 'wrong';

// Finally, use the spread operator to create these two arrays as well
let chefsDishes = [...chefsFishDishes, ...chefsMeatDishes, ...str];
console.log(chefsDishes);
let regularDishes = [].concat(regularFishDishes, regularMeatDishes, str);
console.log(regularDishes);

// копируем массив
// const [...cloneFishDishes] = fishDishes;
// console.log(cloneFishDishes);

// метод итерации по объекту  for in loop- ключи в объекте это строки, проход по строкам
const obj = { one: 1, two: 2 };
for (const key in obj) {
  console.log('key', key);
  console.log('value', obj[key]);
}
// объект особо не богат на методы, так что для работы удобно конвертировать объект в массив
// 3 способа конвертации
// Object.keys(), Object.values(), Object.entries()
// получим массив ключей
const arrObjKeys = Object.keys(obj);
console.log(arrObjKeys);
const keyExist = Object.keys(obj).includes('two');
console.log(keyExist);
// если мы хотим получить значения по ключу юзаем map()
const mapValues = Object.keys(obj).map(key => obj[key]);
console.log(mapValues)


// получим массив значений без map()
const arrObjValues = Object.values(obj);
console.log(arrObjValues);

const monthlyExpenses = {
  food: 400,
  rent: 1700,
  insurance: 550,
  internet: 49,
  phone: 95
};

const monthlySum = Object.values(monthlyExpenses).reduce((acc, value) => acc + value, 0);
console.log(monthlySum);

// праобразуем объект в массив массивов
console.log(Object.entries(obj));

const users = {
  '2345234': {
    name: "John",
    age: 29
  },
  '8798129': {
    name: "Jane",
    age: 42
  },
  '1092384': {
    name: "Fred",
    age: 17
  }
};

const usersOver20 = Object.entries(users).reduce((acc, [id, user]) => {
  if (user.age > 20) {
    acc.push({ ...user, id });
  }
  return acc;
}, []);
console.log(usersOver20);

// набор уникальных вхождений Set() для итерабельных
const numbersSet = new Set([1, 1, 2]);
console.log(numbersSet);
console.log('numbersSet size', numbersSet.size);

for (const num of numbersSet) {
  console.log(num);
}

// сэт принадлежит типу объект и легко конвертируется в массив
const customerDishes = [
  "Chicken Wings",
  "Fish Sandwich",
  "Beef Stroganoff",
  "Grilled Cheese",
  "Blue Cheese Salad",
  "Chicken Wings",
  "Reuben Sandwich",
  "Grilled Cheese",
  "Fish Sandwich",
  "Chicken Pot Pie",
  "Fish Sandwich",
  "Beef Stroganoff"
];

const uniqueDishes = [...new Set(customerDishes)];
console.log(uniqueDishes);

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

numbers.forEach(number => {
  console.log(number);
});

/*
- map()
- filter()
- reduce()
- some() / every()
- find() / findIndex()
- forEach()

Plus:

- slice()
- concat()
- includes()
- array spread operator
*/



