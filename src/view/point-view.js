import {getDayFromDate, getTimeFromDate, getYyyyMmDdTFromDate} from '../utils';
import AbstractView from '../framework/view/abstract-view.js';

const createPointViewTemplate = (point, offers, destinations) => {
  const {dateFrom, dateTo, basePrice, type} = point;
  const {name} = destinations;

  const generateOffersTemplate = (generatedOffers) => `
    ${generatedOffers.map((offer) => `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>
    `).join('')}
  `;

  return `
    <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${getYyyyMmDdTFromDate(dateFrom)}">${getDayFromDate(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${getYyyyMmDdTFromDate(dateFrom)}">${getTimeFromDate(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="${getYyyyMmDdTFromDate(dateTo)}">${getTimeFromDate(dateTo)}</time>
        </p>
      </div>
      <p class="event__price">
         &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
       </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${generateOffersTemplate(offers)}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
  `;
};

export default class PointView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;

  constructor(point, offers, destinations) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createPointViewTemplate(this.#point, this.#offers, this.#destinations);
  }
}

