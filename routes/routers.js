var scrape = require("../scripts/scrape");
var models = require("../models/index");
var request = require("request");


module.exports = function(router) {
    router.get("/", function (req, res) {
      models.Headline.find({}, function(error,data){
        if (error) {
          console.log(error)
        } else {
          res.render("home", {title: "MSNBC Scraper", articles: data})
        }
      })
    });
    router.get("/scrape", function(req, res) {
      scrape.scrapeData(function(){
        res.redirect("/")
      })
    });
    router.get("/note/:id", function(req,res){
      models.Headline.findOne({_id: request.params.id}).populate("note").exec(function(error,doc){
        if (error) {
          console.log(error)
        } else {
          res.send(doc.note)
        }
      })
    })
    













    router.get("/all", function(req,res){
      db.scrapedData.find({}, function(error,found){
        if (error) {
          console.log(error)
        } else {
          res.json(found)
        }
      })
    })

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
