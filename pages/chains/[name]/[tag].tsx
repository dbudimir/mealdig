/* eslint-disable react/prop-types */

// Utilities
import React, { Component } from 'react';
import { NextSeo } from 'next-seo';
import 'isomorphic-fetch';

// Styles
import TagPage from '../../../styles/TagPage';

// Components
import Layout from '../../../components/sitewide/Layout';
import BreadCrumbs from '../../../components/BreadCrumbs';
import Footer from '../../../components/sitewide/Footer';
import RightColumn from '../../../components/RightColumn';
import OrderContent from '../../../components/order-content/OrderContent';
import OrderTags from '../../../components/order-content/all-orders/OrderTags';

interface Props {
  orders: any;
  name: string;
  tag: string;
  full: string;
}

interface State {
  orders: any;
  tag: string;
  name: string;
}

export default class Tag extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      orders: props.orders,
      tag: props.tag,
      name: props.name
    };
  }

  render() {
    const { orders, tag, name } = this.state;
    const cleanTag = tag.replace(/-/g, ' ');
    const orderCard = orders.map((order: any, index: number) => <OrderContent orderID={order._id} key={index} />);
    const pageURL = `https://mealdig.com/chains/${name}/${cleanTag}`;

    return (
      <div>
        <NextSeo
          title={`The ${orderCard.length} Most Popular ${tag.charAt(0).toUpperCase() + tag.slice(1)} Orders at 
			 ${name.charAt(0).toUpperCase() + name.slice(1)}`}
          description={`Check out the most popular ${cleanTag} custom orders at ${name}. Or, submit your own custom order and share it with your friends.`}
          canonical={pageURL}
          openGraph={{
            url: pageURL,
            title: `The ${orderCard.length} Most Popular ${tag.charAt(0).toUpperCase() + tag.slice(1)} Orders at 
				${name.charAt(0).toUpperCase() + name.slice(1)}`,
            description: `Check out the most popular ${cleanTag} custom orders at ${name}. Or, submit your own custom order and share it with your friends.`,
            site_name: 'MealDig'
          }}
        />
        <Layout />
        <TagPage className="tag-order-container">
          <BreadCrumbs allOrders={this.state} tag={cleanTag} pageType="tag" />
          <div className="content-container">
            <div className="col-left">
              <div className="headline-container">
                <h1>
                  {`The ${orderCard.length} most popular
                  ${cleanTag.charAt(0).toUpperCase() + cleanTag.slice(1)} custom meals at
                  ${name.charAt(0).toUpperCase() + name.slice(1)}`}
                </h1>
              </div>
              <div className="order-list">{orderCard}</div>
            </div>
            <RightColumn tag={tag} chainName={name} />
          </div>
        </TagPage>
        <Footer />
      </div>
    );
  }
}

export async function getServerSideProps(context: any) {
  const chainUpper = context.query.name.charAt(0).toUpperCase() + context.query.name.slice(1);
  const lookup = `${chainUpper}/${context.query.tag}`;
  const res = await fetch(`${process.env.api_key}/api/orders/chain/${lookup}`);
  const data = await res.json();

  return {
    props: {
      orders: data,
      name: context.query.name,
      tag: context.query.tag,
      full: context.query
    }
  };
}
