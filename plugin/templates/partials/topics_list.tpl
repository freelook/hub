<ul component="category" id="topics-container" data-nextstart="{nextStart}" class="row categories masonry">
	<meta itemprop="itemListOrder" content="descending">
	<!-- BEGIN topics -->
	<div component="category/topic" class="col-md-3 col-sm-6 category-item {function.generateTopicClass}" data-cid="{topics.cid}" itemprop="itemListElement" <!-- IMPORT partials/data/category.tpl -->>
		<meta itemprop="name" content="{function.stripTags, title}">
        <div class="category-icon">
		    <div class="category-body">
			<div class="row">
				<!-- IF showSelect -->
				<i class="fa fa-fw fa-square-o pull-left select pointer" component="topic/select"></i>
				<!-- ENDIF showSelect -->

				<div class="category-profile-pic">
					<a href="<!-- IF topics.user.userslug -->{config.relative_path}/user/{topics.user.userslug}<!-- ELSE -->#<!-- ENDIF topics.user.userslug -->">
						<!-- IF topics.thumb -->
						<img src="{topics.thumb}" class="user-img" title="{topics.user.username}" />
						<!-- ELSE -->
						<!-- IF topics.user.picture -->
						<img component="user/picture" data-uid="{topics.user.uid}" src="{topics.user.picture}" class="user-img" title="{topics.user.username}" />
						<!-- ELSE -->
						<div class="user-icon" style="background-color: {topics.user.icon:bgColor};" title="{topics.user.username}">{topics.user.icon:text}</div>
						<!-- ENDIF topics.user.picture -->
						<!-- ENDIF topics.thumb -->
					</a>
				</div>
			    <small>
					<a href="{config.relative_path}/category/{topics.category.slug}"><i class="fa {topics.category.icon}"></i> {topics.category.name}</a> 
					<br/> &bull; <span class="timeago" title="{topics.timestampISO}"></span>
					<!-- IF !topics.unreplied -->
					<span class="hidden-md hidden-lg">
					<br/>
					<a href="{config.relative_path}/topic/{topics.slug}/{topics.teaser.index}"><span class="timeago" title="{topics.teaser.timestampISO}"></span></a>
					</span>
					<!-- ENDIF !topics.unreplied -->
					<br/>
					<!-- IMPORT partials/category_tags.tpl -->
				</small>
			</div>
			
			<div class="category-text">
				<p><strong><i component="topic/pinned" class="fa fa-thumb-tack<!-- IF !topics.pinned --> hide<!-- ENDIF !topics.pinned -->"></i> <i component="topic/locked" class="fa fa-lock<!-- IF !topics.locked --> hide<!-- ENDIF !topics.locked -->"></i></strong>
					<!-- IF !topics.noAnchor -->
					<a component="topic/header" href="{config.relative_path}/topic/{topics.slug}" itemprop="url" class="topic-title">{topics.title}</a><br />
					<!-- ELSE -->
					<a component="topic/header" itemprop="url" class="topic-title">{topics.title}</a><br />
					<!-- ENDIF !topics.noAnchor -->
				</p>
			</div>

			<div class="post-preview clearfix">
				<div class="post-preview-content">

					<div class="content">
					{topics.teaser.content}
					</div>
					<p class="fade-out"></p>
				</div>
			</div>
			
            <div class="row">
				<div class="col-xs-3 category-stat">
					<strong class="human-readable-number" title="{topics.postcount}">{topics.postcount}</strong><br />
					<small>[[global:posts]]</small>
				</div>

				<div class="col-xs-3 category-stat">
					<strong class="human-readable-number" title="{topics.viewcount}">{topics.viewcount}</strong><br />
					<small>[[global:views]]</small>
				</div>

				<div class="col-xs-6 category-stat replies">
					<!-- IF topics.unreplied -->
					<p class="no-replies"><a href="{config.relative_path}/topic/{topics.slug}" itemprop="url">[[category:no_replies]]</a></p>
					<!-- ELSE -->
					<a href="<!-- IF topics.teaser.user.userslug -->{config.relative_path}/user/{topics.teaser.user.userslug}<!-- ELSE -->#<!-- ENDIF topics.teaser.user.userslug -->">
						<!-- IF topics.teaser.user.picture -->
						<img class="teaser-pic" src="{topics.teaser.user.picture}" title="{topics.teaser.user.username}"/>
						<!-- ELSE -->
						<div class="teaser-pic user-icon" style="background-color: {topics.teaser.user.icon:bgColor};" title="{topics.teaser.user.username}">{topics.teaser.user.icon:text}</div>
						<!-- ENDIF topics.teaser.user.picture -->
					</a>
					<a href="{config.relative_path}/topic/{topics.slug}/{topics.teaser.index}">
						<span class="timeago" title="{topics.teaser.timestampISO}"></span>
					</a>

					<!-- ENDIF topics.unreplied -->
				</div>
			</div>
		</div>
        </div>
	</div>
	<!-- END topics -->
</ul>
