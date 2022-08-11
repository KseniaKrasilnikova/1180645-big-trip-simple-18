import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import addNewPointView from './view/add-new-point-view.js';
import {render} from './render';

const siteFilterControlsElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');

render(new FilterView(), siteFilterControlsElement);
render(new SortView(), siteTripEventsElement);
render(new addNewPointView(), siteTripEventsElement);
