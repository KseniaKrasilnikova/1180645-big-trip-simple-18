import {FilterType} from '../const';
import {isFutureEvent} from './point-utils';

const pointsFilter = {
  [FilterType.ALL]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureEvent(point.dateFrom) || isFutureEvent(point.dateTo)),
};

export {pointsFilter};
