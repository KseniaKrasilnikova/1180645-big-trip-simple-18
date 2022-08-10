import FilterView from './view/filter-view.js';
import {render} from './render';

const siteFiltersElement = document.querySelector('.trip-controls__filters');

render(new FilterView(), siteFiltersElement);
