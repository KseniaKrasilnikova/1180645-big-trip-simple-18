import FilterView from './view/filter-view.js';
import {render} from './framework/render';
import ListPresenter from './presenter/list-presenter.js';
import {FilterType} from './const';

const siteFilterControlsElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');
const listPresenter = new ListPresenter();

render(new FilterView(FilterType), siteFilterControlsElement);

listPresenter.init(siteTripEventsElement);
