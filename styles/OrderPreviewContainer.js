import styled from 'styled-components';

const size = {
  tablet: 'only screen and (max-width : 768px)',
  phone: 'only screen and (max-width : 548px)',
};

const OrderPreviewContainer = styled.div`
  font-family: Nunito, sans-serif;

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;

    h4 {
      margin: 0%;
    }

    img {
      max-height: 24px;
    }
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
      /* mask-image: linear-gradient(180deg, #000 20px, transparent); */
    }
  }

  .order-content {
    height: max-content;
    overflow: hidden;
    /* mask-image: linear-gradient(180deg, #000 280px, transparent); */

    p {
      line-height: 2;
      margin: 6px 0px;
      font-weight: 700;
      font-size: 16px;
    }
  }

  .order-content.hide {
    display: none;
  }

  span {
    background-color: #eeeef1;
    padding: 1px 4px;
    border-radius: 4px;
    margin: 0 4px 4px 0;
    font-weight: 400;
  }
`;

export default OrderPreviewContainer;
