/* eslint-disable react/prop-types */

// Utilities
import React, { Component } from 'react';
import { NextSeo } from 'next-seo';
// import * as InnerHTML from 'dangerously-set-html-content';

import 'isomorphic-fetch';

// Styles

// Components
import Layout from '../../../components/sitewide/Layout';
import BreadCrumbs from '../../../components/BreadCrumbs';
// import RightColumn from '../../../components/RightColumn';
import Footer from '../../../components/sitewide/Footer';

interface Props {
  data: any;
  postSlug: string;
}

interface State {
  data: any;
}

export default class BlogPost extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props,
      data: {}
    };
  }

  render() {
    return (
      <div>
        <NextSeo
          title="The Most Popular Custom meal orders at | MealDig"
          description="Explore the Most Popular Custom meal orders at , Or, submit your own custom order and share it with your friends."
          canonical="pageURL"
          openGraph={{
            url: 'pageURL',
            title: `The Most Popular Custom meal orders at  | MealDig`,
            description: `Explore the Most Popular Custom meal orders at , Or, submit your own custom order and share it with your friends.`,
            site_name: 'MealDig'
          }}
        />
        <Layout />
        {/* <BreadCrumbs /> */}
        <div className="post-content-container">{/* <InnerHTML html={data[0].content.rendered} /> */}</div>
        <Footer />
      </div>
    );
  }
}

// Serverside get props
export async function getServerSideProps(context: any) {
  const postSlug = context.query.title;

  const res = await fetch(`https://mealdig.blog/wp-json/wp/v2/posts?slug=${postSlug}`);
  const data = await res.json();

  return {
    props: {
      // data,
      postSlug
    }
  };
}
