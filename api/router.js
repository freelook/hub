var request = require('request');
var cheerio = require('cheerio');

function routerService(app) {

    app.post('/scrape', function(req, res) {

        request(req.body.url, function(err, response, html) {
            if (err) {
                return res.status(404).json({
                    err: err || true,
                    msg: 'error request'
                });
            }

            var $ = cheerio.load(html);
            var $dom = $('html');
            res.json({
                title: $dom.find('title').text(),
                img: $dom.find('meta[property="og:image"]').attr('content')
            });
        });
    });

}

module.exports = routerService;
