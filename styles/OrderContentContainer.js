import styled from 'styled-components';

const size = {
  tablet: 'only screen and (max-width : 768px)',
  phone: 'only screen and (max-width : 548px)',
};

const AdminPanel = styled.div`
  background: #fb542b;
  width: 100%;
  padding: 6px 12px;
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0px;

  span {
    font-family: Nunito;
    padding: 4px 8px;
    background: #ffffff;
    border-radius: 4px;
    display: block;
    width: max-content;
    font-weight: 800;
    font-size: 14px;
  }
`;

const ModalContainer = styled.div`
  margin-right: 24px;

  .modal-container-true {
    position: fixed;
    background: rgba(0, 0, 0, 0.75);
    left: 0%;
    top: 0%;
    width: 100%;
    height: 100vh;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;

    .order-content-container {
      display: flex;
      flex-wrap: wrap;
      max-width: 1024px;
      height: max-content;

      .title-bar {
        display: flex;
        justify-content: flex-end;
        background-color: #f5f6f7;
        padding: 6px;
        width: 100%;

        div {
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 4px;

          &:hover {
            background-color: #dfe2e4;
            cursor: pointer;
          }

          p {
            font-size: 16px;
            margin: 0 6px 0 0;
            letter-spacing: 1px;
          }

          svg {
            width: 20px;
            height: 20px;
            stroke-width: 1.5;
          }
        }
      }

      .order-data {
        .description {
          display: block;
          mask-image: unset;
        }
      }

      .user-actions {
        flex-direction: row;
        width: 100%;

        > * {
          display: inline-flex;
          margin-left: 6px;
        }

        .favorites {
          flex-direction: row;
          svg {
            margin-right: 6px;
          }
        }

        div:last-of-type {
          height: 24px;
        }
      }
    }
  }

  .modal-container {
    width: 100%;
    margin-bottom: 32px;

    .order-content-container {
      .title-bar {
        display: none;
      }
    }
  }
`;

const OrderContentContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 5.125px 10px -1.125px rgba(0, 0, 0, 0.1);
  font-family: Nunito, sans-serif;
  display: flex;
  text-decoration: none;
  min-width: 420px;
  border: 1px solid #f5f6f7;

  &:hover {
    border: 1px solid rgb(0, 103, 255);
    cursor: pointer;
  }

  @media ${size.tablet} {
    flex-basis: 100%;
    min-width: unset;
    width: 90vw;
  }

  .order-data {
    padding: 12px 12px;
    display: flex;
    flex-direction: column;
    width: 100%;

    .chain-logo {
      max-height: 26px;
      max-width: 120px;
      display: block;
      align-self: start;
    }

    .order-info {
      margin-bottom: 6px;
      border-bottom: 2px solid #eeeef1;
      padding-bottom: 6px;

      .order-name {
        margin-bottom: 12px;
      }

      .description {
        margin: 6px auto 6px;
        font-weight: 400;
        font-size: 18px;
        max-height: 72px;
        overflow: hidden;
        mask-image: linear-gradient(180deg, #000 20px, transparent);
      }
    }

    .order-content {
      height: 300px;
      overflow: hidden;
      mask-image: linear-gradient(180deg, #000 280px, transparent);

      p {
        line-height: 2;
        margin: 6px 0px;
        font-weight: 700;
        font-size: 16px;
      }
    }

    .order-meta {
      margin-top: auto;
      align-self: end;
      width: 100%;

      .tag-row {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;

        .tags {
          border-top: 2px solid #eeeef1;
          padding: 12px 0px 0px 0px;
          margin: 0px;
          text-transform: capitalize;
          width: 100%;

          a {
            text-decoration: none;
            font-weight: 700;
            background-color: #eeeef1;
            padding: 1px 4px;
            border-radius: 4px;
            margin: 0 4px 4px 0;

            &:hover {
              background-color: #0067ff;
              color: #ffffff;
            }
          }
        }
      }

      .created-by {
        width: 100%;

        p {
          font-size: 14px;
          margin-bottom: 0px;

          span {
            padding: 0px;
            margin: 0px;
            background: transparent;
          }
        }
      }
    }

    span {
      background-color: #eeeef1;
      padding: 1px 4px;
      border-radius: 4px;
      margin: 0 4px 4px 0;
      font-weight: 400;
    }
  }

  .user-actions {
    background-color: #f5f6f7;
    padding: 6px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .favorites {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .like-count {
        font-size: 14px;
        font-weight: 700;
      }
    }

    svg {
      fill: none;
      cursor: pointer;
    }

    img {
      cursor: pointer;
    }

    .svg-clicked {
      svg {
        stroke: #1774ff;
        fill: #1774ff;
      }
    }

    div {
      margin: 3px 0px;
    }
  }
`;

export { AdminPanel, ModalContainer, OrderContentContainer };