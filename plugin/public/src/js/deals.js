'use strict';

define('forum/deals', ['forum/trends'],
	function(Trends) {
		var Deals = {};

		Deals.init = function() {
			var searchQuery = $('#deals-results').attr('data-search-query');

			$('#deals-input').val(searchQuery);

			$('#deals-search').off('submit').on('submit', function(e) {
				e.preventDefault();
				ajaxify.go('deals/' + Deals.textToPath($('#deals-input').val()));
				return false;
			});
		};

		Deals.textToPath = function(text) {
			return Trends.textToPath(text);
		};

		return Deals;
	});
