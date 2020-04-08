/* eslint-disable react/prop-types */
import React from 'react';
import InnerHTML from 'dangerously-set-html-content';

import styled from 'styled-components';

const EmbedWindowContainer = styled.div`
  display: block;
  margin: 24px auto;
  max-width: 600px;
  width: 96%;

  .section-header {
    display: block;
    margin: 0 auto 12px;
    width: 100%;
    font-family: Nunito;
    font-weight: 700;
  }

  textarea {
    margin: 0 auto 18px;
    font-size: 16px;
    font-family: nunito;
    padding: 8px 6px;
    border-radius: 6px;
    width: 97%;
    display: block;
    height: 80px;
  }
`;

class EmbedWindow extends React.Component {
  constructor() {
    super();
    this.state = { pageUrl: '', html: '' };
  }

  componentDidMount = async () => {
    this.setState(
      {
        pageUrl: window.location.search,
      },
      () => {
        const { pageUrl } = this.state;

        const embedCodeParams = pageUrl
          .replace('?remoteSource=', '')
          .replace('&embedId=', ',')
          .replace('&orderId=', ',')
          .split(',');

        this.setState({
          html: `<div id="${embedCodeParams[1]}"></div><script type="application/javascript" onload="orderEmbed('${embedCodeParams[2]}', '${embedCodeParams[1]}')" src="https://mealdig.com${embedCodeParams[0]}" defer>`,
        });
      }
    );
  };

  render() {
    const { html } = this.state;

    return (
      <EmbedWindowContainer>
        <span className="section-header">
          Copy the code snippet below and paste it on your site
        </span>
        <textarea value={html} />
        <span className="section-header">Preview</span>
        <InnerHTML html={html} />
      </EmbedWindowContainer>
    );
  }
}

export default EmbedWindow;
