import React from 'react';

class CheckboxInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const target = e.target;

    this.props.onChange(this.props.name, target.value, target.checked);
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
            checked={this.props.checked}
            onChange={this.handleChange}
          />
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default CheckboxInput;
