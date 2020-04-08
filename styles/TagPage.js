import styled from 'styled-components';

const size = {
  tablet: 'only screen and (max-width : 768px)',
  phone: 'only screen and (max-width : 548px)',
};

const TagPages = styled.div`
  max-width: 100%;
  margin-bottom: 48px;

  .content-container {
    max-width: 1024px;
    padding: 18px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    @media ${size.tablet} {
      flex-direction: column;
    }

    .col-left {
      width: 62.5%;
      @media ${size.tablet} {
        width: 100%;
      }

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
      .order-content-container-outer {
        margin-right: 0px;
      }
    }

    .col-right {
      margin-top: 200px;
      width: 33.5%;
      @media ${size.tablet} {
        margin-top: 24px;
        width: 100%;
      }

      a {
        text-decoration: none;
        color: #000000;
      }

      .more-tag-cta,
      .more-chain-cta,
      .signup-cta {
        font-family: Nunito, sans-serif;
        margin-bottom: 32px;
        border-radius: 6px;
        background-color: #ffffff;
      }

      .more-tag-cta {
        overflow: hidden;
        border: 1px solid transparent;
        border-left: 6px solid #000000;
        font-size: 18px;
        padding: 6px 12px;
        font-weight: 700;
        cursor: pointer;

        &:hover {
          border: 1px solid #0067ff;
          border-left: 6px solid #0067ff;
        }
      }

      .more-chain-cta {
        overflow: hidden;
        border: 1px solid transparent;
        border-left: 6px solid #000000;
        font-size: 18px;
        padding: 6px 12px;
        display: flex;
        flex-direction: row;
        font-weight: 700;
        cursor: pointer;

        &:hover {
          border: 1px solid #0067ff;
          border-left: 6px solid #0067ff;
        }

        img {
          height: 50px;
          padding: 0 12px 0 0;
          @media ${size.tablet} {
            padding: 0 0 0 12px;
            justify-content: space-between;
            align-items: center;
          }
        }
      }

      .signup-cta {
        border: 1px solid transparent;
        position: sticky;
        top: 140px;
        padding: 18px 12px;
        text-align: center;

        &:hover {
          border: 1px solid #0067ff;
        }

        .cta-text {
          font-size: 18px;
          display: block;
          margin-bottom: 18px;
        }

        .signup,
        .create {
          font-size: 18px;
          background: #0067ff;
          border: 1px solid #0067ff;
          color: #ffffff;
          display: flex;
          align-items: center;
          width: 100%;
          text-align: center;
          justify-content: center;
          padding: 8px 0px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        .signup {
          background: #ffffff;
          color: #0067ff;
        }

        .create {
          margin-bottom: 12px;
        }
      }
    }
  }
`;

export default TagPages;
