import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import {render} from './render';
import ListPresenter from './presenter/list-presenter.js';
import PointModel from './model/point-model.js';
// import DestinationsModel from './model/destinations-model.js';

const siteFilterControlsElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');
// const destinationsModel = new DestinationsModel();
const listPresenter = new ListPresenter();
const pointsModel = new PointModel();

render(new FilterView(), siteFilterControlsElement);
render(new SortView(), siteTripEventsElement);

listPresenter.init(siteTripEventsElement, pointsModel);
