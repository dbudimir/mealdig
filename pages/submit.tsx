// Utilities
import React, { Component } from 'react';
import styled from 'styled-components';

// Styles
import Form from '../styles/Submit';

// Components
import Layout from '../components/sitewide/Layout';
import CreateChipotleOrder from '../components/forms/order-forms/chain-forms/CreateChipotleOrder';
import CreateAndPizzOrder from '../components/forms/order-forms/chain-forms/CreateAndPizzaOrderForm';
import SelectChainForm from '../components/forms/order-forms/SelectChainForm';
import SubmitOrderForm from '../components/forms/order-forms/SubmitOrderForm';
import SubmitConfirmation from '../components/forms/order-forms/SubmitConfirmation';
import OrderPreview from '../components/order-content/OrderPreview';
import Footer from '../components/sitewide/Footer';

const CHAIN_CHIPOTLE = 'Chipotle';
const CHAIN_ANDPIZZA = '&pizza';

interface Props {}

interface State {
  chainName: string;
  order: any;
  user: any;
  orderDetails: any;
  orderSubmitted: boolean | string;
  showPreview: boolean;
}

export default class CreateOrder extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      chainName: '',
      order: {},
      user: {},
      orderDetails: {},
      orderSubmitted: '',
      showPreview: false
    };
  }

  setChain = (chain: string) => {
    this.setState({
      chainName: chain,
      showPreview: true
    });
  };

  setOrder = (order: any) => {
    this.setState({
      order
    });
  };

  setOrderDetails = (orderDetails: any) => {
    this.setState(prevState => ({
      ...prevState,
      order: { ...prevState.order, ...orderDetails }
    }));
  };

  setUser = (user: any) => {
    this.setState(prevState => ({
      ...prevState,
      user: { ...prevState.user, ...user }
    }));
  };

  toggleSubmitConfirmation = () => {
    this.setState(prevState => ({
      ...prevState,
      orderSubmitted: !prevState.orderSubmitted
    }));
  };

  render() {
    const { chainName, orderSubmitted, showPreview } = this.state;

    let orderForm;
    if (chainName === CHAIN_CHIPOTLE) {
      orderForm = <CreateChipotleOrder setOrder={this.setOrder} />;
    }
    if (chainName === CHAIN_ANDPIZZA) {
      orderForm = <CreateAndPizzOrder setOrder={this.setOrder} />;
    }

    let submitOrder;
    if (chainName !== '') {
      submitOrder = (
        <SubmitOrderForm
          setOrderDetails={this.setOrderDetails}
          toggleSubmitConfirmation={this.toggleSubmitConfirmation}
        />
      );
    }

    let submitConfirmation;
    if (orderSubmitted === true) {
      submitConfirmation = (
        <SubmitConfirmation
          orderState={this.state}
          toggleSubmitConfirmation={this.toggleSubmitConfirmation}
          setUser={this.setUser}
        />
      );
    }

    return (
      <>
        <Layout />
        <Form>
          <div className={showPreview ? 'left-col open' : 'left-col'}>
            <div className="headline-container">
              <h1>Create Your Order</h1>
            </div>
            <div className="create-order-form">
              <SelectChainForm setChain={this.setChain} />
              {orderForm}
              {submitOrder}
              {submitConfirmation}
            </div>
          </div>
          <div className={showPreview ? 'right-col open' : 'right-col'}>
            {showPreview ? <OrderPreview orderContent={this.state} /> : null}
          </div>
        </Form>
        <Footer />
      </>
    );
  }
}
