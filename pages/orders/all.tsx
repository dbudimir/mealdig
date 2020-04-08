/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import 'isomorphic-fetch';

import styled from 'styled-components';

import Layout from '../../components/sitewide/Layout';
import OrderContent from '../../components/order-content/OrderContent';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  max-width: 1024px;
  margin: 60px auto 48px;
`;

const H1 = styled.h1`
  padding: 0px 12px;
  font-family: Roboto, sans-serif;
  font-size: 42px;
  font-weight: 800;
`;

const SortOrder = styled.div`
  position: relative;
  width: max-content;
  display: flex;
  justify-content: space-evenly;
  padding: 4px 0;
  border-bottom: 1px solid #000000;

  select {
    -webkit-appearance: none;
    border: none;
    background: transparent;
    font-family: Nunito;
    font-size: 16px;
  }

  svg {
    width: 16px;
    padding: 0px 6px;
  }
`;

const OrderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1024px;
  margin: 0 auto 240px;
  padding: 0 12px;

  h3 {
    text-transform: capitalize;
  }
`;

interface Props {
  orders: any;
}

interface State {
  sortOrder: string;
  orders: object[];
}

export default class AllOrders extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      sortOrder: 'popular',
      orders: props.orders
    };
  }

  sortOrders = (e: any) => {
    this.setState({
      sortOrder: e.target.value
    });
  };

  render() {
    //  // THIS IS WRONG
    //  const sortedOrders = () => {
    //    if (this.state.sortOrder === 'popular') {
    //      return this.state.orders.sort((a: any, b: any) => b.favoriteCount - a.favoriteCount);
    //    }
    //    if (this.state.sortOrder === 'recent') {
    //      return this.state.orders.sort((a: any, b: any) => new Date(b.createdAt) - new Date(a.createdAt));
    //    }
    //    if (this.state.sortOrder === 'oldest') {
    //      return this.state.orders.sort((a: any, b: any) => new Date(a.createdAt) - new Date(b.createdAt));
    //    }
    //  };

    const { orders } = this.state;

    const orderCards = orders.map((order: any, index: number) => {
      if (
        order.orderName !== null &&
        order.orderName !== undefined &&
        order.orderName.includes('test') !== true &&
        order.orderName.includes('Test') !== true &&
        order.tags.length > 0 &&
        Object.keys(order).length > 4
      ) {
        return <OrderContent orderID={order._id} key={index} />;
      }
    });

    return (
      <div>
        <Layout />
        <Header>
          <H1>Orders</H1>
          <SortOrder>
            <select onChange={(e) => this.sortOrders(e)} name="sort-orders" ref="order-select">
              <option value="" disabled selected>
                Sort by
              </option>
              <option value="popular">Most Popular</option>
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-arrow-down"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </SortOrder>
        </Header>

        <OrderContainer className="order-container">{orderCards}</OrderContainer>
      </div>
    );
  }
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.api_key}/api/orders/`);
  const data = await res.json();
  return {
    props: { orders: data }
  };
}
