import {generatePoint} from '../mock/mock-point.js';

export default class PointModel {
  points = Array.from({length: 3}, generatePoint);

  getPoints= () => this.points;
}
