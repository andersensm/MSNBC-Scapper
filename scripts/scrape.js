var request = require("request");
var cheerio = require("cheerio");
var Headline = require("../models/Headline")

function scrapeData(cb) {
      request("http://www.msnbc.com/", function(error, response, html) {
      var $ = cheerio.load(html);
      $("h2.featured-slider__teaser__title").each(function(i, element) {
        var link = $(element).children().attr("href");
        var title = $(element).children().text();

        var scrapeHeadline = new Headline({
          title: title,
          link: link
        })

        scrapeHeadline.save(function(error){
          if (error) {
            console.log(error)
          } else {
            console.log("Scrape Saved!")
          }
        })
      })
      return cb;
    });
  }

  exports.scrapeData = scrapeData
