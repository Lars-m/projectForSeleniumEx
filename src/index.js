import CarFactory from "./datafacades/cars";
import ReactDOM from "react-dom";
import OuterContainer from "./components/OuterContainer";
import React from "react";

let factory = new CarFactory();

factory.loadCars(() => {
  //Don't load DOM, until initial data is fetched
  ReactDOM.render(<OuterContainer factory={factory} />, document.getElementById("content"));
})