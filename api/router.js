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
                url: $dom.find('meta[property*="og:url"]').attr('content') || $dom.find('meta[name*="twitter:url"]').attr('content') || req.body.url || '',
                title: $dom.find('meta[property*="og:title"]').attr('content') || $dom.find('meta[name*="twitter:title"]').attr('content') || $dom.find('title').text() || '',
                img: $dom.find('meta[property*="og:image"]').attr('content') || $dom.find('meta[name*="twitter:image"]').attr('content') || '',
                description: $dom.find('meta[property*="og:description"]').attr('content') || $dom.find('meta[name*="twitter:description"]').attr('content') || $dom.find('meta[name="description"]').attr('content') || '',
                rss: $dom.find('*[type="application/rss+xml"]').attr('href') || $dom.find('*[type="application/atom+xml"]').attr('href') || ''
            });
        });
    });

}

module.exports = routerService;
