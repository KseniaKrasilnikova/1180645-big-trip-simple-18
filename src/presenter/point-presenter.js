import {render, replace} from '../framework/render';
import EditPointView from '../view/edit-point-view';
import PointView from '../view/point-view';

export default class PointPresenter {
  #point = null;
  #offers = null;
  #destination = null;
  #editPointComponent;
  #pointComponent;

  constructor(point, offers, destination) {
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;
  }

  init = (container) => {
    this.#pointComponent = new PointView( // создает экземпляр PointView
      this.#point,
      this.#offers,
      this.#destination,
    );

    this.#editPointComponent = new EditPointView(
      this.#point,
      this.#offers,
      this.#destination
    );

    this.#renderPoint(container); // отрисовали все карточки
    this.#pointComponent.setClickHandler(this.#replacePointToEditForm);
    this.#editPointComponent.setClickHandler(this.#replaceEditFormToPoint);
    this.#editPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
  };

  #replacePointToEditForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEditFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
  }

  #handleFormSubmit = (evt) => {
    evt.preventDefault();
    this.#replaceEditFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #renderPoint = (container) => {
    render(this.#pointComponent, container); // отрисовывает в нужное место
  };
}
