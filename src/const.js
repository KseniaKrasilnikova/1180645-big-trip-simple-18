import {getRandomInteger} from './utils/common';

export const POINTS_COUNT = 10;

function generateOffersArrayIds() {
  const ids = OFFERS.map(offer => offer.id)
  const length = getRandomInteger(1, OFFERS.length)
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(ids[getRandomInteger(0, ids.length - 1)]);
    ids.splice(i, 1);
  }
  return result;
}

export const OFFERS = [
  {
    id: 0,
    price: getRandomInteger(100, 5000),
    name: 'Order Uber',
  },
  {
    id: 1,
    price: getRandomInteger(100, 5000),
    name: 'Rent a car',
  },
  {
    id: 2,
    price: getRandomInteger(100, 5000),
    name: 'Add luggage',
  },
  {
    id: 3,
    price: getRandomInteger(100, 5000),
    name: 'Switch to comfort',
  },
  {
    id: 4,
    price: getRandomInteger(100, 5000),
    name: 'Add breakfast',
  },
  {
    id: 5,
    price: getRandomInteger(100, 5000),
    name: 'Book tickets',
  },
  {
    id: 6,
    price: getRandomInteger(100, 5000),
    name: 'Lunch in city',
  },
  {
    id: 7,
    price: getRandomInteger(100, 5000),
    name: 'Switch to comfort',
  },
]

export const POINT_TYPES = [
  {
    type: 'taxi',
    name: 'Taxi',
    offers: generateOffersArrayIds(),
  },
  {
    type: 'bus',
    name: 'Bus',
    offers: generateOffersArrayIds(),
  },
  {
    type: 'train',
    name: 'Train',
    offers: generateOffersArrayIds(),
  },
  {
    type: 'ship',
    name: 'Ship',
    offers: generateOffersArrayIds(),
  },
  {
    type: 'drive',
    name: 'Drive',
    offers: generateOffersArrayIds(),
  },
  {
    type: 'flight',
    name: 'Flight',
    offers: generateOffersArrayIds(),
  },
  {
    type: 'check-in',
    name: 'Check-in',
    offers: generateOffersArrayIds(),
  },
  {
    type: 'sightseeing',
    name: 'Sightseeing',
    offers: generateOffersArrayIds(),
  },
  {
    type: 'restaurant',
    name: 'Restaurant',
    offers: generateOffersArrayIds(),
  },
];

export const FilterType = {
  ALL: 'Everything',
  FUTURE: 'Future'
};
export const SortType = {
  DEFAULT: 'default',
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

export const CITIES = [
  'Chamonix',
  'Paris',
  'Moscow',
  'Stockholm',
  'Limassol',
  'London',
  'Madrid',
];
