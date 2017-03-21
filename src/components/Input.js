import React from "react";

function Input(props) {
  let placeholder = props.placeholder || props.label;
  let attributes = {}
  if (typeof props.onEditField === "undefined") {
    attributes['readOnly'] = "readOnly";
  }
  return (
    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor={props.id}>{props.label}</label>
      <div className="col-md-8">
        <input id={props.id} name={props.id} type={props.type} placeholder={placeholder} className="form-control input-md"
          value={props.value} onChange={props.onEditField} {...attributes}
        />
      </div>
    </div>
  );
}

export default Input;