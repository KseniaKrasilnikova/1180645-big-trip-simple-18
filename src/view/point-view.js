import {createElement} from '../render';
import {getRandomInteger, getDayFromDate, getTimeFromDate, getDateValue} from '../utils';

const createPointViewTemplate = (point, offers) => {
  const {dateFrom, dateTo, basePrice, type, destination} = point;

  const generateOffersTemplate = (offers) => `
    ${offers.map((offer) => `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>
    `).join('')}
  `

  return `
    <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${getDateValue(dateFrom)}">${getDayFromDate(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${getDateValue(dateFrom)}">${getTimeFromDate(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="${getDateValue(dateTo)}">${getTimeFromDate(dateTo)}</time>
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

export default class PointView {
  constructor(point, offers, destination) {
    this.point = point;
    this.offers = offers;
    this.destination = destination;
  }
  getTemplate() {
    return createPointViewTemplate(this.point, this.offers, this.destination);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

