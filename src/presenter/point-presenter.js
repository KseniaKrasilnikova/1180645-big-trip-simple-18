import {render} from '../framework/render';
import EditPointView from '../view/edit-point-view';
import PointView from '../view/point-view';

export default class PointPresenter {
  #point = null;
  #offers = null;
  #destination = null;

  constructor(point, offers, destination) {
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;
  }

  init = (container) => {
    this.#renderPoint(container); // отрисовали все карточки
  };

  #renderPoint = (container) => {
    const pointComponent = new PointView( // создает экземпляр PointView
      this.#point,
      this.#offers,
      this.#destination
    );

    const editPointComponent = new EditPointView(
      this.#point,
      this.#offers,
      this.#destination
    );

    const replacePointToEditForm = () => {
      container.replaceChild(editPointComponent.element, pointComponent.element);
    };
    const replaceEditFormToPoint = () => {
      container.replaceChild(pointComponent.element, editPointComponent.element);
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

    render(pointComponent, container); // отрисовывает в нужное место
  };
}
