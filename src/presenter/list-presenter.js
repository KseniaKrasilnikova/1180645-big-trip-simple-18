import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';

import ListView from '../view/list-view.js';
import ListItemView from '../view/list-item-view.js';

import PointView from '../view/point-view.js';
import {render} from '../render';

export default class ListPresenter {
  pointsList = new ListView();

  init = (listContainer, destinationsModel) => {
    this.destinationsModel = destinationsModel;
    this.listDestinations = [...this.destinationsModel.getDestinations()];

    render(this.pointsList, listContainer);

    for (let i = 0; i < 5; i++) {
      const listItem = new ListItemView();

      render(listItem, this.pointsList.getElement());
      let listItemContent = null;
      if (i === 0) {
        listItemContent = new EditPointView();
      } else if (i === 1) {
        listItemContent = new AddNewPointView();
      } else {
        listItemContent = new PointView();
      }
      render(listItemContent, listItem.getElement());
    }
  };
}
