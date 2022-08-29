import {pointsFilter} from '../utils/filter-utils';

export const generateFilter = (points) => Object.entries(pointsFilter).map(
  ([filterName, filterPoints]) => ({
    name: filterName,
    points: filterPoints(points),
  }),
);
