'use strict';

define('forum/trends', ['search', 'autocomplete', 'storage'], function (searchModule, autocomplete, storage) {
	var	Trends = {};

	Trends.init = function () {
		var searchQuery = $('#results').attr('data-search-query');

		$('#trend-input').val(searchQuery);

		$('#trends-search').off('submit').on('submit', function (e) {
			e.preventDefault();
			console.log('trends search');
			return false;
		});
	};

	return Trends;
});
