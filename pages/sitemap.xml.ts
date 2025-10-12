import { GetServerSideProps } from 'next';

const SITE_ROOT = 'https://mealdig.com';

interface Order {
  chainName: string;
  tags: string[];
}

function generateSiteMap(orders: Order[]): string {
  const chipotleTags = new Set<string>();
  const andPizzaTags = new Set<string>();
  const allTags = new Set<string>();

  orders.forEach((order) => {
    if (order.chainName === 'Chipotle') {
      order.tags.forEach((tag) => chipotleTags.add(tag));
    } else if (order.chainName === '&pizza') {
      order.tags.forEach((tag) => andPizzaTags.add(tag));
    }
    order.tags.forEach((tag) => allTags.add(tag));
  });

  const staticPages = [
    '',
    '/create-order',
    '/login',
    '/signup',
    '/submit',
    '/orders/all',
    '/chains/chipotle',
    '/chains/&pizza',
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((page) => {
          return `
        <url>
          <loc>${SITE_ROOT}${page}</loc>
          <changefreq>daily</changefreq>
          <priority>${page === '' ? '1.0' : '0.8'}</priority>
        </url>
      `;
        })
        .join('')}
      ${Array.from(allTags)
        .map((tag) => {
          const cleanTag = tag.replace(' ', '-').toLowerCase();
          return `
        <url>
          <loc>${SITE_ROOT}/tags/${cleanTag}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `;
        })
        .join('')}
      ${Array.from(chipotleTags)
        .map((tag) => {
          const cleanTag = tag.replace(' ', '-').toLowerCase();
          return `
        <url>
          <loc>${SITE_ROOT}/chains/chipotle/${cleanTag}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.6</priority>
        </url>
      `;
        })
        .join('')}
      ${Array.from(andPizzaTags)
        .map((tag) => {
          const cleanTag = tag.replace(' ', '-').toLowerCase();
          return `
        <url>
          <loc>${SITE_ROOT}/chains/&amp;pizza/${cleanTag}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.6</priority>
        </url>
      `;
        })
        .join('')}
    </urlset>
  `;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const response = await fetch('https://qsr-order-api.herokuapp.com/api/orders/');
    const orders = await response.json();

    const sitemap = generateSiteMap(orders);

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.statusCode = 500;
    res.end();
  }

  return {
    props: {},
  };
};

export default function Sitemap() {
  // getServerSideProps will handle the response
  return null;
}
