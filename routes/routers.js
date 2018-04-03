var scrape = require('../scripts/scrape');
var axios = require("axios");
var headlinesController = require('../controllers/headline');
var notesController = require('../controllers/note');
var request = require('request');
var mongojs = require("mongojs");
var databaseUrl = "scraper";
var collections = ["scrapedDatas"];
var db = mongojs(databaseUrl, collections);

module.exports = function(router) {
    router.get("/", function (req, res) {
        res.render("home");
    });

    router.get("/saved", function (req, res) {
        res.render("saved");
    });

    router.get('/api/fetch', function (req, res) {
        headlinesController.fetch(function (err, docs) {
            if (!docs || docs.insertCount === 0) {
                res.json({message: 'No new articles today. Check back tomorrow!'});
            }
            else {
                res.json({
                    message: 'Added ' + docs.insertedCount + ' new articles!'
                });
            }
        });
    });
    router.get('/api/headlines', function (req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }
        headlinesController.get(query, function (data) {
            res.json(data);
        });
    });
    router.delete('/api/headlines/:id', function (req, res) {
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function (err, data) {
            res.json(data);
        });
    });
    router.patch('api/headlines', function (req, res) {
        headlinesController.update(req.body, function (err, data) {
            res.json(data);
        });
    });
    router.get('api/notes/:headline_id?', function (req, res) {
        var query = {};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }
        notesController.get(query, function (err, data) {
            res.json(data);
        });
    });
    router.delete('/api/notes/:id', function (req, res) {
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function (err, data) {
            res.json(data);
        });
    });
    router.post('api/notes', function (req, res) {
        notesController.save(req.body, function (data) {
            res.json(data);
        });
    });
    router.get("/scrape", function(req, res) {
      scrape.get(), res.send(res)
    })

    router.get("/all", function(req,res){
      db.scrapedDatas.find({}, function(error,found){
        if (error) {
          console.log(error)
        } else {
          res.json(found)
        }
      })
    })
      // // First, we grab the body of the html with request
      // axios.get("http://www.echojs.com/").then(function(response) {
      //   // Then, we load that into cheerio and save it to $ for a shorthand selector
      //   var $ = cheerio.load(response.data);
      //
      //   // Now, we grab every h2 within an article tag, and do the following:
      //   $("article h2").each(function(i, element) {
      //     // Save an empty result object
      //     var result = {};
      //
      //     // Add the text and href of every link, and save them as properties of the result object
      //     result.title = $(this)
      //       .children("a")
      //       .text();
      //     result.link = $(this)
      //       .children("a")
      //       .attr("href");
      //
      //     // Create a new Article using the `result` object built from scraping
      //     db.Article.create(result)
      //       .then(function(dbArticle) {
      //         // View the added result in the console
      //         console.log(dbArticle);
      //       })
      //       .catch(function(err) {
      //         // If an error occurred, send it to the client
      //         return res.json(err);
      //       });
      //   });
      //
      //   // If we were able to successfully scrape and save an Article, send a message to the client
      //   res.send("Scrape Complete");
      // });

      // Route for getting all Articles from the db
      router.get("/articles", function(req, res) {
        // Grab every document in the Articles collection
        db.Article.find({})
          .then(function(dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
      });
}
