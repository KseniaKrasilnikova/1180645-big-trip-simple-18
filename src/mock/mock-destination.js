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

export const generateDestination = () => ({
    "id": 1,
    "description": generateDescription(),
    "name": "Chamonix",
    "pictures": [
    {
      "src": "http://picsum.photos/300/200?r=0.0762563005163317",
      "description": "Chamonix parliament building"
    }
  ]
});
