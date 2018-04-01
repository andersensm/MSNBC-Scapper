var request = require('request');
var cheerio = require('cheerio');

var scrape = function (cb) {
    request("http://www.msnbc.com/", function(error, response, html) {
        var $ = cheerio.load(body);
        var articles = [];
          $("h2.featured-slider__teaser__title").each(function(i, element) {
            var head = $(element).children().attr("href");
            var sum = $(element).children().text();

            if (head && sum) {
                var dataToAdd = {
                    headline: head,
                    summary: sum
                };
                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};
module.exports = scrape;
