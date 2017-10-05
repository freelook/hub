<!-- IF breadcrumbs.length -->
<ol class="breadcrumb">
	<!-- BEGIN breadcrumbs -->
	<li<!-- IF @last --> component="breadcrumb/current"<!-- ENDIF @last --> itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb" <!-- IF @last -->class="active"<!-- ENDIF @last -->>
		<!-- IF !@last --><a href="{breadcrumbs.url}" itemprop="url"><!-- ENDIF !@last -->
			<span itemprop="title">
				{breadcrumbs.text}
				<!-- IF @last -->
				<!-- IF !feeds:disableRSS -->
				<!-- IF rssFeedUrl --><a target="_blank" href="{rssFeedUrl}"><i class="fa fa-rss-square"></i></a><!-- ENDIF rssFeedUrl --><!-- ENDIF !feeds:disableRSS -->
				<!-- ENDIF @last -->
			</span>
		<!-- IF !@last --></a><!-- ENDIF !@last -->
	</li>
	<!-- END breadcrumbs -->
</ol>
<!-- ENDIF breadcrumbs.length -->

<div class="deals">

    <div class="row">
        <div class="col-lg-12">
            <form id="deals-search" class="input-group">
                <input type="text" class="form-control" placeholder="[[global:search]]" id="deals-input">
                <span class="input-group-btn">
                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                </span>
            </form>
        </div>
    </div>

    <div class="deals-suggest">
        <!-- BEGIN values.suggest -->
        <a href="/deals/{values.suggest.path}">{values.suggest.text}</a>
        <!-- END values.suggest -->
    </div>
    
    <div id="deals-results" data-search-query="{deal}">
        
        <!-- BEGIN values.web.results -->
        <div class="item">
            <!-- IF values.web.results.img -->
            <div class="img"><a href="{values.web.results.url}" target="_blank"><img src="{values.web.results.img}" title="{values.web.results.title}" alt="{values.web.results.title}"></a></div>
            <!-- ENDIF values.web.results.img -->
            <div class="title"><a href="{values.web.results.url}" target="_blank">{values.web.results.title}</a></div>
            <div class="price">{values.web.results.price}</div>
            <div class="content">{values.web.results.content}</div>
        </div>
        <!-- END values.web.results -->
        
    </div>

</div>