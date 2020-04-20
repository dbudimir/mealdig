#! /usr/bin/env node
// I am ./bin/buildSitemap.js
require('isomorphic-fetch');
require('unique-concat');

let uniqueChipotle = [];
let uniqueAndPizza = [];
let uniqueTags = [];
let uniqueAll = [];

const path = require('path');
const glob = require('glob');
const fs = require('fs');

const SITE_ROOT = process.env.SITE_ROOT || 'https://mealdig.com';
const SOURCE = process.env.SOURCE || path.join(__dirname, '../..', 'pages', '/**/!(_*).tsx');
const DESTINATION = process.env.DESTINATION || path.join(__dirname, '../public', 'static', 'sitemap.xml');

const diskPages = glob.sync(SOURCE);
let totalPages = 0;

let xml = '';
xml += '<?xml version="1.0" encoding="UTF-8"?>';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

const makeTagPages = async () => {
  uniqueAll.forEach(tag => {
    totalPages++;
    const cleanTag = tag[1].replace(' ', '-').toLowerCase();

    const pagePath = `https://mealdig.com/${tag[0]}${cleanTag}`;

    xml += '<url>';
    xml += `<loc>${pagePath}</loc>`;
    xml += '</url>';
  });

  xml += '</urlset>';

  fs.writeFileSync(DESTINATION, xml);
  console.log(`Wrote sitemap for ${totalPages} pages to ${DESTINATION}`);
};

const getTags = async () => {
  const res = await fetch('https://qsr-order-api.herokuapp.com/api/orders/');
  const data = await res.json();
  const chipotleTags = [];
  const andPizzaTags = [];
  const allTags = [];
  await data.forEach(order => {
    if (order.chainName === 'Chipotle') {
      order.tags.forEach(tag => chipotleTags.push(['chains/chipotle/', tag]));
    } else if (order.chainName === '&pizza') {
      order.tags.forEach(tag => andPizzaTags.push(['chains/&amp;pizza/', tag]));
    }
    order.tags.forEach(tag => allTags.push(['tags/', tag]));
  });

  uniqueChipotle = [...new Set(chipotleTags)];
  uniqueAndPizza = [...new Set(andPizzaTags)];
  uniqueTags = [...new Set(allTags)];

  uniqueAll = uniqueTags.concat(uniqueChipotle, uniqueAndPizza);
  makeTagPages();
};

const makePages = async () => {
  diskPages.forEach(page => {
    totalPages++;
    if (page.includes('[')) {
    } else {
      totalPages++;

      page = page.replace(path.join(__dirname, '../..', 'pages'), '');
      page = page.replace(/.js$/, '').replace(/.tsx$/, '');
      page = `${SITE_ROOT}${page}`;

      if (page.match(/.*\/index$/)) {
        page = page.replace(/(.*)index$/, '$1');
      }

      xml += '<url>';
      xml += `<loc>${page}</loc>`;
      xml += '</url>';
    }
  });
  getTags();
};

makePages();
