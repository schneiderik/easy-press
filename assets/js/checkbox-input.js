import React from 'react';

class CheckboxInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const checked = target.checked;

    this.props.onChange(value, checked, this.props.name);
  }

  render() {
    return (
      <div className="checkbox-input">
        <label className="checkbox-input__label" for={this.props.id}>
          <input
            className="checkbox-input__input"
            type="checkbox"
            id={this.props.id}
            name={this.props.name} 
            value={this.props.value}
            checked={this.props.isChecked}
            onChange={this.handleChange}
          />
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default CheckboxInput;
