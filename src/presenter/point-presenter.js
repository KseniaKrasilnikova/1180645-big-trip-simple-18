import {remove, render, replace} from '../framework/render';
import EditPointView from '../view/edit-point-view';
import PointView from '../view/point-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #point = null;
  #offers = null;
  #destination = null;
  #allDestinations = null;
  #pointTypes = null;
  #editPointComponent;
  /**
   * @type {PointView}
   */
  #pointComponent = null;
  /**
   * @type {function}
   */
  #editingListener = null;
  #mode = Mode.DEFAULT;

  constructor(point, offers, destination, allDestinations, pointTypes, editingListener) {
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;
    this.#allDestinations = allDestinations;
    this.#pointTypes = pointTypes;
    this.#editingListener = editingListener;
  }

  init = (container) => {
    this.#pointComponent = new PointView(
      this.#point,
      this.#offers,
      this.#destination,
    );

    this.#editPointComponent = new EditPointView(
      this.#point,
      this.#offers,
      this.#destination,
      this.#allDestinations,
      this.#pointTypes
    );

    this.#renderPoint(container);
    this.#pointComponent.setClickHandler(this.#toEditingMode);
    this.#editPointComponent.setClickHandler(this.#toDefaultMode);
    this.#editPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  };

  resetView = () => {
    this.#toDefaultMode();
  };

  #toEditingMode = () => {
    if (this.#mode !== Mode.EDITING) {
      this.#replacePointToEditForm();
      this.#editingListener();
      this.#mode = Mode.EDITING;
    }
  };

  #toDefaultMode = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditFormToPoint();
      this.#mode = Mode.DEFAULT;
    }
  };

  #replacePointToEditForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceEditFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (evt) => {
    evt.preventDefault();
    this.#replaceEditFormToPoint();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#toDefaultMode();
    }
  };

  #renderPoint = (container) => {
    render(this.#pointComponent, container);
  };
}
