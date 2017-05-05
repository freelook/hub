<ul component="category" class="posts-list" itemscope itemtype="http://www.schema.org/ItemList" data-nextstart="{nextStart}" data-set="{set}">
	<meta itemprop="itemListOrder" content="descending">
	<!-- BEGIN topics -->
	<li component="category/topic" class="posts-list-item row {function.generateTopicClass}" <!-- IMPORT partials/data/category.tpl -->>
		<meta itemprop="name" content="{function.stripTags, title}">

		<div class="col-md-9 col-sm-9 col-xs-9 post-body" style="border-color: {topics.category.bgColor}">
			<div component="topic/header" class="title">
				<i class="fa fa-commenting-o"></i>
				<i component="topic/pinned" class="fa fa-thumb-tack <!-- IF !topics.pinned -->hide<!-- ENDIF !topics.pinned -->" title="[[topic:pinned]]"></i>
				<i component="topic/locked" class="fa fa-lock <!-- IF !topics.locked -->hide<!-- ENDIF !topics.locked -->" title="[[topic:locked]]"></i>
				<i component="topic/moved" class="fa fa-arrow-circle-right <!-- IF !topics.oldCid -->hide<!-- ENDIF !topics.oldCid -->" title="[[topic:moved]]"></i>
				<!-- BEGIN icons -->@value
				<!-- END icons -->

				<!-- IF !topics.noAnchor -->
				<a class="topic-title" href="{config.relative_path}/topic/{topics.slug}<!-- IF topics.bookmark -->/{topics.bookmark}<!-- ENDIF topics.bookmark -->" itemprop="url">{topics.title}</a><br />
				<!-- ELSE -->
				<span>{topics.title}</span><br />
				<!-- ENDIF !topics.noAnchor -->
			</div>

			<div component="post/content" class="post-content">
				{topics.teaser.content}
			</div>

			<div>
				<small>
					<a href="{config.relative_path}/category/{topics.category.slug}"><span class="fa-stack fa-lg"><i style="color:{topics.category.bgColor};"class="fa fa-circle fa-stack-2x"></i><i style="color:{topics.category.color};" class="fa {topics.category.icon} fa-stack-1x"></i></span> {topics.category.name}</a>
				</small>

				<!-- IF topics.tags.length -->
				<span class="tag-list">
					<!-- BEGIN tags -->
					<a href="{config.relative_path}/tags/{topics.tags.value}"><span class="tag" style="<!-- IF topics.tags.color -->color: {topics.tags.color};<!-- ENDIF topics.tags.color --><!-- IF topics.tags.bgColor -->background-color: {topics.tags.bgColor};<!-- ENDIF topics.tags.bgColor -->">{topics.tags.value}</span></a>
				<!-- END tags -->
				</span>
				<!-- ENDIF topics.tags.length -->
			</div>

			<div class="row">
				<div class="mobile-stat col-xs-2 visible-xs text-right pull-right">
					<span class="human-readable-number">{topics.postcount}</span> <a href="{config.relative_path}/topic/{topics.slug}/{topics.teaser.index}"><i class="fa fa-arrow-circle-right"></i></a>
				</div>

				<div class="col-md-1 col-md-offset-5 hidden-sm hidden-xs stats">
					<span class="human-readable-number" title="{topics.postcount}">{topics.postcount}</span><br />
					<small>[[global:posts]]</small>
				</div>

				<div class="col-md-1 hidden-sm hidden-xs stats">
					<span class="human-readable-number" title="{topics.viewcount}">{topics.viewcount}</span><br />
					<small>[[global:views]]</small>
				</div>
			</div>

			<div class="post-info">
				<div class="avatar">
					<!-- IF showSelect -->
					<div class="select" component="topic/select">
						<!-- IF topics.thumb -->
						<img src="{topics.thumb}" class="user-icon img-rounded user-img" />
						<!-- ELSE -->
						<!-- IF topics.user.picture -->
						<img component="user/picture" data-uid="{topics.user.uid}" src="{topics.user.picture}" class="user-icon img-rounded user-img" />
						<!-- ELSE -->
						<div class="user-icon user-img" style="background-color: {topics.user.icon:bgColor};">{topics.user.icon:text}</div>
						<!-- ENDIF topics.user.picture -->
						<!-- ENDIF topics.thumb -->
						<i class="fa fa-check user-img"></i>
					</div>
					<!-- ENDIF showSelect -->

					<!-- IF !showSelect -->
					<a href="<!-- IF topics.user.userslug -->{config.relative_path}/user/{topics.user.userslug}<!-- ELSE -->#<!-- ENDIF topics.user.userslug -->" class="pull-left">
						<!-- IF topics.thumb -->
						<img src="{topics.thumb}" class="user-icon img-rounded user-img" />
						<!-- ELSE -->
						<!-- IF topics.user.picture -->
						<img component="user/picture" data-uid="{topics.user.uid}" src="{topics.user.picture}" class="user-icon img-rounded user-img" />
						<!-- ELSE -->
						<div class="user-icon user-img" style="background-color: {topics.user.icon:bgColor};">{topics.user.icon:text}</div>
						<!-- ENDIF topics.user.picture -->
						<!-- ENDIF topics.thumb -->
					</a>
					<!-- ENDIF !showSelect -->
				</div>

				<div class="post-author">
					<a href="{config.relative_path}/user/{topics.user.userslug}">{topics.user.username}</a><br />
					<span class="timeago" title="{topics.timestampISO}"></span>
				</div>
			</div>
		</div>
	</li>
	<!-- END topics -->
</ul>
<div component="posts/loading" class="loading-indicator text-center hidden">
	<i class="fa fa-refresh fa-spin"></i>
</div>