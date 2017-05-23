import React from 'react';

class CheckboxInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: Boolean(this.props.isChecked)
    }
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.props.onChange(value);
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
            checked={this.state.isChecked}
            onChange={this.handleChange}
          />
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default CheckboxInput;
