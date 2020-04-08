/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { Component } from 'react';
import axios from 'axios';

import { AdminPanel, ModalContainer, OrderContentContainer } from '../../styles/OrderContentContainer';

// Components pulling innformaton relevent to all chains
import ActionBar from './all-orders/ActionBar';
import CreatedMeta from './all-orders/CreatedMeta';
import OrderTags from './all-orders/OrderTags';

// Components pulling innformaton relevent to a specific chain
import ChainLogo from './chain-specific/ChainLogo';
import ChainContent from './chain-specific/ChainContent';

interface Order {
  description: string;
  tags: string[];
  orderName: string;
}

interface OrderState {
  chainName: string;
  order: Order;
}

interface Props {
  orderID?: string;
  favoriteCount?: number;
  createdDate?: Date;
  key?: string | number;
  orderState?: OrderState;
}

interface State {
  tags: string[];
  userData: string[];
  orderContentModal: boolean;
  orderId: string;
  orderDescription: string;
  orderContent: object;
  favoriteCount: number;
  usersFavorited: string[];
  orderName: string;
  chainName: string;
  createdAt: Date;
  accessLevel: string;
}

export default class OrderContent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      tags: [],
      userData: [],
      orderContentModal: false,
      orderId: '',
      orderDescription: '',
      orderContent: {},
      favoriteCount: 0,
      usersFavorited: [],
      orderName: '',
      chainName: '',
      createdAt: new Date(),
      accessLevel: ''
    };
  }

  componentDidMount() {
    const { orderState, orderID } = this.props;

    if (orderState === undefined) {
      axios
        .get(`${process.env.api_key}/api/orders/id/${orderID}`)
        .then((res) => {
          const { data } = res;
          this.setState({
            orderId: data[0]._id,
            orderDescription: data[0].description,
            orderContent: data[0].orderContent[0],
            tags: data[0].tags,
            favoriteCount: data[0].favoriteCount,
            usersFavorited: data[0].usersFavorited,
            orderName: data[0].orderName,
            chainName: data[0].chainName,
            createdAt: data[0].createdAt,
            userData: data[0].users,
            accessLevel: localStorage.accessLevel
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // const { order, chainName } = orderState;
      this.setState({
        orderDescription: orderState.order.description,
        orderContent: orderState.order,
        tags: JSON.parse(
          JSON.stringify(orderState.order.tags, function (key, value) {
            return value == null ? [] : value;
          })
        ),
        orderName: orderState.order.orderName,
        chainName: orderState.chainName,
        accessLevel: localStorage.accessLevel
      });
    }
  }

  deleteOrder = () => {
    const { orderID } = this.props;

    axios
      .delete(`${process.env.api_key}/api/orders/delete/${orderID}`)
      .then((res) => {
        console.log('sucessfully deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  openOrderModal = (e: any) => {
    const { orderId } = this.state;

    window.history.pushState('object or string', 'Title', `/orders/${orderId}`);
    e.stopPropagation();
    this.setState((prevState) => ({
      orderContentModal: !prevState.orderContentModal
    }));
  };

  closeOrderModal = (e: any) => {
    window.history.pushState('object or string', 'Title', '/');
    e.stopPropagation();
    this.setState({
      orderContentModal: false
    });
  };

  render() {
    // prettier-ignore
    const { orderContentModal, accessLevel, chainName, orderName, orderDescription, orderContent, tags, userData, createdAt, orderId, favoriteCount, usersFavorited, } = this.state;
    // prettier-ignore
    const chainRowModalDisplay = orderContentModal === true ? 'modal-container-true' : 'modal-container';

    let adminPanel;
    if (accessLevel === 'admin' && orderContentModal === true) {
      adminPanel = (
        <AdminPanel>
          <span onClick={this.deleteOrder} role="button">
            DELETE ORDER
          </span>
        </AdminPanel>
      );
    }

    return (
      <>
        {adminPanel}
        <ModalContainer className="order-content-container-outer" onClick={(e) => this.closeOrderModal(e)}>
          <div className={chainRowModalDisplay}>
            <OrderContentContainer className="order-content-container">
              <div className="title-bar">
                <div>
                  <p>CLOSE</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-x-circle"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
              </div>
              {/* Everything left of the action bar */}
              <div className="order-data">
                {/* Pulls in the correct logo */}
                <ChainLogo chainName={chainName} onClick={(e: any) => this.openOrderModal(e)} />

                {/* Pulls in user enterted title and description */}
                <div className="order-info" role="button" onClick={(e) => this.openOrderModal(e)}>
                  <h2 className="order-name">{orderName}</h2>
                  <p className="description">{orderDescription}</p>
                </div>

                {/* Pulls in conntent specific to this chain */}
                <div className="order-content" role="button" onClick={(e) => this.openOrderModal(e)}>
                  <ChainContent chainName={chainName} orderState={orderContent} />
                </div>

                {/* Pulls in tags, user created and date created */}
                <div className="order-meta ">
                  <OrderTags chainName={chainName} tags={tags} />
                  <CreatedMeta userData={userData} dateCreated={createdAt} />
                </div>
              </div>

              {/* Where a user can take action on the order. */}
              <ActionBar
                key={orderId}
                favoriteCount={favoriteCount}
                orderId={orderId}
                usersFavorited={usersFavorited}
              />
            </OrderContentContainer>
          </div>
        </ModalContainer>
      </>
    );
  }
}
