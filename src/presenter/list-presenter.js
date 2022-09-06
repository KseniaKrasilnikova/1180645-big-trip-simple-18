import {render, RenderPosition} from '../framework/render';
import PointModel from '../model/point-model';
import AddNewPointView from '../view/add-new-point-view';
import ListView from '../view/list-view';
import NoPointsView from '../view/no-points-view';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter';
import {updateItem, sortPointDown, sortPointByPrice} from '../utils/point-utils';
import {SortType} from '../const';


export default class ListPresenter {

  #sortView = new SortView();
  #pointsListView = new ListView();
  #noPointsComponentView = new NoPointsView();

  #listContainerElement = null;

  #pointsModel = new PointModel();

  #points = [];
  #sortedPoints = [];
  /**
   * @type {[PointPresenter]}
   */
  #pointsPresenters = [];
  #currentSortType = SortType.DEFAULT;

  init = (listContainer) => {
    this.#listContainerElement = listContainer;
    this.#points = [...this.#pointsModel.points]; // вызываем-создаем все поинты, к-ые мы нагенерировали
    this.#sortedPoints = this.#points;

    this.#renderList(this.#sortedPoints);
  };

  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderNoPoints = () => {
    render(this.#noPointsComponentView, this.#listContainerElement, RenderPosition.AFTERBEGIN);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderList(this.#sortedPoints);
  };

  #clearPointList = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters = [];
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#sortedPoints = this.#points.sort(sortPointDown);
        break;
      case SortType.PRICE:
        this.#sortedPoints = this.#points.sort(sortPointByPrice);
        break;
      default:
        this.#sortedPoints = this.#points;
    }
  };

  #renderSortView = () => {
    render(this.#sortView, this.#listContainerElement, RenderPosition.AFTERBEGIN);
    this.#sortView.setSortTypeChangeHandler(this.#handleSortTypeChange); // в нашу вьюху через метод setSortTypeChangeHandler передаем ссылку на наш обработчик handleSortTypeChange
  };

  #renderList = (points) => {
    if (points.length === 0) {
      this.#renderNoPoints();
    } else {
      this.#renderSortView();
      render(this.#pointsListView, this.#listContainerElement, RenderPosition.BEFOREEND);

      for (let i = 0; i < points.length; i++) {
        const point = this.#points[i];
        const pointPresenter = new PointPresenter(
          point,
          this.#pointsModel.getPointOffers(point),
          this.#pointsModel.getPointDestination(point),
          this.#handleModeChange
        );
        pointPresenter.init(this.#pointsListView.element);
        this.#pointsPresenters.push(pointPresenter);
      }

      // this.#renderAddNewPoint(this.#pointsModel.addPoint);
    }
  };

  #renderAddNewPoint = (point) => {
    const addNewPointComponent = new AddNewPointView( // создает экземпляр AddNewPointView
      point,
      this.#pointsModel.offers,
      this.#pointsModel.getPointOffers(point),
      this.#pointsModel.getPointDestination(point)
    );

    render(addNewPointComponent, this.#pointsListView.element); // отрисовывает в нужное место
  };
}
