import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import TagForm from './TagForm';

const Form = styled.div`
  .label {
    margin-top: 12px;
    font-weight: 800;
  }
  span {
    display: block;
  }
`;

interface Props {
  setOrderDetails: Function;
  toggleSubmitConfirmation: Function;
}

interface State {
  order: any;
}

export default class SubmitOrderForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      order: {}
    };
  }

  updateState = (e: any) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;

    this.setState(
      {
        order: {
          [name]: value
        }
      },
      () => {
        const { setOrderDetails } = this.props;
        const { order } = this.state;
        setOrderDetails(order);
      }
    );
  };

  updateTags = (newTags: string[]) => {
    this.setState(
      {
        order: {
          tags: newTags
        }
      },
      () => {
        const { setOrderDetails } = this.props;
        const { order } = this.state;
        setOrderDetails(order);
      }
    );
  };

  render() {
    const { toggleSubmitConfirmation } = this.props;

    return (
      <Form className="create-order-section">
        <div className="submit-order">
          <h3>Add details...</h3>
          <form>
            {/* Order Name */}
            <span className="field-label">Name Your Order (ex. "The Belly Buster", "The Big Cheese")</span>
            <input onChange={this.updateState} className="text-input" name="orderName" placeholder="Name your order" />
            {/* Order Description */}
            <span className="field-label">Short Description</span>
            <textarea onChange={this.updateState} className="text-input" name="description" rows={4} />
            {/* Order Tags */}
            <span className="field-label">Add Tags</span>
            <span>Type in your tags and press enter to confirm.</span>
            <TagForm setTags={this.updateTags} />
            <br />
            {/* Submit Order */}
            <button
              onClick={() => {
                toggleSubmitConfirmation();
              }}
              className="button"
              name="submit"
              type="submit"
            >
              Submit Order
            </button>
          </form>
        </div>
      </Form>
    );
  }
}
