/*
Template Name: STUDIO - Responsive Bootstrap 5 Admin Template
Version: 2.2.1
Author: Sean Ngu
Website: http://www.seantheme.com/studio/
	----------------------------
		APPS CONTENT TABLE
	----------------------------

	<!-- ======== GLOBAL SCRIPT SETTING ======== -->
	01. Global Variable
	02. Handle Scrollbar
	03. Handle Header Search Bar
	04. Handle Sidebar Menu
	05. Handle Sidebar Minify
	06. Handle Sidebar Minify Float Menu
	07. Handle Dropdown Close Option
	08. Handle Panel - Remove / Reload / Collapse / Expand
	09. Handle Tooltip & Popover Activation
	10. Handle Scroll to Top Button Activation
	11. Handle hexToRgba
	12. Handle Scroll to
	
	<!-- ======== APPLICATION SETTING ======== -->
	Application Controller
*/



/* 01. Global Variable
------------------------------------------------ */
var FONT_FAMILY    = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"';
var COLOR_BLUE     = '#1f6bff';
var COLOR_GREEN    = '#1abd36';
var COLOR_ORANGE   = '#ff9500';
var COLOR_RED      = '#ff3b30';
var COLOR_AQUA     = '#30beff';
var COLOR_PURPLE   = '#5b2e91';
var COLOR_YELLOW   = '#ffcc00';
var COLOR_INDIGO   = '#640df3';
var COLOR_PINK     = '#ff2d55';
var COLOR_TEAL     = '#0cd096';
var COLOR_BLACK    = '#000000';
var COLOR_WHITE    = '#FFFFFF';
var COLOR_GRAY_100 = '#ebeef4';
var COLOR_GRAY_200 = '#dae0ec';
var COLOR_GRAY_300 = '#c9d2e3';
var COLOR_GRAY_400 = '#a8b6d1';
var COLOR_GRAY_500 = '#869ac0';
var COLOR_GRAY_600 = '#657eae';
var COLOR_GRAY_700 = '#4d6593';
var COLOR_GRAY_800 = '#3c4e71';
var COLOR_GRAY_900 = '#212837';


/* 02. Handle Scrollbar
------------------------------------------------ */
var handleSlimScroll = function() {
	"use strict";
	$.when($('[data-scrollbar=true]').each( function() {
		generateSlimScroll($(this));
	})).done(function() {
		$('[data-scrollbar="true"]').mouseover();
	});
};
var generateSlimScroll = function(element) {
	var isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
	
	if ($(element).attr('data-init') || (isMobile && $(element).attr('data-skip-mobile'))) {
		return;
	}
	var dataHeight = $(element).attr('data-height');
		dataHeight = (!dataHeight) ? $(element).height() : dataHeight;

	var scrollBarOption = {
		height: dataHeight, 
		alwaysVisible: false
	};
	if(isMobile) {
		$(element).css('height', dataHeight);
		$(element).css('overflow-x','scroll');
	} else {
		$(element).slimScroll(scrollBarOption);
		$(element).closest('.slimScrollDiv').find('.slimScrollBar').hide();
	}
	$(element).attr('data-init', true);
};


/* 04. Handle Sidebar Menu
------------------------------------------------ */
var handleSidebarMenu = function() {
	"use strict";
	$(document).on('click', '.app-sidebar .menu > .menu-item.has-sub > .menu-link', function(e) {
		e.preventDefault();
		
		var target = $(this).next('.menu-submenu');
		var otherMenu = $('.app-sidebar .menu > .menu-item.has-sub > .menu-submenu').not(target);

		if ($('.app-sidebar-minified').length === 0) {
			$(otherMenu).slideUp(250);
			$(otherMenu).closest('.menu-item').removeClass('expand');
			
			$(target).slideToggle(250);
			var targetElm = $(target).closest('.menu-item');
			if ($(targetElm).hasClass('expand')) {
				$(targetElm).removeClass('expand');
			} else {
				$(targetElm).addClass('expand');
			}
		}
	});
	$(document).on('click', '.app-sidebar .menu > .menu-item.has-sub .menu-submenu .menu-item.has-sub > .menu-link', function(e) {
		e.preventDefault();
		
		if ($('.app-sidebar-minified').length === 0) {
			var target = $(this).next('.menu-submenu');
			$(target).slideToggle(250);
		}
	});
};


/* 05. Handle Sidebar Minify
------------------------------------------------ */
var MOBILE_SIDEBAR_TOGGLE_CLASS = 'app-sidebar-mobile-toggled';
var MOBILE_SIDEBAR_CLOSED_CLASS = 'app-sidebar-mobile-closed';
var handleSidebarMinify = function() {
	$('[data-toggle="sidebar-minify"]').on('click', function(e) {
		e.preventDefault();
		
		var targetElm = '#app';
		var targetClass = 'app-sidebar-minified';
		
		if ($(targetElm).hasClass(targetClass)) {
			$(targetElm).removeClass(targetClass);
			localStorage.removeItem('appSidebarMinified');
		} else {
			$(targetElm).addClass(targetClass);
			localStorage.setItem('appSidebarMinified', true);
		}
	});
	
	if (typeof(Storage) !== 'undefined') {
		if (localStorage.appSidebarMinified) {
			$('#app').addClass('app-sidebar-minified');
		}
	}
};
var handleSidebarMobileToggle = function() {
	$(document).on('click', '[data-toggle="sidebar-mobile"]', function(e) {
		e.preventDefault();
		
		var targetElm = '#app';
		
		$(targetElm).removeClass(MOBILE_SIDEBAR_CLOSED_CLASS).addClass(MOBILE_SIDEBAR_TOGGLE_CLASS);
	});
};
var handleSidebarMobileDismiss = function() {
	$(document).on('click', '[data-dismiss="sidebar-mobile"]', function(e) {
		e.preventDefault();
		
		var targetElm = '#app';
		
		$(targetElm).removeClass(MOBILE_SIDEBAR_TOGGLE_CLASS).addClass(MOBILE_SIDEBAR_CLOSED_CLASS);
		setTimeout(function() {
			$(targetElm).removeClass(MOBILE_SIDEBAR_CLOSED_CLASS);
		}, 250);
	});
};


/* 06. Handle Sidebar Minify Float Menu
------------------------------------------------ */
var floatSubMenuTimeout;
var targetFloatMenu;
var handleMouseoverFloatSubMenu = function(elm) {
	clearTimeout(floatSubMenuTimeout);
};
var handleMouseoutFloatSubMenu = function(elm) {
	floatSubMenuTimeout = setTimeout(function() {
		$('.app-float-submenu').remove();
		targetFloatMenu = undefined;
	}, 250);
};
var handleSidebarMinifyFloatMenu = function() {
	$(document).on('click', '.app-float-submenu .menu-item.has-sub > .menu-link', function(e) {
		e.preventDefault();
		
		var target = $(this).next('.menu-submenu');
		$(target).slideToggle(250, function() {
			var targetMenu = $('.app-float-submenu');
			var targetHeight = $(targetMenu).height() + 20;
			var targetOffset = $(targetMenu).offset();
			var targetTop = $(targetMenu).attr('data-offset-top');
			var windowHeight = $(window).height();
			if ((windowHeight - targetTop) > targetHeight) {
				$('.app-float-submenu').css({
					'top': targetTop,
					'bottom': 'auto',
					'overflow': 'initial'
				});
			} else {
				$('.app-float-submenu').css({
					'bottom': 0,
					'overflow': 'scroll'
				});
			}
		});
	});
	$(document).on('mouseover', '.app-sidebar-minified .app-sidebar .menu .menu-item.has-sub > .menu-link', function() {
		clearTimeout(floatSubMenuTimeout);
		var targetMenu = $(this).closest('.menu-item').find('.menu-submenu').first();
		if (targetFloatMenu === this) {
			return false;
		} else {
			targetFloatMenu = this;
		}
		var targetMenuHtml = $(targetMenu).html();
		
		if (targetMenuHtml) {
			var targetHeight = $(targetMenu).height() + 20;
			var targetOffset = $(this).offset();
			var targetTop = targetOffset.top - $(window).scrollTop();
			var targetLeft = ($('body').css('direction') != 'rtl') ? $('#sidebar').width() + $('#sidebar').offset().left : 'auto';
			var targetRight = ($('body').css('direction') != 'rtl') ? 'auto' : $('#sidebar').width();
			var windowHeight = $(window).height();
			var submenuHeight = 0;
			if ($('.app-float-submenu').length == 0) {
				targetMenuHtml = '<div class="app-float-submenu" data-offset-top="'+ targetTop +'" onmouseover="handleMouseoverFloatSubMenu(this)" onmouseout="handleMouseoutFloatSubMenu(this)">' + targetMenuHtml + '</div>';
				$('body').append(targetMenuHtml);
			} else {
				$('.app-float-submenu').html(targetMenuHtml);
			}
			submenuHeight = $('.app-float-submenu').height();
			if ((windowHeight - targetTop) > targetHeight && ((targetTop + submenuHeight) < windowHeight)) {
				$('.app-float-submenu').css({
					'top': targetTop,
					'left': targetLeft,
					'bottom': 'auto',
					'right': targetRight
				});
			} else {
				$('.app-float-submenu').css({
					'bottom': 0,
					'top': 'auto',
					'left': targetLeft,
					'right': targetRight
				});
			}
		} else {
			$('.app-float-submenu').remove();
			targetFloatMenu = undefined;
		}
	});
	$(document).on('mouseout', '.app-sidebar-minified .app-sidebar .menu > .menu-item.has-sub > .menu-link', function() {
		floatSubMenuTimeout = setTimeout(function() {
			$('.app-float-submenu').remove();
			targetFloatMenu = undefined;
		}, 250);
	});
}


/* 07. Handle Dropdown Close Option
------------------------------------------------ */
var handleDropdownClose = function() {
	$(document).on('click', '[data-dropdown-close="false"]', function(e) {
		e.stopPropagation();
	});
};


/* 08. Handle Card - Remove / Reload / Collapse / Expand
------------------------------------------------ */
var cardActionRunning = false;
var handleCardAction = function() {
	"use strict";

	if (cardActionRunning) {
		return false;
	}
	cardActionRunning = true;

	// expand
	$(document).on('mouseover', '[data-toggle=card-expand]', function(e) {
		if (!$(this).attr('data-init')) {
			$(this).tooltip({
				title: 'Expand / Compress',
				placement: 'bottom',
				trigger: 'hover',
				container: 'body'
			});
			$(this).tooltip('show');
			$(this).attr('data-init', true);
		}
	});
	$(document).on('click', '[data-toggle=card-expand]', function(e) {
		e.preventDefault();
		var target = $(this).closest('.card');
		var targetBody = $(target).find('.card-body');
		var targetClass = 'card-expand';
		var targetTop = 40;
		if ($(targetBody).length !== 0) {
			var targetOffsetTop = $(target).offset().top;
			var targetBodyOffsetTop = $(targetBody).offset().top;
			targetTop = targetBodyOffsetTop - targetOffsetTop;
		}

		if ($('body').hasClass(targetClass) && $(target).hasClass(targetClass)) {
			$('body, .card').removeClass(targetClass);
			$('.card').removeAttr('style');
			$(targetBody).removeAttr('style');
		} else {
			$('body').addClass(targetClass);
			$(this).closest('.card').addClass(targetClass);
		}
		$(window).trigger('resize');
	});
};


/* 09. Handle Tooltip & Popover Activation
------------------------------------------------ */
var handelTooltipPopoverActivation = function() {
	"use strict";
	if ($('[data-toggle="tooltip"]').length !== 0) {
		$('[data-toggle=tooltip]').tooltip();
	}
	if ($('[data-toggle="popover"]').length !== 0) {
		$('[data-toggle=popover]').popover();
	}
};


/* 10. Handle Scroll to Top Button Activation
------------------------------------------------ */
var handleScrollToTopButton = function() {
	"use strict";
	$(document).on('scroll', function() {
		var totalScroll = $(document).scrollTop();

		if (totalScroll >= 200) {
			$('[data-click=scroll-top]').addClass('show');
		} else {
			$('[data-click=scroll-top]').removeClass('show');
		}
	});
	$('[data-click=scroll-top]').on('click', function(e) {
		e.preventDefault();
		$('html, body, .content').animate({
			scrollTop: $("body").offset().top
		}, 500);
	});
};


/* 11. Handle hexToRgba
------------------------------------------------ */
var hexToRgba = function(hex, transparent = 1) {
	var c;
	if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
			c= hex.substring(1).split('');
			if(c.length== 3){
					c= [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c= '0x'+c.join('');
			return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+ transparent +')';
	}
  throw new Error('Bad Hex');
};


/* 12. Handle Scroll to
------------------------------------------------ */
var handleScrollTo = function() {
	$(document).on('click', '[data-toggle="scroll-to"]', function(e) {
		e.preventDefault();
		
		var targetElm = ($(this).attr('data-target')) ? $(this).attr('data-target') : $(this).attr('href');
		if (targetElm) {
			$('html, body').animate({
				scrollTop: $(targetElm).offset().top - $('#header').height() - 24
			}, 0);
		}
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
			this.initHeader();
			this.initComponent();
		},
		initSidebar: function() {
			handleSidebarMinifyFloatMenu();
			handleSidebarMenu();
			handleSidebarMinify();
			handleSidebarMobileToggle();
			handleSidebarMobileDismiss();
		},
		initHeader: function() {
		},
		initComponent: function() {
			handleSlimScroll();
			handleCardAction();
			handelTooltipPopoverActivation();
			handleScrollToTopButton();
			handleDropdownClose();
			handleScrollTo();
		},
		scrollTop: function() {
			$('html, body, .content').animate({
				scrollTop: $('body').offset().top
			}, 0);
		}
	};
}();

$(document).ready(function() {
	App.init();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAubWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcblRlbXBsYXRlIE5hbWU6IFNUVURJTyAtIFJlc3BvbnNpdmUgQm9vdHN0cmFwIDUgQWRtaW4gVGVtcGxhdGVcblZlcnNpb246IDIuMi4xXG5BdXRob3I6IFNlYW4gTmd1XG5XZWJzaXRlOiBodHRwOi8vd3d3LnNlYW50aGVtZS5jb20vc3R1ZGlvL1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0QVBQUyBDT05URU5UIFRBQkxFXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQ8IS0tID09PT09PT09IEdMT0JBTCBTQ1JJUFQgU0VUVElORyA9PT09PT09PSAtLT5cblx0MDEuIEdsb2JhbCBWYXJpYWJsZVxuXHQwMi4gSGFuZGxlIFNjcm9sbGJhclxuXHQwMy4gSGFuZGxlIEhlYWRlciBTZWFyY2ggQmFyXG5cdDA0LiBIYW5kbGUgU2lkZWJhciBNZW51XG5cdDA1LiBIYW5kbGUgU2lkZWJhciBNaW5pZnlcblx0MDYuIEhhbmRsZSBTaWRlYmFyIE1pbmlmeSBGbG9hdCBNZW51XG5cdDA3LiBIYW5kbGUgRHJvcGRvd24gQ2xvc2UgT3B0aW9uXG5cdDA4LiBIYW5kbGUgUGFuZWwgLSBSZW1vdmUgLyBSZWxvYWQgLyBDb2xsYXBzZSAvIEV4cGFuZFxuXHQwOS4gSGFuZGxlIFRvb2x0aXAgJiBQb3BvdmVyIEFjdGl2YXRpb25cblx0MTAuIEhhbmRsZSBTY3JvbGwgdG8gVG9wIEJ1dHRvbiBBY3RpdmF0aW9uXG5cdDExLiBIYW5kbGUgaGV4VG9SZ2JhXG5cdDEyLiBIYW5kbGUgU2Nyb2xsIHRvXG5cdFxuXHQ8IS0tID09PT09PT09IEFQUExJQ0FUSU9OIFNFVFRJTkcgPT09PT09PT0gLS0+XG5cdEFwcGxpY2F0aW9uIENvbnRyb2xsZXJcbiovXG5cblxuXG4vKiAwMS4gR2xvYmFsIFZhcmlhYmxlXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbnZhciBGT05UX0ZBTUlMWSAgICA9ICctYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxcIlNlZ29lIFVJXCIsUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixBcmlhbCxcIk5vdG8gU2Fuc1wiLHNhbnMtc2VyaWYsXCJBcHBsZSBDb2xvciBFbW9qaVwiLFwiU2Vnb2UgVUkgRW1vamlcIixcIlNlZ29lIFVJIFN5bWJvbFwiLFwiTm90byBDb2xvciBFbW9qaVwiJztcbnZhciBDT0xPUl9CTFVFICAgICA9ICcjMWY2YmZmJztcbnZhciBDT0xPUl9HUkVFTiAgICA9ICcjMWFiZDM2JztcbnZhciBDT0xPUl9PUkFOR0UgICA9ICcjZmY5NTAwJztcbnZhciBDT0xPUl9SRUQgICAgICA9ICcjZmYzYjMwJztcbnZhciBDT0xPUl9BUVVBICAgICA9ICcjMzBiZWZmJztcbnZhciBDT0xPUl9QVVJQTEUgICA9ICcjNWIyZTkxJztcbnZhciBDT0xPUl9ZRUxMT1cgICA9ICcjZmZjYzAwJztcbnZhciBDT0xPUl9JTkRJR08gICA9ICcjNjQwZGYzJztcbnZhciBDT0xPUl9QSU5LICAgICA9ICcjZmYyZDU1JztcbnZhciBDT0xPUl9URUFMICAgICA9ICcjMGNkMDk2JztcbnZhciBDT0xPUl9CTEFDSyAgICA9ICcjMDAwMDAwJztcbnZhciBDT0xPUl9XSElURSAgICA9ICcjRkZGRkZGJztcbnZhciBDT0xPUl9HUkFZXzEwMCA9ICcjZWJlZWY0JztcbnZhciBDT0xPUl9HUkFZXzIwMCA9ICcjZGFlMGVjJztcbnZhciBDT0xPUl9HUkFZXzMwMCA9ICcjYzlkMmUzJztcbnZhciBDT0xPUl9HUkFZXzQwMCA9ICcjYThiNmQxJztcbnZhciBDT0xPUl9HUkFZXzUwMCA9ICcjODY5YWMwJztcbnZhciBDT0xPUl9HUkFZXzYwMCA9ICcjNjU3ZWFlJztcbnZhciBDT0xPUl9HUkFZXzcwMCA9ICcjNGQ2NTkzJztcbnZhciBDT0xPUl9HUkFZXzgwMCA9ICcjM2M0ZTcxJztcbnZhciBDT0xPUl9HUkFZXzkwMCA9ICcjMjEyODM3JztcblxuXG4vKiAwMi4gSGFuZGxlIFNjcm9sbGJhclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG52YXIgaGFuZGxlU2xpbVNjcm9sbCA9IGZ1bmN0aW9uKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0JC53aGVuKCQoJ1tkYXRhLXNjcm9sbGJhcj10cnVlXScpLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdGdlbmVyYXRlU2xpbVNjcm9sbCgkKHRoaXMpKTtcblx0fSkpLmRvbmUoZnVuY3Rpb24oKSB7XG5cdFx0JCgnW2RhdGEtc2Nyb2xsYmFyPVwidHJ1ZVwiXScpLm1vdXNlb3ZlcigpO1xuXHR9KTtcbn07XG52YXIgZ2VuZXJhdGVTbGltU2Nyb2xsID0gZnVuY3Rpb24oZWxlbWVudCkge1xuXHR2YXIgaXNNb2JpbGUgPSAoL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKTtcblx0XG5cdGlmICgkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtaW5pdCcpIHx8IChpc01vYmlsZSAmJiAkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtc2tpcC1tb2JpbGUnKSkpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIGRhdGFIZWlnaHQgPSAkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtaGVpZ2h0Jyk7XG5cdFx0ZGF0YUhlaWdodCA9ICghZGF0YUhlaWdodCkgPyAkKGVsZW1lbnQpLmhlaWdodCgpIDogZGF0YUhlaWdodDtcblxuXHR2YXIgc2Nyb2xsQmFyT3B0aW9uID0ge1xuXHRcdGhlaWdodDogZGF0YUhlaWdodCwgXG5cdFx0YWx3YXlzVmlzaWJsZTogZmFsc2Vcblx0fTtcblx0aWYoaXNNb2JpbGUpIHtcblx0XHQkKGVsZW1lbnQpLmNzcygnaGVpZ2h0JywgZGF0YUhlaWdodCk7XG5cdFx0JChlbGVtZW50KS5jc3MoJ292ZXJmbG93LXgnLCdzY3JvbGwnKTtcblx0fSBlbHNlIHtcblx0XHQkKGVsZW1lbnQpLnNsaW1TY3JvbGwoc2Nyb2xsQmFyT3B0aW9uKTtcblx0XHQkKGVsZW1lbnQpLmNsb3Nlc3QoJy5zbGltU2Nyb2xsRGl2JykuZmluZCgnLnNsaW1TY3JvbGxCYXInKS5oaWRlKCk7XG5cdH1cblx0JChlbGVtZW50KS5hdHRyKCdkYXRhLWluaXQnLCB0cnVlKTtcbn07XG5cblxuLyogMDQuIEhhbmRsZSBTaWRlYmFyIE1lbnVcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xudmFyIGhhbmRsZVNpZGViYXJNZW51ID0gZnVuY3Rpb24oKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmFwcC1zaWRlYmFyIC5tZW51ID4gLm1lbnUtaXRlbS5oYXMtc3ViID4gLm1lbnUtbGluaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XG5cdFx0dmFyIHRhcmdldCA9ICQodGhpcykubmV4dCgnLm1lbnUtc3VibWVudScpO1xuXHRcdHZhciBvdGhlck1lbnUgPSAkKCcuYXBwLXNpZGViYXIgLm1lbnUgPiAubWVudS1pdGVtLmhhcy1zdWIgPiAubWVudS1zdWJtZW51Jykubm90KHRhcmdldCk7XG5cblx0XHRpZiAoJCgnLmFwcC1zaWRlYmFyLW1pbmlmaWVkJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHQkKG90aGVyTWVudSkuc2xpZGVVcCgyNTApO1xuXHRcdFx0JChvdGhlck1lbnUpLmNsb3Nlc3QoJy5tZW51LWl0ZW0nKS5yZW1vdmVDbGFzcygnZXhwYW5kJyk7XG5cdFx0XHRcblx0XHRcdCQodGFyZ2V0KS5zbGlkZVRvZ2dsZSgyNTApO1xuXHRcdFx0dmFyIHRhcmdldEVsbSA9ICQodGFyZ2V0KS5jbG9zZXN0KCcubWVudS1pdGVtJyk7XG5cdFx0XHRpZiAoJCh0YXJnZXRFbG0pLmhhc0NsYXNzKCdleHBhbmQnKSkge1xuXHRcdFx0XHQkKHRhcmdldEVsbSkucmVtb3ZlQ2xhc3MoJ2V4cGFuZCcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCh0YXJnZXRFbG0pLmFkZENsYXNzKCdleHBhbmQnKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmFwcC1zaWRlYmFyIC5tZW51ID4gLm1lbnUtaXRlbS5oYXMtc3ViIC5tZW51LXN1Ym1lbnUgLm1lbnUtaXRlbS5oYXMtc3ViID4gLm1lbnUtbGluaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XG5cdFx0aWYgKCQoJy5hcHAtc2lkZWJhci1taW5pZmllZCcpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0dmFyIHRhcmdldCA9ICQodGhpcykubmV4dCgnLm1lbnUtc3VibWVudScpO1xuXHRcdFx0JCh0YXJnZXQpLnNsaWRlVG9nZ2xlKDI1MCk7XG5cdFx0fVxuXHR9KTtcbn07XG5cblxuLyogMDUuIEhhbmRsZSBTaWRlYmFyIE1pbmlmeVxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG52YXIgTU9CSUxFX1NJREVCQVJfVE9HR0xFX0NMQVNTID0gJ2FwcC1zaWRlYmFyLW1vYmlsZS10b2dnbGVkJztcbnZhciBNT0JJTEVfU0lERUJBUl9DTE9TRURfQ0xBU1MgPSAnYXBwLXNpZGViYXItbW9iaWxlLWNsb3NlZCc7XG52YXIgaGFuZGxlU2lkZWJhck1pbmlmeSA9IGZ1bmN0aW9uKCkge1xuXHQkKCdbZGF0YS10b2dnbGU9XCJzaWRlYmFyLW1pbmlmeVwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XG5cdFx0dmFyIHRhcmdldEVsbSA9ICcjYXBwJztcblx0XHR2YXIgdGFyZ2V0Q2xhc3MgPSAnYXBwLXNpZGViYXItbWluaWZpZWQnO1xuXHRcdFxuXHRcdGlmICgkKHRhcmdldEVsbSkuaGFzQ2xhc3ModGFyZ2V0Q2xhc3MpKSB7XG5cdFx0XHQkKHRhcmdldEVsbSkucmVtb3ZlQ2xhc3ModGFyZ2V0Q2xhc3MpO1xuXHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FwcFNpZGViYXJNaW5pZmllZCcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkKHRhcmdldEVsbSkuYWRkQ2xhc3ModGFyZ2V0Q2xhc3MpO1xuXHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwcFNpZGViYXJNaW5pZmllZCcsIHRydWUpO1xuXHRcdH1cblx0fSk7XG5cdFxuXHRpZiAodHlwZW9mKFN0b3JhZ2UpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdGlmIChsb2NhbFN0b3JhZ2UuYXBwU2lkZWJhck1pbmlmaWVkKSB7XG5cdFx0XHQkKCcjYXBwJykuYWRkQ2xhc3MoJ2FwcC1zaWRlYmFyLW1pbmlmaWVkJyk7XG5cdFx0fVxuXHR9XG59O1xudmFyIGhhbmRsZVNpZGViYXJNb2JpbGVUb2dnbGUgPSBmdW5jdGlvbigpIHtcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgJ1tkYXRhLXRvZ2dsZT1cInNpZGViYXItbW9iaWxlXCJdJywgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcblx0XHR2YXIgdGFyZ2V0RWxtID0gJyNhcHAnO1xuXHRcdFxuXHRcdCQodGFyZ2V0RWxtKS5yZW1vdmVDbGFzcyhNT0JJTEVfU0lERUJBUl9DTE9TRURfQ0xBU1MpLmFkZENsYXNzKE1PQklMRV9TSURFQkFSX1RPR0dMRV9DTEFTUyk7XG5cdH0pO1xufTtcbnZhciBoYW5kbGVTaWRlYmFyTW9iaWxlRGlzbWlzcyA9IGZ1bmN0aW9uKCkge1xuXHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtZGlzbWlzcz1cInNpZGViYXItbW9iaWxlXCJdJywgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcblx0XHR2YXIgdGFyZ2V0RWxtID0gJyNhcHAnO1xuXHRcdFxuXHRcdCQodGFyZ2V0RWxtKS5yZW1vdmVDbGFzcyhNT0JJTEVfU0lERUJBUl9UT0dHTEVfQ0xBU1MpLmFkZENsYXNzKE1PQklMRV9TSURFQkFSX0NMT1NFRF9DTEFTUyk7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdCQodGFyZ2V0RWxtKS5yZW1vdmVDbGFzcyhNT0JJTEVfU0lERUJBUl9DTE9TRURfQ0xBU1MpO1xuXHRcdH0sIDI1MCk7XG5cdH0pO1xufTtcblxuXG4vKiAwNi4gSGFuZGxlIFNpZGViYXIgTWluaWZ5IEZsb2F0IE1lbnVcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xudmFyIGZsb2F0U3ViTWVudVRpbWVvdXQ7XG52YXIgdGFyZ2V0RmxvYXRNZW51O1xudmFyIGhhbmRsZU1vdXNlb3ZlckZsb2F0U3ViTWVudSA9IGZ1bmN0aW9uKGVsbSkge1xuXHRjbGVhclRpbWVvdXQoZmxvYXRTdWJNZW51VGltZW91dCk7XG59O1xudmFyIGhhbmRsZU1vdXNlb3V0RmxvYXRTdWJNZW51ID0gZnVuY3Rpb24oZWxtKSB7XG5cdGZsb2F0U3ViTWVudVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdCQoJy5hcHAtZmxvYXQtc3VibWVudScpLnJlbW92ZSgpO1xuXHR9LCAyNTApO1xufTtcbnZhciBoYW5kbGVTaWRlYmFyTWluaWZ5RmxvYXRNZW51ID0gZnVuY3Rpb24oKSB7XG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYXBwLWZsb2F0LXN1Ym1lbnUgLm1lbnUtaXRlbS5oYXMtc3ViID4gLm1lbnUtbGluaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XG5cdFx0dmFyIHRhcmdldCA9ICQodGhpcykubmV4dCgnLm1lbnUtc3VibWVudScpO1xuXHRcdCQodGFyZ2V0KS5zbGlkZVRvZ2dsZSgyNTAsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHRhcmdldE1lbnUgPSAkKCcuYXBwLWZsb2F0LXN1Ym1lbnUnKTtcblx0XHRcdHZhciB0YXJnZXRIZWlnaHQgPSAkKHRhcmdldE1lbnUpLmhlaWdodCgpICsgMjA7XG5cdFx0XHR2YXIgdGFyZ2V0T2Zmc2V0ID0gJCh0YXJnZXRNZW51KS5vZmZzZXQoKTtcblx0XHRcdHZhciB0YXJnZXRUb3AgPSAkKHRhcmdldE1lbnUpLmF0dHIoJ2RhdGEtb2Zmc2V0LXRvcCcpO1xuXHRcdFx0dmFyIHdpbmRvd0hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcblx0XHRcdGlmICgod2luZG93SGVpZ2h0IC0gdGFyZ2V0VG9wKSA+IHRhcmdldEhlaWdodCkge1xuXHRcdFx0XHQkKCcuYXBwLWZsb2F0LXN1Ym1lbnUnKS5jc3Moe1xuXHRcdFx0XHRcdCd0b3AnOiB0YXJnZXRUb3AsXG5cdFx0XHRcdFx0J2JvdHRvbSc6ICdhdXRvJyxcblx0XHRcdFx0XHQnb3ZlcmZsb3cnOiAnaW5pdGlhbCdcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkKCcuYXBwLWZsb2F0LXN1Ym1lbnUnKS5jc3Moe1xuXHRcdFx0XHRcdCdib3R0b20nOiAwLFxuXHRcdFx0XHRcdCdvdmVyZmxvdyc6ICdzY3JvbGwnXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblx0JChkb2N1bWVudCkub24oJ21vdXNlb3ZlcicsICcuYXBwLXNpZGViYXItbWluaWZpZWQgLmFwcC1zaWRlYmFyIC5tZW51IC5tZW51LWl0ZW0uaGFzLXN1YiA+IC5tZW51LWxpbmsnLCBmdW5jdGlvbigpIHtcblx0XHRjbGVhclRpbWVvdXQoZmxvYXRTdWJNZW51VGltZW91dCk7XG5cdFx0XG5cdFx0dmFyIHRhcmdldE1lbnUgPSAkKHRoaXMpLmNsb3Nlc3QoJy5tZW51LWl0ZW0nKS5maW5kKCcubWVudS1zdWJtZW51JykuZmlyc3QoKTtcblx0XHRpZiAodGFyZ2V0RmxvYXRNZW51ID09IHRoaXMpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0RmxvYXRNZW51ID0gdGhpcztcblx0XHR9XG5cdFx0dmFyIHRhcmdldE1lbnVIdG1sID0gJCh0YXJnZXRNZW51KS5odG1sKCk7XG5cdFx0XG5cdFx0aWYgKHRhcmdldE1lbnVIdG1sKSB7XG5cdFx0XHR2YXIgdGFyZ2V0SGVpZ2h0ID0gJCh0YXJnZXRNZW51KS5oZWlnaHQoKSArIDIwO1xuXHRcdFx0dmFyIHRhcmdldE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCk7XG5cdFx0XHR2YXIgdGFyZ2V0VG9wID0gdGFyZ2V0T2Zmc2V0LnRvcCAtICQod2luZG93KS5zY3JvbGxUb3AoKTtcblx0XHRcdHZhciB0YXJnZXRMZWZ0ID0gKCQoJ2JvZHknKS5jc3MoJ2RpcmVjdGlvbicpICE9ICdydGwnKSA/ICQoJyNzaWRlYmFyJykud2lkdGgoKSArICQoJyNzaWRlYmFyJykub2Zmc2V0KCkubGVmdCA6ICdhdXRvJztcblx0XHRcdHZhciB0YXJnZXRSaWdodCA9ICgkKCdib2R5JykuY3NzKCdkaXJlY3Rpb24nKSAhPSAncnRsJykgPyAnYXV0bycgOiAkKCcjc2lkZWJhcicpLndpZHRoKCk7XG5cdFx0XHR2YXIgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuXHRcdFx0dmFyIHN1Ym1lbnVIZWlnaHQgPSAwO1xuXHRcdFx0Y29uc29sZS5sb2codGFyZ2V0TGVmdCk7XG5cdFx0XHRpZiAoJCgnLmFwcC1mbG9hdC1zdWJtZW51JykubGVuZ3RoID09IDApIHtcblx0XHRcdFx0dGFyZ2V0TWVudUh0bWwgPSAnPGRpdiBjbGFzcz1cImFwcC1mbG9hdC1zdWJtZW51XCIgZGF0YS1vZmZzZXQtdG9wPVwiJysgdGFyZ2V0VG9wICsnXCIgb25tb3VzZW92ZXI9XCJoYW5kbGVNb3VzZW92ZXJGbG9hdFN1Yk1lbnUodGhpcylcIiBvbm1vdXNlb3V0PVwiaGFuZGxlTW91c2VvdXRGbG9hdFN1Yk1lbnUodGhpcylcIj4nICsgdGFyZ2V0TWVudUh0bWwgKyAnPC9kaXY+Jztcblx0XHRcdFx0JCgnYm9keScpLmFwcGVuZCh0YXJnZXRNZW51SHRtbCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkKCcuYXBwLWZsb2F0LXN1Ym1lbnUnKS5odG1sKHRhcmdldE1lbnVIdG1sKTtcblx0XHRcdH1cblx0XHRcdHN1Ym1lbnVIZWlnaHQgPSAkKCcuYXBwLWZsb2F0LXN1Ym1lbnUnKS5oZWlnaHQoKTtcblx0XHRcdGlmICgod2luZG93SGVpZ2h0IC0gdGFyZ2V0VG9wKSA+IHRhcmdldEhlaWdodCAmJiAoKHRhcmdldFRvcCArIHN1Ym1lbnVIZWlnaHQpIDwgd2luZG93SGVpZ2h0KSkge1xuXHRcdFx0XHQkKCcuYXBwLWZsb2F0LXN1Ym1lbnUnKS5jc3Moe1xuXHRcdFx0XHRcdCd0b3AnOiB0YXJnZXRUb3AsXG5cdFx0XHRcdFx0J2xlZnQnOiB0YXJnZXRMZWZ0LFxuXHRcdFx0XHRcdCdib3R0b20nOiAnYXV0bycsXG5cdFx0XHRcdFx0J3JpZ2h0JzogdGFyZ2V0UmlnaHRcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkKCcuYXBwLWZsb2F0LXN1Ym1lbnUnKS5jc3Moe1xuXHRcdFx0XHRcdCdib3R0b20nOiAwLFxuXHRcdFx0XHRcdCd0b3AnOiAnYXV0bycsXG5cdFx0XHRcdFx0J2xlZnQnOiB0YXJnZXRMZWZ0LFxuXHRcdFx0XHRcdCdyaWdodCc6IHRhcmdldFJpZ2h0XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQkKCcuYXBwLWZsb2F0LXN1Ym1lbnUnKS5yZW1vdmUoKTtcblx0XHRcdHRhcmdldEZsb2F0TWVudSA9ICcnO1xuXHRcdH1cblx0fSk7XG5cdCQoZG9jdW1lbnQpLm9uKCdtb3VzZW91dCcsICcuYXBwLXNpZGViYXItbWluaWZpZWQgLmFwcC1zaWRlYmFyIC5tZW51ID4gLm1lbnUtaXRlbS5oYXMtc3ViID4gLm1lbnUtbGluaycsIGZ1bmN0aW9uKCkge1xuXHRcdGZsb2F0U3ViTWVudVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0JCgnLmFwcC1mbG9hdC1zdWJtZW51JykucmVtb3ZlKCk7XG5cdFx0XHR0YXJnZXRGbG9hdE1lbnUgPSAnJztcblx0XHR9LCAyNTApO1xuXHR9KTtcbn1cblxuXG4vKiAwNy4gSGFuZGxlIERyb3Bkb3duIENsb3NlIE9wdGlvblxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG52YXIgaGFuZGxlRHJvcGRvd25DbG9zZSA9IGZ1bmN0aW9uKCkge1xuXHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtZHJvcGRvd24tY2xvc2U9XCJmYWxzZVwiXScsIGZ1bmN0aW9uKGUpIHtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9KTtcbn07XG5cblxuLyogMDguIEhhbmRsZSBDYXJkIC0gUmVtb3ZlIC8gUmVsb2FkIC8gQ29sbGFwc2UgLyBFeHBhbmRcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xudmFyIGNhcmRBY3Rpb25SdW5uaW5nID0gZmFsc2U7XG52YXIgaGFuZGxlQ2FyZEFjdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRpZiAoY2FyZEFjdGlvblJ1bm5pbmcpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0Y2FyZEFjdGlvblJ1bm5pbmcgPSB0cnVlO1xuXG5cdC8vIGV4cGFuZFxuXHQkKGRvY3VtZW50KS5vbignbW91c2VvdmVyJywgJ1tkYXRhLXRvZ2dsZT1jYXJkLWV4cGFuZF0nLCBmdW5jdGlvbihlKSB7XG5cdFx0aWYgKCEkKHRoaXMpLmF0dHIoJ2RhdGEtaW5pdCcpKSB7XG5cdFx0XHQkKHRoaXMpLnRvb2x0aXAoe1xuXHRcdFx0XHR0aXRsZTogJ0V4cGFuZCAvIENvbXByZXNzJyxcblx0XHRcdFx0cGxhY2VtZW50OiAnYm90dG9tJyxcblx0XHRcdFx0dHJpZ2dlcjogJ2hvdmVyJyxcblx0XHRcdFx0Y29udGFpbmVyOiAnYm9keSdcblx0XHRcdH0pO1xuXHRcdFx0JCh0aGlzKS50b29sdGlwKCdzaG93Jyk7XG5cdFx0XHQkKHRoaXMpLmF0dHIoJ2RhdGEtaW5pdCcsIHRydWUpO1xuXHRcdH1cblx0fSk7XG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS10b2dnbGU9Y2FyZC1leHBhbmRdJywgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgdGFyZ2V0ID0gJCh0aGlzKS5jbG9zZXN0KCcuY2FyZCcpO1xuXHRcdHZhciB0YXJnZXRCb2R5ID0gJCh0YXJnZXQpLmZpbmQoJy5jYXJkLWJvZHknKTtcblx0XHR2YXIgdGFyZ2V0Q2xhc3MgPSAnY2FyZC1leHBhbmQnO1xuXHRcdHZhciB0YXJnZXRUb3AgPSA0MDtcblx0XHRpZiAoJCh0YXJnZXRCb2R5KS5sZW5ndGggIT09IDApIHtcblx0XHRcdHZhciB0YXJnZXRPZmZzZXRUb3AgPSAkKHRhcmdldCkub2Zmc2V0KCkudG9wO1xuXHRcdFx0dmFyIHRhcmdldEJvZHlPZmZzZXRUb3AgPSAkKHRhcmdldEJvZHkpLm9mZnNldCgpLnRvcDtcblx0XHRcdHRhcmdldFRvcCA9IHRhcmdldEJvZHlPZmZzZXRUb3AgLSB0YXJnZXRPZmZzZXRUb3A7XG5cdFx0fVxuXG5cdFx0aWYgKCQoJ2JvZHknKS5oYXNDbGFzcyh0YXJnZXRDbGFzcykgJiYgJCh0YXJnZXQpLmhhc0NsYXNzKHRhcmdldENsYXNzKSkge1xuXHRcdFx0JCgnYm9keSwgLmNhcmQnKS5yZW1vdmVDbGFzcyh0YXJnZXRDbGFzcyk7XG5cdFx0XHQkKCcuY2FyZCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cdFx0XHQkKHRhcmdldEJvZHkpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcyh0YXJnZXRDbGFzcyk7XG5cdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5jYXJkJykuYWRkQ2xhc3ModGFyZ2V0Q2xhc3MpO1xuXHRcdH1cblx0XHQkKHdpbmRvdykudHJpZ2dlcigncmVzaXplJyk7XG5cdH0pO1xufTtcblxuXG4vKiAwOS4gSGFuZGxlIFRvb2x0aXAgJiBQb3BvdmVyIEFjdGl2YXRpb25cbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xudmFyIGhhbmRlbFRvb2x0aXBQb3BvdmVyQWN0aXZhdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0aWYgKCQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS5sZW5ndGggIT09IDApIHtcblx0XHQkKCdbZGF0YS10b2dnbGU9dG9vbHRpcF0nKS50b29sdGlwKCk7XG5cdH1cblx0aWYgKCQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5sZW5ndGggIT09IDApIHtcblx0XHQkKCdbZGF0YS10b2dnbGU9cG9wb3Zlcl0nKS5wb3BvdmVyKCk7XG5cdH1cbn07XG5cblxuLyogMTAuIEhhbmRsZSBTY3JvbGwgdG8gVG9wIEJ1dHRvbiBBY3RpdmF0aW9uXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbnZhciBoYW5kbGVTY3JvbGxUb1RvcEJ1dHRvbiA9IGZ1bmN0aW9uKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0JChkb2N1bWVudCkub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciB0b3RhbFNjcm9sbCA9ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xuXG5cdFx0aWYgKHRvdGFsU2Nyb2xsID49IDIwMCkge1xuXHRcdFx0JCgnW2RhdGEtY2xpY2s9c2Nyb2xsLXRvcF0nKS5hZGRDbGFzcygnc2hvdycpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkKCdbZGF0YS1jbGljaz1zY3JvbGwtdG9wXScpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG5cdFx0fVxuXHR9KTtcblx0JCgnW2RhdGEtY2xpY2s9c2Nyb2xsLXRvcF0nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdCQoJ2h0bWwsIGJvZHksIC5jb250ZW50JykuYW5pbWF0ZSh7XG5cdFx0XHRzY3JvbGxUb3A6ICQoXCJib2R5XCIpLm9mZnNldCgpLnRvcFxuXHRcdH0sIDUwMCk7XG5cdH0pO1xufTtcblxuXG4vKiAxMS4gSGFuZGxlIGhleFRvUmdiYVxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG52YXIgaGV4VG9SZ2JhID0gZnVuY3Rpb24oaGV4LCB0cmFuc3BhcmVudCA9IDEpIHtcblx0dmFyIGM7XG5cdGlmKC9eIyhbQS1GYS1mMC05XXszfSl7MSwyfSQvLnRlc3QoaGV4KSl7XG5cdFx0XHRjPSBoZXguc3Vic3RyaW5nKDEpLnNwbGl0KCcnKTtcblx0XHRcdGlmKGMubGVuZ3RoPT0gMyl7XG5cdFx0XHRcdFx0Yz0gW2NbMF0sIGNbMF0sIGNbMV0sIGNbMV0sIGNbMl0sIGNbMl1dO1xuXHRcdFx0fVxuXHRcdFx0Yz0gJzB4JytjLmpvaW4oJycpO1xuXHRcdFx0cmV0dXJuICdyZ2JhKCcrWyhjPj4xNikmMjU1LCAoYz4+OCkmMjU1LCBjJjI1NV0uam9pbignLCcpKycsJysgdHJhbnNwYXJlbnQgKycpJztcblx0fVxuICB0aHJvdyBuZXcgRXJyb3IoJ0JhZCBIZXgnKTtcbn07XG5cblxuLyogMTIuIEhhbmRsZSBTY3JvbGwgdG9cbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xudmFyIGhhbmRsZVNjcm9sbFRvID0gZnVuY3Rpb24oKSB7XG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS10b2dnbGU9XCJzY3JvbGwtdG9cIl0nLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFxuXHRcdHZhciB0YXJnZXRFbG0gPSAoJCh0aGlzKS5hdHRyKCdkYXRhLXRhcmdldCcpKSA/ICQodGhpcykuYXR0cignZGF0YS10YXJnZXQnKSA6ICQodGhpcykuYXR0cignaHJlZicpO1xuXHRcdGlmICh0YXJnZXRFbG0pIHtcblx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdFx0c2Nyb2xsVG9wOiAkKHRhcmdldEVsbSkub2Zmc2V0KCkudG9wIC0gJCgnI2hlYWRlcicpLmhlaWdodCgpIC0gMjRcblx0XHRcdH0sIDApO1xuXHRcdH1cblx0fSk7XG59O1xuXG5cbi8qIEFwcGxpY2F0aW9uIENvbnRyb2xsZXJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xudmFyIEFwcCA9IGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdFxuXHRyZXR1cm4ge1xuXHRcdC8vbWFpbiBmdW5jdGlvblxuXHRcdGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuaW5pdFNpZGViYXIoKTtcblx0XHRcdHRoaXMuaW5pdEhlYWRlcigpO1xuXHRcdFx0dGhpcy5pbml0Q29tcG9uZW50KCk7XG5cdFx0fSxcblx0XHRpbml0U2lkZWJhcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRoYW5kbGVTaWRlYmFyTWluaWZ5RmxvYXRNZW51KCk7XG5cdFx0XHRoYW5kbGVTaWRlYmFyTWVudSgpO1xuXHRcdFx0aGFuZGxlU2lkZWJhck1pbmlmeSgpO1xuXHRcdFx0aGFuZGxlU2lkZWJhck1vYmlsZVRvZ2dsZSgpO1xuXHRcdFx0aGFuZGxlU2lkZWJhck1vYmlsZURpc21pc3MoKTtcblx0XHR9LFxuXHRcdGluaXRIZWFkZXI6IGZ1bmN0aW9uKCkge1xuXHRcdH0sXG5cdFx0aW5pdENvbXBvbmVudDogZnVuY3Rpb24oKSB7XG5cdFx0XHRoYW5kbGVTbGltU2Nyb2xsKCk7XG5cdFx0XHRoYW5kbGVDYXJkQWN0aW9uKCk7XG5cdFx0XHRoYW5kZWxUb29sdGlwUG9wb3ZlckFjdGl2YXRpb24oKTtcblx0XHRcdGhhbmRsZVNjcm9sbFRvVG9wQnV0dG9uKCk7XG5cdFx0XHRoYW5kbGVEcm9wZG93bkNsb3NlKCk7XG5cdFx0XHRoYW5kbGVTY3JvbGxUbygpO1xuXHRcdH0sXG5cdFx0c2Nyb2xsVG9wOiBmdW5jdGlvbigpIHtcblx0XHRcdCQoJ2h0bWwsIGJvZHksIC5jb250ZW50JykuYW5pbWF0ZSh7XG5cdFx0XHRcdHNjcm9sbFRvcDogJCgnYm9keScpLm9mZnNldCgpLnRvcFxuXHRcdFx0fSwgMCk7XG5cdFx0fVxuXHR9O1xufSgpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblx0QXBwLmluaXQoKTtcbn0pOyJdfQ==
