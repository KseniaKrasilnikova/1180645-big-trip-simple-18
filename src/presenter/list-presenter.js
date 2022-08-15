import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render';

const POINTS_COUNTER = 3;

export default class ListPresenter {
  pointsList = new ListView();

  init = (listContainer) => {
    this.listContainer = listContainer;

    render(this.pointsList, this.listContainer);
    render(new EditPointView(), this.pointsList.getElement());
    render(new AddNewPointView(), this.pointsList.getElement());

    for (let i = 0; i < POINTS_COUNTER; i++) {
      render(new PointView(), this.pointsList.getElement());
    }
  };
}
