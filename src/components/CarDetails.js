import React, { Component } from "react";
import Input from "./Input";

export default class CarDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedCar: this.getEmptyCar(), error: "" }
    this.convertDate = this.convertDate.bind(this);
    this.onEditField = this.onEditField.bind(this);

  }

  componentWillReceiveProps(props) {
    const car = props.selectedCar || this.getEmptyCar();
    this.setState({
      selectedCar: car
    })
  }

  convertDate(dateStr) {
    if (dateStr == null || dateStr === "") {
      return "";
    }
    var d = new Date(dateStr);
    var month = ('0' + (d.getMonth() + 1)).slice(-2);
    var date = ('0' + d.getDate()).slice(-2);
    var year = d.getFullYear();
    return `${year}-${month}-${date}`;
  }

  getEmptyCar() {
    return { id: "", year: "", registered: "", make: "", model: "", description: "", price: "" };
  }

  clearFields() {
    this.setState({ selectedCar: this.getEmptyCar(),error:"" });
  }

  //This requires id's = property name in car class
  onEditField(evt) {
    let selectedCar = this.state.selectedCar;
    const property = evt.target.id;
    selectedCar[property] = evt.target.value;
    this.setState({ selectedCar });
  }

  saveCar(car) {
    for (let prop in car) {
      if (car[prop] === "" && prop !== "id") {
        this.setState({error:"All fields are required" })
        return;
      }
    }
    //Convert to correct type before saving (AllCars uses prop types)
    car.year = Number(car.year);
    car.registered = new Date(car.registered);
    car.price = Number(car.price);
    this.props.saveCar(Object.assign({}, car));
    this.clearFields();
  }

  render() {
    let selectedCar = this.state.selectedCar || this.getEmptyCar();
    const id = selectedCar.id ? <span>({selectedCar.id})</span> : null;
    return (
      <div>
        <form className="form-horizontal">
          <fieldset>
            <legend>Car Details {id}</legend>
            <Input id="id" type="text" value={selectedCar.id} label="Id" />
            <Input id="year" type="number" value={selectedCar.year} onEditField={this.onEditField} label="Year" />
            <Input id="registered" type="date" label="Registered"
              value={this.convertDate(selectedCar.registered)} onEditField={this.onEditField} />
            <Input id="make" type="text" value={selectedCar.make} onEditField={this.onEditField} label="Make" />
            <Input id="model" type="text" value={selectedCar.model} onEditField={this.onEditField} label="Model" />
            <Input id="description" type="text" value={selectedCar.description} onEditField={this.onEditField} label="Description" />
            <Input id="price" type="text" value={selectedCar.price} onEditField={this.onEditField} label="Price" />
            <div className="form-group">
              <div className="col-md-12">
                <button type="button" id="New" onClick={this.clearFields.bind(this)} className="btn btn-primary">New Car</button> &nbsp;
              <button type="button" id="Save" onClick={this.saveCar.bind(this, selectedCar)} className="btn btn-success">Save Car</button> &nbsp;
              <button type="button" id="cancel" onClick={this.clearFields.bind(this)} className="btn btn-default">Cancel</button>
              </div>
            </div>
          </fieldset>
        </form>
        <p style={{color:"red"}}>{this.state.error}</p>
      </div>
    );
  }
}