require('isomorphic-fetch');
const fs = require('fs');

module.exports.getTags = async function() {
  const res = await fetch('https://qsr-order-api.herokuapp.com/api/orders/');
  const data = await res.json();

  let jointArray = [];

  data.map(tag => {
    const lowerTags = tag.tags.map(t => t.toLowerCase());
    jointArray = [...jointArray, ...lowerTags];
  });

  const uniqueArray = jointArray.reduce((newArray, item) => {
    if (newArray.includes(item)) {
      return newArray;
    }
    return [...newArray, item];
  }, []);
  const tagIndex = JSON.stringify(uniqueArray);

  fs.writeFileSync(
    '/Users/davidbudimir/SEI/projects/mealdig/public/static/tag-index.json',
    tagIndex
  ); // default: 'utf8'
};
