'use strict';

define('forum/trends', ['components'],
	function(components) {
		var Trends = {};

		Trends.init = function() {
			var searchQuery = $('#trends-results').attr('data-search-query');

			$('#trends-input').val(searchQuery);

			$('#trends-search').off('submit').on('submit', function(e) {
				e.preventDefault();
				ajaxify.go('trends/' + Trends.textToPath($('#trends-input').val()));
				return false;
			});
		};

		Trends.textToPath = function(text) {
			return (text || '').replace(/ /gim, '-');
		};

		return Trends;
	});
