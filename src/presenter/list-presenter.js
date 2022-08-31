import {render, RenderPosition} from '../framework/render';
import PointModel from '../model/point-model';
import AddNewPointView from '../view/add-new-point-view';
import ListView from '../view/list-view';
import NoPointsView from '../view/no-points-view';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter';

const siteTripEventsElement = document.querySelector('.trip-events');

export default class ListPresenter {
  #sortView = new SortView();
  #pointsList = new ListView();
  #listContainer = null;
  #pointsModel = new PointModel();
  #points = [];
  #noPointsComponent = new NoPointsView();
  #siteTripEventsElement = null;

  init = (listContainer) => {
    this.#listContainer = listContainer;
    this.#siteTripEventsElement = siteTripEventsElement;
    this.#points = [...this.#pointsModel.points]; // вызываем-создаем все поинты, к-ые мы нагенерировали

    if (this.#points.length === 0) {
      this.#renderNoPoints();
    } else {
      this.#renderSortView();
      this.#renderList();
      for (let i = 0; i < this.#points.length; i++) {
        const point = this.#points[i]
        const pointPresenter = new PointPresenter(
          point,
          this.#pointsModel.getPointOffers(point),
          this.#pointsModel.getPointDestination(point)
        );
        pointPresenter.init(this.#pointsList.element);
      }
      this.#renderAddNewPoint(this.#pointsModel.addPoint);
    }
  };

  #renderNoPoints = () => {
    render(this.#noPointsComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
  };
  #renderSortView = () => {
    render(this.#sortView, this.#siteTripEventsElement, RenderPosition.AFTERBEGIN);
  };
  #renderList = () => {
    render(this.#pointsList, this.#listContainer, RenderPosition.BEFOREEND);
  };
  #renderAddNewPoint = (point) => {
    const addNewPointComponent = new AddNewPointView( // создает экземпляр AddNewPointView
      point,
      this.#pointsModel.offers,
      this.#pointsModel.getPointOffers(point),
      this.#pointsModel.getPointDestination(point)
    );

    render(addNewPointComponent, this.#pointsList.element); // отрисовывает в нужное место
  };
}
