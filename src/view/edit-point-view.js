import {getDMYTFromDate} from '../utils/point-utils';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {pics} from '../mock/mock-destination';

const createEditPointTemplate = (state, allOffers, allDestinations, pointTypes) => {
  const {dateFrom, dateTo, basePrice} = state;
  const destination = allDestinations.find(destination => destination.id === state.destination);
  const currentTypeOffers = allOffers.filter((offer) => state.type.offers.includes(offer.id))

  const generateOffersTemplate = () => `
    ${currentTypeOffers.map((offer) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}">
        <label class="event__offer-label" for="event-offer-${offer.id}">
          <span class="event__offer-title">${offer.name}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `).join('')}
  `;

  const allDestinationsMarkup = () => `
    ${allDestinations.map((destination) => `
      <option value=${destination.name}></option>
    `).join('')}
  `;

  const pointTypesMarkup = () => `
    ${pointTypes.map((offer) => `
      <div class="event__type-item">
        <input id="event-type-destination-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}">
        <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-1">${offer.name}</label>
      </div>
    `).join('')}
  `;

  const renderPictures = (ids) => (
    ids.map((id) => {
      const picture = pics.find((pic) => (
        pic.id === id
      ));
      return `<img class="event__photo" src=${picture.src} alt=${picture.description}>`;
    }).join('')
  );

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${state.type.type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                  ${pointTypesMarkup()}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${state.type.name}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination.name} list="destination-list-1">
            <datalist id="destination-list-1">
                ${allDestinationsMarkup()}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDMYTFromDate(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDMYTFromDate(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
                ${generateOffersTemplate()}
            </div>
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>
            <div class="event__photos-container">
                <div class="event__photos-tape">
                    ${renderPictures(destination.pictures)}
                </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class EditPointView extends AbstractStatefulView {
  #offers = null;
  #allDestinations = [];
  #pointTypes = [];

  constructor(point, offers, destination, allDestinations, pointTypes) {
    super();
    this._state = EditPointView.parseEditPointToState(point)  // метод разбирает данные, к-ый передаются в конструктор, и на их основе заполнить состояние.
    this.#offers = offers;
    this.#allDestinations = allDestinations;
    this.#pointTypes = pointTypes;
  }

  get template() {
    return createEditPointTemplate(this._state, this.#offers, this.#allDestinations, this.#pointTypes);
  }

  static parseEditPointToState = (point) => ({
    ...point
  });

  static parseStateToEditPoint = (state) => ({
    ...state
  });

  _restoreHandlers = () => {
    this.setClickHandler(this._callback.clickHandler);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setTypeClickHandler();
    this.setDestinationClickHandler();
  }

  setClickHandler = (callback) => {
    this._callback.clickHandler = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickHandler();
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPointView.parseStateToEditPoint(this._state));
  };

  setTypeClickHandler = () => {
    this.element.querySelectorAll('.event__type-item').forEach((typeItem) => {
      typeItem.addEventListener('click', this.#typeClickHandler);
    });
  };

  #typeClickHandler = (evt) => {
    evt.preventDefault();
    const selectedType = this.#pointTypes.find(item => item.type === evt.target.parentElement.querySelector('input').value);
    this.updateElement({
      type: selectedType,
    });
  };

  setDestinationClickHandler = () => {
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationClickHandler);
  };

  #destinationClickHandler = (evt) => {
    const selectedPlaceName = evt.target.parentElement.querySelector('input').value;
    const selectedPlace = this.#allDestinations.find(destination => destination.name === selectedPlaceName);
    if(selectedPlace) {
      this.updateElement({
        destination: selectedPlace.id,
      });
    }
  };
}
