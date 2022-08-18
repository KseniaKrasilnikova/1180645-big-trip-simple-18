import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render';
import PointModel from '../model/point-model';

const POINTS_COUNTER = 10;

export default class ListPresenter {
  pointsList = new ListView();

  init = (listContainer) => {
    this.listContainer = listContainer;
    this.pointsModel = new PointModel();
    this.points = this.pointsModel.getPoints();

    render(this.pointsList, this.listContainer);
    render(new EditPointView(), this.pointsList.getElement());
    render(new AddNewPointView(), this.pointsList.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(
        new PointView (
          this.points[i],

        ), this.pointsList.getElement()
      );
    }
  };
}
