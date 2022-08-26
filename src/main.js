import FilterView from './view/filter-view.js';
import {render} from './render';
import ListPresenter from './presenter/list-presenter.js';
import PointModel from './model/point-model.js';

const siteFilterControlsElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');
const listPresenter = new ListPresenter();
const pointsModel = new PointModel();

render(new FilterView(), siteFilterControlsElement);

listPresenter.init(siteTripEventsElement, pointsModel);
