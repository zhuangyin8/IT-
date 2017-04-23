/**
 * Created by zhuan_f on 4/23/2017.
 */
var artTabs = function(bar, config) {
    var gid = function(id) {
        return document.getElementById(id)
    };

    config = config || {};
    var bar = typeof bar === 'string' ? gid(bar) : bar,
        className = config.className || 'ui-tab-trigger-item ui-tab-trigger-item-current',
        callback = config.callback || function() {},
        isMouseover = config.isMouseover,

        buttons = bar.getElementsByTagName('a'),
        selectButton = buttons[
        config.index ||
        function() {
            var ret = 0;
            for (i = 0; i < buttons.length; i++) {
                if (buttons[i].className === className) ret = i;
            };
            return ret;
        }()
            ],
        showContent = gid(selectButton.href.split('#')[1]),
        target,
        fn = function(event) {
            event = event || window.event;
            target = event.target || event.srcElement;

            if (target.nodeName.toLowerCase() === 'a') {
                showContent.style.display = 'none';
                showContent = gid(target.href.split('#')[1]);
                showContent.style.display = 'block';
                selectButton.className = 'ui-tab-trigger-item'; // 默认class
                selectButton = target;
                target.className = className;
                target.focus();
                callback(selectButton, showContent);
                return false;
            };
        };

    if (isMouseover) bar.onmouseover = fn;
    bar.onclick = fn; // click事件至少能保证手持设备可以使用
};

// 给jQuery添加插件
jQuery.fn.artTabs = function(config) {
    return this.each(function() {
        artTabs(this, config);
    });
};


// 演示代码
jQuery('.ui-tab > dt').artTabs();

//宽度切换
window.onload = function() {
    var trigger = document.getElementById('togglePageId');
    trigger.onclick = function() {
        var page = document.getElementById('bar').parentNode;
        page.id = (page.id == 'width') ? 'widthAuto' : 'width';
        return false;
    }
};