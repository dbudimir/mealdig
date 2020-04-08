import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

class SubmitOrder extends Component {
  constructor() {
    super();
    this.state = {};
  }

  updateState = e => {
    const { target } = e;
    const { value } = target;
    const { name } = target;

    this.setState(
      {
        order: {
          [name]: value,
        },
      },
      () => {
        const { setOrderDetails } = this.props;
        const { order } = this.state;
        setOrderDetails(order);
      }
    );
  };

  updateTags = newTags => {
    this.setState(
      {
        order: {
          tags: newTags,
        },
      },
      () => {
        const { setOrderDetails } = this.props;
        const { order } = this.state;
        setOrderDetails(order);
      }
    );
  };

  render() {
    SubmitOrder.propTypes = {
      setOrderDetails: PropTypes.func,
      toggleSubmitConfirmation: PropTypes.func,
    };

    const { toggleSubmitConfirmation } = this.props;
    return (
      <div>
        <Form>
          <div className="submit-order">
            <h3>Add details...</h3>
            <span className="field-label">
              Name Your Order (ex. "The Belly Buster", "The Big Cheese")
            </span>
            <input
              onChange={this.updateState}
              className="text-input"
              name="orderName"
              placeholder="Name your order"
            />
            <span className="field-label">Short Description</span>
            <textarea
              onChange={this.updateState}
              className="text-input"
              name="description"
              rows="4"
            />
            <span className="field-label">Add Tags</span>
            <span>Type in your tags and press enter to confirm.</span>
            <TagForm setTags={this.updateTags} />
            <br />
            <button
              onClick={toggleSubmitConfirmation}
              className="button"
              name="submit"
              type="submit"
            >
              Submit Order
            </button>
          </div>
        </Form>
      </div>
    );
  }
}

export default SubmitOrder;
