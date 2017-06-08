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

<div class="trends">

    <div class="row">
        <div class="col-lg-12">
            <form id="trends-search" class="input-group">
                <input type="text" class="form-control" placeholder="[[global:search]]" id="trends-input">
                <span class="input-group-btn">
                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                </span>
            </form>
        </div>
    </div>

    <div class="trends-suggest">
        <!-- BEGIN values.suggest -->
        <a href="/trends/{values.suggest.path}">{values.suggest.text}</a>
        <!-- END values.suggest -->
    </div>
    
    <div id="trends-results" data-search-query="{trend}">
        
        <!-- BEGIN values.image.results -->
        <div class="item">
            <div><a href="{values.image.results.url}" target="_blank"><img src="{values.image.results.url}" title="{values.image.results.titleNoFormatting}" alt="{values.image.results.titleNoFormatting}"></a></div>
            <div class="title"><a href="{values.image.results.originalContextUrl}" target="_blank">{values.image.results.title}</a></div>
            <div class="content">{values.image.results.content}</div>
        </div>
        <!-- END values.image.results -->
        
        <!-- BEGIN values.web.results -->
        <div class="item">
            <!-- IF values.web.results.richSnippet.cseImage.src -->
            <div><a href="{values.web.results.richSnippet.cseImage.src}" target="_blank"><img src="{values.web.results.richSnippet.cseImage.src}" title="{values.web.results.titleNoFormatting}" alt="{values.web.results.titleNoFormatting}"></a></div>
            <!-- ENDIF values.web.results.richSnippet.cseImage.src -->
            <div class="title"><a href="{values.web.results.url}" target="_blank">{values.web.results.title}</a></div>
            <div class="content">{values.web.results.content}</div>
        </div>
        <!-- END values.web.results -->
        
    </div>

</div>