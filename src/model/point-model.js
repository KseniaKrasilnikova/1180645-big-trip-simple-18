import {generatePoint} from '../mock/mock-point';
import {generateOffer} from '../mock/mock-offer';
import {generateDestination} from '../mock/mock-destination';
import {OFFERS, POINT_TYPES, POINTS_COUNT} from '../const';

export default class PointModel {
  #points = Array.from({length: POINTS_COUNT}, generatePoint);
  #offers = OFFERS;
  #destinations = Array.from({length: POINTS_COUNT}, (_value, key) => generateDestination(key + 1));
  #pointTypes = POINT_TYPES;
  #addPoint = generatePoint();

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get pointTypes() {
    return this.#pointTypes;
  }

  get addPoint() {
    return this.#addPoint;
  }

  getPointOffers = (point) => point.offers.map((offerId) =>
    this.#offers.find((offer) => offer.id === offerId)
  );

  getPointDestination = (point) => (
    this.#destinations.find((destination) =>
      point.destination === destination.id)
  );
}
