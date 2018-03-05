<template>
  <div>
    <div class="row">
        <div class="col-md-12">

            <!-- Start HTML 5 WYSIWYG Editor -->
            <div class="panel rounded shadow">
                <div class="panel-heading">
                    <div class="pull-left">
                        <h3 class="panel-title">HTML 5 WYSIWYG Editor</h3>
                    </div>
                    <div class="pull-right">
                        <button class="btn btn-sm" data-action="collapse" data-container="body" data-toggle="tooltip" data-placement="top" data-title="Collapse"
                            data-original-title="" title="">
                            <i class="fa fa-angle-up"></i>
                        </button>
                        <button class="btn btn-sm" data-action="remove" data-container="body" data-toggle="tooltip" data-placement="top" data-title="Remove"
                            data-original-title="" title="">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <!-- /.panel-heading -->
                <div class="panel-sub-heading">
                    <div class="callout callout-info">
                        <a href="http://jhollingworth.github.io/bootstrap-wysihtml5/" target="_blank">Bootstrap-wysihtml5</a> is a javascript plugin that makes it easy to create simple, beautiful wysiwyg
                        editors with the help of wysihtml5 and Twitter Bootstrap.
                    </div>
                </div>
                <!-- /.panel-sub-heading -->
                <div class="panel-body">
                    <div class="inner-all">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <ul class="wysihtml5-toolbar" style="">
                                    <li class="dropdown">
                                        <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="true">
                                            <i class="icon-font"></i>&nbsp;
                                            <span class="current-font">Heading 3</span>&nbsp;
                                            <b class="caret"></b>
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li>
                                                <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="div" tabindex="-1"
                                                    href="javascript:;" unselectable="on">Normal text</a>
                                            </li>
                                            <li>
                                                <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h1" tabindex="-1"
                                                    href="javascript:;" unselectable="on">Heading 1</a>
                                            </li>
                                            <li>
                                                <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h2" tabindex="-1"
                                                    href="javascript:;" unselectable="on">Heading 2</a>
                                            </li>
                                            <li>
                                                <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h3" tabindex="-1"
                                                    href="javascript:;" unselectable="on" class="wysihtml5-command-active">Heading 3</a>
                                            </li>
                                            <li>
                                                <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h4" href="javascript:;"
                                                    unselectable="on">Heading 4</a>
                                            </li>
                                            <li>
                                                <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h5" href="javascript:;"
                                                    unselectable="on">Heading 5</a>
                                            </li>
                                            <li>
                                                <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h6" href="javascript:;"
                                                    unselectable="on">Heading 6</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div class="btn-group">
                                            <a class="btn btn-default wysihtml5-command-active" data-wysihtml5-command="bold" title="CTRL+B"
                                                tabindex="-1" href="javascript:;" unselectable="on">Bold</a>
                                            <a class="btn btn-default" data-wysihtml5-command="italic" title="CTRL+I"
                                                tabindex="-1" href="javascript:;" unselectable="on">Italic</a>
                                            <a class="btn btn-default" data-wysihtml5-command="underline" title="CTRL+U"
                                                tabindex="-1" href="javascript:;" unselectable="on">Underline</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="btn-group">
                                            <a class="btn" data-wysihtml5-command="insertUnorderedList" title="Unordered list" tabindex="-1"
                                                href="javascript:;" unselectable="on">
                                                <i class="icon-list"></i>
                                            </a>
                                            <a class="btn" data-wysihtml5-command="insertOrderedList" title="Ordered list" tabindex="-1"
                                                href="javascript:;" unselectable="on">
                                                <i class="icon-th-list"></i>
                                            </a>
                                            <a class="btn" data-wysihtml5-command="Outdent" title="Outdent" tabindex="-1" href="javascript:;"
                                                unselectable="on">
                                                <i class="icon-indent-right"></i>
                                            </a>
                                            <a class="btn" data-wysihtml5-command="Indent" title="Indent" tabindex="-1" href="javascript:;"
                                                unselectable="on">
                                                <i class="icon-indent-left"></i>
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="bootstrap-wysihtml5-insert-link-modal modal hide fade">
                                            <div class="modal-header">
                                                <a class="close" data-dismiss="modal">×</a>
                                                <h3>Insert link</h3>
                                            </div>
                                            <div class="modal-body">
                                                <input value="http://" class="bootstrap-wysihtml5-insert-link-url input-xlarge">
                                                <label class="checkbox">
                                                    <input type="checkbox" class="bootstrap-wysihtml5-insert-link-target" checked="">Open link in new window</label>
                                            </div>
                                            <div class="modal-footer">
                                                <a href="#" class="btn" data-dismiss="modal">Cancel</a>
                                                <a href="#" class="btn btn-primary" data-dismiss="modal">Insert link</a>
                                            </div>
                                        </div>
                                        <a class="btn" data-wysihtml5-command="createLink" title="Insert link" tabindex="-1"
                                            href="javascript:;" unselectable="on">
                                            <i class="icon-share"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <div class="bootstrap-wysihtml5-insert-image-modal modal hide fade">
                                            <div class="modal-header">
                                                <a class="close" data-dismiss="modal">×</a>
                                                <h3>Insert image</h3>
                                            </div>
                                            <div class="modal-body">
                                                <input value="http://" class="bootstrap-wysihtml5-insert-image-url input-xlarge">
                                            </div>
                                            <div class="modal-footer">
                                                <a href="#" class="btn" data-dismiss="modal">Cancel</a>
                                                <a href="#" class="btn btn-primary" data-dismiss="modal">Insert image</a>
                                            </div>
                                        </div>
                                        <a class="btn" data-wysihtml5-command="insertImage" title="Insert image" tabindex="-1"
                                            href="javascript:;" unselectable="on">
                                            <i class="icon-picture"></i>
                                        </a>
                                    </li>
                                </ul>
                                <textarea id="wysihtml5-textarea" class="form-control" rows="10" placeholder="Enter text ..."
                                    style="display: none;"></textarea>
                                <input type="hidden" name="_wysihtml5_mode" value="1">
                                <iframe class="wysihtml5-sandbox" security="restricted" allowtransparency="true" frameborder="0"
                                    width="0" height="0" marginwidth="0" marginheight="0" style="display: block; background-color: rgb(255, 255, 255); border-collapse: separate; border-color: rgb(204, 204, 204); border-style: solid; border-width: 1px; clear: none; float: none; margin: 0px; outline: rgb(162, 162, 162) none 0px; outline-offset: 0px; padding: 6px 12px; position: static; z-index: auto; vertical-align: baseline; text-align: start; box-sizing: border-box; box-shadow: none; border-radius: 0px; width: 1049px; height: 194px; top: auto; left: auto; right: auto; bottom: auto;"></iframe>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /.panel-body -->
            </div>
            <!-- /.panel -->
            <!--/ End HTML 5 WYSIWYG Editor -->

        </div>
    </div>
  </div>
</template>
<script src="src/assets/global/plugins/bower_components/bootstrap-wysihtml5/lib/js/wysihtml5-0.3.0.min.js"></script>
        <script src="src/assets/global/plugins/bower_components/bootstrap-wysihtml5/src/bootstrap-wysihtml5.js"></script>
        <script src="src/assets/global/plugins/bower_components/summernote/dist/summernote.min.js"></script>

<script>
export default {};
</script>

<style>
@import url("/src/assets/global/plugins/bower_components/bootstrap-wysihtml5/src/bootstrap-wysihtml5.css");
@import url("/src/assets/global/plugins/bower_components/summernote/dist/summernote.css");
</style>
