import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import {render} from './render';
import ListPresenter from './presenter/list-presenter.js';
import DestinationsModel from './model/destinations-model.js';

const siteFilterControlsElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');

const destinationsModel = new DestinationsModel();
const listPresenter = new ListPresenter();

render(new FilterView(), siteFilterControlsElement);
render(new SortView(), siteTripEventsElement);

listPresenter.init(siteTripEventsElement, destinationsModel);
