import React, { Component } from 'react'
import { _ } from "underscore";
import { IntlProvider, FormattedNumber, FormattedDate, addLocaleData } from 'react-intl';
import da from 'react-intl/locale-data/da';
addLocaleData([...da]);

export default class AllCars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCars : props.carfactory.cars,
      sortAccending: true
    };
    this.filterCars = this.filterCars.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
       filteredCars: props.carfactory.cars
    });
    this.forceUpdate();
  }
  
  sortColumn(e) {
    e.preventDefault();
    let col = e.target.id;
    let pos = col.indexOf("_");
    if(pos === -1) {
      return //Not a sortable column
    }
    let id = col.substring(pos+1);
    let cars = this.props.carfactory.cars;
    let sortDirection = this.state.sortAccending;
    let sorted = sortDirection ? _.sortBy(cars, id) : _.sortBy(cars, id).reverse();
    this.setState({
      filteredCars: sorted,
      sortAccending: !this.state.sortAccending
    });
  }

  filterCars(e) {
    let txt = e.target.value.toLowerCase();
    if (txt.length < 2) {
      return this.setState({
        filteredCars: this.props.carfactory.cars
      });
    }
    let cars = this.props.carfactory.cars;
    let filtered = cars.filter(car => {
      let matchFound = false;
      for (let i = 0, keys = Object.keys(car); i < keys.length; i++) {
        let val = "" + car[keys[i]];
        if (val.toLowerCase().includes(txt)) {
          matchFound = true;
        }
      }
      return matchFound;
    });
    this.setState({
      filteredCars: filtered
    })
  }

  render() {
    var cars = this.state.filteredCars;
    var tr = cars.map((car) => <TableRow key={car.id} car={car} carToEdit={this.props.carToEdit} carToDelete={this.props.carToDelete}/>)
    return (
      <div>
        <input type='text' id="filter" placeholder="Enter filter text" onInput={this.filterCars} />
        <IntlProvider locale="da">
          <table className="table">
            <thead style={{color: "darkGray"}} onClick={this.sortColumn.bind(this)}>
              <tr>
                <th>id</th>
                <th> Year <a href=""> <span id="h_year" className="glyphicon glyphicon-sort"></span></a></th>
                <th> Registred <a href=""> <span id="h_registered" className="glyphicon glyphicon-sort"></span></a></th>
                <th> Make <a href=""> <span id="h_make" className="glyphicon glyphicon-sort"></span></a></th>
                <th> Model <a href=""> <span id="h_model" className="glyphicon glyphicon-sort"></span></a></th>
                <th> Decription <a href=""> <span id="h_description" className="glyphicon glyphicon-sort"></span></a></th>
                <th> Price <a href=""> <span id="h_price" className="glyphicon glyphicon-sort"></span></a></th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="tbodycars">
              {tr}
            </tbody>
          </table>
        </IntlProvider>
      </div>
    )
  }
}

const TableRow = ({car, carToEdit, carToDelete}) => (
  <tr>
    <td>{car.id}</td>
    <td>{car.year}</td>
    <td><FormattedDate value={car.registered} /></td>
    <td>{car.make}</td>
    <td>{car.model}</td>
    <td>{car.description}</td>
    <td><FormattedNumber
      value={car.price}
      style="currency"
      currency="DKK" />
    </td>
    <td>
      <a href="" onClick={(e) => { e.preventDefault(); carToEdit.call(this, car) } }>Edit</a> |&nbsp;
      <a href="" onClick={(e) => { e.preventDefault(); carToDelete.call(this,car.id)}}>Delete</a>
    </td>
  </tr>
)


let carPropType = React.PropTypes.shape({
  id: React.PropTypes.number,
  year: React.PropTypes.number,
  registered: React.PropTypes.instanceOf(Date),
  make: React.PropTypes.string,
  model: React.PropTypes.string,
  description: React.PropTypes.string,
  price: React.PropTypes.number
});

AllCars.propTypes = {
  carfactory: React.PropTypes.shape({
    cars: React.PropTypes.arrayOf(carPropType)
  })
}


