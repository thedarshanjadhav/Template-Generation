$(function () {
    'use strict';

    // Variable declaration
    let navigation = $('.navigation'),
        general = {
            w: $(window).innerWidth(),
            h: $(window).innerHeight(),
            body: $('body'),
            doc: document,
            win: window,
            offsetY: window.pageYOffset,
            root: document.querySelector(':root'),
            pageLoad: false
        };















    // Menu Button appear animations
    let startAppear = () => {

        if (navigation.length) {
            let rightSide = navigation.find('.right-side'),
                leftSide = navigation.find('.left-side'),
                logoWrapper = navigation.find('.logo-wrapper');

            TweenMax.staggerTo(leftSide.children(), 1, {
                delay: 0.6,
                opacity: 1,
                y: 0,
                ease: Expo.easeInOut,
            }, 0.1);

            TweenMax.to(logoWrapper, 1, {
                delay: 0.8,
                opacity: 1,
                y: 0,
                ease: Expo.easeInOut
            });

            TweenMax.staggerTo(rightSide.children(), 1, {
                delay: 1,
                opacity: 1,
                y: 0,
                ease: Expo.easeInOut,
                onComplete: () => {
                $(rightSide.children()).not(':first-child').addClass('animate-element');
        }
        }, 0.1);
        }
    };

    // Menu Toggle text slider
    let toggleTextSlider = () => {
        let toggleTextSlider = $('.toggle-text-slider');

        $(toggleTextSlider).each(function () {
            let toggleTrigger = true;
            $(this).on('click', function () {
                let $this = $(this),
                    textWrapper = $this.find('.text-slider-wrapper');
                if (!$this.hasClass('active-toggle') && toggleTrigger) {
                    toggleTrigger = false;
                    TweenMax.to(textWrapper.find(':first-child'), 1, {
                        transform: 'translateY(-100%)',
                        ease: Expo.easeInOut,
                        onComplete: () => {
                        $this.addClass('active-toggle');
                }
                });
                    TweenMax.to(textWrapper.find(':last-child'), 1, {
                        transform: 'translateY(0)',
                        ease: Expo.easeInOut,
                    });
                }
                if ($this.hasClass('active-toggle') && !toggleTrigger) {
                    toggleTrigger = true;
                    TweenMax.to(textWrapper.find(':first-child'), 1, {
                        transform: 'translateY(0)',
                        ease: Expo.easeInOut,
                        onComplete: () => {
                        $this.removeClass('active-toggle');
                }
                });
                    TweenMax.to(textWrapper.find(':last-child'), 1, {
                        transform: 'translateY(100%)',
                        ease: Expo.easeInOut,
                    });
                }
            });
        });
    };






    // Navigation menu
    let navigationMenu = () => {
        let toggle = navigation.find('.menu-toggle'),
            toggleClose = navigation.find('.menu-close'),
            menuWrapper = navigation.find('.navigation-menu-wrapper'),
            subMenus = menuWrapper.find('.sub-menu'),
            menuList = menuWrapper.find('.navigation-menu-list'),
            navigationOverlay = menuWrapper.find('.navigation-overlay'),
            menuToggle = TweenMax.to(toggle, 1, {}).reverse(),
            imageWrapper = menuWrapper.find('.navigation-image-side'),
            navigationAnimateElement = menuWrapper.find('.navigation-animate-element'),
            imageOverlay;

        let init = () => {
            $(subMenus).each(function () {
                $(this).prepend('<span class="menu-item back-link"><a href="#"><p><i class="fa fa-angle-left"></i></p> go back </a></span>');
            });
            menuList.children().children('a').addClass('menu-item-has-children-link');
            $(menuWrapper.find('ul')).each(function () {
                let i = 1;
                if ($(this).hasClass('sub-menu')) {
                    $($(this).children().not(':first-child').children('a')).each(function () {
                        if (i >= 10) {
                            $(this).prepend('<p>' + i + '</p>');
                        } else {
                            $(this).prepend('<p>0' + i + '</p>');
                        }
                        i++;
                    });
                } else {
                    $($(this).children().children('a')).each(function () {
                        if (i >= 10) {
                            $(this).prepend('<p>' + i + '</p>');
                        } else {
                            $(this).prepend('<p>0' + i + '</p>');
                        }
                        i++;
                    });
                }
            });
            $(menuList.children()).each(function () {
                imageWrapper.append('<div class="image-background" style="background-image: url(' + $(this).data('navigation-overlay-image') + ')"></div>');
                imageOverlay = imageWrapper.find('.image-background');
            });
            TweenMax.set(imageOverlay.first(), {
                opacity: 1,
                className: '+=image-active'
            });
        };

        $(menuList.children().children('a')).on('mouseenter', function () {
            TweenMax.to(imageWrapper.children('.image-active'), 0.2, {
                opacity: 0,
                className: '-=image-active'
            });
            TweenMax.to(imageWrapper.children().eq($(this).parent().index()), 0.2, {
                opacity: 1,
                className: '+=image-active'
            });
        });

        let showItems = (showItems, delay, onCompleteFunc) => {
                TweenMax.staggerTo(showItems, 0.5, {
                    delay: delay,
                    transform: 'translateY(0)',
                    opacity: 1,
                    pointerEvents: 'auto',
                    ease: Power3.ease,
                    onComplete: onCompleteFunc
                }, 0.1);
            },
            hideItems = (hiddenItems, onCompleteFunc) => {
                TweenMax.staggerTo(hiddenItems, 0.7, {
                    transform: 'translateY(50px)',
                    opacity: 0,
                    pointerEvents: 'none',
                    ease: Power3.easeIn,
                    onComplete: onCompleteFunc
                }, 0.1);
            },
            showMenu = function () {
                TweenMax.to(navigationOverlay.children(), 0.7, {
                    width: '20%',
                    ease: Expo.easeInOut,
                    onComplete: () => {
                        $(menuWrapper).css('pointer-events', 'auto');
                        toggle.addClass('active-toggle');
                        showItems(menuWrapper.find('.active-list').children().children('a'), 0.7);
                        menuWrapper.addClass('animate-element').removeClass('animate-element-hide');
                        TweenMax.to(toggleClose, 1, {
                            opacity: 1,
                            pointerEvents: 'auto',
                            ease: Expo.easeInOut
                        });
                        TweenMax.staggerTo(navigationAnimateElement, 1, {
                            opacity: 1,
                            ease: Expo.easeInOut,
                            onComplete: () => {
                                menuToggle.play();
                            }
                        }, 0.15);
                        TweenMax.to(imageOverlay, 0.5, {
                            transform: 'translateX(0)',
                            ease: Expo.easeInOut
                        });
                    }
                });
            },
            hideMenu = function () {
                let hideOverlay = () => {
                    TweenMax.to(navigationOverlay.children(), 0.5, {
                        width: 0,
                        ease: Power3.easeIn,
                        onComplete: () => {
                            menuToggle.reverse();
                            $(menuWrapper).css('pointer-events', 'none');
                        },
                    });
                };
                hideItems(menuWrapper.find('.active-list').children().children('a'), hideOverlay);
                TweenMax.staggerTo(navigationAnimateElement, 1, {
                    opacity: 0,
                    ease: Power3.easeIn,
                }, 0.1);
                TweenMax.to(toggleClose, 1, {
                    opacity: 0,
                    pointerEvents: 'none',
                    ease: Expo.easeInOut,
                    onComplete: () => {
                        toggle.removeClass('active-toggle');
                    }
                });
                if (general.w > 768) {
                    TweenMax.to(imageOverlay, 0.5, {
                        transform: 'translateX(-110%)',
                        ease: Power3.easeIn,
                    });
                }
                menuWrapper.addClass('animate-element-hide').removeClass('animate-element');
            };

        toggle.on('click', function () {
            if (menuToggle.reversed() && !toggle.hasClass('active-toggle')) {
                showMenu();
            }

        });

        toggleClose.on('click', function () {
            if (!menuToggle.reversed() && toggle.hasClass('active-toggle')) {
                hideMenu();
            }
        });

        menuList.children('.menu-item-has-children').children('a').on('click', function () {
            let subMenu = $(this).parent().children('.sub-menu');
            let showItemsCallback = () => {
                $(this).parent().parent().removeClass('active-list');
                subMenu.addClass('active-list');
                showItems($(this).parent().children('.sub-menu').children().children('a'), 0.2);
            };
            hideItems($(this).parent().parent().children().children('a'), showItemsCallback);
        });

        init();
        subMenus.children('.back-link').on('click', function () {
            let showItemsCallback = () => {
                $(this).parent().removeClass('active-list');
                $(this).parent().parent().parent().addClass('active-list');
                showItems($(this).parent().parent().parent().children().children('a'), 0.2);
            };
            hideItems($(this).parent().children().children('a'), showItemsCallback);
        });
    };

    // Navigation sidebar
    let navigationSidebar = () => {
        let sidebar = $('.sidebar-side-panel'),
            sidebarClose = sidebar.find('.menu-close'),
            sidebarToggle = navigation.find('.sidebar-toggle');
        sidebarToggle.on('click', function () {
            TweenMax.to(sidebar, 1, {
                transform: 'translateX(0)',
                ease: Expo.easeInOut
            });
        });
        sidebarClose.on('click', function () {
            TweenMax.to(sidebar, 1, {
                transform: 'translateX(100%)',
                ease: Expo.easeInOut
            });
        });
    };

    // Function calls
    general.body.imagesLoaded({}, function () {
        //preloaderHide();
        setTimeout(function () {
            //startAppear();
            toggleTextSlider();
            navigationMenu();
            navigationSidebar();
        }, 1000);
    });
});
