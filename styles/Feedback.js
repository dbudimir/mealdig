import styled from 'styled-components';

const size = {
  tablet: 'only screen and (max-width : 768px)',
  phone: 'only screen and (max-width : 548px)',
};

const FeedbackIconContainer = styled.div`
  display: block;
  position: fixed;
  bottom: 10px;
  left: 10px;
  font-size: 16px;
  font-family: Nunito;
  color: #ffffff;
  cursor: pointer;

  * {
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
  }

  .feedback-container {
    background: #262f40;
    width: max-content;
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 12px;
    border: 2px solid transparent;
    box-shadow: 0 11px 40px 0 rgba(0, 0, 0, 0.25), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

    span {
      margin-right: 12px;
    }

    &:hover {
      border: 2px solid #8ca0f8;
    }

    .feedback-inputs {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 400px;

      .feedback-modal-header {
        font-size: 20px;
        margin: 0 6px 18px 2px;
      }

      .react-share__ShareButton {
        width: 100%;
        display: flex;
      }

      .twitter-feedback,
      .email-feedback {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #ffffff;
        border-radius: 8px;
        padding: 0 12px;
        font-size: 20px;
        font-weight: 700;
        transition-duration: 0.1s;
        margin-bottom: 12px;
        width: 100%;

        &.active {
          background-color: #ffffff;
          color: #262f40;
        }

        p {
          transition-duration: 0.1s;
          margin: 12px 0;
        }
        &:hover {
          background-color: #ffffff;
          color: #262f40;
        }
      }

      .email-input-container {
        display: block;
        padding: 0 12px 24px;
        margin-top: -18px;
        width: 100%;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        background: #ffffff;

        .form-input-label {
          margin-bottom: 12px;
          span {
            color: #262f40;
            display: block;
            height: auto;
            font-size: 16px;
            font-weight: 600;
            margin: 0 0 6px 0;
          }
          input,
          textarea {
            width: 100%;
            border: 1px solid #000000;
            border-radius: 6px;
            -webkit-appearance: none;
            display: block;
            font-size: 16px;
            padding: 6px;
            font-family: Nunito;
            box-sizing: border-box;
          }
        }

        .send-email-button {
          display: block;
          background: #262f40;
          width: 100%;
          margin: 0px;
          text-align: center;
          font-size: 18px;
          padding: 12px 6px;
          box-sizing: border-box;
          margin-top: 18px;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
        }

        .email-feedback-success-message {
          color: #262f40;
          font-weight: 600;
        }
      }
    }

    #close-feedback-button {
      align-self: baseline;
    }

    @media ${size.tablet} {
      position: absolute;
      bottom: 0px;
      width: calc(100vw - 50px);
      justify-content: space-between;

      .feedback-inputs {
        width: 100%;
      }
    }
  }

  .feedback-component-closed {
    background: #262f40;
    padding: 4px;
    border-radius: 100px;
    box-shadow: 0 11px 40px 0 rgba(0, 0, 0, 0.25), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

    img {
      display: block;
    }
  }
`;

export default FeedbackIconContainer;
