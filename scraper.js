const rp = require('request-promise');
const $ = require('cheerio');
const potusScraper = require('./parse-scraped');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)
  .then(function(html){
    //success!
    const urls = $('big > a', html);
    let wikiUrls = [];
    for (let i = 0; i < urls.length; i++) {
      wikiUrls.push(urls[i].attribs.href);
    };

    return Promise.all(
      wikiUrls.map(function(url) {
        return potusScraper('https://en.wikipedia.org' + url);
      })
    );
  })
 
  .catch(function(err){
    console.log(err); 
  });
