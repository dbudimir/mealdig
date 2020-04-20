import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import ChipotleOrder from './ChipotleOrder';
import AndPizzaOrder from './AndPizzaOrder';

interface Props {
  chainName: string;
  orderState: any;
}
interface State {}

export default class ChainContent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props
    };
  }

  render() {
    const { chainName, orderState } = this.props;

    let chainOrderContent;
    if (chainName === 'Chipotle') {
      chainOrderContent = <ChipotleOrder orderState={orderState} />;
    } else if (chainName === '&pizza' || chainName === 'andPizza') {
      chainOrderContent = <AndPizzaOrder orderState={orderState} />;
    }
    return <>{chainOrderContent}</>;
  }
}
