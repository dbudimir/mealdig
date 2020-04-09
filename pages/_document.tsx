import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

interface Props {
  styleTags: object;
}

// Import styled components ServerStyleSheet
export default class MyDocument extends Document<Props> {
  static async getInitialProps(context: any) {
    const { renderPage } = context;
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();
    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App: any) => (props: any) => sheet.collectStyles(<App {...props} />));
    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();
    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  state = {};

  render() {
    const { styleTags } = this.props;

    return (
      <>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
          <link rel="apple-touch-icon" href="/static/touch-icon.png" />
          <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
          <link rel="icon" href="/static/favicon.png" />
          <link
            rel="preload"
            as="font"
            href="/static/fonts/Nunito/nunito-v12-latin-800.woff2"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="/static/fonts/Roboto/roboto-v20-latin-300.woff2"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
					/* nunito-300 - latin */
					@font-face {
					  font-family: 'Nunito';
					  font-style: normal;
					  font-display: swap;
					  font-weight: 300;
					  src: local('Nunito Light'), local('Nunito-Light'),
						 url('/static/fonts/Nunito/nunito-v12-latin-300.woff2') format('woff2');
					}
					/* nunito-regular - latin */
					@font-face {
					  font-family: 'Nunito';
					  font-style: normal;
					  font-display: swap;
					  font-weight: 400;
					  src: local('Nunito Regular'), local('Nunito-Regular'),
						 url('/static/fonts/Nunito/nunito-v12-latin-regular.woff2') format('woff2');
					}
					/* nunito-600 - latin */
					@font-face {
					  font-family: 'Nunito';
					  font-style: normal;
					  font-display: swap;
					  font-weight: 600;
					  src: local('Nunito SemiBold'), local('Nunito-SemiBold'),
						 url('/static/fonts/Nunito/nunito-v12-latin-600.woff2') format('woff2');
					}
					/* nunito-700 - latin */
					@font-face {
					  font-family: 'Nunito';
					  font-style: normal;
					  font-display: swap;
					  font-weight: 700;
					  src: local('Nunito Bold'), local('Nunito-Bold'),
						 url('/static/fonts/Nunito/nunito-v12-latin-700.woff2') format('woff2');
					}
					/* nunito-800 - latin */
					@font-face {
					  font-family: 'Nunito';
					  font-style: normal;
					  font-display: swap;
					  font-weight: 800;
					  src: local('Nunito ExtraBold'), local('Nunito-ExtraBold'),
						 url('/static/fonts/Nunito/nunito-v12-latin-800.woff2') format('woff2');
					}
					/* nunito-900 - latin */
					@font-face {
					  font-family: 'Nunito';
					  font-style: normal;
					  font-display: swap;
					  font-weight: 900;
					  src: local('Nunito Black'), local('Nunito-Black'),
						 url('/static/fonts/Nunito/nunito-v12-latin-900.woff2') format('woff2');
					}
					/* roboto-100 - latin */
					@font-face {
					  font-family: 'Roboto';
					  font-style: normal;
					  font-display: swap;
					  font-weight: 100;
					  src: local('Roboto Thin'), local('Roboto-Thin'),
						 url('/static/fonts/Roboto/roboto-v20-latin-100.woff2') format('woff2');
					}
					/* roboto-300 - latin */
					@font-face {
					  font-family: 'Roboto';
					  font-style: normal;
					  font-display: swap;
					  font-weight: 300;
					  src: local('Roboto Light'), local('Roboto-Light'),
						 url('/static/fonts/Roboto/roboto-v20-latin-300.woff2') format('woff2');
					}
					/* roboto-regular - latin */
					@font-face {
					  font-family: 'Roboto';
					  font-style: normal;
					  font-display: swap;
					  font-weight: 400;
					  src: local('Roboto Regular'), local('Roboto-Regular'),
						 url('/static/fonts/Roboto/roboto-v20-latin-300italic.woff2') format('woff2');
					}
					/* roboto-300italic - latin */
					@font-face {
					  font-family: 'Roboto';
					  font-style: italic;
					  font-display: swap;
					  font-weight: 300;
					  src: local('Roboto Light Italic'), local('Roboto-LightItalic'),
						 url('/static/fonts/Roboto/roboto-v20-latin-300italic.woff2') format('woff2');
					}
					/* roboto-500 - latin */
					@font-face {
					  font-family: 'Roboto';
					  font-style: normal;
					  font-display: swap;
					  font-weight: 500;
					  src: local('Roboto Medium'), local('Roboto-Medium'),
						 url('../static/fonts/Roboto/roboto-v20-latin-500.woff2') format('woff2');
					}
					/* roboto-700 - latin */
					@font-face {
					  font-family: 'Roboto';
					  font-style: normal;
					  font-display: swap;
					  font-weight: 700;
					  src: local('Roboto Bold'), local('Roboto-Bold'),
						 url('../static/fonts/Roboto/roboto-v20-latin-700.woff2') format('woff2');
					}
					/* roboto-900 - latin */
					@font-face {
					  font-family: 'Roboto';
					  font-style: normal;
					  font-display: swap;
					  font-weight: 900;
					  src: local('Roboto Black'), local('Roboto-Black'),
						 url('/static/fonts/Roboto/roboto-v20-latin-900.woff2') format('woff2');
					}
					body {
						margin: 0;
						background: #eeeef1;
					}
				 `
            }}
          />
          <meta name="google-site-verification" content="0tikEBJv6jfDzlVrMSFJmAOFrQCMM0c47FLBfIyeck4" />

          {/* Step 5: Output the styles in the head  */}
          {styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </>
    );
  }
}
