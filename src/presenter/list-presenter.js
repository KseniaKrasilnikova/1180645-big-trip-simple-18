import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';

import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import ListItemView from '../view/list-item-view.js';
import {render} from '../render';

export default class ListPresenter {
  pointsList = new ListView();

  init = (listContainer) => {  // где мы это все будем  делать
    this.listContainer = listContainer;
    const listItem =  new ListItemView();
    const listAddPointItem =  new ListItemView();

    render(this.pointsList, this.listContainer);

    render(listItem, this.pointsList.getElement());
    render(new EditPointView(), listItem.getElement());

    render(listAddPointItem, this.pointsList.getElement());
    render(new AddNewPointView(), listAddPointItem.getElement());

    for (let i = 0; i < 3; i++) {
      this.listItem =  new ListItemView();

      render(this.listItem, this.pointsList.getElement());
      render(new PointView(), this.listItem.getElement());
    }
  };
}
