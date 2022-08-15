import {generateDestination} from '../mock/mock-destination.js';

export default class DestinationsModel {
  destinations = Array.from({length: 3}, generateDestination);

  getDestinations= () => this.destinations;
}
