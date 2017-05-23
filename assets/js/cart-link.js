import React from 'react';

class CartLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemCount: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <a onClick={this.handleClick}>
        Cart ({this.state.itemCount})
      </a>
    );
  }
}

export default CartLink;
