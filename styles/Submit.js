import styled from 'styled-components';

const size = {
  tablet: 'only screen and (max-width : 768px)',
  phone: 'only screen and (max-width : 548px)',
};

const Submit = styled.div`
  width: 96%;
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 18px 0;

  .left-col {
    .headline-container {
      padding: 0px 18px;
      margin: 48px 0px;
      border-left: 6px solid #9883e5;

      h1 {
        font-family: Nunito, sans-serif;
        text-transform: capitalize;
        font-size: 36px;
        margin: 0px;
      }

      @media ${size.phone} {
        margin: 12px 0px 24px;

        h1 {
          font-size: 28px;
        }
      }
    }

    .create-order-form {
      width: 100%;
      box-shadow: 0 5.125px 10px -1.125px rgba(0, 0, 0, 0.1);
      padding: 12px;
      background: #ffffff;
      border-radius: 6px;

      .create-order-section {
        padding: 0 12px 18px 12px;
        margin-bottom: 18px;
        border-bottom: 2px solid #eeeef1;
      }

      h2 {
        margin: 0px;
      }

      .order-name {
        margin-top: 24px;
      }

      h3 {
        font-family: Nunito, serif;
        min-width: fit-content;
        margin: 0px 0px 12px 0;
        font-size: 24px;
      }

      select {
        box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 2px 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        font-family: Nunito, serif;
      }

      .field-label {
        font-family: Nunito, serif;
        font-weight: 600;
        font-size: 18px;
        margin: 12px 0 12px;
      }

      .select-container {
        width: 100%;
        position: relative;

        &:after {
          content: '';
          position: absolute;
          right: 12px;
          top: 40%;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 8px solid #262f40;
          clear: both;
        }

        svg {
          display: none;
          position: absolute;
          right: 0;
          height: 42%;
          margin: 0 12px;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      .select-chain {
        padding: 12px 12px 18px 12px;

        h3 {
          width: 100%;
        }

        select[name='chainName'] {
          width: 100%;
          height: 48px;
          font-size: 24px;
          padding: 8px 12px;
          border: 2px solid #0067ff;
          border-radius: 6px;
        }

        form {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
      }

      .customize {
        select {
          width: 100%;
          height: auto;
          font-size: 20px;
          padding: 6px 8px;
          border: 2px solid #0067ff;
          border-radius: 6px;
          margin-bottom: 12px;
        }

        .fillings,
        .toppings,
        .sauces,
        .cheeses,
        .veggies,
        .proteins,
        .finishes {
          display: flex;
          flex-wrap: wrap;

          .checkbox-container {
            display: block;
            margin-right: 6px;
            font-size: 20px;
            border-radius: 4px;
            margin-bottom: 6px;
            display: flex;
            align-items: center;

            input {
              position: absolute;
              opacity: 0;
              cursor: pointer;
            }

            .checkbox-label {
              font-size: 20px;
              line-height: 24px;
              width: fit-content;
              cursor: pointer;
              font-family: Nunito;
              font-weight: 400;
              display: flex;
              align-items: center;
              border-radius: 6px;
              background-color: #f8f8f8;
            }

            .checkbox-label .checkbox-text {
              margin-right: 6px;
            }

            .checkbox-custom {
              height: 16px;
              width: 16px;
              background-color: transparent;
              border-radius: 5px;
              transition: all 0.3s ease-out;
              -webkit-transition: all 0.3s ease-out;
              -moz-transition: all 0.3s ease-out;
              -ms-transition: all 0.3s ease-out;
              -o-transition: all 0.3s ease-out;
              border: 2px solid #0067ff;
              margin: 6px;
            }

            input:checked + label {
              background-color: #0067ff;
              border-radius: 5px;
              color: #ffffff;
              font-weight: 500;
            }

            input:checked + label .checkbox-custom {
              background-color: #ffffff;
              border-radius: 5px;
              -webkit-transform: rotate(0deg) scale(1);
              -ms-transform: rotate(0deg) scale(1);
              transform: rotate(0deg) scale(1);
              opacity: 1;
              border: 2px solid #ffffff;
            }

            .checkbox-custom::after {
              position: absolute;
              content: '';
              left: 12px;
              top: 0px;
              height: 0px;
              width: 0px;
              border-radius: 5px;
              border: 2px solid #0067ff;
              border-width: 0 3px 3px 0;
              -webkit-transform: rotate(0deg) scale(0);
              -ms-transform: rotate(0deg) scale(0);
              transform: rotate(0deg) scale(0);
              opacity: 1;
              transition: all 0.3s ease-out;
              -webkit-transition: all 0.3s ease-out;
              -moz-transition: all 0.3s ease-out;
              -ms-transition: all 0.3s ease-out;
              -o-transition: all 0.3s ease-out;
            }

            input:checked + label .checkbox-custom::after {
              -webkit-transform: rotate(45deg) scale(1);
              -ms-transform: rotate(45deg) scale(1);
              transform: rotate(45deg) scale(1);
              opacity: 1;
              left: 4px;
              width: 6px;
              height: 12px;
              border: 2px solid #0067ff;
              border-width: 0 2px 2px 0;
              background-color: transparent;
              border-radius: 0;
            }
          }
        }
      }
    }
  }

  .left-col.open {
    width: 62%;
  }

  .right-col {
    background: #ffffff;
    border-radius: 6px;
  }

  .right-col.open {
    width: 33%;
    display: block;
    position: sticky;
    margin-top: 146px;
    top: 72px;
    border-left: 6px solid #262f40;

    .order-preview-container {
      padding: 12px;
    }
  }

  .submit-order {
    input[name='orderName'] {
      width: 100%;
      height: auto;
      font-size: 22px;
      border: 0px;
      padding: 6px 8px;
      margin-bottom: 12px;
      background-color: #f8f8f8;
      border-radius: 4px;
      box-shadow: inset rgba(0, 0, 0, 0.1) 0px 0px 4px 0;
      box-sizing: border-box;
      font-family: Nunito;
    }

    textarea {
      width: 100%;
      font-size: 16px;
      border: 0px;
      padding: 12px 0px 0px 12px;
      background-color: #f8f8f8;
      border-radius: 4px;
      box-shadow: inset rgba(0, 0, 0, 0.1) 0px 0px 4px 0;
      box-sizing: border-box;
    }

    button[name='submit'] {
      width: 60%;
      display: block;
      margin: 0 auto;
      height: 48px;
      margin: 12px auto;
      border-radius: 100px;
      color: #ffffff;
      font-size: 24px;
      background-color: #0067ff;
      border: 0px;
      cursor: pointer;
    }
  }
`;

export default Submit;
