'use strict';

define('forum/deals', ['search', 'autocomplete', 'storage', '/plugins/nodebb-plugin-freelook/src/vendor/masonry.pkgd.min.js', '/plugins/nodebb-plugin-freelook/src/vendor/imagesloaded.pkgd.min.js'],
	function(searchModule, autocomplete, storage, Masonry, imagesloaded) {
		var Deals = {};

		Deals.init = function() {
			var searchQuery = $('#deals-results').attr('data-search-query');

			$('#deals-input').val(searchQuery);

			$('#deals-search').off('submit').on('submit', function(e) {
				e.preventDefault();
				ajaxify.go('deals/' + Deals.textToPath($('#deals-input').val()));
				return false;
			});

			$(Deals.masonry);
		};

		Deals.masonry = function() {
			var $results = $('#deals-results');
			$results.imagesLoaded(function() {
				new Masonry($results.get(0), {
					itemSelector: '.item',
					gutter: 10,
					columnWidth: 200
				});
			});
		};

		Deals.textToPath = function(text) {
			return (text || '').replace(/ /gim, '-');
		};

		return Deals;
	});