'use strict';

define('forum/trends', ['search', 'autocomplete', 'storage', '/plugins/nodebb-plugin-freelook/src/vendor/masonry.pkgd.min.js', '/plugins/nodebb-plugin-freelook/src/vendor/imagesloaded.pkgd.min.js'],
	function(searchModule, autocomplete, storage, Masonry, imagesloaded) {
		var Trends = {};

		Trends.init = function() {
			var searchQuery = $('#trends-results').attr('data-search-query');

			$('#trends-input').val(searchQuery);

			$('#trends-search').off('submit').on('submit', function(e) {
				e.preventDefault();
				ajaxify.go('trends/' + Trends.textToPath($('#trends-input').val()));
				return false;
			});

			$(Trends.masonry);
		};

		Trends.masonry = function() {
			var $results = $('#trends-results');
			$results.imagesLoaded(function() {
				new Masonry($results.get(0), {
					itemSelector: '.item',
					gutter: 10,
					columnWidth: 200
				});
			});
		};

		Trends.textToPath = function(text) {
			return (text || '').replace(/ /gim, '-');
		};

		return Trends;
	});