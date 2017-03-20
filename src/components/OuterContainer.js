import AllCars from "./AllCars";
import CarDetails from "./CarDetails";
import React, { Component } from "react";

export default class OuterContainer extends Component {
  constructor(props) {
    super(props);
    this.carToEdit = this.carToEdit.bind(this);
    this.saveCar = this.saveCar.bind(this);
    this.carToDelete = this.carToDelete.bind(this);
    this.state = { selectedCar: {} }
    this.state = { factory: this.props.factory }
  }

  carToEdit(car) {
    this.setState({ selectedCar: car });
  }

  carToDelete(id) {
    this.state.factory.deleteCar(id, () => {
      this.setState({ factory: this.props.factory });
    });
  }

  saveCar(car){
    this.state.factory.addEditCar(car, (newCar) => {
      this.setState({ factory: this.props.factory, selectedCar: null });
    });
  }

  render() {
    return (
      <div>
        <div className="col-md-9">
          <h4>Number of cars in the factory right now: {this.props.factory.cars.length}</h4>
          <AllCars carfactory={this.state.factory} carToEdit={this.carToEdit} carToDelete={this.carToDelete} />
        </div>
        <div className="col-md-3 details">
          <CarDetails selectedCar={this.state.selectedCar} saveCar={this.saveCar} />
        </div>
      </div>
    )
  }
}