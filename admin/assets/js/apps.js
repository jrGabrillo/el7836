var handleSlimScroll = function() {
    "use strict";
    $('[data-scrollbar=true]').each( function() {
        generateSlimScroll($(this));
    });
};
var generateSlimScroll = function(element) {
    if ($(element).attr('data-init')) {
        return;
    }
    var dataHeight = $(element).attr('data-height');
        dataHeight = (!dataHeight) ? $(element).height() : dataHeight;
    
    var scrollBarOption = {
        height: dataHeight, 
        alwaysVisible: true
    };
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $(element).css('height', dataHeight);
        $(element).css('overflow-x','scroll');
    } else {
        $(element).slimScroll(scrollBarOption);
    }
    $(element).attr('data-init', true);
};


/* 02. Handle Sidebar - Menu
------------------------------------------------ */
var handleSidebarMenu = function() {
    "use strict";
    $('.sidebar .nav > .has-sub > a').click(function() {
        var target = $(this).next('.sub-menu');
        var otherMenu = '.sidebar .nav > li.has-sub > .sub-menu';
    
        if ($('.page-sidebar-minified').length === 0) {
            $(otherMenu).not(target).slideUp(250, function() {
                $(this).closest('li').removeClass('expand');
            });
            $(target).slideToggle(250, function() {
                var targetLi = $(this).closest('li');
                if ($(targetLi).hasClass('expand')) {
                    $(targetLi).removeClass('expand');
                } else {
                    $(targetLi).addClass('expand');
                }
            });
        }
    });
    $('.sidebar .nav > .has-sub .sub-menu li.has-sub > a').click(function() {
        if ($('.page-sidebar-minified').length === 0) {
            var target = $(this).next('.sub-menu');
            $(target).slideToggle(250);
        }
    });
};


/* 03. Handle Sidebar - Mobile View Toggle
------------------------------------------------ */
var handleMobileSidebarToggle = function() {
    var sidebarProgress = false;
    $('.sidebar').bind('click touchstart', function(e) {
        if ($(e.target).closest('.sidebar').length !== 0) {
            sidebarProgress = true;
        } else {
            sidebarProgress = false;
            e.stopPropagation();
        }
    });
    
    $(document).bind('click touchstart', function(e) {
        if ($(e.target).closest('.sidebar').length === 0) {
            sidebarProgress = false;
        }
        if (!e.isPropagationStopped() && sidebarProgress !== true) {
            if ($('#page-container').hasClass('page-sidebar-toggled')) {
                sidebarProgress = true;
                $('#page-container').removeClass('page-sidebar-toggled');
            }
            if ($(window).width() <= 767) {
                if ($('#page-container').hasClass('page-right-sidebar-toggled')) {
                    sidebarProgress = true;
                    $('#page-container').removeClass('page-right-sidebar-toggled');
                }
            }
        }
    });
    
    $('[data-click=right-sidebar-toggled]').click(function(e) {
        e.stopPropagation();
        var targetContainer = '#page-container';
        var targetClass = 'page-right-sidebar-collapsed';
            targetClass = ($(window).width() < 979) ? 'page-right-sidebar-toggled' : targetClass;
        if ($(targetContainer).hasClass(targetClass)) {
            $(targetContainer).removeClass(targetClass);
        } else if (sidebarProgress !== true) {
            $(targetContainer).addClass(targetClass);
        } else {
            sidebarProgress = false;
        }
        if ($(window).width() < 480) {
            $('#page-container').removeClass('page-sidebar-toggled');
        }
    });
    
    $('[data-click=sidebar-toggled]').click(function(e) {
        e.stopPropagation();
        var sidebarClass = 'page-sidebar-toggled';
        var targetContainer = '#page-container';

        if ($(targetContainer).hasClass(sidebarClass)) {
            $(targetContainer).removeClass(sidebarClass);
        } else if (sidebarProgress !== true) {
            $(targetContainer).addClass(sidebarClass);
        } else {
            sidebarProgress = false;
        }
        if ($(window).width() < 480) {
            $('#page-container').removeClass('page-right-sidebar-toggled');
        }
    });
};


/* 04. Handle Sidebar - Minify / Expand
------------------------------------------------ */
var handleSidebarMinify = function() {
    $('[data-click=sidebar-minify]').click(function(e) {
        e.preventDefault();
        var sidebarClass = 'page-sidebar-minified';
        var targetContainer = '#page-container';
        $('#sidebar [data-scrollbar="true"]').css('margin-top','0');
        $('#sidebar [data-scrollbar="true"]').removeAttr('data-init');
        $('#sidebar [data-scrollbar=true]').stop();
        if ($(targetContainer).hasClass(sidebarClass)) {
            $(targetContainer).removeClass(sidebarClass);
            if ($(targetContainer).hasClass('page-sidebar-fixed')) {
                if ($('#sidebar .slimScrollDiv').length !== 0) {
                    $('#sidebar [data-scrollbar="true"]').slimScroll({destroy: true});
                    $('#sidebar [data-scrollbar="true"]').removeAttr('style');
                }
                generateSlimScroll($('#sidebar [data-scrollbar="true"]'));
                $('#sidebar [data-scrollbar=true]').trigger('mouseover');
            } else if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                if ($('#sidebar .slimScrollDiv').length !== 0) {
                    $('#sidebar [data-scrollbar="true"]').slimScroll({destroy: true});
                    $('#sidebar [data-scrollbar="true"]').removeAttr('style');
                }
                generateSlimScroll($('#sidebar [data-scrollbar="true"]'));
            }
        } else {
            $(targetContainer).addClass(sidebarClass);
            
            if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                if ($(targetContainer).hasClass('page-sidebar-fixed')) {
                    $('#sidebar [data-scrollbar="true"]').slimScroll({destroy: true});
                    $('#sidebar [data-scrollbar="true"]').removeAttr('style');
                }
                $('#sidebar [data-scrollbar=true]').trigger('mouseover');
            } else {
                $('#sidebar [data-scrollbar="true"]').css('margin-top','0');
                $('#sidebar [data-scrollbar="true"]').css('overflow', 'visible');
            }
        }
        $(window).trigger('resize');
    });
};


/* 05. Handle Page Load - Fade in
------------------------------------------------ */
var handlePageContentView = function() {
    "use strict";
    $.when($('#page-loader').addClass('hide')).done(function() {
        $('#page-container').addClass('in');
    });
};


/* 06. Handle Panel - Remove / Reload / Collapse / Expand
------------------------------------------------ */
var panelActionRunning = false;
var handlePanelAction = function() {
    "use strict";
    
    if (panelActionRunning) {
        return false;
    }
    panelActionRunning = true;
    
    // remove
    $(document).on('hover', '[data-click=panel-remove]', function(e) {
        $(this).tooltip({
            title: 'Remove',
            placement: 'bottom',
            trigger: 'hover',
            container: 'body'
        });
        $(this).tooltip('show');
    });
    $(document).on('click', '[data-click=panel-remove]', function(e) {
        e.preventDefault();
        $(this).tooltip('destroy');
        $(this).closest('.panel').remove();
    });
    
    // collapse
    $(document).on('hover', '[data-click=panel-collapse]', function(e) {
        $(this).tooltip({
            title: 'Collapse / Expand',
            placement: 'bottom',
            trigger: 'hover',
            container: 'body'
        });
        $(this).tooltip('show');
    });
    $(document).on('click', '[data-click=panel-collapse]', function(e) {
        e.preventDefault();
        $(this).closest('.panel').find('.panel-body').slideToggle();
    });
    
    // reload
    $(document).on('hover', '[data-click=panel-reload]', function(e) {
        $(this).tooltip({
            title: 'Reload',
            placement: 'bottom',
            trigger: 'hover',
            container: 'body'
        });
        $(this).tooltip('show');
    });
    $(document).on('click', '[data-click=panel-reload]', function(e) {
        e.preventDefault();
        var target = $(this).closest('.panel');
        if (!$(target).hasClass('panel-loading')) {
            var targetBody = $(target).find('.panel-body');
            var spinnerHtml = '<div class="panel-loader"><span class="spinner-small"></span></div>';
            $(target).addClass('panel-loading');
            $(targetBody).prepend(spinnerHtml);
            setTimeout(function() {
                $(target).removeClass('panel-loading');
                $(target).find('.panel-loader').remove();
            }, 2000);
        }
    });
    
    // expand
    $(document).on('hover', '[data-click=panel-expand]', function(e) {
        $(this).tooltip({
            title: 'Expand / Compress',
            placement: 'bottom',
            trigger: 'hover',
            container: 'body'
        });
        $(this).tooltip('show');
    });
    $(document).on('click', '[data-click=panel-expand]', function(e) {
        e.preventDefault();
        var target = $(this).closest('.panel');
        var targetBody = $(target).find('.panel-body');
        var targetTop = 40;
        if ($(targetBody).length !== 0) {
            var targetOffsetTop = $(target).offset().top;
            var targetBodyOffsetTop = $(targetBody).offset().top;
            targetTop = targetBodyOffsetTop - targetOffsetTop;
        }
        
        if ($('body').hasClass('panel-expand') && $(target).hasClass('panel-expand')) {
            $('body, .panel').removeClass('panel-expand');
            $('.panel').removeAttr('style');
            $(targetBody).removeAttr('style');
        } else {
            $('body').addClass('panel-expand');
            $(this).closest('.panel').addClass('panel-expand');
            
            if ($(targetBody).length !== 0 && targetTop != 40) {
                var finalHeight = 40;
                $(target).find(' > *').each(function() {
                    var targetClass = $(this).attr('class');
                    
                    if (targetClass != 'panel-heading' && targetClass != 'panel-body') {
                        finalHeight += $(this).height() + 30;
                    }
                });
                if (finalHeight != 40) {
                    $(targetBody).css('top', finalHeight + 'px');
                }
            }
        }
        $(window).trigger('resize');
    });
};


/* 07. Handle Panel - Draggable
------------------------------------------------ */
var handleDraggablePanel = function() {
    "use strict";
    var target = $('.panel').parent('[class*=col]');
    var targetHandle = '.panel-heading';
    var connectedTarget = '.row > [class*=col]';
    
    $(target).sortable({
        handle: targetHandle,
        connectWith: connectedTarget,
        stop: function(event, ui) {
            ui.item.find('.panel-title').append('<i class="fa fa-refresh fa-spin m-l-5" data-id="title-spinner"></i>');
            handleSavePanelPosition(ui.item);
        }
    });
};


/* 08. Handle Tooltip & Popover Activation
------------------------------------------------ */
var handelTooltipPopoverActivation = function() {
    "use strict";
    $('[data-toggle=tooltip]').tooltip();
    $('[data-toggle=popover]').popover();
};


/* 09. Handle Scroll to Top Button Activation
------------------------------------------------ */
var handleScrollToTopButton = function() {
    "use strict";
    $(document).scroll( function() {
        var totalScroll = $(document).scrollTop();

        if (totalScroll >= 200) {
            $('[data-click=scroll-top]').addClass('in');
        } else {
            $('[data-click=scroll-top]').removeClass('in');
        }
    });

    $('[data-click=scroll-top]').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("body").offset().top
        }, 500);
    });
};


/* 10. Handle Theme & Page Structure Configuration - added in V1.2
------------------------------------------------ */
var handleThemePageStructureControl = function() {
    // COOKIE - Theme File Setting
    if ($.cookie && $.cookie('theme')) {
        if ($('.theme-list').length !== 0) {
            $('.theme-list [data-theme]').closest('li').removeClass('active');
            $('.theme-list [data-theme="'+ $.cookie('theme') +'"]').closest('li').addClass('active');
        }
        var cssFileSrc = 'assets/css/theme/' + $.cookie('theme') + '.css';
        $('#theme').attr('href', cssFileSrc);
    }
    
    // COOKIE - Sidebar Styling Setting
    if ($.cookie && $.cookie('sidebar-styling')) {
        if ($('.sidebar').length !== 0 && $.cookie('sidebar-styling') == 'grid') {
            $('.sidebar').addClass('sidebar-grid');
            $('[name=sidebar-styling] option[value="2"]').prop('selected', true);
        }
    }
    
    // COOKIE - Header Setting
    if ($.cookie && $.cookie('header-styling')) {
        if ($('.header').length !== 0 && $.cookie('header-styling') == 'navbar-inverse') {
            $('.header').addClass('navbar-inverse');
            $('[name=header-styling] option[value="2"]').prop('selected', true);
        }
    }
    
    // COOKIE - Gradient Setting
    if ($.cookie && $.cookie('content-gradient')) {
        if ($('#page-container').length !== 0 && $.cookie('content-gradient') == 'enabled') {
            $('#page-container').addClass('gradient-enabled');
            $('[name=content-gradient] option[value="2"]').prop('selected', true);
        }
    }
    
    // COOKIE - Content Styling Setting
    if ($.cookie && $.cookie('content-styling')) {
        if ($('body').length !== 0 && $.cookie('content-styling') == 'black') {
            $('body').addClass('flat-black');
            $('[name=content-styling] option[value="2"]').prop('selected', true);
        }
    }
    
    // THEME - theme selection
    $('.theme-list [data-theme]').click(function() {
        var cssFileSrc = 'assets/css/theme/' + $(this).attr('data-theme') + '.css';
        $('#theme').attr('href', cssFileSrc);
        $('.theme-list [data-theme]').not(this).closest('li').removeClass('active');
        $(this).closest('li').addClass('active');
        $.cookie('theme', $(this).attr('data-theme'));
    });
    
    // HEADER - inverse or default
    $('.theme-panel [name=header-styling]').on('change', function() {
        var targetClassAdd = ($(this).val() == 1) ? 'navbar-default' : 'navbar-inverse';
        var targetClassRemove = ($(this).val() == 1) ? 'navbar-inverse' : 'navbar-default';
        $('#header').removeClass(targetClassRemove).addClass(targetClassAdd);
        $.cookie('header-styling',targetClassAdd);
    });
    
    // SIDEBAR - grid or default
    $('.theme-panel [name=sidebar-styling]').on('change', function() {
        if ($(this).val() == 2) {
            $('#sidebar').addClass('sidebar-grid');
            $.cookie('sidebar-styling', 'grid');
        } else {
            $('#sidebar').removeClass('sidebar-grid');
            $.cookie('sidebar-styling', 'default');
        }
    });
    
    // CONTENT - gradient enabled or disabled
    $('.theme-panel [name=content-gradient]').on('change', function() {
        if ($(this).val() == 2) {
            $('#page-container').addClass('gradient-enabled');
            $.cookie('content-gradient', 'enabled');
        } else {
            $('#page-container').removeClass('gradient-enabled');
            $.cookie('content-gradient', 'disabled');
        }
    });
    
    // CONTENT - default or black
    $(document).on('change', '.theme-panel [name=content-styling]', function() {
        if ($(this).val() == 2) {
            $('body').addClass('flat-black');
            $.cookie('content-styling', 'black');
        } else {
            $('body').removeClass('flat-black');
            $.cookie('content-styling', 'default');
        }
    });
    
    // SIDEBAR - fixed or default
    $(document).on('change', '.theme-panel [name=sidebar-fixed]', function() {
        if ($(this).val() == 1) {
            if ($('.theme-panel [name=header-fixed]').val() == 2) {
                alert('Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar.');
                $('.theme-panel [name=header-fixed] option[value="1"]').prop('selected', true);
                $('#header').addClass('navbar-fixed-top');
                $('#page-container').addClass('page-header-fixed');
            }
            $('#page-container').addClass('page-sidebar-fixed');
            if (!$('#page-container').hasClass('page-sidebar-minified')) {
                generateSlimScroll($('.sidebar [data-scrollbar="true"]'));
            }
        } else {
            $('#page-container').removeClass('page-sidebar-fixed');
            if ($('.sidebar .slimScrollDiv').length !== 0) {
                if ($(window).width() <= 979) {
                    $('.sidebar').each(function() {
                        if (!($('#page-container').hasClass('page-with-two-sidebar') && $(this).hasClass('sidebar-right'))) {
                            $(this).find('.slimScrollBar').remove();
                            $(this).find('.slimScrollRail').remove();
                            $(this).find('[data-scrollbar="true"]').removeAttr('style');
                            var targetElement = $(this).find('[data-scrollbar="true"]').parent();
                            var targetHtml = $(targetElement).html();
                            $(targetElement).replaceWith(targetHtml);
                        }
                    });
                } else if ($(window).width() > 979) {
                    $('.sidebar [data-scrollbar="true"]').slimScroll({destroy: true});
                    $('.sidebar [data-scrollbar="true"]').removeAttr('style');
                }
            }
            if ($('#page-container .sidebar-bg').length === 0) {
                $('#page-container').append('<div class="sidebar-bg"></div>');
            }
        }
    });
    
    // HEADER - fixed or default
    $(document).on('change', '.theme-panel [name=header-fixed]', function() {
        if ($(this).val() == 1) {
            $('#header').addClass('navbar-fixed-top');
            $('#page-container').addClass('page-header-fixed');
            $.cookie('header-fixed', true);
        } else {
            if ($('.theme-panel [name=sidebar-fixed]').val() == 1) {
                alert('Default Header with Fixed Sidebar option is not supported. Proceed with Default Header with Default Sidebar.');
                $('.theme-panel [name=sidebar-fixed] option[value="2"]').prop('selected', true);
                $('#page-container').removeClass('page-sidebar-fixed');
                if ($('#page-container .sidebar-bg').length === 0) {
                    $('#page-container').append('<div class="sidebar-bg"></div>');
                }
            }
            $('#header').removeClass('navbar-fixed-top');
            $('#page-container').removeClass('page-header-fixed');
            $.cookie('header-fixed', false);
        }
    });
};


/* 11. Handle Theme Panel Expand - added in V1.2
------------------------------------------------ */
var handleThemePanelExpand = function() {
    $(document).on('click', '[data-click="theme-panel-expand"]', function() {
        var targetContainer = '.theme-panel';
        var targetClass = 'active';
        if ($(targetContainer).hasClass(targetClass)) {
            $(targetContainer).removeClass(targetClass);
        } else {
            $(targetContainer).addClass(targetClass);
        }
    });
};


/* 12. Handle After Page Load Add Class Function - added in V1.2
------------------------------------------------ */
var handleAfterPageLoadAddClass = function() {
    if ($('[data-pageload-addclass]').length !== 0) {
        $(window).load(function() {
            $('[data-pageload-addclass]').each(function() {
                var targetClass = $(this).attr('data-pageload-addclass');
                $(this).addClass(targetClass);
            });
        });
    }
};


/* 13. Handle Save Panel Position Function - added in V1.5
------------------------------------------------ */
var handleSavePanelPosition = function(element) {
    "use strict";
    if ($('.ui-sortable').length !== 0) {
        var newValue = [];
        var index = 0;
        $.when($('.ui-sortable').each(function() {
            var panelSortableElement = $(this).find('[data-sortable-id]');
            if (panelSortableElement.length !== 0) {
                var columnValue = [];
                $(panelSortableElement).each(function() {
                    var targetSortId = $(this).attr('data-sortable-id');
                    columnValue.push({id: targetSortId});
                });
                newValue.push(columnValue);
            } else {
                newValue.push([]);
            }
            index++;
        })).done(function() {
            var targetPage = window.location.href;
                targetPage = targetPage.split('?');
                targetPage = targetPage[0];
            localStorage.setItem(targetPage, JSON.stringify(newValue));
            $(element).find('[data-id="title-spinner"]').delay(500).fadeOut(500, function() {
                $(this).remove();
            });
        });
    }
};


/* 14. Handle Draggable Panel Local Storage Function - added in V1.5
------------------------------------------------ */
var handleLocalStorage = function() {
    "use strict";
    if (typeof(Storage) !== 'undefined' && typeof(localStorage) !== 'undefined') {
        var targetPage = window.location.href;
            targetPage = targetPage.split('?');
            targetPage = targetPage[0];
        var panelPositionData = localStorage.getItem(targetPage);
        
        if (panelPositionData) {
            panelPositionData = JSON.parse(panelPositionData);
            var i = 0;
            $('.panel').parent('[class*="col-"]').each(function() {
                var storageData = panelPositionData[i]; 
                var targetColumn = $(this);
                if (storageData) {
                    $.each(storageData, function(index, data) {
                        var targetId = $('[data-sortable-id="'+ data.id +'"]').not('[data-init="true"]');
                        if ($(targetId).length !== 0) {
                            var targetHtml = $(targetId).clone();
                            $(targetId).remove();
                            $(targetColumn).append(targetHtml);
                            $('[data-sortable-id="'+ data.id +'"]').attr('data-init','true');
                        }
                    });
                }
                i++;
            });
        }
    } else {
        alert('Your browser is not supported with the local storage'); 
    }
};


/* 15. Handle Reset Local Storage - added in V1.5
------------------------------------------------ */
var handleResetLocalStorage = function() {
    "use strict";
    $(document).on('click', '[data-click=reset-local-storage]', function(e) {
        e.preventDefault();
        
        var targetModalHtml = ''+
        '<div class="modal fade" data-modal-id="reset-local-storage-confirmation">'+
        '    <div class="modal-dialog">'+
        '        <div class="modal-content">'+
        '            <div class="modal-header">'+
        '                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
        '                <h4 class="modal-title"><i class="fa fa-refresh m-r-5"></i> Reset Local Storage Confirmation</h4>'+
        '            </div>'+
        '            <div class="modal-body">'+
        '                <div class="alert alert-info m-b-0">Would you like to RESET all your saved widgets and clear Local Storage?</div>'+
        '            </div>'+
        '            <div class="modal-footer">'+
        '                <a href="javascript:;" class="btn btn-sm btn-white" data-dismiss="modal"><i class="fa fa-close"></i> No</a>'+
        '                <a href="javascript:;" class="btn btn-sm btn-inverse" data-click="confirm-reset-local-storage"><i class="fa fa-check"></i> Yes</a>'+
        '            </div>'+
        '        </div>'+
        '    </div>'+
        '</div>';
        
        $('body').append(targetModalHtml);
        $('[data-modal-id="reset-local-storage-confirmation"]').modal('show');
    });
    $(document).on('hidden.bs.modal', '[data-modal-id="reset-local-storage-confirmation"]', function(e) {
        $('[data-modal-id="reset-local-storage-confirmation"]').remove();
    });
    $(document).on('click', '[data-click=confirm-reset-local-storage]', function(e) {
        e.preventDefault();
        var localStorageName = window.location.href;
            localStorageName = localStorageName.split('?');
            localStorageName = localStorageName[0];
        localStorage.removeItem(localStorageName);
        
        location.reload();
    });
};


/* 16. Handle Ajax Page Load - added in V1.5
------------------------------------------------ */
var default_content = '<div class="p-t-40 p-b-40 text-center f-s-20 content"><i class="fa fa-warning fa-lg text-muted m-r-5"></i> <span class="f-w-600 text-inverse">Error 404! Page not found.</span></div>';
var handleLoadPage = function(hash) {
    //Pace.restart();
    var targetUrl = hash.replace('#content=','template/');
    //var targetUrl = hash.replace('#','');
    $('.jvectormap-label, .jvector-label, .AutoFill_border ,#gritter-notice-wrapper, .ui-autocomplete, .colorpicker, .FixedHeader_Header, .FixedHeader_Cloned .lightboxOverlay, .lightbox').remove();
    $.ajax({
        type: 'POST',
        url: targetUrl,	//with the page number as a parameter
        dataType: 'html',	//expect html to be returned
        success: function(data) {
            $('#ajax-content').html(data);
            custom_voter();
            $('html, body').animate({
                scrollTop: $("body").offset().top
            }, 250);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#ajax-content').html(default_content);
        }
    });
};


/* 17. Handle Ajax Page Load Url - added in V1.5
------------------------------------------------ */
var handleCheckPageLoadUrl = function(hash) {
    hash = (hash) ? hash : '#content=index';
    if (hash === '') {
        $('#ajax-content').html(default_content);
    } else {
        $('.sidebar [href="'+hash+'"][data-toggle=ajax]').trigger('click');
        handleLoadPage(hash);
    }
};


/* 18. Handle Ajax Sidebar Toggle Content - added in V1.5
------------------------------------------------ */
var handleSidebarAjaxClick = function() {
    $('.sidebar [data-toggle=ajax]').click(function() {
        var targetLi = $(this).closest('li');
        var targetParentLi = $(this).parents();
        $('.sidebar li').not(targetLi).not(targetParentLi).removeClass('active');
        $(targetLi).addClass('active');
        $(targetParentLi).addClass('active');
    });
};


/* 19. Handle Url Hash Change - added in V1.5
------------------------------------------------ */
var handleHashChange = function() {
    $(window).hashchange(function() {
        if (window.location.hash) {
            handleLoadPage(window.location.hash);
        }
    });
};


/* 20. Handle Pace Page Loading Plugins - added in V1.5
------------------------------------------------ */
var handlePaceLoadingPlugins = function() {
    Pace.on('hide', function(){
        $('.pace').addClass('hide');
    });
};


/* 21. Handle IE Full Height Page Compatibility - added in V1.6
------------------------------------------------ */
var handleIEFullHeightContent = function() {
    var userAgent = window.navigator.userAgent;
    var msie = userAgent.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        $('.vertical-box-row [data-scrollbar="true"][data-height="100%"]').each(function() {
            var targetRow = $(this).closest('.vertical-box-row');
            var targetHeight = $(targetRow).height();
            $(targetRow).find('.vertical-box-cell').height(targetHeight);
        });
    }
};


/* 22. Handle Unlimited Nav Tabs - added in V1.6
------------------------------------------------ */
var handleUnlimitedTabsRender = function() {
    
    // function handle tab overflow scroll width 
    function handleTabOverflowScrollWidth(obj, animationSpeed) {
        var marginLeft = parseInt($(obj).css('margin-left'));  
        var viewWidth = $(obj).width();
        var prevWidth = $(obj).find('li.active').width();
        var speed = (animationSpeed > -1) ? animationSpeed : 150;
        var fullWidth = 0;

        $(obj).find('li.active').prevAll().each(function() {
            prevWidth += $(this).width();
        });

        $(obj).find('li').each(function() {
            fullWidth += $(this).width();
        });

        if (prevWidth >= viewWidth) {
            var finalScrollWidth = prevWidth - viewWidth;
            if (fullWidth != prevWidth) {
                finalScrollWidth += 40;
            }
            $(obj).find('.nav.nav-tabs').animate({ marginLeft: '-' + finalScrollWidth + 'px'}, speed);
        }

        if (prevWidth != fullWidth && fullWidth >= viewWidth) {
            $(obj).addClass('overflow-right');
        } else {
            $(obj).removeClass('overflow-right');
        }

        if (prevWidth >= viewWidth && fullWidth >= viewWidth) {
            $(obj).addClass('overflow-left');
        } else {
            $(obj).removeClass('overflow-left');
        }
    }
    
    // function handle tab button action - next / prev
    function handleTabButtonAction(element, direction) {
        var obj = $(element).closest('.tab-overflow');
        var marginLeft = parseInt($(obj).find('.nav.nav-tabs').css('margin-left'));  
        var containerWidth = $(obj).width();
        var totalWidth = 0;
        var finalScrollWidth = 0;

        $(obj).find('li').each(function() {
            if (!$(this).hasClass('next-button') && !$(this).hasClass('prev-button')) {
                totalWidth += $(this).width();
            }
        });
    
        switch (direction) {
            case 'next':
                var widthLeft = totalWidth + marginLeft - containerWidth;
                if (widthLeft <= containerWidth) {
                    finalScrollWidth = widthLeft - marginLeft;
                    setTimeout(function() {
                        $(obj).removeClass('overflow-right');
                    }, 150);
                } else {
                    finalScrollWidth = containerWidth - marginLeft - 80;
                }

                if (finalScrollWidth != 0) {
                    $(obj).find('.nav.nav-tabs').animate({ marginLeft: '-' + finalScrollWidth + 'px'}, 150, function() {
                        $(obj).addClass('overflow-left');
                    });
                }
                break;
            case 'prev':
                var widthLeft = -marginLeft;
            
                if (widthLeft <= containerWidth) {
                    $(obj).removeClass('overflow-left');
                    finalScrollWidth = 0;
                } else {
                    finalScrollWidth = widthLeft - containerWidth + 80;
                }
                $(obj).find('.nav.nav-tabs').animate({ marginLeft: '-' + finalScrollWidth + 'px'}, 150, function() {
                    $(obj).addClass('overflow-right');
                });
                break;
        }
    }

    // handle page load active tab focus
    function handlePageLoadTabFocus() {
        $('.tab-overflow').each(function() {
            var targetWidth = $(this).width();
            var targetInnerWidth = 0;
            var targetTab = $(this);
            var scrollWidth = targetWidth;

            $(targetTab).find('li').each(function() {
                var targetLi = $(this);
                targetInnerWidth += $(targetLi).width();
    
                if ($(targetLi).hasClass('active') && targetInnerWidth > targetWidth) {
                    scrollWidth -= targetInnerWidth;
                }
            });

            handleTabOverflowScrollWidth(this, 0);
        });
    }
    
    // handle tab next button click action
    $('[data-click="next-tab"]').live('click', function(e) {
        e.preventDefault();
        handleTabButtonAction(this,'next');
    });
    
    // handle tab prev button click action
    $('[data-click="prev-tab"]').live('click', function(e) {
        e.preventDefault();
        handleTabButtonAction(this,'prev');

    });
    
    // handle unlimited tabs responsive setting
    $(window).resize(function() {
        $('.tab-overflow .nav.nav-tabs').removeAttr('style');
        handlePageLoadTabFocus();
    });
    
    handlePageLoadTabFocus();
};


/* 23. Handle Mobile Sidebar Scrolling Feature - added in V1.7
------------------------------------------------ */
var handleMobileSidebar = function() {
    "use strict";
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if ($('#page-container').hasClass('page-sidebar-minified')) {
            $('#sidebar [data-scrollbar="true"]').css('overflow', 'visible');
            $('.page-sidebar-minified #sidebar [data-scrollbar="true"]').slimScroll({destroy: true});
            $('.page-sidebar-minified #sidebar [data-scrollbar="true"]').removeAttr('style');
            $('.page-sidebar-minified #sidebar [data-scrollbar=true]').trigger('mouseover');
        }
    }

    var oriTouch = 0;
    $('.page-sidebar-minified .sidebar [data-scrollbar=true] a').bind('touchstart', function(e) {
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        var touchVertical = touch.pageY;
        oriTouch = touchVertical - parseInt($(this).closest('[data-scrollbar=true]').css('margin-top'));
    });

    $('.page-sidebar-minified .sidebar [data-scrollbar=true] a').bind('touchmove',function(e){
        e.preventDefault();
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            var touchVertical = touch.pageY;
            var elementTop = touchVertical - oriTouch;
            
            $(this).closest('[data-scrollbar=true]').css('margin-top', elementTop + 'px');
        }
    });

    $('.page-sidebar-minified .sidebar [data-scrollbar=true] a').bind('touchend', function(e) {
        var targetScrollBar = $(this).closest('[data-scrollbar=true]');
        var windowHeight = $(window).height();
        var sidebarTopPosition = parseInt($('#sidebar').css('padding-top'));
        var sidebarContainerHeight = $('#sidebar').height();
        oriTouch = $(targetScrollBar).css('margin-top');

        var sidebarHeight = sidebarTopPosition;
        $('.sidebar').not('.sidebar-right').find('.nav').each(function() {
            sidebarHeight += $(this).height();
        });
        var finalHeight = -parseInt(oriTouch) + $('.sidebar').height();
        if (finalHeight >= sidebarHeight && windowHeight <= sidebarHeight && sidebarContainerHeight <= sidebarHeight) {
            var finalMargin = windowHeight - sidebarHeight - 20;
            $(targetScrollBar).animate({marginTop: finalMargin + 'px'});
        } else if (parseInt(oriTouch) >= 0 || sidebarContainerHeight >= sidebarHeight) {
            $(targetScrollBar).animate({marginTop: '0px'});
        } else {
            finalMargin = oriTouch;
            $(targetScrollBar).animate({marginTop: finalMargin + 'px'});
        }
    });
};


/* 24. Handle Top Menu - Unlimited Top Menu Render - added in V1.9
------------------------------------------------ */
var handleUnlimitedTopMenuRender = function() {
    "use strict";
    // function handle menu button action - next / prev
    function handleMenuButtonAction(element, direction) {
        var obj = $(element).closest('.nav');
        var marginLeft = parseInt($(obj).css('margin-left'));  
        var containerWidth = $('.top-menu').width() - 88;
        var totalWidth = 0;
        var finalScrollWidth = 0;

        $(obj).find('li').each(function() {
            if (!$(this).hasClass('menu-control')) {
                totalWidth += $(this).width();
            }
        });
        
        switch (direction) {
            case 'next':
                var widthLeft = totalWidth + marginLeft - containerWidth;
                if (widthLeft <= containerWidth) {
                    finalScrollWidth = widthLeft - marginLeft + 128;
                    setTimeout(function() {
                        $(obj).find('.menu-control.menu-control-right').removeClass('show');
                    }, 150);
                } else {
                    finalScrollWidth = containerWidth - marginLeft - 128;
                }

                if (finalScrollWidth != 0) {
                    $(obj).animate({ marginLeft: '-' + finalScrollWidth + 'px'}, 150, function() {
                        $(obj).find('.menu-control.menu-control-left').addClass('show');
                    });
                }
                break;
            case 'prev':
                var widthLeft = -marginLeft;
    
                if (widthLeft <= containerWidth) {
                    $(obj).find('.menu-control.menu-control-left').removeClass('show');
                    finalScrollWidth = 0;
                } else {
                    finalScrollWidth = widthLeft - containerWidth + 88;
                }
                $(obj).animate({ marginLeft: '-' + finalScrollWidth + 'px'}, 150, function() {
                    $(obj).find('.menu-control.menu-control-right').addClass('show');
                });
                break;
        }
    }

    // handle page load active menu focus
    function handlePageLoadMenuFocus() {
        var targetMenu = $('.top-menu .nav');
        var targetList = $('.top-menu .nav > li');
        var targetActiveList = $('.top-menu .nav > li.active');
        var targetContainer = $('.top-menu');
        
        var marginLeft = parseInt($(targetMenu).css('margin-left'));  
        var viewWidth = $(targetContainer).width() - 128;
        var prevWidth = $('.top-menu .nav > li.active').width();
        var speed = 0;
        var fullWidth = 0;
        
        $(targetActiveList).prevAll().each(function() {
            prevWidth += $(this).width();
        });

        $(targetList).each(function() {
            if (!$(this).hasClass('menu-control')) {
                fullWidth += $(this).width();
            }
        });

        if (prevWidth >= viewWidth) {
            var finalScrollWidth = prevWidth - viewWidth + 128;
            $(targetMenu).animate({ marginLeft: '-' + finalScrollWidth + 'px'}, speed);
        }
        
        if (prevWidth != fullWidth && fullWidth >= viewWidth) {
            $(targetMenu).find('.menu-control.menu-control-right').addClass('show');
        } else {
            $(targetMenu).find('.menu-control.menu-control-right').removeClass('show');
        }

        if (prevWidth >= viewWidth && fullWidth >= viewWidth) {
            $(targetMenu).find('.menu-control.menu-control-left').addClass('show');
        } else {
            $(targetMenu).find('.menu-control.menu-control-left').removeClass('show');
        }
    }

    // handle menu next button click action
    $('[data-click="next-menu"]').live('click', function(e) {
        e.preventDefault();
        handleMenuButtonAction(this,'next');
    });

    // handle menu prev button click action
    $('[data-click="prev-menu"]').live('click', function(e) {
        e.preventDefault();
        handleMenuButtonAction(this,'prev');

    });

    // handle unlimited menu responsive setting
    $(window).resize(function() {
        $('.top-menu .nav').removeAttr('style');
        handlePageLoadMenuFocus();
    });

    handlePageLoadMenuFocus();
};


/* 25. Handle Top Menu - Sub Menu Toggle - added in V1.9
------------------------------------------------ */
var handleTopMenuSubMenu = function() {
    "use strict";
    $('.top-menu .sub-menu .has-sub > a').click(function() {
        var target = $(this).closest('li').find('.sub-menu').first();
        var otherMenu = $(this).closest('ul').find('.sub-menu').not(target);
        $(otherMenu).not(target).slideUp(250, function() {
            $(this).closest('li').removeClass('expand');
        });
        $(target).slideToggle(250, function() {
            var targetLi = $(this).closest('li');
            if ($(targetLi).hasClass('expand')) {
                $(targetLi).removeClass('expand');
            } else {
                $(targetLi).addClass('expand');
            }
        });
    });
};


/* 26. Handle Top Menu - Mobile Sub Menu Toggle - added in V1.9
------------------------------------------------ */
var handleMobileTopMenuSubMenu = function() {
    "use strict";
    $('.top-menu .nav > li.has-sub > a').click(function() {
        if ($(window).width() <= 767) {
            var target = $(this).closest('li').find('.sub-menu').first();
            var otherMenu = $(this).closest('ul').find('.sub-menu').not(target);
            $(otherMenu).not(target).slideUp(250, function() {
                $(this).closest('li').removeClass('expand');
            });
            $(target).slideToggle(250, function() {
                var targetLi = $(this).closest('li');
                if ($(targetLi).hasClass('expand')) {
                    $(targetLi).removeClass('expand');
                } else {
                    $(targetLi).addClass('expand');
                }
            });
        }
    });
};


/* 27. Handle Top Menu - Mobile Top Menu Toggle - added in V1.9
------------------------------------------------ */
var handleTopMenuMobileToggle = function() {
    "use strict";
    $('[data-click="top-menu-toggled"]').click(function() {
        $('.top-menu').slideToggle(250);
    });
};


/* 28. Handle Clear Sidebar Selection & Hide Mobile Menu - added in V1.9
------------------------------------------------ */
var handleClearSidebarSelection = function() {
    $('.sidebar .nav > li, .sidebar .nav .sub-menu').removeClass('expand').removeAttr('style');
};
var handleClearSidebarMobileSelection = function() {
    $('#page-container').removeClass('page-sidebar-toggled');
};

/* 1.1. Generic capability
-------------------------------------------------*/
var handleSystemInformation = function() {
    var url = window.location.href;
    url = url.split('/');
    var base_url = url[0]+"//"+url[2]+"/"+url[3];
    var url = "../admin/assets/settings/voting-system.settings";
    var type = "POST";
    var data = "";
    var hash = document.location.hash;
    //initialization
    $.ajax({
        url: url,   
        type: type,
        success: function(data){
            var obj = JSON.parse(data);
            $('title').html(obj.settings[0].company);
            $('.brand .company').html(obj.settings[0].company);
            $('.brand .company-tagline').html(obj.settings[0].tagline);
            $('.brand .logo').html(obj.settings[0].tagline);
        }
    });  
};

var Capitalize = function (Val){
    if(Val.val().length == 1)
        return Val.val(Val.val().toUpperCase());
}

var Message = function (Message){
    var RetMessage;
    RetMessage = '<div class="label label-success"><span class="glyphicon glyphicon-ok-circle"></span> '+ Message +'</div>';
    return RetMessage;
}

var ErrorMessage = function (Message){
    var RetMessage;
    RetMessage = '<div class="label label-danger"><span class="glyphicon glyphicon-exclamation-sign"></span> '+ Message +'</div>';
    return RetMessage;
}

var Valid = function (ID){
    ID.removeClass("disabled");
}

var Invalid = function (ID){
    ID.addClass("disabled");
}

var Validate = function(Fields,ID){
    var RetSendData = 0;
    for(loop=0;loop<Fields.length;loop++){
        RetSendData += Fields[loop];
    }
    if(RetSendData == 0){
        Valid(ID);
    }
    else{
        Invalid(ID);
    }
    return RetSendData;
}

var StringCounter = function(input,id,allowed){
    var a = allowed-input.length;
    if(a >= 0 && a <= 1){
        id.html(a+" character remaining");
    }
    else if(a == -1){
        id.html(-1*a+" character exceeded");
    }
    else if(a <= -2){
        id.html(-1*a+" characters exceeded");
    }
    else{
        id.html(a+" characters remaining");
    }
}

var ModalConfirmations = function(Title,Message){
    $("#modal-message").modal("show");
    $(".modal-title").html(Title);
    $(".modal-body").html(Message);
}

var sortResults = function (data,prop,asc) {
    data = data.sort(function(a, b) {
        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    });
    return data;
}

var check_ActiveElection = function(){
    var x = "1";
    $.ajax({
        url: "../admin/assets/harmony/Process.php?get-active-election",
        type: 'POST',
        cache:false,
        success: function(data){
            x = data;
            console.log(x);
            return x;
        }
    });
}

var GetVoteUpdate = function(election){
    if(election != 0){
        $.ajax({
            url: "../admin/assets/harmony/Process.php?count-vote",
            type: "POST",
            cache: false,
            success: function(data){
                if(data != 0){
                    data = JSON.parse(data);
                    sortResults(data,2,false);
                    var positions = Array("President","Vice President","Secretary","Treasurer","Auditor","PIO","Peace Officer","Grade 7 Representative","Grade 8 Representative","Grade 9 Representative","Grade 10 Representative","Grade 11 Representative","Grade 12 Representative");
                    var list = "";
                    for(x=0;x<positions.length;x++){
                        list += "<tr><td colspan='4'>"+positions[x]+"</td></tr>";
                        $.each(data, function(i,info) {
                            if(positions[x] === info[1]){
                                list += "<tr><td></td><td>"+info[0]+"</td><td>"+info[3]+"</td><td>"+info[2]+"</td></tr>";
                            }
                        });
                    }
                    list = "<table class='table'>"+list+"</table>";
                }
                else{
                    list = "<h3 class='text-center'>No Active Election<br/><small><a href='#content=election'><i>Create New Election here</i></a></small></h3>";
                }
                $("#electionResult").html(list);
            }
        });
    }
    else{
        $("#electionResult").html("<h3 class='text-center'>No Active Election<br/><small><a href='#content=election'><i>Create New Election here</i></a></small></h3>");
    }
}

var ini_voter_validation = function(election){
    if(election != 0){
        $.ajax({
            url: "../admin/assets/harmony/Process.php?list_voters",
            type: "POST",
            success: function(data){
                var obj = JSON.parse(data);
                var x = 0;
                var yearlevel = data.voter_yearlevel;

                $.each(obj['voters'],function(i,v){
                    if(v['voter_status'] != 1){
                        $('a[data-cmd="validate-all"]').removeClass('hidden disabled');
                    }
                });
                
                $('#list_voters_access').DataTable( {
                    data: obj.voters,
                    "pageLength": 100,
                    columns: [
                        {data: null,
                            render: function ( data, type, full ) {
                                return '<div class="media media-sm">'+
                                    '<a class="media-left img-2x2 ui-draggable" href="javascript:;" style="height:50px !important; width:50px !important;">'+
                                        '<img src="assets/img/people/'+ data.voter_image +'" alt="" class="media-object" style="height:50px !important; width:50px !important;">'+
                                    '</a>'+
                                    '<div class="media-body">'+
                                        '<h4 class="media-heading">'+ data.voter_fname +', '+ data.voter_gname +' '+ data.voter_mname +'</h4>'+
                                        '<p>Student ID: '+ data.voter_student_id +'<br/> Year and Section: '+ data.voter_yearlevel +' - '+ data.voter_section +'</p>'+
                                    '</div>'+
                                '</div>';
                            }
                        },
                        {data: null,
                            render: function ( data, type, full ) {
                                var option = "";
                                if((data.voter_status == 1) && (data.voter_valid != "")){
                                    option = '<a data-id="'+data.options.id+'" class="btn btn-sm btn-white btn-block disabled">Validated since: '+data.voter_valid+'</a>';
                                    $('a[data-cmd="validate-all"]').addClass('hidden disabled');
                                }
                                else{
                                    // option = '<a data-id="'+data.options.id+'" class="btn btn-sm btn-primary btn-block btn_voterValidation hidden">Validate</a>';
                                    option = '<a class="btn btn-sm btn-white btn-block disabled">not yet validated</a>';
                                }
                                return option;
                            }
                        },
                    ]
                });
                $('#list_voters_access tbody').on( 'click', 'tr .btn_voterValidation', function (e) {
                    var id = $(this).data('id');
                    $.ajax({
                        url: "../admin/assets/harmony/Process.php?validate_voters",
                        type: "POST",
                         data:{data:id},
                        success: function(data){
                            var data = JSON.parse(data);
                            if(data[0]==1){
                                $.gritter.add({
                                    title: 'Success',
                                    text: 'Voter has been validated.',
                                    sticky: false,
                                    before_open: function() {
                                        if($('.gritter-item-wrapper').length === 3) {
                                            return false;
                                        }
                                    }
                                });

                                $('.btn_voterValidation[data-id='+id+']').text('Valid since: '+data[1]);
                                $('.btn_voterValidation[data-id='+id+']').removeClass('btn-primary');
                                $('.btn_voterValidation[data-id='+id+']').addClass('btn-white');
                                $('.btn_voterValidation[data-id='+id+']').addClass('disabled');
                            }
                            else{
                                $.gritter.add({
                                    title: 'Error',
                                    text: 'There was an error.',
                                    sticky: false,
                                    before_open: function() {
                                        if($('.gritter-item-wrapper').length === 3) {
                                            return false;
                                        }
                                    }
                                });
                                console.log(data);
                            }
                        }
                    });
                });
            }
        });
    }
    else{
        $("#list_voterAccessContent").html("<h3 class='text-center'>No Active Election<br/><small><a href='#content=election'><i>Create New Election here</i></a></small></h3>");
    }
}

var get_accessList = function(){
    $.ajax({
        url: "../admin/assets/harmony/Process.php?check_votersAccess",
        type: "POST",
        success:function(data){
            var data = JSON.parse(data);

            var x = 0;
            var y = 0;
            if(data.length > 0){
                $('#access_grant').addClass('hidden');
                //$("#access_print").removeClass('hidden');

                $('#accessList_show').DataTable( {
                    data: data,
                    "ordering": false,
                    keys: true,
                    paging: false,
                    columns: [
                        {data: "",
                            render: function ( data, type, full ) {
                                x++;
                                return x;
                            }
                        },
                        {data: "",
                            render: function ( data, type, full ) {
                                return full[1];
                            }

                        },
                        {data: "",
                            render: function ( data, type, full ) {
                                var details = ""+
                                "<div class='_show'>********</div>"+
                                "<span class='_hide hidden'>"+full[2]+"</span>";
                                return details;
                                //return full[2];
                            }
                        }
                    ]
                });

                var content = "";

                $('#accessList_print').DataTable( {
                    data: data,
                    "paging": false,
                    "searching": false,
                    "info": false,
                    "ordering": false,
                    columns: [
                        {data: "",
                            render: function ( data, type, full ) {
                                y++;
                                return y;
                            }
                        },
                        {data: "",
                            render: function ( data, type, full ) {
                                return full[1];
                            }

                        },
                        {data: "",
                            render: function ( data, type, full ) {
                                return full[2];
                            }
                        }
                    ]
                });
 
                var table = $('#accessList_show').DataTable();
                $('#accessList_show tbody').on( 'click', 'td', function () {
                    $('div._show').removeClass('hidden');
                    $('span._hide').addClass('hidden');

                    $(this).find('span').removeClass('hidden');
                    $(this).find('div').addClass('hidden');
                });
            }
            else{
               // $("#visible_accessList").html("<h3 class='text-center'>No Valid Voters</h3>");
                $('#access_grant').removeClass('hidden');
                $("#access_print").addClass('hidden');
            }

        }
    })
}

var grant_access = function(election){
    if(election != 0){

        get_accessList();

        $('#access_grant').click(function(){
            $.ajax({
                url: "../admin/assets/harmony/Process.php?grant_votersAccess",
                type: "POST",
                success:function(data){
                    console.log(data);
                    if(data == 0){
                        get_accessList();
                        $.gritter.add({
                            title: 'Success',
                            text: 'Access granted to validated voters.',
                            sticky: false,
                            before_open: function() {
                                if($('.gritter-item-wrapper').length === 3) {
                                    return false;
                                }
                            }
                        });
                    }
                    else{
                        $.gritter.add({
                            title: 'Error',
                            text: 'There was an error.',
                            sticky: false,
                            before_open: function() {
                                if($('.gritter-item-wrapper').length === 3) {
                                    return false;
                                }
                            }
                        });
                    }
                    //var data = JSON.parse(data);
                }
            })
        })
    }
    else{
        $("#access_List").html("<h3 class='text-center'>No Active Election<br/><small><a href='#content=election'><i>Create New Election here</i></a></small></h3>");
    }
}

var grant_accessAll = function(){
    $("a[data-cmd='validate-all']").click(function(){
        ModalConfirmations("System","Are you sure you want to grant all students the access to vote?");
        $(".modal-message .btn-primary").html("Confirm");
        $(".modal-message .btn-primary").click(function(){
        $(".modal-body").html("Processing...<br/>Please wait.");
            $.ajax({
                url: "../admin/assets/harmony/Process.php?grant_allVotersAccess",
                type: 'POST',
                success: function(data){
                    console.log(data);
                    if(Number(data) == 0){
                        $.gritter.add({
                            title: 'Success',
                            text: 'Access granted to all voters.',
                            sticky: false,
                            before_open: function() {
                                if($('.gritter-item-wrapper').length === 3) {
                                    return false;
                                }
                            }
                        });
                        window.location.href = '../admin';
                    }
                    else{
                        $.gritter.add({
                            title: 'Error',
                            text: 'There was an error.',
                            sticky: false,
                            before_open: function() {
                                if($('.gritter-item-wrapper').length === 3) {
                                    return false;
                                }
                            }
                        });
                    }
                }
            });

        })                        
    });
}

var ini_candidates_list = function(election){
    if(election != 0){
        console.log(election);
        var data = JSON.parse(election);
        var positions = Array("President","Vice President","Secretary","Treasurer","Auditor","PIO","Peace Officer","Grade 7 Representative","Grade 8 Representative","Grade 9 Representative","Grade 10 Representative","Grade 11 Representative","Grade 12 Representative");
        $("#election-title").html(data[0][1]);
        $("#election-discription").html(data[0][3]);
        $("#election-id").val(data[0][0]);

        $.ajax({
            url: "../admin/assets/harmony/Process.php?get-candidates",
            type: 'POST', 
            data:{data:data[0][0]},
            success: function(data){
                var data = JSON.parse(data);
                if(!$.isEmptyObject(data)){
                    var list = "";
                    list = "<ul class='list-group'>";
                    for(x=0;x<positions.length;x++){
                        $.each(data, function(i,info) {
                            if(positions[x] === i){
                                list += "<div class='row'>";
                                list += "<h4>"+i+"</h4>";
                                $.each(info, function(d,value) {
                                    var option = "<div class='btn-group m-r-5 m-b-5 pull-right'>"+
                                                "<a href='javascript:;' data-toggle='dropdown' class='dropdown-toggle' aria-expanded='true'><i class='fa fa-angle-down' style='opacity:0.5'></i></a>"+
                                                "<ul class='dropdown-menu' role='menu'>"+
                                                    "<li><a href='javascript:;'>Concede</a></li>"+
                                                    "<li class='hidden'><a href='javascript:;'>Update</a></li>"+
                                                "</ul>"+
                                            "</div>";

                                    list += "<div class='col-md-12 m-5' style='border:1px solid #ddd;' id='"+value[0][0]+"'>"+
                                                "<div class='panel'>"+
                                                    "<div class='panel-body'>"+
                                                        "<div class='media media-sm' style='overflow: visible !important;'>"+
                                                            "<a class='media-left img-2x2 ui-draggable' href='javascript:;'>"+
                                                                "<img src='assets/img/people/"+value[0][11]+"' alt='' class=''>"+
                                                            "</a>"+
                                                            "<div class='media-body' style='padding-left:10px'>"+
                                                                "<h4 class='media-heading'>"+value[0][1]+", "+value[0][3]+" "+value[0][2]+option+" </h4>"+
                                                                "<p><strong>Student ID: </strong>"+value[0][7]+"<br/><strong>Year and Section: </strong>"+value[0][9]+" "+value[0][8]+"</p>"+
                                                                "<p><strong>Achievement: </strong>"+info[d][1][4]+"<br/><br/><strong>Purpose: </strong>"+info[d][1][3]+"<br/></p>"+
                                                            "</div>"+
                                                        "</div>"+
                                                    "</div>"+
                                                "</div>"+
                                            "</div>";
                                })
                                list += "</div>";
                            }
                        });
                    }
                    $("#candidate_list").html(list);
                }
                else{
                    $("#candidate_list").html("<h3 class='text-center'>No Candidates<br/><small><a href='#content=candidate'><i>Nominate Candidates Here</i></a></small></h3>");
                }
            }
        });
    }
    else{
        $("#candidate_list").html("<h3 class='text-center'>No Active Election<br/><small><a href='#content=candidate'><i>Nominate Candidates Here</i></a></small></h3>");
    }
}

var custom_survey = function(election){
    var url = "../admin/assets/harmony/Process.php?AlphaNumeric";
    var a=1,b=0,c=1;
    var date = new Date($("#field_surveyDate").val());
    var json = Array();
    $.ajax({
        url: "../admin/assets/harmony/Process.php?get_events",
        type: "POST",
        success: function(data){
            var data = JSON.parse(data);
            var x = 0;
            $.each(data[0],function(i,v){
                json[x] = v[0];
                x++;
            });
            json = JSON.stringify(json)
            json = JSON.parse(json);

            $("#field_surveyTitle").keyup(function(){
                var id = $("#field_surveyTitle"),
                error = $("#message_surveyTitle"),
                capitalize  = true;

                var data = id.val(); 
                if(data === ""){
                    error.html(ErrorMessage(""));
                    a = 1;
                    Invalid($("#button_new_election"));
                }
                else{
                    error.html(Message(""));
                    a = 0;
                    var Fields = Array(a,b);                            
                    Validate(Fields,$("#button_new_election"));
                    console.log(Fields);
                }
            });

            $("#field_surveyDate").change(function(){
                var id = $("#field_surveyDate"),
                error = $("#message_surveyDate"),
                capitalize  = false;

                $('#datepicker-disabled-past').datepicker({
                    todayHighlight: true
                });

                var data = id.val(); 
                if(data === ""){
                    error.html(ErrorMessage(""));
                    b = 1;
                    Invalid($("#button_new_election"));
                }
                else{
                    error.html(Message(""));
                    b = 0;
                    var Fields = Array(a,b);                            
                    Validate(Fields,$("#button_new_election"));
                    console.log(Fields);
                }
            });

            /*
            $("#field_surveyDiscription").keyup(function(){
                var id = $("#field_surveyDiscription"),
                error = $("#message_surveyDiscription"),
                capitalize  = true;
                var data = id.val(); 

                if(data === ""){
                    error.html(ErrorMessage(""));
                    c = 1;
                    Invalid($("#button_new_election"));
                }
                else if(data.length > 250){
                    StringCounter(data,$("#char_surveyDiscription"),250);
                    error.html(ErrorMessage("maximum characters exceeded"));
                    c = 1;
                    Invalid($("#button_new_election"));
                }
                else{
                    StringCounter(data,$("#char_surveyDiscription"),250);
                    error.html(Message(""));
                    c = 0;
                    var Fields = Array(a,b,c);                            
                    Validate(Fields,$("#button_new_election"));
                    //console.log(Fields);
                }
            });
            */

            $("#button_new_election").click(function(){
                var data = Array($("#field_surveyTitle").val(),$("#field_surveyDate").val());
                $.ajax({
                    url: "../admin/assets/harmony/Process.php?insert_election",
                    type: "POST",
                    data:{data:data},
                    cache: false,
                    success: function(data){
                        console.log(data);
                        if(data == 1){
                            $.gritter.add({
                                title: 'Success',
                                text: 'Successfully added new election.',
                                sticky: false,
                                before_open: function() {
                                    if($('.gritter-item-wrapper').length === 3) {
                                        return false;
                                    }
                                }
                            });
                            $("#field_surveyTitle").prop({'disabled':true});
                            $("#field_surveyDate").prop({'disabled':true});
                            $("#field_surveyDiscription").prop({'disabled':true});

                            $("#message_surveyTitle").html("");
                            $("#message_surveyDate").html("");
                            $("#message_surveyDiscription").html("");
                            
                            $("#char_surveyDiscription").addClass('hidden');

                            $("#button_new_election").addClass("disabled");
                        }
                        else{
                            $.gritter.add({
                                title: 'Error',
                                text: "Not working. There was an error. SQL:"+data,
                                sticky: false,
                                before_open: function() {
                                    if($('.gritter-item-wrapper').length === 3) {
                                        return false;
                                    }
                                }
                            });
                        }
                    }
                });
            }) 

            if(election != 0){
                election = JSON.parse(election);
                $("#field_surveyTitle").val(election[0][1]);
                $("#field_surveyDiscription").html(election[0][3]);
                $("#field_surveyDate").val(election[0][2]);

                $("#_surveyTitle").html(election[0][1]);
                $("#_surveyDiscription").html(election[0][3]);
                $("#_surveyDate").html(election[0][2]);

                $("#field_surveyTitle").prop({'disabled':true});
                $("#field_surveyDate").prop({'disabled':true});
                $("#field_surveyDiscription").prop({'disabled':true});
                $("#char_surveyDiscription").addClass('hidden');

            }
            else{
                $("#electionDetails").html("<h3 class='text-center'>No Active Election<br/><small><a href='#content=election'><i>Create New Election here</i></a></small></h3>");
                $("#field_surveyDate").prop({'disabled':true});
                $("#field_surveyDate").val(json[4].start);
            }

        }
    });
};

var ini_voter_list = function(){
    $.ajax({
        url: "../admin/assets/harmony/Process.php?list_voters",
        type: "POST",
        success: function(data){
            var obj = JSON.parse(data);
            var x = 0;
            var yearlevel = data.voter_yearlevel;
            
            var table = "<table id='table_listVoters' class='display' cellspacing='0' width='100%'>"+
                        "    <thead>"+
                        "        <tr>"+
                        "            <th width='5%'></th>"+
                        "            <th width='80%'>Name</th>"+
                        "            <th width='8%'></th>"+
                        "        </tr>"+
                        "    </thead>"+
                        "</table>";

            $('#list_voters').html(table);

            $('#table_listVoters').DataTable( {
                data: obj.voters,
                columns: [
                    {data: "",
                        render: function ( data, type, full ) {
                            return  x=x+1;
                        }
                    },
                    {data: null,
                        render: function ( data, type, full ) {
                            console.log(data);
                            return '<div class="media media-sm">'+
                                '<a class="media-left img-2x2 ui-draggable" href="javascript:;" style="height:50px !important; width:50px !important;">'+
                                    '<img src="assets/img/people/'+ data.voter_image +'" alt="" class="media-object" style="height:50px !important; width:50px !important;">'+
                                '</a>'+
                                '<div class="media-body">'+
                                    '<h4 class="media-heading">'+ data.voter_fname +', '+ data.voter_gname +' '+ data.voter_mname +'</h4>'+
                                    '<p>Student ID: '+ data.voter_student_id +'<br/> Year and Section: '+ data.voter_yearlevel +' - '+ data.voter_section +'</p>'+
                                '</div>'+
                            '</div>';
                        }
                    },
                    {data: null,
                        render: function ( data, type, full ) {
                            info = JSON.stringify(data);
                            return "<a class='btn btn-xs btn-primary' data-cmd='voter-data' data-id='"+data.options.id+"' data-info='"+info+"'>Options</a>";
                        }
                    }
                ]
            });
            updateVoter();
            $("body").click(function(){
                updateVoter();
            })
        }
    });
}

var updateVoter = function(){
    var chklist = setInterval(function(){
        if($("#list_voters tbody").html() != ""){
            clearInterval(chklist);
            $("a[data-cmd='voter-data']").removeClass('disabled');
            $("a[data-cmd='voter-data']").click(function(){
                var id = $(this).data('id'),data = $(this).data('info');
                console.log(data);

                var content = "<table class='table'>"+
                              "<tr><td rowspan='5' colspan='1' width='100px'><img src='assets/img/people/"+ data.voter_image +"' alt='' class='media-object' style='height:100px !important; width:100px !important;'></td></tr>"+
                              "<tr><td>Name: "+ data.voter_fname +', '+ data.voter_gname +' '+ data.voter_mname +"</td></tr>"+
                              "<tr><td>Student ID: "+ data.voter_student_id +"</td></tr>"+
                              "<tr><td>Date of birth: "+ data.voter_age +"</td></tr>"+
                              "<tr><td>"+
                                "<span class='_info'>"+
                                    "Year and Section: "+ data.voter_yearlevel +' - '+ data.voter_section +
                                    "<a class='pull-right btn btn-xs btn-danger disabled' data-cmd='update_voterData'>update</a>"+
                                "</span>"+
                                "<span class='_infoUpdate hidden'>"+
                                    "<div class='col-md-3 col-sm-3'>"+
                                    "    <select class='form-control' id='field_high_school'>"+
                                    "       <option>Grade 7</option>"+
                                    "       <option>Grade 8</option>"+
                                    "       <option>Grade 9</option>"+
                                    "       <option>Grade 10</option>"+
                                    "       <option>Grade 11</option>"+
                                    "       <option>Grade 12</option>"+
                                    "    </select>"+
                                    "</div>"+
                                    "<div class='col-md-3 col-sm-3'>"+
                                    "    <input class='form-control' placeholder='Section' id='field_section'>"+
                                    "    <span id='message_section'></span>"+
                                    "</div>"+
                                    "<div class='col-md-6 col-sm-6'>"+
                                    "   <a  href='javascript:;' class='btn btn-sm btn-danger' data-cmd='cancel'>Cancel</a>"+
                                    "   <a  href='javascript:;' class='btn btn-sm btn-success' data-cmd='save'>Save</a>"+
                                    "</div>"+
                                "</span>"+
                              "</td></tr>"+
                              "</table>";
                $("#modal-vote").modal('show');
                $(".modal-title").html("Voter Information");
                $(".modal-body").html(content);

                var chkinfo = setInterval(function(){
                    if($(".modal-body").html() != ""){
                        clearInterval(chkinfo);
                        $("a[data-cmd='update_voterData']").removeClass('disabled');
                        $("a[data-cmd='update_voterData']").click(function(){
                            // console.log('x');
                            $("._infoUpdate").removeClass('hidden');
                            $("._info").addClass('hidden');

                        })

                        $("a[data-cmd='save']").click(function(){
                            var voter_data = Array($("#field_high_school").val(),$("#field_section").val(),id);
                            console.log(voter_data);
                            $.ajax({
                                url: "../admin/assets/harmony/Process.php?update_voter",
                                type: "POST",
                                data:{data:voter_data},
                                cache:false,
                                success: function(data){
                                    console.log(data);
                                    if(data == 1){
                                        $("#field_section").val('');
                                        $("#modal-vote").modal('hide');
                                        $.gritter.add({
                                            title: 'Success',
                                            text: "Successfully updated.",
                                            sticky: false,
                                            before_open: function() {
                                                if($('.gritter-item-wrapper').length === 1) {
                                                    return false;
                                                }
                                                // window.location.href = window.location.href;

                                                ini_voter_list();
                                            }
                                        });
                                    }
                                    else{
                                        $.gritter.add({
                                            title: 'Error',
                                            text: "Not working. There was an error. SQL:"+data,
                                            sticky: false,
                                            before_open: function() {
                                                if($('.gritter-item-wrapper').length === 1) {
                                                    return false;
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        });

                        $("a[data-cmd='cancel']").click(function(){
                            // console.log('x');
                            $("._infoUpdate").addClass('hidden');
                            $("._info").removeClass('hidden');
                        });
                    }
                });
            });                 
        }
    },1000);
}

var election_watch = function(){
    $.ajax({
        url: "../admin/assets/harmony/Process.php?check_votersAccess",
        type: "POST",
        success:function(data){
            var data = JSON.parse(data);
            // console.log(data);
        }
    });
}

var ini_votecandidates = function(){
    var positions = Array("President","Vice President","Secretary","Treasurer","Auditor","PIO","Peace Officer","Grade 7 Representative","Grade 8 Representative","Grade 9 Representative","Grade 10 Representative","Grade 11 Representative","Grade 12 Representative");
    var positionsCount = Array(1,1,1,1,1,1,1,1,1,1,1,1,1);
    $.ajax({
        url: "../admin/assets/harmony/Process.php?get-active-election",
        type: 'POST',
        success: function(data){
            var data = JSON.parse(data);
            // console.log(data);
            $("#election-title").html(data[0][1]);
            $("#election-discription").html(data[0][3]);
            $("#election-id").val(data[0][0 ]);

            $.ajax({
                url: "../admin/assets/harmony/Process.php?get-candidates",
                type: 'POST', 
                data:{data:data[0][0]},
                success: function(data){
                    var data = JSON.parse(data);
                    var user = $.ajax({
                        url: "../admin/assets/harmony/Process.php?check_access",
                        type: 'POST'
                    }).done(function(){
                        var data_user = JSON.parse(user.responseText);
                        var data_userYearLevel = data_user[0][9]+" Representative";
                        // console.log(data_userYearLevel);
                        var list = "<form id='vote_form' role='form' action='' method='post' enctype='multipart/form-data'><table class='table'>";
                        for(x=0;x<positions.length;x++){
                            $.each(data, function(i,info) {
                                // console.log(positions[x]+" : "+i);
                                if(positions[x] === i){
                                    list += "<tr>";
                                    list += "<td>";
                                    list += "<div class='form-group f-s-20'>";
                                    list += "<label class='col-md-12 control-label candidate_position'>"+i+" <small>(pick "+(positionsCount[x])+")</small></label>";
                                    list += "<div class='col-md-12'>";

                                    if(x>=7){
                                        $.each(info, function(d,value) {
                                                // console.log(positions[x]);
                                                var style = " ";
                                                var affixclass = " ";
                                                var affix = " ";
                                                // console.log(positions[x]+" + "+data_userYearLevel);
                                                if(positions[x] != data_userYearLevel){
                                                    style = "style='opacity:0.5;'";
                                                    affixclass = "disabled";
                                                    affix = "<small> [<i>You are not allowed to vote this candidate</i>]</small>";
                                                }
                                                list += "<label class='radio-inline f-s-15' "+style+">"+
                                                            //"<input "+affixclass+" type='checkbox' value='"+value[1][0]+"|"+positionsCount[x]+"|"+value[0][1]+", "+value[0][3]+" "+value[0][2]+"' name='"+i+"'>"+
                                                            "<input "+affixclass+" type='radio' value='"+value[1][0]+"|"+positionsCount[x]+"|"+value[0][1]+", "+value[0][3]+" "+value[0][2]+"' name='"+i+"'>"+
                                                            value[0][1]+", "+value[0][3]+" "+value[0][2]+affix+
                                                        "</label><br/>";
                                        })
                                    }
                                    else{
                                        $.each(info, function(d,value) {

                                                list += "<label class='radio-inline f-s-15' >"+
                                                            //"<input "+affixclass+" type='checkbox' value='"+value[1][0]+"|"+positionsCount[x]+"|"+value[0][1]+", "+value[0][3]+" "+value[0][2]+"' name='"+i+"'>"+
                                                            "<input type='radio' value='"+value[1][0]+"|"+positionsCount[x]+"|"+value[0][1]+", "+value[0][3]+" "+value[0][2]+"' name='"+i+"'>"+
                                                            value[0][1]+", "+value[0][3]+" "+value[0][2]+
                                                        "</label>";
                                        })
                                    }

                                    list += "</td>";
                                    list += "</tr>";
                                    list += "</div>";
                                    list += "</div>";
                                }
                            });
                        }
                        list += "</table></form>";
                        $("#candidate_list").html(list);
                        $(".radio-inline").dblclick(function(){
                            //$(this).find('input').prop();
                            // console.log($(this).find('input').prop("checked"));
                            if($(this).find('input').prop("checked")){
                                $(this).find('input').prop({"checked":false})
                            }
                            //$(this).removeClass('faded');
                        });
                    });

                }
            });
        }
    });
    
    $("#submitVotes").click(function(){
        var submitPositions = [];
        var votes = $("#vote_form").serializeArray();
        var counts = {};
        var flag = 0;
        var errorAt = "";

        $.each(votes,function(i,v){
            var data = v.value.split(',');
            submitPositions.push(v.name);
        });

        $.each(submitPositions, function(key,value) {
            if (!counts.hasOwnProperty(value)) {
                counts[value] = 1;
            } else {
                counts[value]++;
            }
        });

        //this will check if the vote submitted is too much
        $.each(votes,function(i,v){
            $.each(counts,function(a,b){
                if(v.name == a){
                    var data = v.value.split(',');
                    if(Number(data[1])<b){
                        flag = 1;
                        errorAt = v.name;
                    }
                    else{
                        flag = 0;
                        errorAt = v.name;
                    }
                }
            })
        });

        if(flag == 1){
            $.gritter.add({
                title: 'Error',
                text: 'Please check your ballot. You submitted too many selection in '+errorAt,
                sticky: false,
                before_open: function() {
                    if($('.gritter-item-wrapper').length === 3) {
                        return false;
                    }
                }
            });
        }
        else{
            if(votes.length > 0){
                var list = "";
                for(x=0;x<positions.length;x++){
                    listPreview = "";
                    $.each(votes,function(i,info) {
                        if(positions[x] === info['name']){
                            // console.log(info);
                            var candidateData = info['value'].split('|');
                            listPreview += candidateData[2];
                        }
                    });
                    list += "<tr><td><strong>"+positions[x]+"</strong><br/>"+listPreview+"</td></tr>";
                }
                $("#modal-vote").modal('show');
                $(".modal-title").html("Your votes:");
                $(".modal-body").html("<table class='table'>"+list+"</table>");
                $("#confirmVotes").click(function(){
                    $(".modal-body").html("Processing your vote. Please wait for the vote confirmation.");
                    $("#submitVotes").html('Processing...').addClass("disabled");
                    $("a[data-dismiss='modal']").addClass("hidden disabled");
                    $("#confirmVotes").removeClass("btn-primary").addClass("btn-danger disabled").html('Processing...');

                    data = [votes,$('span.username').html()]
                    $.ajax({
                        url: "../admin/assets/harmony/Process.php?save-vote",
                        type: 'POST', 
                        data:{data:data},
                        success: function(data){
                            if(data == "Error"){
                                $.gritter.add({
                                    title: 'Error',
                                    text: 'There was an error while task on process. Seek developer.',
                                    sticky: false,
                                    before_open: function() {
                                        if($('.gritter-item-wrapper').length === 3) {
                                            return false;
                                        }
                                    }
                                });
                            }
                            else{
                                $("#confirmVotes").addClass("hidden");
                                ModalConfirmations("<h3>System:</h3>","<h4>Congratulation! You vote has been counted.</h4>");
                                $(".modal-message").click(function(){
                                    window.location = "../";
                                })                        
                            }
                        }
                    });

                });
            }
            else{
                $.gritter.add({
                    title: 'Notice',
                    text: 'Every vote counts.',
                    sticky: false,
                    before_open: function() {
                        if($('.gritter-item-wrapper').length === 3) {
                            return false;
                        }
                    }
                });
            }
        }

    });
}

var nth = function(d) {
  if(d>3 && d<21) return 'th';
  switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
} 

var do_ajax = function(url,data){
    return $.ajax({
        type: "POST",
        url: url,
        data: {data: data},
        async: !1,
        cache:false,
        error: function() {
            // console.log("Error occured")
        }
    });
}

var ini_election_list = function(){
    $.ajax({
        url: "../admin/assets/harmony/Process.php?list_election",
        type: "POST",
        success: function(data){
            var data = JSON.parse(data);
            var positions = Array("President","Vice President","Secretary","Treasurer","Auditor","PIO","Peace Officer","Grade 7 Representative","Grade 8 Representative","Grade 9 Representative","Grade 10 Representative","Grade 11 Representative","Grade 12 Representative");
            // var positionsCount = Array(1,1,1,1,1,1,1,2,2,2,2,2);
            var positionsCount = Array(1,1,1,1,1,1,1,1,1,1,1,1,1);
            var list = "";
            var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            var months = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];
            var datenow = new Date();
            var result = "", resultFinal = "", result2 = "", voted = 0;

            $.each(data,function(x,y){
                var electionDetails = JSON.parse(y[0][0]);
                var electionResult = JSON.parse(y[0][1]);
                var date = new Date(electionDetails[2]);
                var flag = 0;

                if(electionDetails[4] == 1){
                    flag = 1;
                    result = "<tr><td colspn='4'>Election is on going.</td></tr>";
                    var option = "";
                }
                else{
                    result = "";
                    var option = "<a data-cmd='print' class='pull-right' class='btn btn-xs btn-danger'><i class='fa fa-print'></i> Certificate of Election Result</a>";
                }

                result += "<tr><th>Position</th><th>Student ID</th><th>Name</th><th>Votes</th></tr>";

                $.each(positions,function(a,b){
                    $.each(electionResult, function(i,info) { 
                        sortResults(info,2,false);
                        if(info.length>0){
                            if(i == b){
                                result += "<tr><td colspan='4'><br/><h4>"+i+"</h4></td></tr>";
                                for(x=0; x < info.length;x++) {
                                    if(info.length>positionsCount[a]){
                                        // console.log("sakto");
                                        flag = flag+Number(info[x][2]);
                                        voted = voted+Number(info[x][2]);
                                        // console.log(info[x]);
                                        result += "<tr><td></td><td>"+info[x][0]+"</td><td>"+info[x][3]+"</td><td>"+info[x][2]+"</td></tr>";
                                    }
                                    else{
                                        // console.log("kulang: winner agad");
                                        flag = flag+Number(info[x][2]);
                                        voted = voted+Number(info[x][2]);
                                        result += "<tr><td></td><td>"+info[x][0]+"</td><td>"+info[x][3]+"</td><td>"+info[x][2]+"</td></tr>";
                                    }
                                }
                            }
                        }

                    });
                });

                elStat = JSON.parse(electionDetails[3]);

                resultFinal = "<table class='table'>"+
                                "<tr>"+
                                    "<td colspan='4'>"+
                                        "<strong>Percentage vote:</strong> "+((elStat[1]/elStat[0])*100)+"%"+
                                        "<br/><strong>Students who already vote:</strong> "+elStat[1]+
                                        "<br/><strong>All Students:</strong> "+elStat[0]+
                                    "</td>"+
                                "</tr>"+
                                result+
                                "</table>";

                if(flag>0){
                    result2 += "<tr><th>Name</th><th>Position</th><th>Votes</th></tr>";
                    $.each(positions,function(a,b){
                        $.each(electionResult, function(i,info){
                            sortResults(info,2,false);
                            if(info.length>0){
                                if(i == b){
                                    for(x=0; x < positionsCount[a];x++) {
                                    // for(x=0; x < info.length;x++) {
                                        if(info.length>=positionsCount[a]){
                                            if(info[x][2]>0){
                                                result2 += "<tr><td>"+info[x][3]+"<br/><small>"+info[x][0]+"</small></td><td>"+i+"</td><td>"+info[x][2]+"</td></tr>";
                                            }
                                        }
                                        else{
                                            result2 += "<tr><td>"+info[x][3]+"<br/><small>"+info[x][0]+"</small></td><td>"+i+"</td><td>"+info[x][2]+"*</td></tr>";
                                        }
                                    }
                                }
                            }
                        });
                    });

                    var certElectionResult = "<div class='col-md-8 printArea' >"+
                                            "   <table class='' style='margin:50px; width:85%;'><tr><td>"+
                                            "   <h3 class='text-center'>CERTIFICATE OF ELECTION RESULTS</h3><br/>"+
                                            "   <p>I hereby certify that during the municipal election held on "+days[date.getDay()]+", "+months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear()+", for the offices listed below, the certified candidates received the votes that follow their respective names:</p><br/>"+
                                            "   <table class='table table-bordered'>"+result2+"</table>"+
                                            "   <div class='text-center'><i>-- Nothing follows --</i></div><br/><br/>"+
                                            "   <div class='col-md-offset-1 col-md-11'>Dated this "+datenow.getDate()+nth(datenow.getDate())+" day of "+months[datenow.getMonth()]+", "+datenow.getFullYear()+"</div>"+
                                            "   <div class='pull-right' style='padding-left:50px;padding-right:50px; border-top:1px solid #000;'>Designate</div>"+
                                            "   </td></tr></table>"+
                                            "</div>";

                    list += "<div class='panel-group' id='accordion'>"+
                            "   <div class='panel panel-inverse overflow-hidden'>"+
                            "       <div class='panel-heading'>"+
                            "           <h3 class='panel-title'>"+
                            "               <a class='accordion-toggle accordion-toggle-styled collapsed' data-toggle='collapse' data-parent='#accordion' href='#accordion"+electionDetails[0]+"' aria-expanded='false'>"+
                            "                   <i class='fa fa-plus-circle pull-right'></i> "+
                                                electionDetails[1]+
                            "               </a>"+
                            "           </h3>"+
                            "       </div>"+
                            "       <div id='accordion"+electionDetails[0]+"' class='panel-collapse collapse' aria-expanded='false' style='height: 0px;'>"+
                            "          <div class='panel-body'>"+option+
                            "              "+
                            "             Date of Election: "+months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear()+
                            "             <br/>Results: "+resultFinal+
                            "             <br/><div class='hidden'>"+certElectionResult+"</div>"+
                            "          </div>"+
                            "       </div>"+
                            "   </div>"+
                            "</div>";
                }
            });
            $("#list_election").html(list);
            $("a[data-cmd='print']").click(function(){
                $(this).parent('div').find('.printArea').printArea();
            });
        }
    });
}

var custom_candidate = function(){
    var a=1,b=1,c=1,d=1,e=1,f=1;
    var positions = Array("President","Vice President","Secretary","Treasurer","Auditor","PIO","Peace Officer","Grade 7 Representative","Grade 8 Representative","Grade 9 Representative","Grade 10 Representative","Grade 11 Representative","Grade 12 Representative");
    for(x=0;x<=(positions.length-1);x++){
        $("#field_high_school").append('<option>'+positions[x]+'</option>');
    }

    $.ajax({
        url: "../admin/assets/harmony/Process.php?get-pol-party",
        type: 'POST',
        cache:false,
        success: function(data){
            var data = JSON.parse(data);
            var availableTags = data;
            $('#field_candidate_party').autocomplete({
                source: availableTags
            });
        }
    });

    $.ajax({
        url: "../admin/assets/harmony/Process.php?get-active-election",
        type: 'POST',
        success: function(data){
            var data = JSON.parse(data);
            // console.log(data);
            $("#election-title").html("Filing Candidacy for "+data[0][1]);
            $("#election-discription").html(data[0][3]);
            $("#election-id").val(data[0][0]);
        }
    });

    $("#field_candidate_student_id").keyup(function(){
        var id = $("#field_candidate_student_id"),
        error = $("#message_student_id"),
        capitalize  = true;

        var data = id.val(); 
        if(data === ""){
            error.html(ErrorMessage(""));
            a = 1;
            Invalid($("#button_register_candidate"));
        }
        else{
            $.ajax({
                url: "../admin/assets/harmony/Process.php?Get_Voter",
                type: 'POST',
                data: {data:data},
                success: function(data){
                    if(data==0){
                        $("#candidate_data").addClass("hidden");
                        if(capitalize)
                            Capitalize(id);

                        error.html(ErrorMessage(""));
                        a = 1;
                    }
                    else{
                        $("#candidate_data").removeClass("hidden");
                        var data = JSON.parse(data);
                        $("#candidate_picture").prop({"src":"../admin/assets/img/people/"+data[0][11]});
                        $("#candidate_name").html(data[0][1]+", "+data[0][2]+" "+data[0][3]);
                        $("#candidate_details").html(
                            "Student ID: "+ data[0][7] +
                            "<br/>Year and Section: "+ data[0][6] +" - "+ data[0][8] +
                            "<br/>Age: "+ data[0][4] +
                            "<br/>Gender: "+ data[0][5]
                            );

                        error.html(Message(""));
                        a = 0;
                    }
                    var Fields = Array(a,b,c,d);                            
                    Validate(Fields,$("#button_register_candidate"));
                    //console.log(Fields);
                }
            });
        }
    });

    $("#field_candidate_party").keyup(function(){
        var id = $("#field_candidate_party"),
        error = $("#message_candidate_party"),
        capitalize  = true;

        var data = id.val(); 
        if(data === ""){
            error.html(ErrorMessage(""));
            b = 1;
            Invalid($("#button_register_candidate"));
        }
        else{
            error.html(Message(""));
            b = 0;
            var Fields = Array(a,b,c,d);                            
            Validate(Fields,$("#button_register_candidate"));
            //console.log(Fields);
        }
    });

    $("#field_candidate_achievement").keyup(function(){
        var id = $("#field_candidate_achievement"),
        error = $("#message_candidate_achievement"),
        url = "../admin/assets/harmony/Process.php?AlphaNumeric",
        capitalize  = true;
        var data = id.val(); 

        if(data === ""){
            error.html(ErrorMessage(""));
            c = 1;
            Invalid($("#button_register_candidate"));
        }
        else if(data.length > 250){
            StringCounter(data,$("#char_candidate_achievement"),250);
            error.html(ErrorMessage("maximum characters exceeded"));
            c = 1;
            Invalid($("#button_register_candidate"));
        }
        else{
            StringCounter(data,$("#char_candidate_achievement"),250);
            error.html(Message(""));
            c = 0;
            var Fields = Array(a,b,c,d);                            
            Validate(Fields,$("#button_register_candidate"));
            //console.log(Fields);
        }
    });

    $("#field_candidate_purpose").keyup(function(){
        var id = $("#field_candidate_purpose"),
        error = $("#message_candidate_purpose"),
        url = "../admin/assets/harmony/Process.php?AlphaNumeric",
        capitalize  = true;
        var data = id.val(); 

        if(data === ""){
            error.html(ErrorMessage(""));
            d = 1;
            Invalid($("#button_register_candidate"));
        }
        else if(data.length > 250){
            StringCounter(data,$("#char_candidate_purpose"),250);
            error.html(ErrorMessage("maximum characters exceeded"));
            d = 1;
            Invalid($("#button_register_candidate"));
        }
        else{
            StringCounter(data,$("#char_candidate_purpose"),250);
            error.html(Message(""));
            d = 0;
            var Fields = Array(a,b,c,d);                            
            Validate(Fields,$("#button_register_candidate"));
            //console.log(Fields);
        }
    });

    $("#button_register_candidate").click(function(){
        var data = Array(
            $("#field_candidate_student_id").val(),
            $("#field_high_school").val(),
            $("#field_candidate_party").val(),
            $("#field_candidate_achievement").val(),
            $("#field_candidate_purpose").val(),
            $("#election-id").val()
        );
        $.ajax({
            url: "../admin/assets/harmony/Process.php?register_candidate",
            type: "POST",
            data:{data:data},
            success: function(data){
                if(data == 1){
                    $.gritter.add({
                        title: 'Success',
                        text: 'Candidate has been added.',
                        sticky: false,
                        before_open: function() {
                            if($('.gritter-item-wrapper').length === 3) {
                                return false;
                            }
                        }
                    });
                    $("#field_candidate_student_id").val("");
                    $("#field_candidate_party").val("");
                    $("#field_candidate_achievement").val("");
                    $("#field_candidate_purpose").val("");

                    $("#message_student_id").html("");
                    $("#message_candidate_party").html("");
                    $("#message_candidate_achievement").html("");
                    $("#message_candidate_purpose").html("");

                    $("#button_register_candidate").addClass("disabled");
                    $("#candidate_data").addClass("hidden");
                    //success -- candidate registered
                    //clear all fields
                }
                else if(data == "x"){
                    $.gritter.add({
                        title: 'Error',
                        text: 'Candidate is already running for a certain position.',
                        sticky: false,
                        before_open: function() {
                            if($('.gritter-item-wrapper').length === 3) {
                                return false;
                            }
                        }
                    });
                    //error -- already registered as candidate for this election period
                }
                else{
                    $.gritter.add({
                        title: 'Error',
                        text: 'There was an error encountered while processing your request.',
                        sticky: false,
                        before_open: function() {
                            if($('.gritter-item-wrapper').length === 3) {
                                return false;
                            }
                        }
                    });
                    //error -- db problem
                }
            }
        });
    });
};

var custom_voter = function(){
    var a=0,b=1,c=1,d=1,e=1,f=1;

    $("#file").change(function(){
        if($("#file").val().length > 0){
            var f = document.getElementById('file'),
                pb = document.getElementById('pb'),
                pt = document.getElementById('pt');
            app.uploader({
                files: f,
                progressBar: pb,
                progressText: pt,
                processor: '../admin/assets/harmony/Process.php?test_image',
                finished: function(data){
                    var uploads = document.getElementById('uploads'),
                        succeeded = document.createElement('div'),
                        failed = document.createElement('div'),
                        anchor,
                        span,
                        x,string;
                        uploads.innerText = '';

                        for(x=0;x<data.succeeded.length;x++){
                            //console.log(data);
                            anchor = document.createElement("span");
                            anchor.href = '../files/'+data.succeeded[x].file;
                            anchor.target = '_blank';
                            succeeded.appendChild(anchor);
                        }
                        for(x=0;x<data.failed.length;x++){
                            span = document.createElement('span');
                            failed.appendChild(span);
                        }
                        uploads.appendChild(succeeded);
                        uploads.appendChild(failed);

                        var ext = $("#file").val().split("."), ext = ext[(ext.length)-1];
                        if(ext === "jpg" || ext === "jpeg" || ext === "gif" || ext === "png"){
                            if (data.failed.length) {
                                string = '<span class="label label-danger"><i class="glyphicon glyphicon-remove"></i> Unable to upload this file.</span>';
                                failed.innerHTML = string;
                                a = 1;
                                Invalid($("#button_register_voter"));
                            }
                            if (data.succeeded.length) {
                                string = '<span class="label label-success"><i class="glyphicon glyphicon-ok"></i> File is valid for upload.</span> '; 
                                succeeded.innerHTML = string;
                                a = 0;
                                var Fields = Array(a,b,c,d,e,f); 
                                // console.log(Fields);                    
                                Validate(Fields,$("#button_register_voter"));
                            }
                        }
                        else{
                            string = '<span class="label label-danger"><i class="glyphicon glyphicon-remove"></i> Image (jpg/png/gif) file only.</span>';
                            failed.innerHTML = string;
                            a = 1;
                            Invalid($("#button_register_voter"));
                        }
                },
            });
            var FileName = $(".fileinput-filename").text("");
        }
        else{
            a = 1;
            Invalid($("#button_register_voter"));
        }
    })

    $("#field_family_name").keyup(function(){
        var id = $("#field_family_name"),
        error = $("#message_family_name"),
        capitalize  = true;

        var data = id.val(); 
        if(data === ""){
            error.html(ErrorMessage(""));
            b = 1;
            Invalid($("#button_register_voter"));
        }
        else{
            Capitalize(id);
            error.html(Message(""));
            b = 0;
            var Fields = Array(a,b,c,d,e,f);                            
            Validate(Fields,$("#button_register_voter"));
            //console.log(Fields);
        }
    });

    $("#field_given_name").keyup(function(){
        var id = $("#field_given_name"),
        error = $("#message_given_name"),
        capitalize  = true;

        var data = id.val(); 
        if(data === ""){
            error.html(ErrorMessage(""));
            c = 1;
            Invalid($("#button_register_voter"));
        }
        else{
            Capitalize(id);
            error.html(Message(""));
            c = 0;
            var Fields = Array(a,b,c,d,e,f);                            
            Validate(Fields,$("#button_register_voter"));
        }
    });

    $("#field_middle_name").keyup(function(){
        var id = $("#field_middle_name"),
        error = $("#message_middle_name"),
        capitalize  = true;

        var data = id.val(); 
        if(data === ""){
            error.html(ErrorMessage(""));
            d = 1;
            Invalid($("#button_register_voter"));
        }
        else{
            Capitalize(id);
            error.html(Message(""));
            d = 0;
            var Fields = Array(a,b,c,d,e,f);                            
            Validate(Fields,$("#button_register_voter"));
        }
    });

    $("#field_student_id").keyup(function(){
        var id = $("#field_student_id"),
        error = $("#message_student_id"),
        capitalize  = false;

        var data = id.val(); 
        if(data === ""){
            error.html(ErrorMessage(""));
            e = 1;
            Invalid($("#button_register_voter"));
        }
        else{
            Capitalize(id);
            error.html(Message(""));
            e = 0;
            var Fields = Array(a,b,c,d,e,f);                            
            Validate(Fields,$("#button_register_voter"));
        }
    });

    $("#field_section").keyup(function(){
        var id = $("#field_section"),
        error = $("#message_section"),
        capitalize  = true;

        var data = id.val(); 
        if(data === ""){
            error.html(ErrorMessage(""));
            f = 1;
            Invalid($("#button_register_voter"));
        }
        else{
            Capitalize(id);
            error.html(Message(""));
            f = 0;
            var Fields = Array(a,b,c,d,e,f);                            
            Validate(Fields,$("#button_register_voter"));
        }
    });

    $("#button_register_voter").click(function(){
        var gender = "";
        var voter_data = Array({1:$("#file").val(),2:$("#field_family_name").val(),3:$("#field_given_name").val(),4:$("#field_middle_name").val(),5:$("#field_student_id").val(),6:$("#field_section").val()});
        
        if(voter_data[0][1] == ""){
            if($("#field_male").prop('checked'))
                gender = "Male";
            else
                gender = "Female";

            var voter_data = Array({
                1:"profile avatar.jpg",
                2:$("#field_family_name").val(),
                3:$("#field_given_name").val(),
                4:$("#field_middle_name").val(),
                5:$("#field_dobMonth").val()+"-"+$("#field_dobDay").val()+"-"+$("#field_dobYear").val(),
                6:gender,
                7:$("#field_student_id").val(),
                8:$("#field_high_school").val(),
                9:$("#field_section").val()});

            // console.log(voter_data);

            $.ajax({
                url: "../admin/assets/harmony/Process.php?register_voter",
                type: "POST",
                data:{data:voter_data},
                cache:false,
                success: function(data){
                    // console.log(voter_data);
                    if(data == 1){
                        var voter_fname = voter_data[0][2],
                        voter_gname = voter_data[0][3],
                        voter_mname = voter_data[0][4],
                        voter_student_id = voter_data[0][7],
                        voter_education = voter_data[0][8],
                        voter_section = voter_data[0][9],
                        voter_image = voter_data[0][1];
                        $("#list_voters").prepend('<tr><td><div class="media media-sm">'+
                                        '<a class="media-left" href="javascript:;">'+
                                            '<img src="assets/img/people/'+ voter_image +'" alt="" class="media-object">'+
                                        '</a>'+
                                        '<div class="media-body">'+
                                            '<h4 class="media-heading">'+ voter_fname +', '+ voter_gname +' '+ voter_mname +'</h4>'+
                                            '<p>Student ID: '+ voter_student_id +'<br/> Year and Section: '+ voter_education +' - '+ voter_section +'</p>'+
                                        '</div>'+
                                    '</div></td><td></td></tr>');

                        $("#field_family_name").val('');
                        $("#field_given_name").val('');
                        $("#field_middle_name").val('');
                        $("#field_age").val('');
                        $("#field_student_id").val('');
                        $("#field_high_school").val('');
                        $("#field_section").val('');

                        $(".fileinput").fileinput('clear');
                        $("#uploads").html("");
                        $("#message_family_name").html("");
                        $("#message_given_name").html("");
                        $("#message_middle_name").html("");
                        $("#message_student_id").html("");
                        $("#message_section").html("");

                        $.gritter.add({
                            title: 'Success',
                            text: "Successfully added new voter.",
                            sticky: false,
                            before_open: function() {
                                if($('.gritter-item-wrapper').length === 3) {
                                    return false;
                                }
                            }
                        });
                    }
                    else{
                        $.gritter.add({
                            title: 'Error',
                            text: "Not working. There was an error. SQL:"+data,
                            sticky: false,
                            before_open: function() {
                                if($('.gritter-item-wrapper').length === 3) {
                                    return false;
                                }
                            }
                        });
                    }
                }
            });
        }
        else{
            var f = document.getElementById('file'),
                pb = document.getElementById('pb'),
                pt = document.getElementById('pt');
            app.uploader({
                files: f,
                progressBar: pb,
                progressText: pt,
                processor: '../admin/assets/harmony/upload.php',
                finished: function(data){
                    var uploads = document.getElementById('uploads'),
                        succeeded = document.createElement('div'),
                        failed = document.createElement('div'),
                        anchor,
                        span,
                        x,string;
                        uploads.innerText = '';
                        for(x=0;x<data.succeeded.length;x++){
                            // console.log(data);
                            anchor = document.createElement("span");
                            anchor.href = '../files/'+data.succeeded[x].file;
                            anchor.target = '_blank';
                            succeeded.appendChild(anchor);

                            if($("#field_male").prop('checked'))
                                gender = "Male";
                            else
                                gender = "Female";

                            var voter_data = Array({
                                1:data.succeeded[x].file,
                                2:$("#field_family_name").val(),
                                3:$("#field_given_name").val(),
                                4:$("#field_middle_name").val(),
                                5:$("#field_dobMonth").val()+"-"+$("#field_dobDay").val()+"-"+$("#field_dobYear").val(),
                                6:gender,
                                7:$("#field_student_id").val(),
                                8:$("#field_high_school").val(),
                                9:$("#field_section").val()});

                            $.ajax({
                                url: "../admin/assets/harmony/Process.php?register_voter",
                                type: "POST",
                                data:{data:voter_data},
                                success: function(data){
                                    // console.log(voter_data);
                                    if(data == 1){
                                        var voter_fname = voter_data[0][2],
                                        voter_gname = voter_data[0][3],
                                        voter_mname = voter_data[0][4],
                                        voter_student_id = voter_data[0][7],
                                        voter_education = voter_data[0][8],
                                        voter_section = voter_data[0][9],
                                        voter_image = voter_data[0][1];
                                        $("#list_voters").prepend('<tr><td><div class="media media-sm">'+
                                                        '<a class="media-left" href="javascript:;">'+
                                                            '<img src="assets/img/people/'+ voter_image +'" alt="" class="media-object">'+
                                                        '</a>'+
                                                        '<div class="media-body">'+
                                                            '<h4 class="media-heading">'+ voter_fname +', '+ voter_gname +' '+ voter_mname +'</h4>'+
                                                            '<p>Student ID: '+ voter_student_id +'<br/> Year and Section: '+ voter_education +' - '+ voter_section +'</p>'+
                                                        '</div>'+
                                                    '</div></td><td></td></tr>');

                                        $("#field_family_name").val('');
                                        $("#field_given_name").val('');
                                        $("#field_middle_name").val('');
                                        $("#field_age").val('');
                                        $("#field_student_id").val('');
                                        $("#field_high_school").val('');
                                        $("#field_section").val('');

                                        $(".fileinput").fileinput('clear');
                                        $("#uploads").html("");
                                        $("#message_family_name").html("");
                                        $("#message_given_name").html("");
                                        $("#message_middle_name").html("");
                                        $("#message_student_id").html("");
                                        $("#message_section").html("");

                                        $.gritter.add({
                                            title: 'Success',
                                            text: "Successfully added new voter.",
                                            sticky: false,
                                            before_open: function() {
                                                if($('.gritter-item-wrapper').length === 3) {
                                                    return false;
                                                }
                                            }
                                        });
                                    }
                                    else{
                                        $.gritter.add({
                                            title: 'Error',
                                            text: "Not working. There was an error. SQL:"+data,
                                            sticky: false,
                                            before_open: function() {
                                                if($('.gritter-item-wrapper').length === 3) {
                                                    return false;
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                        for(x=0;x<data.failed.length;x++){
                            span = document.createElement('span');
                            failed.appendChild(span);
                        }
                        uploads.appendChild(succeeded);
                        uploads.appendChild(failed);

                        var ext = $("#file").val().split("."), ext = ext[(ext.length)-1];
                        if(ext === "jpg" || ext === "jpeg" || ext === "gif" || ext === "png"){
                            if (data.failed.length) {
                                string = '<span class="label label-danger"><span class="glyphicon glyphicon-remove"></span> You cannot upload this file.</span>';
                                failed.innerHTML = string;
                                c = 1;
                                Invalid($("#SaveNewAdmin"));
                            }

                            if (data.succeeded.length) {
                                string = '<span class="label label-success"><span class="glyphicon glyphicon-ok"></span> File ok for upload.</span> '; 
                                succeeded.innerHTML = string;
                                c = 0;
                                var Fields = Array(a,b,c);                            
                                Validate(Fields,$("#SaveNewAdmin"));
                            }
                        }
                        else{
                            string = '<span class="label label-danger"><span class="glyphicon glyphicon-remove"></span> You cannot upload this file.</span>';
                            failed.innerHTML = string;
                            c = 1;
                            Invalid($("#SaveNewAdmin"));
                        }
                },
            });

        }

        // console.log(voter_data[0][1]);

        /*
        */
    });
};

var custom_ini = function(){
    var url = "http://localhost/voting_system/settings.json";
    var type = "POST";
    var data = "";
    var hash = document.location.hash;

    var url = window.location.href;
    url = url.split('/');
    var base_url = url[0]+"//"+url[2]+"/"+url[3];

    //initialization
    $.ajax({
        url: "../admin/assets/harmony/Process.php?check_access",
        type: type,
        success: function(data){
            console.log(data);
            if(data != 0){
                var obj = JSON.parse(data);
                if(obj[0][4] == 1){
                    var user_role = 'Administrator';
                }
                else{
                    $('img.user-picture').addClass("hidden");
                    $("ul.dropdown-menu.animated.fadeInLeft").addClass("hidden");
                    $("b.caret").addClass("hidden");
                }
                $('span.username').html(obj[0][1]);
                $('img.user-picture').prop({"src":"../admin/assets/img/people/"+obj[0][5]});
                $('small.user-role').html(user_role);
            }
            else{
                window.location = "../";
            }
        }
    });

    $('#logout').click(function(){
        $.ajax({
            url: base_url+"/admin/assets/harmony/Process.php?logout",
            type: type,
            success: function(data){
                if(data == 0){
                    // console.log("log out failed.");
                }
                else{
                    window.location = "../";
                }
            }
        });
    });
};

var handleBootstrapWizards = function() {
    "use strict";
    $("#electionwizard").bwizard();
};

var handleDateFormat = function(date){
    var d = new Date(date),
        date_time = "",
        curr_day = d.getDate(),
        curr_month = d.getMonth(),
        curr_year = d.getFullYear(),
        curr_hour = d.getHours(),
        curr_min = d.getMinutes(),
        curr_sec = d.getSeconds();

    curr_month++ ;

    date_time = curr_year+"/"+curr_month+"/"+curr_day+" "+curr_hour+":"+curr_min+":"+curr_sec;
    return date_time;
}

var setInactiveElection = function(func){
    $.ajax({
        url: "../admin/assets/harmony/Process.php?reset-election",
        type: "POST",
        success: function(data){
            func(data);
        }
    });
}

var resetElection = function(){
    $.ajax({
        url: "../admin/assets/harmony/Process.php?reset_events",
        type: "POST",
        success: function(data){
            console.log(data);
        }
    });
}

var hadleTime = function() {
    "use strict";
    var fiveSeconds = new Date().getTime() + 5000;
    var json = Array();

    $.ajax({
        url: "../admin/assets/harmony/Process.php?get_events",
        type: "POST",
        success: function(data){
            var data = JSON.parse(data);
            var x = 0, flag = 0;

            $.each(data[0],function(i,v){
                if(validateDate(v[0].start) != 1){
                    flag = 1;
                }

                json[x] = v[0];
                x++;
            });
            json = JSON.stringify(json)
            json = JSON.parse(json);

            if(flag == 0){
                $('.countdown_1').countdown(handleDateFormat(json[0].start), function(event) {
                    var content = false;
                    $(this).html(event.strftime('Will Start: %D days %H:%M:%S'));
                    if(event.type == 'finish'){
                        content = true;
                        $(this).html("");

                        $('.countdown_1a').countdown(handleDateFormat(json[0].end), function(event) {
                            $(this).html(event.strftime('Will End: %D days %H:%M:%S'));
                            if(event.type == 'finish'){
                                content = true;
                                $(this).html("Schedule has been ended");
                            }
                            else{
                                content = false;
                            }
                        }); 
                    }
                    else{
                        content = false;
                    }

                    if(content){
                        $('#step1_content').removeClass('hidden');
                        $('#step1_message').addClass('hidden');
                        //show content
                    }
                    else{
                        $('#step1_content').addClass('hidden');
                        $('#step1_message').removeClass('hidden');
                        //hide content
                    }
                });

                $('.countdown_2').countdown(handleDateFormat(json[1].start), function(event) {
                    var content = false;
                    $(this).html(event.strftime('Will Start: %D days %H:%M:%S'));
                    if(event.type == 'finish'){
                        content = true;
                        $(this).html("");

                        $("#field_candidate_student_id").prop({"disabled":false});
                        $("#field_candidate_party").prop({"disabled":false});
                        $("#field_candidate_achievement").prop({"disabled":false});
                        $("#field_candidate_purpose").prop({"disabled":false});                    
                        $("#field_high_school").prop({"disabled":false});                    

                        $('.countdown_2a').countdown(handleDateFormat(json[1].end), function(event) {
                            $(this).html(event.strftime('Will End: %D days %H:%M:%S'));
                            if(event.type == 'finish'){
                                content = true;
                                $(this).html("Schedule has been ended");

                                $("#field_candidate_student_id").prop({"disabled":true});
                                $("#field_candidate_party").prop({"disabled":true});
                                $("#field_candidate_achievement").prop({"disabled":true});
                                $("#field_candidate_purpose").prop({"disabled":true});
                                $("#field_high_school").prop({"disabled":true});                    
                            }
                            else{
                                content = false;
                            }
                        });
                    }
                    else{
                        content = false;

                        $("#field_candidate_student_id").prop({"disabled":true});
                        $("#field_candidate_party").prop({"disabled":true});
                        $("#field_candidate_achievement").prop({"disabled":true});
                        $("#field_candidate_purpose").prop({"disabled":true});
                        $("#field_high_school").prop({"disabled":true});                    
                    }

                    if(content){
                        $('#step2_content').removeClass('hidden');
                        $('#step2_message').addClass('hidden');
                        //show content
                    }
                    else{
                        $('#step2_content').addClass('hidden');
                        $('#step2_message').removeClass('hidden');
                        //hide content
                    }
                });

                $('.countdown_3').countdown(handleDateFormat(json[2].start), function(event) {
                    var content = false;
                    $(this).html(event.strftime('Will Start: %D days %H:%M:%S'));
                    if(event.type == 'finish'){
                        content = true;
                        $(this).html("");
                        $('.countdown_3a').countdown(handleDateFormat(json[2].end), function(event) {
                            $(this).html(event.strftime('Will End: %D days %H:%M:%S'));
                            if(event.type == 'finish'){
                                content = true;
                                $(this).html("Schedule has been ended");
                                $('.btn_voterValidation').addClass('disabled');
                            }
                            else{
                                content = false;
                            }
                        });
                    }
                    else{
                        content = false;
                    }

                    if(content){
                        $('#step3_content').removeClass('hidden');
                        $('#step3_message').addClass('hidden');
                        //show content
                    }
                    else{
                        $('#step3_content').addClass('hidden');
                        $('#step3_message').removeClass('hidden');
                        //hide content
                    }
                });

                $('.countdown_4').countdown(handleDateFormat(json[3].start), function(event) {
                    var content = false;
                    $(this).html(event.strftime('Will Start: %D days %H:%M:%S'));
                    if(event.type == 'finish'){
                        content = true;
                        $(this).html("");

                        $('.countdown_4a').countdown(handleDateFormat(json[3].end), function(event) {
                            $(this).html(event.strftime('Will End: %D days %H:%M:%S'));
                            if(event.type == 'finish'){
                                content = true;
                                $(this).html("Schedule has been ended");
                            }
                            else{
                                content = false;
                            }
                        });
                    }
                    else{
                        content = false;
                    }

                    if(content){
                        $('#step4_content').removeClass('hidden');
                        $('#step4_message').addClass('hidden');
                        //show content
                    }
                    else{
                        $('#step4_content').addClass('hidden');
                        $('#step4_message').removeClass('hidden');
                        //hide content
                    }
                });

                $('.countdown_5').countdown(handleDateFormat(json[4].start), function(event) {
                    var content = false;
                    $(this).html(event.strftime('Will Start: %D days %H:%M:%S'));
                    if(event.type == 'finish'){
                        content = true;
                        $(this).html("");
                        $('.countdown_5a').countdown(handleDateFormat(json[4].end), function(event) {
                            $(this).html(event.strftime('Will End: %D days %H:%M:%S'));
                            if(event.type == 'finish'){
                                content = true;
                                $(this).html("Schedule has been ended");
                                setInactiveElection(function(e){
                                    if(e == 1){
                                        resetElection();
                                        $.gritter.add({
                                            title: 'Election has been ended.<br/>',
                                            text: '',
                                            sticky: false,
                                            before_open: function() {
                                                if($('.gritter-item-wrapper').length === 1) {
                                                    return false;
                                                }
                                            },
                                            after_close:function(){
                                               window.location.href = window.location.href;                           
                                            }
                                        });

                                    }
                                    else{
                                        $.gritter.add({
                                            title: 'Fatal Error',
                                            text: 'An error occured during the process.',
                                            sticky: false,
                                            before_open: function() {
                                                if($('.gritter-item-wrapper').length === 1) {
                                                    return false;
                                                }
                                            }
                                        });                                
                                    }
                                });
                            }
                            else{
                                content = false;
                            }
                        });
                    }
                    else{
                        content = false;
                    }

                    if(content){
                        $('#step5_content').removeClass('hidden');
                        $('#step5_message').addClass('hidden');
                        //show content
                    }
                    else{
                        $('#step5_content').addClass('hidden');
                        $('#step5_message').removeClass('hidden');
                        //hide content
                    }
               });
            }
            else{
                $("#electionStatus").removeClass('hidden');
                $("#electionwizard").addClass('hidden');
            }

        }
    });
};

var updateEvents = function(data){
    $.ajax({
        url: "../admin/assets/harmony/Process.php?update_events",
        type:"POST",
        data:{data:data},
        cache:false,
        success:function(e){
            // console.log(e);
            if(e == 1){
                $.gritter.add({
                    title: 'Success',
                    text: 'Event has been updated.',
                    sticky: false,
                    before_open: function() {
                        if($('.gritter-item-wrapper').length === 3) {
                            return false;
                        }
                    }
                });                                
            }
            else{
                $.gritter.add({
                    title: 'Fatal Error',
                    text: 'An error occured during the process.',
                    sticky: false,
                    before_open: function() {
                        if($('.gritter-item-wrapper').length === 3) {
                            return false;
                        }
                    }
                });                                
            }
        }
    })
}

var validateDate = function(date){
    var comp = date.split('-');
    var m = parseInt(comp[0], 10);
    var d = parseInt(comp[1], 10);
    var y = parseInt(comp[2], 10);
    var date = new Date(y,m-1,d);
    if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
        return 1; //valid
    } 
    else {
        return 0; //invalid
    }
}

var cancelElection = function(){
     //custom feature. may add in the future
}

var handleCalendar = function () {
    "use strict";
    var buttonSetting = {left: 'today prev,next ', center: 'title', right: 'month,agendaWeek,agendaDay'};
    var date = new Date();
    var m = date.getMonth();
    var y = date.getFullYear();
    var json = Array();

    $.ajax({
        url: "../admin/assets/harmony/Process.php?get_events",
        type: "POST",
        success: function(data){
            var data = JSON.parse(data);
            var x = 0;
            $.each(data[0],function(i,v){
                console.log(v[0].start);
                if(validateDate(v[0].start) == 1){
                    $("#calendar_events").find("[data-title='" +v[0].title+ "']").addClass('hidden');
                }
                json[x] = v[0];
                x++;
            });
            json = JSON.stringify(json)
            json = JSON.parse(json);

            if(Number(data[1])==1){
                $("#calendar_events").addClass('hidden');
                $("#calendar_message").html('*Election is currently in process');
            }
            else{
                console.log('x');
            }

            $('#calendar').fullCalendar({
                header: buttonSetting,
                selectable: false,
                selectHelper: true,
                droppable: true,
                drop: function(date, allDay) { // this function is called when something is dropped
                
                    // retrieve the dropped element's stored Event Object
                    var originalEventObject = $(this).data('eventObject');
                     
                    // we need to copy it, so that multiple events don't have a reference to the same object
                    var copiedEventObject = $.extend({}, originalEventObject);
                    
                    // assign it the date that was reported
                    copiedEventObject.start = date;
                    copiedEventObject.allDay = allDay;

                    data = Array(originalEventObject.title,date,originalEventObject.end);
                    updateEvents(data);

                    // render the event on the calendar
                    // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                    $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
                    
                    // is the "remove after drop" checkbox checked?
                    $(this).remove();
                },
                select: function(start, end, allDay) {
                    var title = prompt('Event Title:');
                    if (title) {
                        calendar.fullCalendar('renderEvent',
                            {
                                title: title,
                                start: start,
                                end: end,
                                allDay: allDay
                            },
                            true // make the event "stick"
                        );
                    }
                    calendar.fullCalendar('unselect');
                },
                eventRender: function(event, element, calEvent) {
                        var mediaObject = (event.media) ? event.media : '';
                        var description = (event.description) ? event.description : '';
                        element.find(".fc-event-title").after($("<span class=\"fc-event-icons\"></span>").html(mediaObject));
                        element.find(".fc-event-title").append('<small>'+ description +'</small>');
                },
                editable: true,
                eventOrder:"-title,-start",
                events: json,
                eventDrop: function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view ){
                    console.log(event);
                    data = Array(event.title,event.start,event.end);
                    updateEvents(data);
                },
                eventResize: function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view ){
                    console.log(event);
                    data = Array(event.title,event.start,event.end);
                    updateEvents(data);
                }
            });
        }
    });
    
    
    /* initialize the external events
    -----------------------------------------------------------------*/
    $('#external-events .external-event').each(function() {
        var eventObject = {
            title: $.trim($(this).attr('data-title')),
            className: $(this).attr('data-bg'),
            media: $(this).attr('data-media'),
            description: $(this).attr('data-desc')
        };
        
        $(this).data('eventObject', eventObject);
        
        $(this).draggable({
            zIndex: 999,
            revert: true,
            revertDuration: 0
        });
    });
};

/* Application Controller
------------------------------------------------ */
var App = function () {
	"use strict";
	
	return {
	    //main function
		init: function () {
		    this.initSidebar();
		    this.initTopMenu();
		    this.initPageLoad();
		    this.initComponent();
		    this.initLocalStorage();
		    this.initThemePanel();
		    this.initAjaxFunction();

            $.getScript('assets/js/jquery.countdown.js').done(function() {
                hadleTime();
            });
            election_watch();

            $.getScript('assets/plugins/bootstrap-wizard/js/bwizard.js').done(function() {
                handleBootstrapWizards();
            });
		},
		initSidebar: function() {
			handleSidebarMenu();
			handleMobileSidebarToggle();
			handleSidebarMinify();
            handleMobileSidebar();
            handleSystemInformation();
		},
		initSidebarSelection: function() {
		    handleClearSidebarSelection();
		},
		initSidebarMobileSelection: function() {
		    handleClearSidebarMobileSelection();
		},
		initTopMenu: function() {
			handleUnlimitedTopMenuRender();
			handleTopMenuSubMenu();
			handleMobileTopMenuSubMenu();
			handleTopMenuMobileToggle();
		},
		initPageLoad: function() {
			handlePageContentView();
		},
		initComponent: function() {
			handleIEFullHeightContent();
			handleSlimScroll();
			handleUnlimitedTabsRender();
			handlePanelAction();
			handelTooltipPopoverActivation();
			handleScrollToTopButton();
			handleAfterPageLoadAddClass();
			handleDraggablePanel();
		},
		initLocalStorage: function() {
		    handleLocalStorage();
		},
		initThemePanel: function() {
			handleThemePageStructureControl();
			handleThemePanelExpand();
		    handleResetLocalStorage();
		},
		initAjaxFunction: function() {
             handleCheckPageLoadUrl(window.location.hash);
			handleHashChange();
            custom_ini();            

			// ajax cache setup
			$.ajaxSetup({
                cache: true
            });
		},
		setPageTitle: function(pageTitle) {
		    document.title = pageTitle;
		},
		restartGlobalFunction: function() {
		    this.initComponent();
		    this.initTopMenu();
		    this.initLocalStorage();
		},
		scrollTop: function() {
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 0);
		}
    };
}();