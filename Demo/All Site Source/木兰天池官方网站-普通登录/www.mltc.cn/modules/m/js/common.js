(function() {
    $.bc = {
        // 网站网址
        baseurl: 'http://'+window.location.host+'/',       /* 全局变量请勿改动 */
        // 转换短网址为全网址
        site_url: function(uri) {
            if (typeof (uri) !== 'undefined' && (uri.indexOf('http:') !== -1 || uri.indexOf('https:') !== -1))
                return uri;
            return this.baseurl + 'index.php/' + uri /*+ '?rnd=' + Math.random()*/;
        },
        // 执行ajax 请求
        ajax_do: function(url, data, callback, type, dataType) {
            var self = this;
            type = type || 'POST';
            data = data || {ajax: true};

            dataType = dataType || 'html';
            callback = callback || function(res) {
            };

            var self_url = encodeURI(self.site_url(url));
            $.ajax({
                type: type,
                url: self_url,
                data: data,
                dataType: dataType,
                cache: false,
                success: function(res) {
                    if (res && res == 'server_timeout') {
                        location.reload();
                        return;
                    }
                    try {
                        _res = JSON.parse(res);
                    } catch (e) {
                        try {
                            _res = (new Function("return " + res))();
                        } catch (e) {
                            _res = res;
                        }
                    }
                    callback(_res);
                },
                error: function(data, status, e) {
                    location.reload();
                }
            })
        },
        // 执行post 请求
        post: function(url, data, callback) {
            data = data || {};
            if ($.isFunction(data)) {
                callback = data;
                data = {};
            }
            callback = callback || function(res) {
            };
            this.ajax_do(url, data, callback, 'post');
        },
        // 执行get 请求
        get: function(url, data, callback) {
            data = data || {};
            if ($.isFunction(data)) {
                callback = data;
                data = {};
            }
            callback = callback || function(res) {
            };
            this.ajax_do(url, data, callback, 'get');
        },
        // 使用ajaxFileUpload 插件上传文件
        file_upload: function(url, eid, callback) {
            var self = this;
            url += url.indexOf('?') == -1 ? "?ajax=true" : "&ajax=true";
            $.ajaxFileUpload({
                url: self.site_url(url),
                fileElementId: eid,
                secureuri: false,
                dataType: "json",
                success: function(res) {
                    if (res && res == 'server_timeout') {
                        window.location.href = self.site_url('/');
                    } else {
                        callback(res);
                    }
                },
                error: function(data, status, e) {
                    location.reload();
                }
            })
            return false;
        },
        comment_list: function(guid, page, count, type){
        	this.get(this.baseurl + 'comment', {id:guid, page:page, c:count, t:type}, function(data){
        		$('.evaluationCon').html(data);
        	})
        },
        question_list: function(guid, page, count){
        	this.get(this.baseurl + 'question', {id:guid, page:page, c:count}, function(data){
        		$('.consultationCon').html(data);
        	})
        },
        syncPagaination : function(dom){
            $('body').on('click','.syncPagination a',function(e){
                $.bc.get(this.baseurl+$(this).attr('href'),function(data){
                    dom.empty().append(data);
                })
                return false;
            })
        }
    };
    function getHtml (){
        var html = "<form>\
                        <p><span>账号 : </span><input type='text' name='account'></p>\
                        <p><span>密码 : </span><input type='password' name='account'></p>\
                    </form>";
        return html;
    };
    //这是footer始终在屏幕最下方
/*    var winHeight=$(window).height();
      var fooHeight=$('footer').outerHeight();
      $('footer').offset({top:winHeight-fooHeight});*/
})();