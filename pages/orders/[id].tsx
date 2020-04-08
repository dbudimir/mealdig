/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import 'isomorphic-fetch';

import styled from 'styled-components';

import Layout from '../../components/sitewide/Layout';
import OrderContent from '../../components/order-content/OrderContent';

const OrderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1024px;
  margin: 60px auto;

  .order-content-container {
    flex-basis: 100%;

    .order-data {
      .description {
        display: block;
        mask-image: unset;
      }
    }
  }
`;

interface Props {
  order: any;
  orderId: string;
}
interface State {}

export default class OrderById extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    const { order, orderId } = this.props;
    const orderCard = order.map((order: any, index: number) => <OrderContent orderID={orderId} key={index} />);

    return (
      <div>
        <Layout />
        <OrderContainer>{orderCard}</OrderContainer>
      </div>
    );
  }
}

export async function getServerSideProps(context: any) {
  const res = await fetch(`${process.env.api_key}/api/orders/id/${context.query.id}`);
  const data = await res.json();

  return {
    props: { order: data, orderId: context.query.id }
  };
}
