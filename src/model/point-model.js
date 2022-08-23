import {generatePoint} from '../mock/mock-point';
import {generateOffer} from '../mock/mock-offer';
import {generateDestination} from '../mock/mock-destination';
import {POINTS_COUNT} from '../const';

export default class PointModel {
  addPoint = generatePoint();
  addDestinations = generateDestination(1);
  // getAddPointDestination = (newPoint) => {
  //   return this.addDestinations.find((destination) =>
  //     newPoint.destination === destination.id)
  // };


  points = Array.from({length: POINTS_COUNT}, generatePoint);
  offers = Array.from({length: POINTS_COUNT}, (_value, key) => generateOffer(key + 1))
  destinations = Array.from({length: POINTS_COUNT}, (_value, key) => generateDestination(key + 1))

  getPoints = () => this.points;

  getPointOffers = (point) => point.offers.map((offerId) =>
    this.offers.find((offer) => offer.id === offerId)
  );

  getPointDestination = (point) => {
    return this.destinations.find((destination) =>
      point.destination === destination.id)
  };
}
