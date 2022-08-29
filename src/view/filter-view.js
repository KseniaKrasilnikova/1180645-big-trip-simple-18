import AbstractView from '../framework/view/abstract-view.js';

const createFilterTemplate = (filterTypes) => {
  const generateFilterTemplate = (types) => `
    ${Object.entries(types).map(([key, value]) => `
      <div class="trip-filters__filter">
        <input id="filter-${key.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${value.toLowerCase()}">
        <label class="trip-filters__filter-label" for="filter-${key.toLowerCase()}">${value}</label>
      </div>
    `).join('')}
  `;

  return (
    `<form class="trip-filters" action="#" method="get">
      ${generateFilterTemplate(filterTypes)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterView extends AbstractView {
  #filterTypes = null;

  constructor(filterTypes) {
    super();
    this.#filterTypes = filterTypes;
  }

  get template() {
    return createFilterTemplate(this.#filterTypes);
  }
}
