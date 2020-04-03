import * as React from 'react';
import NextApp from 'next/app';
// import NexApp from 'next/app';

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
// export class Hello extends React.Component<HelloProps, {}> {
//     render() {
//         return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
//     }
// }

interface Props {
  pageProps: any;
}

class App extends NextApp<Props> {
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

export default App;
