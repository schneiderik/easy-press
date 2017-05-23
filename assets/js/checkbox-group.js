import React from 'react';
import CheckboxInput from './checkbox-input.js';

class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="checkbox-group">
        <h1 className="checkbox-group__title">{this.props.title}</h1>
        <div className="checkbox-group__inputs">{this.props.inputs}</div>
      </div>
    );
  }
}

export default CheckboxGroup;
