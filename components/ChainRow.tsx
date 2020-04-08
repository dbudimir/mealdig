/* eslint-disable class-methods-use-this */

// Utilities
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import OrderContent from './order-content/OrderContent';

interface Props {
  sortOrder: string;
  chainRow: any;
}

interface State {}

export default class ChainRow extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  sortPopular(a: any, b: any) {
    const favesA = a.props.favoriteCount;
    const favesB = b.props.favoriteCount;
    let comparison = 0;
    if (favesA > favesB) {
      comparison = -1;
    } else if (favesA < favesB) {
      comparison = +1;
    }
    return comparison;
  }

  sortRecent(a: any, b: any) {
    const createdA = a.props.createdDate;
    const createdB = b.props.createdDate;
    let comparison = 0;
    if (createdA > createdB) {
      comparison = -1;
    } else if (createdA < createdB) {
      comparison = +1;
    }
    return comparison;
  }

  sortOldest(a: any, b: any) {
    const createdA = a.props.createdDate;
    const createdB = b.props.createdDate;
    let comparison = 0;
    if (createdA > createdB) {
      comparison = +1;
    } else if (createdA < createdB) {
      comparison = -1;
    }
    return comparison;
  }

  render() {
    const { chainRow, sortOrder } = this.props;

    const orders = chainRow.map((order: any, ordersIndex: number) => (
      <OrderContent
        orderID={order._id}
        favoriteCount={order.favoriteCount}
        createdDate={order.createdAt}
        key={`${chainRow[0].chainName} - ${ordersIndex}`}
      />
    ));

    switch (sortOrder) {
      case 'popular':
        orders.sort(this.sortPopular);
        break;
      case 'recent':
        orders.sort(this.sortRecent);
        break;
      case 'oldest':
        orders.sort(this.sortOldest);
        break;
      default:
        break;
    }

    return <div className="chain-row">{orders}</div>;
  }
}
