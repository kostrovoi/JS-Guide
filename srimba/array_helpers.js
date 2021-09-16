function handlePosts() {
  var posts = [
    { id: 23, title: 'Daily JS News' },
    { id: 52, title: 'Code Refactor City' },
    { id: 105, title: 'The Brightest Ruby' },
  ];

  // for (var i = 0; i < posts.length; i++) {
  //   document.write(posts[i].title + "<br>");
  // }
  // перепишем цикл на forEach()

  posts.forEach((element) => {
    document.write(element.title + '<br>');
    console.log(element.title);
  });
}
handlePosts();

// рассчитать площадь каждой картинки и вывести в новый массив
var images = [
  { height: 10, width: 30 },
  { height: 20, width: 90 },
  { height: 54, width: 32 },
];

var areas = [];

images.forEach((image) => {
  return areas.push(image.height * image.width);
});
console.log(areas);
// console.log(images);

// map() - -----------------------------------------------------------------------------
// используем если хотим изменить записи в списках данных, колбэком можно изменить оригинальный список!
let numbers = [1, 2, 3, 4, 1];

// сначала пример без map() с обычной for loop
let doubledNumbers = [];

for (let i = 0; i < numbers.length; i++) {
  doubledNumbers.push(numbers[i] * 2);
}

console.log(doubledNumbers);

// парепишем на map() , метод сам создаст пустой массив и пройдёт по оригинальному массиву колбэком
let doubleNumWithMap = numbers.map((el) => el * 2);
// у стрелочной ф-ции всегда есть неявный return, в map() он обязателен
console.log(doubleNumWithMap);
// оригинальный массив не мутирует
console.log(numbers);
// если пишем колбэк с обычной ф-цией то обязателен return !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let tripleNumWithMap = numbers.map(function (number) {
  return number * 3;
});
console.log(tripleNumWithMap);

// var imgs = [
//   { height: '34px', width: '39px' },
//   { height: '54px', width: '19px' },
//   { height: '83px', width: '75px' },
// ];

// var heights = imgs.map(function(img) {
//   return img.height;
// });

// console.log(heights);

var trips = [
  { distance: 34, time: 10 },
  { distance: 90, time: 50 },
  { distance: 59, time: 25 },
];

var speeds = trips.map(function (trip) {
  return trip.distance / trip.time;
});
console.log(speeds);


var onePropArr = [
  { time: 10 },
  { time: 50 },
  { time: 25 },
];

function pluck(array, property) {
  return  array.map((el) => el[property]);
}

let pluckOneProp = pluck(onePropArr, "time");
console.log(pluckOneProp);

let pluckTimeFromTrips = pluck(trips, 'time');
console.log(pluckTimeFromTrips);

// filter()----------------------------------------------------------------------
let filterTrips = [];
for(let i = 0; i < trips.length; i++) {
  if(trips[i].time > 20) {
    console.log(trips[i].time);
    filterTrips.push(trips[i]);
  }
}
console.log(filterTrips);

// let awesomeFilterTrips = trips.filter(el => el.time > 20);
// console.log(awesomeFilterTrips);

// вместо стрелочной ф-ции перепишем на обычную ф-цию
let awesomeFilterTrips = trips.filter(function(trip) {
  return trip.time > 20;
});
console.log(awesomeFilterTrips);

// добавим ещё одно условие для фильтрации
let superFilterTrips = trips.filter(el => el.time > 20 && el.distance < 60);
console.log(superFilterTrips)

// найдём соответствие свойства объекта в массиве объектов
let chosenPost = {id: 4, title: 'New Post'};
let allComments = [
  {postId: 4, content: 'awesome post'},
  {postId: 3, content: 'nice'},
  {postId: 3, content: 'neat'},
  {postId: 4, content: 'it was ok'},
]

function commentsForPost(post, comments) {
  return comments.filter(comment => comment.postId === post.id);
}

let commentsForChosenPost = commentsForPost(chosenPost, allComments);
console.log(commentsForChosenPost);

var integerNumbers = [15, 25, 35, 45, 55, 65, 75, 85, 95];

var filteredIntNumbers = integerNumbers.filter(function(num) {
  return num > 50;
});
console.log(filteredIntNumbers);

// олдскул подход по отсеиванию только админов
var users = [
  { id: 1, admin: true },
  { id: 2, admin: false },
  { id: 3, admin: false },
  { id: 4, admin: false },
  { id: 5, admin: true },
 ];

function onlyAdmins(dude) {
  return dude.admin;
}

//  function adminsHelper(dudes) {
//      return dudes.filter(function(dude) {
//          return dude.admin;
//      })
//  }

function adminsHelper(dudes, helper) {
  return dudes.filter(dude => helper(dude));
}

 var filteredUsers = adminsHelper(users, onlyAdmins);
 console.log(filteredUsers);

//  напишем ф-цию которая вернёт массив элементов не прошедших условие
//  function reject(array, iteratorFunction) {
//   return array.filter(el => !iteratorFunction(el));
//  }

const reject = (array, iteratorFunction) => array.filter(item => !iteratorFunction(item));

 let notAdmins = reject(users, onlyAdmins);
 console.log(notAdmins);

//  find() ищет и возвращает первое соответствие, затем заканчивает выполнение
let names = [
  {name: 'Jill', id: 11, admin: false},
  {name: 'Alex', id: 23, admin: false},
  {name: 'Bill', id: 987, admin: true},
];

// аналог метода find() на for loop будет с оператором break
let thatName = '';
let userByName;

for(let i = 0; i < names.length; i++) {
  if(names[i].name === 'Alex') {
    thatName = names[i].name;
    userByName = names[i];
    break;
  }
}
console.log(thatName, userByName);

let nameFind = names.find(item => item.name === 'Alex');
console.log(nameFind);

let userComment = {postId: 987, content: 'Great post'};

let findUserName = names.find(item => item.id === userComment.postId);
console.log(findUserName);

let admin = names.find(el => el.admin);
console.log(admin);

// найдём первый попавшийся объект в массиве по значению его свойства
// по проиколу применим ф-цию хелпер
var accounts = [
  { balance: -10 },
  { balance: 12 },
  { balance: 0 }
];

function helper(arrayOfObj, property) {
    return arrayOfObj.find(function(item) {
        return item[property] === 12;
    })
}

var account = helper(accounts, 'balance');
console.log(account);

function findWhere(arrayOfObj, criteria) {
  let property = Object.keys(criteria)[0];
  return arrayOfObj.find(el => el[property] === criteria[property]);
}

console.log(findWhere(names, {id: 987}));
// надо вернуть целый объект совпавший со свойством в объекте
// {name: 'Bill', id: 987, admin: true}

console.log(Object.keys(names[0]));
console.log(Object.keys(names[0])[0]);