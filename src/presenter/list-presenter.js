import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render';

const POINTS_COUNTER = 3;

export default class ListPresenter {
  pointsList = new ListView();

  init = (listContainer, destinationsModel) => {
    this.listContainer = listContainer;
    this.destinationsModel = destinationsModel;
    this.listDestinations = [...this.destinationsModel.getDestinations()];

    render(this.pointsList, this.listContainer);
    render(new EditPointView(), this.pointsList.getElement());
    // render(new AddNewPointView(), this.pointsList.getElement());

    for (let i = 0; i < this.listDestinations.length; i++) {
      render(new AddNewPointView(this.listDestinations[i]), this.pointsList.getElement());
    }

    for (let i = 0; i < POINTS_COUNTER; i++) {
      render(new PointView(), this.pointsList.getElement());
    }
  };
}
