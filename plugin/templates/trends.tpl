<!-- IMPORT partials/breadcrumbs.tpl -->

<div class="trends">

    <div class="row">
        <div class="col-lg-12">
            <form id="trends-search" class="input-group">
                <input type="text" class="form-control" placeholder="[[global:search]]" id="trend-input">
                <span class="input-group-addon search-button"><i class="fa fa-search"></i></span>
            </form>
        </div>
    </div>

    {trend}

    <ul>
        <!-- BEGIN values -->
        <li>{values.text}</li>
        <!-- END values -->
    </ul>

</div>