import React, { Component } from 'react';

// Styless
import OrderPreviewContainer from '../../styles/OrderPreviewContainer';

// Components
import ChainLogo from './chain-specific/ChainLogo';
import ChainContent from './chain-specific/ChainContent';
import OrderTags from './all-orders/OrderTags';

interface Props {
  orderContent: any;
}

interface State {}

export default class OrderPreview extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props
    };
  }

  render() {
    const { chainName, order } = this.props.orderContent;

    let previewTags;
    if (order.tags === undefined) {
      previewTags = [];
    } else {
      previewTags = order.tags.map((tag: string, index: number) => (
        <span key={`tag-${index}`}>{tag.replace(/-/g, ' ')}</span>
      ));
    }

    return (
      <OrderPreviewContainer className="order-preview-container">
        <div className="preview-header">
          <h4>Order Preview</h4>
          <ChainLogo chainName={chainName} />
        </div>
        <div className="preview-order-data">
          <div className="order-info">
            <h2 className="order-name">{order.orderName}</h2>
            <p className="description">{order.description}</p>
          </div>
          <div className={order.mealType === undefined ? 'order-content hide' : 'order-content'}>
            <ChainContent chainName={chainName} orderState={order} />
          </div>
          <hr />
          <div className="order-meta">
            <p>Tags</p>
            {previewTags}
          </div>
        </div>
      </OrderPreviewContainer>
    );
  }
}
