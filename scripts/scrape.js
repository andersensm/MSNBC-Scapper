var request = require('request');
var cheerio = require('cheerio');
var mongojs = require("mongojs");
var databaseUrl = "scraper";
var collections = ["scrapedDatas"];
var db = mongojs(databaseUrl, collections);

module.exports = {
  get: function(response) {
      request("http://www.msnbc.com/", function(error, response, html) {
      var $ = cheerio.load(html);
      $("h2.featured-slider__teaser__title").each(function(i, element) {
        var link = $(element).children().attr("href");
        var title = $(element).children().text();
        db.scrapedDatas.insert({
          "link": link,
          "title": title
        });
      });
      return response;
    });
  }
}
