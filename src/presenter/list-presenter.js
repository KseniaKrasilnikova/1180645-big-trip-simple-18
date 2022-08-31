import {render, RenderPosition} from '../framework/render';
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
        this.#renderPoint(this.#points[i]); // отрисовали все карточки
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
  #renderPoint = (point) => {
    const pointComponent = new PointView( // создает экземпляр PointView
      point,
      this.#pointsModel.getPointOffers(point),
      this.#pointsModel.getPointDestination(point)
    );

    const editPointComponent = new EditPointView( // создает (заранее) экземпляр EditPointView
      point,
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
    pointComponent.setClickHandler(() => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });
    editPointComponent.setClickHandler(() => {
      replaceEditFormToPoint();
    });
    editPointComponent.setFormSubmitHandler((evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#pointsList.element); // отрисовывает в нужное место
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
