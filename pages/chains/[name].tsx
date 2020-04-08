/* eslint-disable react/prop-types */

// Utilities
import React, { Component } from 'react';
import { NextSeo } from 'next-seo';
import 'isomorphic-fetch';

// Styles
import TagPage from '../../styles/TagPage';

// Components
import Layout from '../../components/sitewide/Layout';
import OrderContent from '../../components/order-content/OrderContent';
import BreadCrumbs from '../../components/BreadCrumbs';
import RightColumn from '../../components/RightColumn';
import Footer from '../../components/sitewide/Footer';

interface Props {
  orders: object[];
  allOrders: any;
}

interface State {
  orders: object[];
  allOrders: any;
}

export default class Chains extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      orders: props.orders,
      allOrders: props.allOrders
    };
  }

  render() {
    const { orders, allOrders } = this.state;

    const orderCard = orders.map((order: any, index: number) => <OrderContent orderID={order._id} key={index} />);
    const pageURL = `https://mealdig.com/chains/${allOrders.name}`;

    return (
      <div>
        <NextSeo
          title={`The Most Popular Custom meal orders at ${allOrders} | MealDig`}
          description={`Explore the Most Popular Custom meal orders at ${allOrders}, Or, submit your own custom order and share it with your friends.`}
          canonical={pageURL}
          openGraph={{
            url: pageURL,
            title: `The Most Popular Custom meal orders at ${allOrders} | MealDig`,
            description: `Explore the Most Popular Custom meal orders at ${allOrders}, Or, submit your own custom order and share it with your friends.`,
            site_name: 'MealDig'
          }}
        />
        <Layout />
        <TagPage className="tag-order-container">
          <BreadCrumbs allOrders={allOrders} pageType="chain" />
          <div className="content-container">
            <div className="col-left">
              <div className="headline-container">
                <h1>
                  The {orderCard.length} most popular custom orders at {allOrders.name}
                </h1>
              </div>
              <div className="order-list">{orderCard}</div>
            </div>
            <RightColumn chainName={allOrders.name} />
          </div>
        </TagPage>
        <Footer />
      </div>
    );
  }
}

// Serverside get props
export async function getServerSideProps(context: any) {
  const chainName = (await context.query.name.charAt(0).toUpperCase()) + context.query.name.slice(1);
  const res = await fetch(`${process.env.api_key}/api/chains/${chainName}`);
  const data = await res.json();

  const chainsList = [data.orders];

  const cleanList = chainsList.map((chain) =>
    chain.filter(
      (order: any) =>
        order.orderName !== null &&
        order.orderName !== undefined &&
        order.orderName.includes('test') !== true &&
        order.orderName.includes('Test') !== true &&
        order.tags.length > 0 &&
        Object.keys(order).length > 4
    )
  );

  return {
    props: {
      orders: cleanList[0],
      allOrders: { name: context.query.name }
    }
  };
}
