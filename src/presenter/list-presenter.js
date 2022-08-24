import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render';
import PointModel from '../model/point-model';

export default class ListPresenter {
  pointsList = new ListView();

  init = (listContainer) => {
    this.listContainer = listContainer;
    this.pointsModel = new PointModel(); // создаем новый объект из класса
    this.points = this.pointsModel.getPoints(); // вызываем-создаем все поинты, к-ые мы нагенерировали

    render(this.pointsList, this.listContainer);
    render(new EditPointView(
      this.pointsModel.editPoint,
      this.pointsModel.getPointOffers(this.pointsModel.editPoint),
      this.pointsModel.getPointDestination(this.pointsModel.editPoint)
    ), this.pointsList.getElement());

    render(new AddNewPointView(
      this.pointsModel.addPoint,
      this.pointsModel.offers,
      this.pointsModel.getPointOffers(this.pointsModel.addPoint),
      this.pointsModel.getPointDestination(this.pointsModel.addPoint)
    ), this.pointsList.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(
        new PointView (
          this.points[i],
          this.pointsModel.getPointOffers(this.points[i]),
          this.pointsModel.getPointDestination(this.points[i])
        ), this.pointsList.getElement()
      );
    }
  };
}
