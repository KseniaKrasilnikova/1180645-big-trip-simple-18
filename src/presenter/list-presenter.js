import {render} from '../render';
import PointModel from '../model/point-model';
import AddNewPointView from '../view/add-new-point-view';
import EditPointView from '../view/edit-point-view';
import ListView from '../view/list-view';
import PointView from '../view/point-view';
import NoPointsView from '../view/no-points-view';
import SortView from '../view/sort-view.js';

const siteTripEventsElement = document.querySelector('.trip-events');

export default class ListPresenter {
  #sortView = new SortView();
  #pointsList = new ListView();
  #listContainer = null;
  #pointsModel = new PointModel;
  #points = [];

  init = (listContainer) => {
    this.#listContainer = listContainer;
    this.#pointsModel = new PointModel(); // создаем новый объект из класса
    this.#points = [...this.#pointsModel.points]; // вызываем-создаем все поинты, к-ые мы нагенерировали

    if (this.#points.length === 0) {
      render(new NoPointsView(), this.#listContainer);
    } else {
      render(this.#sortView, siteTripEventsElement);
      render(this.#pointsList, this.#listContainer);

      // render(new AddNewPointView (
      //   this.#pointsModel.addPoint,
      //   this.#pointsModel.offers,
      //   this.#pointsModel.getPointOffers(this.#pointsModel.addPoint),
      //   this.#pointsModel.getPointDestination(this.#pointsModel.addPoint)
      // ), this.#pointsList.element);

      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i]); // отрисовали все карточки
      }
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new PointView( // создает экземпляр PointView
      point,
      this.#pointsModel.getPointOffers(point),
      this.#pointsModel.getPointDestination(point)
    );

    const editPointComponent = new EditPointView( // создает (заранее) экземпляр EditPointView
      point, // this.#pointsModel.editPoint,
      this.#pointsModel.getPointOffers(point),
      this.#pointsModel.getPointDestination(point)
    );

    const replacePointToEditForm = () => {
      this.#pointsList.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const replaceEditFormToPoint = () => {
      this.#pointsList.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditFormToPoint();
    });

    editPointComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#pointsList.element); // отрисовывает в нужное место
  };
}
