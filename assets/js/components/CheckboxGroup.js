import React from 'react';
import CheckboxInput from './CheckboxInput';
import utils from './../utils';

class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);

    this.handleCheckboxInputChange = this.handleCheckboxInputChange.bind(this);
  }

  handleCheckboxInputChange(name, value, checked) {
    let checkedValues = checked
      ? utils.array.uniq([...this.props.checkedValues, value])
      : utils.array.remove(this.props.checkedValues, value);

    this.props.onChange(name, checkedValues);
  }

  createId(name, value) {
    return [name, value.toLowerCase().replace(/\s/g, '-')].join('-');
  }

  inputs() {
    return this.props.values.map(value => (
      <CheckboxInput
        label={value}
        id={this.createId(this.props.name, value)}
        name={this.props.name}
        value={value}
        checked={this.props.checkedValues.includes(value)}
        onChange={this.handleCheckboxInputChange}
      />
    ));
  }

  render() {
    return (
      <div className="checkbox-group">
        <h1 className="checkbox-group__title">{this.props.title}</h1>
        <div className="checkbox-group__inputs">{this.inputs()}</div>
      </div>
    );
  }
}

export default CheckboxGroup;



