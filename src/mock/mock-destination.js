import {getRandomInteger} from '../utils.js';

const generateDescription = () => {
  const descriptions = [
    'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateCityName = () => {
  const cities = [
    'Chamonix',
    'Paris',
    'Moscow',
    'Stockholm',
    'Limassol',
    'London',
    'Madrid',
  ];

  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

export const pics = [
  {
    id: 0,
    "src": "http://picsum.photos/300/200?r=0.07623163317",
    "description": "Madrid cow"
  },
  {
    id: 1,
    "src": "http://picsum.photos/300/200?r=0.0762563005163317",
    "description": "Chamonix parliament building"
  },
  {
    id: 2,
    "src": "http://picsum.photos/300/200?r=0.076256316317",
    "description": "Moscow horseshoe"
  },
  {
    id: 3,
    "src": "http://picsum.photos/300/200?r=0.0763317",
    "description": "Paris baguette"
  },
];

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}


export const generateDestination = () => ({
    "id": 1,
    "description": generateDescription(),
    "name": generateCityName(),
    "pictures": shuffle([0, 1, 2, 3])
});
