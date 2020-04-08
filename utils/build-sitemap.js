#! /usr/bin/env node
// I am ./bin/buildSitemap.js
require('isomorphic-fetch');
var concat = require('unique-concat');

let uniqueChipotle = [];
let uniqueAndPizza = [];
let uniqueTags = [];
let uniqueAll = [];

let newStats = [];

const path = require('path');
const glob = require('glob');
const fs = require('fs');

const SITE_ROOT = process.env.SITE_ROOT || 'https://mealdig.com';
const SOURCE = process.env.SOURCE || path.join(__dirname, '../', 'pages', '/**/!(_*).tsx');
const DESTINATION =
  process.env.DESTINATION || path.join(__dirname, '../public', 'static', 'sitemap.xml');

let diskPages = glob.sync(SOURCE);
let totalPages = 0

let xml = '';
xml += '<?xml version="1.0" encoding="UTF-8"?>';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

getTags = async () => {
  const res = await fetch('https://qsr-order-api.herokuapp.com/api/orders/');
  const data = await res.json();
  const chipotleTags = [];
  const andPizzaTags = [];
  let allTags = [];
  await data.forEach(order => {
    if (order.chainName === 'Chipotle') {
      order.tags.forEach(tag => chipotleTags.push(['chains/chipotle/', tag]));
    } else if (order.chainName === '&pizza') {
      order.tags.forEach(tag => andPizzaTags.push(['chains/&pizza/', tag]));
    }
    order.tags.forEach(tag => allTags.push(['tags/', tag]));
  });

  uniqueChipotle = [...new Set(chipotleTags)];
  uniqueAndPizza = [...new Set(andPizzaTags)];
  uniqueTags = [...new Set(allTags)];

  uniqueAll = uniqueTags.concat(uniqueChipotle, uniqueAndPizza);
  makeTagPages();
};

makeTagPages = () => {
  	 uniqueAll.forEach(tag => {
	 totalPages++
	 const cleanTag = tag[1].replace(' ', '-').toLowerCase();

    let pagePath = `https://mealdig.com/${tag[0]}${cleanTag}`;

    xml += '<url>';
	 xml += `<loc>${pagePath}</loc>`;
    xml += '</url>';
  });

  xml += '</urlset>';

  fs.writeFileSync(DESTINATION, xml);
  console.log(`Wrote sitemap for ${totalPages} pages to ${DESTINATION}`);
};

makePages = async () => {
 	 diskPages.forEach(page => {
	 totalPages++
    if (page.includes('[')) {
    } else {
		totalPages++
      let stats = fs.statSync(page);

      page = page.replace(path.join(__dirname, '../..', 'pages'), '');
      page = page.replace(/.js$/, '');
      page = `${SITE_ROOT}${page}`;

      if (page.match(/.*\/index$/)) {
        page = page.replace(/(.*)index$/, '$1');
      }

      xml += '<url>';
      xml += `<loc>${page}</loc>`;
      xml += '</url>';

		newStats = stats;
    }
  });
  getTags();
};

makePages();
