/**
 * @preserve dFlip 1.1.4 | Created by Deepak | Deip Group
 */
"use strict";
var DFLIP = DFLIP || {};
var PRESENTATION = DFLIP;
(function e(t, i) {
    t.PAGE_MODE = {
        SINGLE: 1,
        DOUBLE: 2,
        AUTO: void 0
    };
    t.DIRECTION = {
        LTR: 1,
        RTL: 2
    };
    t.CORNERS = {
        TL: "tl",
        TR: "tr",
        BL: "bl",
        BR: "br",
        L: "l",
        R: "r",
        NONE: void 0
    };
    t.SOURCE_TYPE = {
        IMAGE: "image",
        PDF: "pdf",
        HTML: "html"
    };
    t.DISPLAY_TYPE = {
        WEBGL: "3D",
        HTML: "2D"
    };
    var n = t.defaults = {
        webgl: true,
        pdfjsSrc: "js/libs/pdf.min.js",
        pdfjsWorkerSrc: "js/libs/pdf.worker.min.js",
        threejsSrc: "js/libs/three.min.js",
        mockupjsSrc: "js/libs/mockup.min.js",
        height: 320,
        autoEnableOutline: false,
        overwritePDFOutline: false,
        enableDownload: true,
        textureLoadFallback: "blank",
        stiffness: 2.5,
        duration: 800,
        direction: t.DIRECTION.LTR,
        pageMode: t.PAGE_MODE.AUTO,
        backgroundColor: "#777",
        backgroundRepeat: 800,
        backgroundImage: "blank",
        backgroundImageRepeat: "auto",
        maxTextureSize: 1600,
        minTextureSize: 512,
        pageRatio: void 0,
        defaultPageRatio: 210 / 297,
        enableDebugLog: false,
        canvasToBlob: true,
        icons: {
            altnext: "ti-angle-right",
            altprev: "ti-angle-left",
            next: "ti-angle-right",
            prev: "ti-angle-left",
            end: "ti-angle-double-right",
            start: "ti-angle-double-left",
            share: "ti-sharethis",
            help: "ti-help-alt",
            more: "ti-more-alt",
            download: "ti-download",
            zoomin: "ti-zoom-in",
            zoomout: "ti-zoom-out",
            fullscreen: "ti-fullscreen",
            fitscreen: "ti-arrows-corner",
            thumbnail: "ti-layout-grid2",
            outline: "ti-menu-alt",
            close: "ti-close",
            doublepage: "ti-book",
            singlepage: "ti-file",
            sound: "ti-volume"
        },
        text: {
            toggleSound: "Turn on/off Sound",
            toggleThumbnails: "Toggle Thumbnails",
            toggleOutline: "Toggle Outline/Bookmark",
            previousPage: "Previous Page",
            nextPage: "Next Page",
            toggleFullscreen: "Toggle Fullscreen",
            zoomIn: "Zoom In",
            zoomOut: "Zoom Out",
            toggleHelp: "Toggle Help",
            singlePageMode: "Single Page Mode",
            doublePageMode: "Double Page Mode",
            downloadPDFFile: "Download PDF File",
            gotoFirstPage: "Goto First Page",
            gotoLastPage: "Goto Last Page"
        },
        soundFile: "sound/turn2.mp3",
        soundEnable: true,
        onCreate: function() {},
        onCreateUI: function() {},
        onFlip: function() {},
        beforeFlip: function() {},
        onReady: function() {}
    };
    var a = "WebKitCSSMatrix" in window || document.body && "MozPerspective" in document.body.style,
        o = "onmousedown" in window,
        r = "ontouchstart" in window;
    var s = {
        drag: {
            left: 0,
            right: 1,
            none: -1
        },
        mouseEvents: o ? {
            type: "mouse",
            start: "mousedown",
            move: "mousemove",
            end: "mouseup"
        } : {
            type: "touch",
            start: "touchstart",
            move: "touchmove",
            end: "touchend"
        },
        html: {
            div: "<div/>",
            img: "<img/>",
            a: "<a>",
            input: "<input type='text'/>"
        },
        toRad: function(e) {
            return e * Math.PI / 180
        },
        toDeg: function(e) {
            return e * 180 / Math.PI
        },
        transition: function(e, t) {
            return e ? t / 1e3 + "s ease-out" : "0s none"
        },
        display: function(e) {
            return e ? "block" : "none"
        },
        resetTranslate: function() {
            return v(0, 0)
        },
        translateStr: function(e, t) {
            return a ? " translate3d(" + e + "px," + t + "px, 0px) " : " translate(" + e + "px, " + t + "px) "
        },
        resetBoxShadow: function() {
            return "rgba(0, 0, 0, 0) 0px 0px 20px"
        },
        rotateStr: function(e) {
            return " rotate(" + e + "deg) "
        },
        bg: function(e) {
            return "#fff" + P(e)
        },
        bgImage: function(e) {
            return e == void 0 || e == "blank" ? "" : " url(" + e + ")"
        },
        src: function(e) {
            return e !== void 0 ? "" + e + "" : ""
        },
        limitAt: function(e, t, i) {
            return e < t ? t : e > i ? i : e
        },
        distOrigin: function(e, t) {
            return Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2))
        },
        distPoints: function(e, t, i, n) {
            return Math.sqrt(Math.pow(i - e, 2) + Math.pow(n - t, 2))
        },
        angleByDistance: function(e, t) {
            var i = t / 2;
            var n = y(e, 0, t);
            var a = n < i ? g(Math.asin(n / i)) : 90 + g(Math.asin((n - i) / i));
            return a
        },
        log: function(e) {
            if (n.enableDebugLog == true && window.console) console.log(e)
        },
        lowerPowerOfTwo: function(e) {
            return Math.pow(2, Math.floor(Math.log(e) / Math.LN2))
        },
        nearestPowerOfTwo: function(e) {
            return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2))
        },
        extendOptions: function(e, t) {
            return i.extend(true, {}, e, t)
        },
        getBasePage: function(e) {
            return Math.floor(e / 2) * 2
        },
        loadResources: function Y(e, t, i) {
            var n = document,
                a = n.createElement(e),
                o = n.getElementsByTagName(e)[0];
            a.async = true;
            if (i) {
                a.addEventListener("load", function(e) {
                    i(null, e)
                }, false)
            }
            a.src = t;
            o.parentNode.insertBefore(a, o)
        },
        getScript: function(e, t) {
            var i = document.createElement("script");
            var n = document.getElementsByTagName("script")[0];
            i.async = 1;
            n.parentNode.insertBefore(i, n);

            function a(e, n) {
                if (i !== void 0) {
                    if (n || !i.readyState || /loaded|complete/.test(i.readyState)) {
                        i.onload = i.onreadystatechange = null;
                        i = void 0;
                        if (!n) {
                            if (t) t()
                        }
                    }
                }
            }
            i.addEventListener("load", a, false);
            i.addEventListener("readystatechange", a, false);
            i.addEventListener("complete", a, false);
            i.src = e + (M.dom == "MS" ? "?" + Math.random(1) : "")
        },
        fixMouseEvent: function(e) {
            if (e) {
                var t = e.originalEvent || e;
                if (t.changedTouches && t.changedTouches.length > 0) {
                    var n = i.event.fix(e);
                    var a = t.changedTouches[0];
                    n.clientX = a.clientX;
                    n.clientY = a.clientY;
                    n.pageX = a.pageX;
                    n.pageY = a.pageY;
                    n.movementX = a.movementX;
                    n.movementY = a.movementY;
                    return n
                } else {
                    return e
                }
            } else {
                return e
            }
        },
        hasWebgl: function() {
            try {
                var e = document.createElement("canvas");
                return !!(window.WebGLRenderingContext && (e.getContext("webgl") || e.getContext("experimental-webgl")))
            } catch (t) {
                return false
            }
        }(),
        isMobile: function() {
            var e = false;
            (function(t) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) e = true
            })(navigator.userAgent || navigator.vendor || window.opera);
            return e
        }(),
        prefix: function() {
            var e = window.getComputedStyle(document.documentElement, ""),
                t = Array.prototype.slice.call(e).join("").match(/-(moz|webkit|ms)-/)[1],
                i = "WebKit|Moz|MS".match(new RegExp("(" + t + ")", "i"))[1];
            return {
                dom: i,
                lowercase: t,
                css: "-" + t + "-",
                js: t[0].toUpperCase() + t.substr(1)
            }
        }(),
        __extends: window && window.__extends || function(e, t) {
            for (var i in t)
                if (t.hasOwnProperty(i)) e[i] = t[i];

            function n() {
                this.constructor = e
            }
            n.prototype = t.prototype;
            e.prototype = new n;
            e.__super = t.prototype;
            return e
        }
    };
    var l = t.SOURCE_TYPE,
        c = t.DISPLAY_TYPE,
        d = s.drag,
        u = s.mouseEvents,
        f = s.html,
        h = s.toRad,
        g = s.toDeg,
        p = s.transition,
        v = s.translateStr,
        m = s.resetBoxShadow,
        w = s.rotateStr,
        b = s.bg,
        P = s.bgImage,
        C = s.src,
        y = s.limitAt,
        x = s.distOrigin,
        E = s.distPoints,
        k = s.angleByDistance,
        S = s.log,
        T = s.nearestPowerOfTwo,
        L = s.extendOptions,
        R = s.getBasePage,
        I = s.getScript,
        O = s.fixMouseEvent,
        M = s.prefix,
        D = s.isMobile,
        F = s.hasWebgl,
        B = s.__extends;
    var N = function(e) {
        return i.extend(true, {}, n, e)
    };
    var z = function(e, n) {
        var a = "df-ui";
        var o = "df-ui-wrapper";
        var r = a + "-" + "btn";
        var s = n.ui = i(f.div, {
            "class": a
        });
        var l = n.options;
        s.dispose = function() {
            e.find("." + r).each(function() {
                i(this).off()
            });
            L.remove();
            m.remove();
            u.remove();
            d.remove();
            h.remove();
            document.removeEventListener("keydown", $, false);
            document.removeEventListener("keyup", ee, false);
            window.removeEventListener("click", C, false);
            n = null
        };
        var c = function(e) {
            if (isNaN(e)) e = n.target._activePage;
            else if (e < 1) e = 1;
            else if (e > n.target.pageCount) e = n.target.pageCount;
            return e
        };
        var d = s.next = i(f.div, {
            "class": r + " " + a + "-next " + l.icons["next"],
            on: {
                click: function() {
                    n.next()
                }
            },
            title: l.text.nextPage
        });
        var u = s.prev = i(f.div, {
            "class": r + " " + a + "-prev " + l.icons["prev"],
            on: {
                click: function() {
                    n.prev()
                }
            },
            title: l.text.previousPage
        });
        var h = i(f.div, {
            "class": o + " " + a + "-zoom"
        });
        var g = s.zoomIn = i(f.div, {
            "class": r + " " + a + "-zoomin " + l.icons["zoomin"],
            on: {
                click: function() {
                    n.zoom(true);
                    s.update();
                    if (n.target.startPoint && n.target.pan) n.target.pan(n.target.startPoint)
                }
            },
            title: l.text.zoomIn
        });
        var p = s.zoomOut = i(f.div, {
            "class": r + " " + a + "-zoomout " + l.icons["zoomout"],
            on: {
                click: function() {
                    n.zoom(false);
                    s.update();
                    if (n.target.startPoint && n.target.pan) n.target.pan(n.target.startPoint)
                }
            },
            title: l.text.zoomOut
        });
        h.append(g).append(p);
        var v = s.page = i(f.div, {
            "class": r + " " + a + "-page",
            on: {
                change: function() {
                    var e = parseInt(s.pageInput.val(), 10);
                    e = c(e);
                    n.gotoPage(e)
                }
            }
        });
        s.pageInput = i('<input id="df_book_page_number" type="text"/>').appendTo(v);
        s.pageLabel = i('<label for="df_book_page_number"/>').appendTo(v);
        var m = i(f.div, {
            "class": o + " " + a + "-size"
        });
        var w = i(f.div, {
            "class": r + " " + a + "-help " + l.icons["help"],
            on: {
                click: function() {}
            },
            title: l.text.toggleHelp
        });
        var b = i(f.div, {
            "class": r + " " + a + "-sound " + l.icons["sound"],
            on: {
                click: function() {
                    l.soundEnable = !l.soundEnable;
                    s.updateSound()
                }
            },
            title: l.text.toggleSound,
            html: "<span>" + l.text.toggleSound + "</span>"
        });
        s.updateSound = function() {
            if (l.soundEnable == false || l.soundEnable == "false") b.addClass("disabled");
            else b.removeClass("disabled")
        };
        s.updateSound();
        var P = s.more = i(f.div, {
            "class": r + " " + a + "-more " + l.icons["more"],
            on: {
                click: function(e) {
                    if (!P.hasClass("df-active")) {
                        i(this).addClass("df-active");
                        e.stopPropagation()
                    }
                }
            }
        });

        function C(e) {
            P.removeClass("df-active")
        }
        window.addEventListener("click", C, false);
        var y = i(f.div, {
            "class": "more-container"
        });
        P.append(y);
        if (typeof l.source == "string" && l.enableDownload == true) {
            var x = r + " " + a + "-download " + l.icons["download"];
            var E = s.download = i('<a download target="_blank" class="' + x + '"><span>' + l.text.downloadPDFFile + "</span></a>");
            E.attr("href", l.source);
            y.append(E)
        }
        var k = s.fullScreen = i(f.div, {
            "class": r + " " + a + "-fullscreen " + l.icons["fullscreen"],
            on: {
                click: function() {
                    var e = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
                    var t = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled;
                    var a = n.container[0];
                    if (s.isFullscreen != true) {
                        if (a.requestFullscreen) {
                            a.requestFullscreen()
                        } else if (a.msRequestFullscreen) {
                            a.msRequestFullscreen()
                        } else if (a.mozRequestFullScreen) {
                            a.mozRequestFullScreen()
                        } else if (a.webkitRequestFullscreen) {
                            a.webkitRequestFullscreen()
                        }
                        s.isFullscreen = true
                    } else {
                        s.isFullscreen = false;
                        if (document.exitFullscreen) {
                            document.exitFullscreen()
                        } else if (document.msExitFullscreen) {
                            document.msExitFullscreen()
                        } else if (document.mozCancelFullScreen) {
                            document.fullscreenElement()
                        } else if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen()
                        }
                    }
                    setTimeout(function() {
                        i(window).trigger("resize")
                    }, 50)
                }
            },
            title: l.text.toggleFullscreen
        });
        var T = s.fit = i(f.div, {
            "class": r + " " + a + "-fit " + l.icons["fitscreen"],
            on: {
                click: function() {
                    i(this).toggleClass("df-button-fit-active")
                }
            }
        });
        m.append(k);
        var L = i(f.div, {
            "class": o + " " + a + "-controls"
        });
        var R = s.share = i(f.div, {
            "class": r + " " + a + "-share " + l.icons["share"],
            on: {
                click: function(e) {}
            },
            title: "Share"
        });
        var I = s.start = i(f.div, {
            "class": r + " " + a + "-start " + l.icons["start"],
            on: {
                click: function() {
                    n.start()
                }
            },
            title: l.text.gotoFirstPage
        });
        var O = s.end = i(f.div, {
            "class": r + " " + a + "-end " + l.icons["end"],
            on: {
                click: function() {
                    n.end()
                }
            },
            title: l.text.gotoLastPage
        });
        var M = s.pageMode = i(f.div, {
            "class": r + " " + a + "-pagemode " + l.icons["singlepage"],
            on: {
                click: function() {
                    var e = i(this);
                    n.setPageMode(!e.hasClass(l.icons["doublepage"]))
                }
            },
            html: "<span>" + l.text.singlePageMode + "</span>"
        });
        I.html("<span>" + l.text.gotoFirstPage + "</span>");
        O.html("<span>" + l.text.gotoLastPage + "</span>");
        n.setPageMode(n.target.pageMode == t.PAGE_MODE.SINGLE);
        y.append(M).append(I).append(O).append(b);
        var D = s.altPrev = i(f.div, {
            "class": r + " " + a + "-prev" + " " + a + "-alt " + l.icons["prev"],
            on: {
                click: function() {
                    n.prev()
                }
            },
            title: l.text.previousPage
        });
        var F = s.altNext = i(f.div, {
            "class": r + " " + a + "-next" + " " + a + "-alt " + l.icons["next"],
            on: {
                click: function() {
                    n.next()
                }
            },
            title: l.text.nextPage
        });
        var B = s.thumbnail = i(f.div, {
            "class": r + " " + a + "-thumbnail " + l.icons["thumbnail"],
            on: {
                click: function() {
                    var e = i(this);
                    if (n.target.thumbContainer) {
                        var t = n.target.thumbContainer;
                        t.toggleClass("df-thumb-visible");
                        e.toggleClass("df-active")
                    } else {
                        n.contentProvider.initThumbs();
                        e.toggleClass("df-active")
                    }
                    if (e.hasClass("df-active")) {
                        e.siblings(".df-active").trigger("click")
                    }
                    s.update(true)
                }
            },
            title: l.text.toggleThumbnails
        });
        var N = s.outline = i(f.div, {
            "class": r + " " + a + "-outline " + l.icons["outline"],
            on: {
                click: function() {
                    var e = i(this);
                    if (n.target.outlineContainer) {
                        var t = n.target.outlineContainer;
                        e.toggleClass("df-active");
                        t.toggleClass("df-outline-visible");
                        if (e.hasClass("df-active")) {
                            e.siblings(".df-active").trigger("click")
                        }
                        s.update(true)
                    }
                }
            },
            title: l.text.toggleOutline
        });
        L.append(D).append(v).append(F).append(N).append(B).append(g).append(p).append(k).append(P);
        e.append(L).append(u).append(d).append(h);
        var z = false,
            A = false,
            _ = false;
        var j = 16,
            H = 17,
            U = 18,
            W = 83,
            V = 86,
            q = 67,
            G = 69,
            Y = 71,
            K = 78,
            X = 79,
            Z = 46,
            Q = 39,
            J = 37;
        document.addEventListener("keydown", $, false);
        document.addEventListener("keyup", ee, false);

        function $(e) {}

        function ee(e) {
            switch (e.keyCode) {
                case j:
                    A = false;
                    break;
                case H:
                    z = false;
                    break;
                case U:
                    _ = false;
                    break;
                case J:
                    n.prev();
                    break;
                case Q:
                    n.next();
                    break;
                default:
                    break
            }
        }
        s.update = function(i) {
            S("ui update");
            var a = n.target;
            var o = c(a._activePage || n._activePage);
            var r = a.pageCount || n.pageCount;
            var l = a.direction == t.DIRECTION.RTL,
                d = o == 1 || o == 0,
                u = o == r;
            if (d && !l || u && l) {
                s.next.show();
                s.prev.hide()
            } else if (u && !l || d && l) {
                s.next.hide();
                s.prev.show()
            } else {
                s.next.show();
                s.prev.show()
            }
            s.pageInput.val(o);
            s.pageLabel.html(o + "/" + r);
            if (e.find(".df-thumb-visible, .df-outline-visible").length > 0) {
                e.addClass("df-sidemenu-open")
            } else {
                e.removeClass("df-sidemenu-open")
            }
            if (i == true) n.resize();
            if (a.contentProvider.zoomScale == a.contentProvider.maxZoom) {
                s.zoomIn.addClass("disabled")
            } else {
                s.zoomIn.removeClass("disabled")
            }
            if (a.contentProvider.zoomScale == 1) {
                s.zoomOut.addClass("disabled")
            } else {
                s.zoomOut.removeClass("disabled")
            }
        };
        if (n.target !== void 0) {
            n.target.ui = s
        }
        if (l.onCreateUI !== void 0) l.onCreateUI()
    };
    var A = function(e) {
        var t = function() {
            MOCKUP.defaults.anisotropy = 0;
            MOCKUP.defaults.groundTexture = "blank";
            THREE.skipPowerOfTwo = true;
            j();
            if (e !== void 0) e()
        };
        if (window.MOCKUP == void 0) {
            I(n.threejsSrc, function() {
                I(n.mockupjsSrc, function() {
                    t()
                })
            })
        } else {
            t()
        }
    };
    var _ = void 0;

    function j() {
        _ = function(e) {
            B(t, e);

            function t(t) {
                t = t || {};
                var n = this;
                e.call(this, t);
                n.options = t;
                n.canvas = i(t.canvas).addClass("df-3dcanvas");
                n.container = this.canvas.parent();
                n.container.height(t.height);
                n.type = "PreviewStage";
                n.mouse = new THREE.Vector2;
                n.raycaster = new THREE.Raycaster;
                n.camera.position.set(0, 20, 600);
                n.camera.lookAt(new THREE.Vector3(0, 0, 0));
                n.spotLight.position.z = 1e3;
                n.spotLight.position.y = 500;
                n.spotLight.position.x = -200;
                n.spotLight.castShadow = !D;
                n.spotLight.shadowDarkness = .6;
                n.spotLight.shadowBias = -5e-5;
                n.spotLight.intensity = .45;
                n.ambientLight.color = new THREE.Color("#aaa");
                n.ground.material.color = new THREE.Color(t.backgroundColor);
                n.orbitControl.maxAzimuthAngle = .4;
                n.orbitControl.minAzimuthAngle = -.4;
                n.orbitControl.minPolarAngle = 1.4;
                n.orbitControl.maxPolarAngle = 2.2;
                n.orbitControl.mouseButtons.ORBIT = THREE.MOUSE.RIGHT;
                n.orbitControl.mouseButtons.PAN = -1;
                n.orbitControl.maxDistance = 5e3;
                n.orbitControl.minDistance = 50;
                n.orbitControl.noZoom = true;
                n.selectiveRendering = true;
                n.orbitControl.zoomSpeed = 5;
                n.orbitControl.keyPanSpeed = 0;
                n.orbitControl.center.set(0, 0, 0);
                n.orbitControl.update();
                n.swipe_threshold = D ? 15 : 20;
                var a = n.cssRenderer = new THREE.CSS3DRenderer;
                i(a.domElement).css({
                    position: "absolute",
                    top: 0,
                    pointerEvents: "none"
                }).addClass("df-3dcanvas");
                n.container[0].appendChild(a.domElement);
                var o = n.cssScene = new THREE.Scene;
                var r = document.createElement("div");
                var s = document.createElement("div");
                var l = o.divLeft = new THREE.CSS3DObject(r);
                var c = o.divRight = new THREE.CSS3DObject(s);
                o.add(l);
                o.add(c);
                n.resizeCallback = function() {
                    a.setSize(n.canvas.width(), n.canvas.height())
                };
                n.ground.position.z = -2;
                n.ground.frontImage(t.backgroundImage);
                n.ground.textureRepeat(t.backgroundRepeat);

                function d() {
                    n.renderRequestPending = true
                }
                window.addEventListener(u.move, d, false);
                window.addEventListener("keyup", d, false);
                n.dispose = function() {
                    n.clearChild();
                    n.render();
                    window.removeEventListener(u.move, d, false);
                    n.renderer.domElement.removeEventListener("mousewheel", f, false);
                    n.renderer.domElement.removeEventListener("DOMMouseScroll", f, false);
                    window.removeEventListener("keyup", d, false);
                    n.renderer.domElement.removeEventListener("mousemove", h, false);
                    n.renderer.domElement.removeEventListener("touchmove", h, false);
                    n.renderer.domElement.removeEventListener("mousedown", g, false);
                    n.renderer.domElement.removeEventListener("touchstart", g, false);
                    n.renderer.domElement.removeEventListener("mouseup", v, false);
                    n.renderer.domElement.removeEventListener("touchend", v, false);
                    n.canvas.remove();
                    n.container[0].removeChild(a.domElement);
                    n.renderCallback = null;
                    n.orbitControl.dispose();
                    n.renderer.dispose();
                    n.cancelRAF()
                };
                n.renderCallback = function() {
                    if (TWEEN.getAll().length > 0) n.renderRequestPending = true;
                    TWEEN.update();
                    a.render(o, n.camera)
                };
                var f = function(e) {
                    var t = 0;
                    if (e.wheelDelta !== void 0) {
                        t = e.wheelDelta
                    } else if (e.detail !== void 0) {
                        t = -e.detail
                    }
                    if (t) {
                        var i = n.previewObject.contentProvider.zoomScale;
                        if (t > 0 && i == 1 || t < 0 && i > 1) {
                            e.preventDefault()
                        }
                        n.previewObject.zoom(t > 0)
                    }
                    d()
                };
                var h = function(e) {
                    n.renderRequestPending = true;
                    e = O(e);
                    if (n.isMouseDown && e.movementX != 0 && e.movementY != 0) {
                        n.isMouseMoving = true
                    }
                    if (n.isMouseDown == true && n.previewObject.contentProvider.zoomScale == 1) {
                        var t = e.pageX - n.lastPos,
                            i = performance.now() - n.lastTime;
                        if (Math.abs(t) > n.swipe_threshold) {
                            if (t < 0) {
                                n.target.next()
                            } else {
                                n.target.prev()
                            }
                            e.preventDefault();
                            n.isMouseDown = false
                        }
                        n.lastPos = e.pageX;
                        n.lastTime = performance.now()
                    }
                };
                var g = function(e) {
                    e = O(e);
                    document.activeElement.blur();
                    n.mouseValue = e.pageX + "," + e.pageY;
                    n.isMouseMoving = false;
                    n.isMouseDown = true;
                    n.lastPos = e.pageX;
                    n.lastTime = performance.now()
                };
                var p = function(e) {
                    n.isMouseDown = false;
                    if (e.button !== 0) return this;
                    var t = e.pageX + "," + e.pageY;
                    if (n.isMouseMoving) {} else if (t == n.mouseValue) {
                        e = e || window.event;
                        e = i.event.fix(e);
                        var a = n.mouse,
                            o = n.raycaster;
                        a.x = e.offsetX / n.canvas.innerWidth() * 2 - 1;
                        a.y = 1 - e.offsetY / n.canvas.innerHeight() * 2;
                        o.setFromCamera(a, n.camera);
                        var r = o.intersectObjects(n.target instanceof MOCKUP.Bundle ? n.target.children : [n.target], true);
                        if (r.length > 0) {
                            var s, l = 0;
                            do {
                                s = r[l] !== void 0 ? r[l].object : void 0;
                                l++
                            } while ((s instanceof THREE.BoxHelper || !(s instanceof MOCKUP.Paper) || s.isFlipping == true) && l < r.length);
                            if (s.userData.object !== void 0) {} else {
                                if (s instanceof MOCKUP.TriFold) {
                                    s.next()
                                } else {
                                    if (s.angles[1] > 90) {
                                        if (s.isEdge != true) n.target.next()
                                    } else {
                                        if (s.isEdge != true) n.target.prev()
                                    }
                                }
                            }
                        } else {}
                    }
                };
                var v = function(e) {
                    e = O(e);
                    p(e)
                };
                n.renderer.domElement.addEventListener("mousemove", h, false);
                n.renderer.domElement.addEventListener("touchmove", h, false);
                n.renderer.domElement.addEventListener("mousedown", g, false);
                n.renderer.domElement.addEventListener("touchstart", g, false);
                n.renderer.domElement.addEventListener("mouseup", v, false);
                n.renderer.domElement.addEventListener("touchend", v, false);
                n.renderer.domElement.addEventListener("mousewheel", f, false);
                n.renderer.domElement.addEventListener("DOMMouseScroll", f, false);
                i(n.renderer.domElement).css({
                    display: "block"
                });
                i(window).trigger("resize");
                return this
            }
            t.prototype.width = function() {
                return this.container.width()
            };
            t.prototype.height = function() {
                return this.container.height()
            };
            return t
        }(MOCKUP.Stage);
        var e = function(e) {
            B(t, e);

            function t(t, i) {
                t = t || {};
                t.folds = 1;
                e.call(this, t, i);
                this.angle = 0;
                this.isFlipping = false;
                this.type = "BookPaper"
            }
            t.prototype.tween = function(e, t) {
                var i = this;
                var n = 1e-5;
                i.originalStiff = i.stiffness;
                var a = i.newStiffness;
                var o = t - e;
                i.init = {
                    angle: e,
                    angle2: e < 90 ? 0 : 180,
                    stiff: i.originalStiff
                };
                i.first = {
                    angle: e + o / 4,
                    angle2: e < 90 ? 90 : 90,
                    stiff: i.originalStiff
                };
                i.mid = {
                    angle: e + o * 2 / 4,
                    angle2: e < 90 ? 135 : 45,
                    stiff: i.newStiffness
                };
                i.mid2 = {
                    angle: e + o * 3 / 4,
                    angle2: e < 90 ? 180 : 0,
                    stiff: i.newStiffness
                };
                i.end = {
                    angle: t,
                    angle2: e < 90 ? 180 : 0,
                    stiff: i.newStiffness
                };
                i.isFlipping = true;
                var r = function(e, t) {
                    i.angles[1] = e.angle;
                    i.angles[4] = e.angle2;
                    i.stiffness = e.stiff / (a + n) * (i.newStiffness + n);
                    i.stiffness = isNaN(i.stiffness) ? 0 : e.stiff;
                    i.updateAngle(true)
                };
                new TWEEN.Tween(i.init).to({
                    angle: [i.first.angle, i.mid.angle, i.mid2.angle, i.end.angle],
                    angle2: [i.first.angle2, i.mid.angle2, i.mid2.angle2, i.end.angle2],
                    stiff: [i.first.stiff, i.mid.stiff, i.mid2.stiff, i.end.stiff]
                }, i.parent.duration).onUpdate(function(e) {
                    r(this, e)
                }).easing(TWEEN.Easing.Sinusoidal.Out).onComplete(function(e) {
                    i.stiffness = i.newStiffness;
                    i.updateAngle();
                    i.isFlipping = false;
                    if (i.parent && i.parent.refresh) i.parent.refresh()
                }).start()
            };
            return t
        }(MOCKUP.FlexBoxPaper);
        MOCKUP.BookPaper = e;
        var n = function(e) {
            B(i, e);

            function i(i, n) {
                i = i || {};
                i.segments = i.segments || 50;
                this.pageCount = i.pageCount;
                this.height = i.height;
                this.width = i.width;
                this.pageCount = Math.ceil(this.pageCount / 2) * 2;
                this.direction = i.direction || t.DIRECTION.LTR;
                this.startPage = 1;
                this.endPage = this.pageCount;
                this.stackCount = i.stackCount || 6;
                this.materials = [];
                e.call(this, i, n);
                this.angles = [0, 0, 0, 0, 0, 0];
                this.stiffness = i.stiffness || 1.5;
                this._activePage = i.activePage || this.startPage;
                this.createStack(i);
                this.pageMode = i.pageMode || (D ? t.PAGE_MODE.SINGLE : t.PAGE_MODE.DOUBLE);
                this.type = "Book"
            }
            i.prototype.getPageByNumber = function(e) {
                return this.getObjectByName(Math.floor((e - 1) / 2).toString())
            };
            i.prototype.activePage = function(e) {
                if (e == void 0) return this._activePage;
                this.gotoPage(e)
            };
            i.prototype.gotoPage = function(e) {
                e = parseInt(e, 10);
                this._activePage = e;
                this.updatePage(e)
            };
            i.prototype.moveBy = function(e) {
                var t = this._activePage + e;
                t = y(t, this.startPage, this.endPage);
                this.gotoPage(t)
            };
            i.prototype.next = function(e) {
                if (e == void 0) e = this.direction == t.DIRECTION.RTL ? -this.pageMode : this.pageMode;
                this.moveBy(e)
            };
            i.prototype.prev = function(e) {
                if (e == void 0) e = this.direction == t.DIRECTION.RTL ? this.pageMode : -this.pageMode;
                this.moveBy(e)
            };
            i.prototype.updateAngle = function() {
                var e = this.angles[1];
                var t = this.angles[4];
                var i = t - e;
                var n = this.stackCount;
                for (var a = 0; a < n; a++) {
                    var o = this.children[a];
                    o.angles[1] = e + a * i / (n * 100);
                    o.stiffness = this.stiffness;
                    o.updateAngle()
                }
            };
            i.prototype.refresh = function() {
                this.updatePage(this._activePage);
                if (this.flipCallback !== void 0) this.flipCallback()
            };
            i.prototype.updatePage = function(e) {
                var i = this.direction == t.DIRECTION.RTL;
                e = Math.floor(e / 2);
                if (i) e = Math.floor(this.pageCount / 2) - e;
                var n = this.oldBaseNumber || 0;
                var a = this.pageCount / 2;
                var o = this.stackCount;
                var r = .02;
                var s = .4;
                var l = (.5 - Math.abs(a / 2 - e) / a) / this.stiffness;
                var c = 1;
                var d = Math.floor(o / 2);
                var u = d;
                var f = false;
                if (n > e) {
                    f = true;
                    this.children[o - 1].skipFlip = true;
                    this.children.unshift(this.children.pop())
                } else if (n < e) {
                    this.children[0].skipFlip = true;
                    this.children.push(this.children.shift())
                } else {}
                if (Math.abs(n - e) > 1) {}
                var h = a - e;
                var g = 5 / a;
                var p = g * e / 2;
                var v = g * h / 2;
                var m = p < v ? v : p;
                for (var w = 0; w < o; w++) {
                    var b = this.children[w];
                    var P = b.color;
                    var C = b.angles[1];
                    var y;
                    var x = e - u + w;
                    var E = b.name;
                    b.visible = x >= 0 && x < a;
                    if (this.requestPage !== void 0) {
                        if (i) x = Math.floor(this.pageCount / 2) - x - 1;
                        b.name = x.toString();
                        if (b.name != E && b.visible == true) {
                            b.textureLoaded = false;
                            b.backTextureLoaded = false;
                            b.frontTextureLoaded = false;
                            b.thumbLoaded = false;
                            this.requestPage(x * 2 + 1);
                            this.requestPage(x * 2 + 2)
                        }
                    }
                    b.isEdge = false;
                    if (w == 0) {
                        b.depth = p < s ? s : p
                    } else if (w == o - 1) {
                        b.depth = v < s ? s : v
                    } else {
                        b.depth = s;
                        b.isEdge = false
                    }
                    if (b.isFlipping == true) {
                        b.depth = s
                    }
                    b.position.x = 0;
                    var k = r * w,
                        S = 180 - r * (w - u) + r * w;
                    if (w < u) {
                        b.newStiffness = l / (e / a) / 4;
                        y = k;
                        b.position.z = m - (-w + u) * s;
                        if (f == true) b.position.z -= s
                    } else {
                        y = S;
                        b.newStiffness = l / (Math.abs(a - e) / a) / 4;
                        b.position.z = m - (-o + w + u + 1) * s - b.depth
                    }
                    if (b.isFlipping == false) {
                        if (Math.abs(C - y) > 20 && b.skipFlip == false) {
                            b.depth = s;
                            var T = b.stiffness;
                            if (C > y) {
                                T = l / (Math.abs(a - e) / a) / 4
                            } else {
                                T = l / (e / a) / 4
                            }
                            b.position.z += s;
                            b.stiffness = isNaN(T) ? b.stiffness : T;
                            b.updateAngle(true);
                            b.targetStiffness = w < e ? l / (Math.abs(a - e) / a) / 4 : l / (e / a) / 4;
                            b.targetStiffness = isNaN(b.targetStiffness) ? b.stiffness : b.targetStiffness;
                            b.isFlipping = true;
                            b.tween(C, y);
                            if (this.preFlipCallback !== void 0) this.preFlipCallback()
                        } else {
                            b.skipFlip = false;
                            b.newStiffness = isNaN(b.newStiffness) ? 0 : b.newStiffness;
                            if (b.angles[1] != y || b.stiffness != b.newStiffness || b.depth != b.oldDepth) {
                                b.angles[1] = b.angles[4] = y;
                                b.stiffness = b.newStiffness;
                                b.updateAngle(true)
                            } else {}
                        }
                    }
                    b.oldDepth = b.depth;
                    var L = Math.abs(b.geometry.boundingBox.max.x) < Math.abs(b.geometry.boundingBox.min.x) ? b.geometry.boundingBox.max.x : b.geometry.boundingBox.min.x;
                    b.position.x = b.isEdge == true && b.isFlipping == false ? w < u ? L : -L : 0
                }
                this.oldBaseNumber = e;
                if (this.updatePageCallback !== void 0) this.updatePageCallback()
            };
            i.prototype.createCover = function(e) {
                e.width = e.width * 2;
                this.cover = new MOCKUP.BiFold(e);
                this.add(this.cover)
            };
            i.prototype.createStack = function(e) {
                var t = "red,green,blue,yellow,orange,black".split(",");
                for (var i = 0; i < this.stackCount; i++) {
                    e.angles = [, this.stackCount - i];
                    e.stiffness = (this.stackCount - i) / 100;
                    var n = new MOCKUP.BookPaper(e);
                    n.angles[1] = 180;
                    n.index = i;
                    n.updateAngle();
                    n.textureReady = false;
                    n.textureRequested = false;
                    this.add(n);
                    n.color = t[i];
                    n.position.z = -1 * i
                }
            };
            i.prototype.shininess = function(e) {
                if (e == void 0) {
                    return this.mainObject.shininess()
                } else {
                    this.mainObject.shininess(e)
                }
            };
            i.prototype.bumpScale = function(e) {
                if (e == void 0) {
                    return this.mainObject.bumpScale()
                } else {
                    this.mainObject.bumpScale(e)
                }
            };
            i.prototype.frontImage = function(e) {
                if (e == void 0) {
                    return this.mainObject.frontImage()
                } else {
                    this.mainObject.frontImage(e)
                }
            };
            i.prototype.backImage = function(e) {
                if (e == void 0) {
                    return this.mainObject.backImage()
                } else {
                    this.mainObject.backImage(e)
                }
            };
            return i
        }(MOCKUP.Bundle);
        MOCKUP.Book = n
    }
    var H = function(e) {
        function n(e) {
            e = e || {};
            this.type = "PreviewObject";
            var t = this;

            function i() {
                setTimeout(function() {
                    t.resize()
                }, 50)
            }
            window.addEventListener("resize", i, false);
            this.sound = document.createElement("audio");
            this.sound.setAttribute("src", e.soundFile);
            this.sound.setAttribute("type", "audio/mpeg");
            this.dispose = function() {
                if (this.target && this.target.dispose) this.target.dispose();
                this.target = null;
                if (this.stage && this.stage.dispose) this.stage.dispose();
                this.stage = null;
                if (this.ui && this.ui.dispose) this.ui.dispose();
                this.ui = null;
                if (this.contentProvider && this.contentProvider.dispose) this.contentProvider.dispose();
                this.contentProvider = null;
                window.removeEventListener("resize", i)
            }
        }
        n.prototype = {
            start: function() {
                this.target.gotoPage(this.target.startPage)
            },
            end: function() {
                this.target.gotoPage(this.target.endPage)
            },
            next: function() {},
            prev: function() {},
            zoom: function(e) {
                this.pendingZoom = true;
                this.zoomDelta = e;
                this.resize();
                this.ui.update()
            },
            resize: function() {
                var e = this;
                if (e.target == void 0 || e.target.ui == void 0 || e.target.contentProvider == void 0 || e.target.contentProvider.viewport == void 0 || e.target.stage == void 0) return;
                var n = this.target.pageMode == t.PAGE_MODE.SINGLE;
                var a = e.target,
                    o = a.stage,
                    r = a.contentProvider,
                    l = r.pageRatio,
                    c = r.zoomViewport,
                    d = a.mode !== "css";
                var u, f, h = i(window).height();
                var g = a.ui.isFullscreen == true ? h : this.options.height;
                e.container.height(g);
                if (Math.min(e.container.height(), h) == h) g = h;
                e.container.height(g);
                g = e.container.height();
                if (!d) {
                    o.css({
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        transform: "translate3d(" + e.target.left + "px," + e.target.top + "px,0)"
                    });
                    a.stageHeight = o.height()
                }
                u = o.width();
                f = o.height();
                var p = u,
                    v = Math.min(f, h),
                    m = Math.floor(n ? p : p / 2);
                var w = Math.floor(m / l);
                var b, P, C, E, k;
                b = Math.min(w, v);
                P = Math.floor(b * l);
                r.maxZoom = r.zoomViewport.height / b;
                if (e.pendingZoom == true && e.zoomDelta !== void 0) {
                    e.pendingZoom = false;
                    var S = e.zoomDelta,
                        L, R = Math.max(b, P);
                    var I = r.zoomScale == 1;
                    var O = y(I ? r.zoomScale : r.zoomScale + S, 1, r.maxZoom);
                    if (S > 0) {
                        L = T(R * O)
                    } else {
                        L = s.lowerPowerOfTwo(R * O)
                    }
                    r.zoomScale = y(S > 0 ? 1.5 * r.zoomScale : r.zoomScale / 1.5, 1, r.maxZoom);
                    e.zoomDelta = void 0
                }
                k = r.zoomScale == 1 || r.zoomScale == void 0 ? 1 : r.zoomScale;
                r.checkViewportSize(P * k, b * k);
                if (r.zoomScale != 1) {
                    this.target.container.addClass("df-zoom-enabled")
                } else {
                    this.target.container.removeClass("df-zoom-enabled")
                }
                var M = r.maxZoom;
                if (d) {
                    b = g;
                    var D = e.container.find(".df-ui-controls").height();
                    if (D == null) D = 0;
                    o.canvas.height(b - D);
                    if (e.container.hasClass("df-sidemenu-open")) {
                        u = u - 220
                    }
                    o.resizeCanvas(u, b - D);
                    var F = a.height,
                        B = u * F / b,
                        N = u / b;
                    var z = a.width * (n ? 1 : 2);
                    var A = B < z ? z / N : a.height;
                    var _ = k == 1 ? b / (b - 60) : F / A;
                    C = 1 / (2 * Math.tan(Math.PI * o.camera.fov * .5 / 180) / (A / (k / _)));
                    o.camera.updateProjectionMatrix();
                    o.renderRequestPending = true;
                    o.camera.position.z = C;
                    if (r.zoomScale == 1) {
                        o.camera.position.set(0, 0, C);
                        o.orbitControl.target = new THREE.Vector3(0, 0, 0)
                    }
                    o.orbitControl.update();
                    o.orbitControl.mouseButtons.ORBIT = k != 1 ? -1 : THREE.MOUSE.RIGHT;
                    o.orbitControl.mouseButtons.PAN = k != 1 ? THREE.MOUSE.LEFT : -1
                } else {
                    if (a !== void 0) {
                        a.pageWidth = Math.floor(P);
                        a.fullWidth = a.pageWidth * 2;
                        a.height = b;
                        var j = a.stage.innerWidth() - a.stage.width(),
                            H = a.stage.innerHeight() - a.stage.height();
                        var U = a.shiftHeight = y((b * k - (g - H)) / 2, 0, a.height * k),
                            W = a.shiftWidth = y(k == 1 ? 1 : (a.fullWidth * k - a.container.width() + j) / 2, 0, a.fullWidth * k);
                        a.stage.css({
                            top: -U,
                            bottom: -U,
                            right: -W,
                            left: -W,
                            transform: "translate3d(" + a.left + "px," + a.top + "px,0)"
                        });
                        var V = a.stage.innerHeight();
                        a.wrapper.css({
                            width: a.fullWidth * k,
                            height: b * k,
                            marginTop: g - b * k - H > 0 ? (g - H - b * k) / 2 : 0
                        });
                        var q = Math.floor(x(P, b)) * k;
                        a.stage.find(".df-page-wrapper").width(q).height(q);
                        a.stage.find(".df-book-page, .df-page-front , .df-page-back, .df-page-fold-inner-shadow").height(b * k).width(P * k)
                    }
                }
                this.checkCenter();
                if (a.thumblist) {
                    a.thumblist.reset(i(a.thumblist.container).height())
                }
                var G = e.container.width();
                if (G < 340) {
                    e.container.addClass("df-xs")
                } else {
                    e.container.removeClass("df-xs")
                }
            },
            playSound: function() {
                try {
                    if (this.options && this.options.soundEnable == true) {
                        this.sound.currentTime = 0;
                        this.sound.play()
                    }
                } catch (e) {}
            },
            setPageMode: function(e) {
                if (e == true) {
                    this.ui.pageMode.addClass(this.options.icons["doublepage"]);
                    this.ui.pageMode.html("<span>" + this.options.text.doublePageMode + "</span>");
                    this.target.pageMode = t.PAGE_MODE.SINGLE
                } else {
                    this.ui.pageMode.removeClass(this.options.icons["doublepage"]);
                    this.ui.pageMode.html("<span>" + this.options.text.singlePageMode + "</span>");
                    this.target.pageMode = t.PAGE_MODE.DOUBLE
                }
                this.resize()
            },
            height: function(e) {
                if (e == void 0) {
                    return this.container.height()
                } else {
                    this.options.height = e;
                    this.container.height(e);
                    this.resize()
                }
            },
            checkCenter: function() {
                this.centerType = this.centerType || "start";
                var e = this.target;
                var i = 0,
                    n = 0,
                    a = 0;
                var o = s.getBasePage(e._activePage);
                var r = e._activePage % 2 == 0;
                var l = e.direction == t.DIRECTION.RTL;
                var c = e.pageMode == t.PAGE_MODE.SINGLE;
                var d = e.stage.width(),
                    u;
                if (e.mode == "css") {
                    u = e.wrapper.width();
                    i = Math.max((u - d) / 2, 0);
                    n = -u / 4, a = u / 4;
                    if (o == 0) {
                        e.wrapper.css({
                            left: c ? l ? a - i : n - i : l ? a : n
                        });
                        e.shadow.css({
                            width: "50%",
                            left: l ? 0 : "50%",
                            transitionDelay: ""
                        })
                    } else if (o == e.pageCount) {
                        e.wrapper.css({
                            left: c ? l ? n - i : a - i : l ? n : a
                        });
                        e.shadow.css({
                            width: "50%",
                            left: l ? "50%" : 0,
                            transitionDelay: ""
                        })
                    } else {
                        e.wrapper.css({
                            left: c ? l ? r ? n - i : a - i : r ? a - i : n - i : 0
                        });
                        e.shadow.css({
                            width: "100%",
                            left: 0,
                            transitionDelay: parseInt(e.duration, 10) + 50 + "ms"
                        })
                    }
                } else if (e.stage !== void 0) {
                    var f = e.position.x,
                        h;
                    i = e.width / 4;
                    u = e.width;
                    n = -u / 2, a = u / 2;
                    if (o == 0) {
                        h = l ? a : n
                    } else if (o == e.pageCount) {
                        h = l ? n : a
                    } else {
                        h = c ? l ? r ? n : a : r ? a : n : 0
                    }
                    if (h !== this.centerEnd) {
                        this.centerTween = new TWEEN.Tween({
                            x: f
                        }).delay(0).to({
                            x: h
                        }, e.duration).onUpdate(function() {
                            e.position.x = this.x;
                            e.stage.cssScene.position.x = this.x
                        }).easing(e.ease).start();
                        this.centerEnd = h
                    }
                }
            },
            width: function(e) {
                if (e == void 0) {
                    return this.container.width()
                } else {
                    this.options.width = e;
                    this.container.width(e);
                    this.resize()
                }
            }
        };
        return n
    }({});
    var U = function(e) {
        B(o, e);
        var a = void 0;

        function o(e, t, a) {
            a = a || {};
            var o = this;
            o.contentRawSource = e || [n.textureLoadFallback];
            o.contentSource = o.contentRawSource;
            o.contentSourceType = void 0;
            o.minDimension = a.minTextureSize || 512;
            o.maxDimension = a.maxTextureSize || 2048;
            o.waitPeriod = 50;
            o.enableDebug = false;
            o.zoomScale = 1;
            o.maxZoom = 2;
            o.options = a;
            o.outline = a.outline;
            o.links = a.links;
            o.isCrossOrigin = a.isCrossOrigin;
            o.normalViewport = {
                height: 297,
                width: 210,
                scale: 1
            };
            o.viewport = {
                height: 297,
                width: 210,
                scale: 1
            };
            o.zoomViewport = {
                height: 297,
                width: 210
            };
            o.thumbsize = 128;
            o.cacheIndex = 512;
            o.cache = [];
            o.pageRatio = a.pageRatio || o.viewport.width / o.viewport.height;
            o.textureLoadTimeOut = void 0;
            o.type = "TextureLibrary";
            if (Array === o.contentSource.constructor || Array.isArray(o.contentSource) || o.contentSource instanceof Array) {
                o.contentSourceType = l.IMAGE;
                o.pageCount = o.contentSource.length;
                i("<img/>").attr("src", o.contentSource[0]).load(function() {
                    o.viewport.height = this.height;
                    o.viewport.width = this.width;
                    o.pageRatio = o.viewport.width / o.viewport.height;
                    o.zoomViewport = {
                        width: (o.pageRatio > 1 ? 1 : o.pageRatio) * o.maxDimension,
                        height: o.maxDimension / (o.pageRatio < 1 ? 1 : o.pageRatio)
                    };
                    o.linkService = new PDFLinkService;
                    i(this).off();
                    if (t != void 0) t(o);
                    S(this.height + ":" + this.width)
                })
            } else if (typeof o.contentSource == "string" || o.contentSource instanceof String) {
                var r = function() {
                    PDFJS.workerSrc = n.pdfjsWorkerSrc;
                    o.contentSourceType = l.PDF;
                    PDFJS.disableAutoFetch = true;
                    PDFJS.disableStream = true;
                    PDFJS.externalLinkTarget = PDFJS.LinkTarget.BLANK;
                    PDFJS.getDocument(e).then(function i(e) {
                        o.pdfDocument = e;
                        e.getPage(1).then(function(e) {
                            o.normalViewport = e.getViewport(1);
                            o.viewport = e.getViewport(1);
                            o.viewport.height = o.viewport.height / 10;
                            o.viewport.width = o.viewport.width / 10;
                            o.pageRatio = o.viewport.width / o.viewport.height;
                            o.zoomViewport = {
                                width: (o.pageRatio > 1 ? 1 : o.pageRatio) * o.maxDimension,
                                height: o.maxDimension / (o.pageRatio < 1 ? 1 : o.pageRatio)
                            };
                            o.refPage = e;
                            if (t != void 0) t(o)
                        });
                        o.linkService = new PDFLinkService;
                        o.linkService.setDocument(e, null);
                        o.pageCount = e.numPages;
                        o.contentSource = e
                    })
                };
                if (window.PDFJS == void 0) {
                    I(n.pdfjsSrc, function() {
                        r()
                    })
                } else {
                    r()
                }
            } else {
                console.error("Unknown source type. Please check documentation for help")
            }
            this.dispose = function() {
                if (this.targetObject) {
                    if (this.targetObject.dispose) this.targetObject.dispose();
                    this.targetObject.processPage = null;
                    this.targetObject.requestPage = null
                }
                if (this.pdfDocument && this.pdfDocument.destroy) this.pdfDocument.destroy();
                if (this.linkService && this.linkService.dispose) this.linkService.dispose();
                if (this.outlineViewer && this.outlineViewer.dispose) this.outlineViewer.dispose();
                if (this.thumblist && this.thumblist.dispose) this.thumblist.dispose();
                this.targetObject = null;
                this.pdfDocument = null;
                this.linkService = null;
                this.outlineViewer = null;
                this.thumblist = null
            };
            return this
        }
        o.prototype.initThumbs = function() {
            var e = this;
            if (e.cache[e.thumbsize] == void 0) e.cache[e.thumbsize] = [];
            var t;
            var n = function() {
                clearTimeout(t);
                t = setTimeout(function() {
                    t = setTimeout(a, e.waitPeriod / 2)
                }, e.waitPeriod)
            };
            var a = function() {
                var a = 0;
                if (Date.now() - e.thumblist.lastScrolled < 100) {
                    a = 1
                } else {
                    e.targetObject.container.find(".df-thumb-container .df-vrow").each(function() {
                        var t = i(this);
                        if (!t.hasClass("df-thumb-loaded")) {
                            a++;
                            var o = i(this).attr("id").replace("df-thumb", "");
                            e.getPage(o, n, true);
                            t.addClass("df-thumb-loaded");
                            return false
                        }
                    });
                    if (a == 0) {
                        clearTimeout(t)
                    }
                }
                if (a > 0) {
                    n()
                }
            };
            e.thumblist = e.targetObject.thumblist = new ThumbList({
                h: 500,
                addFn: function(e) {},
                scrollFn: n,
                itemHeight: 128,
                totalRows: e.pageCount,
                generatorFn: function(e) {
                    var t = document.createElement("div");
                    var i = e + 1;
                    t.id = "df-thumb" + i;
                    var n = document.createElement("div");
                    n.innerHTML = i;
                    t.appendChild(n);
                    return t
                }
            });
            e.thumblist.lastScrolled = Date.now();
            n();
            e.targetObject.thumbContainer = i(e.thumblist.container).addClass("df-thumb-container df-thumb-visible");
            e.targetObject.container.append(e.targetObject.thumbContainer);
            e.thumblist.reset(i(e.thumblist.container).height());
            e.targetObject.container.on("click", ".df-thumb-container .df-vrow", function(t) {
                t.stopPropagation();
                var n = i(this).attr("id").replace("df-thumb", "");
                e.targetObject.gotoPage(parseInt(n, 10))
            })
        };
        o.prototype.initOutline = function() {
            var e = this;
            var t = i("<div>").addClass("df-outline-container");
            e.targetObject.container.append(t);
            e.targetObject.outlineContainer = t;
            e.outlineViewer = new BookMarkViewer({
                container: t[0],
                linkService: e.linkService,
                outlineItemClass: "df-outline-item",
                outlineToggleClass: "df-outline-toggle",
                outlineToggleHiddenClass: "df-outlines-hidden"
            });

            function n(t) {
                if (e.options.overwritePDFOutline == true) {
                    t = []
                }
                t = t || [];
                if (e.outline) {
                    for (var i = 0; i < e.outline.length; i++) {
                        e.outline[i].custom = true;
                        if (t) t.push(e.outline[i])
                    }
                }
                e.outlineViewer.render({
                    outline: t
                })
            }
            if (e.pdfDocument) {
                e.pdfDocument.getOutline().then(function(e) {
                    n(e)
                })
            } else {
                n([])
            }
            if (e.options.autoEnableOutline == true) {
                e.targetObject.ui.outline.trigger("click")
            }
        };
        o.prototype.checkViewportSize = function(e, t) {
            var i = this;
            var n = i.targetObject;
            var a = i.cacheIndex;
            if (i.contentSourceType == l.PDF) {
                i.viewport = n.mode == "css" ? i.refPage.getViewport(t / i.normalViewport.height) : i.refPage.getViewport(300 / i.normalViewport.height);
                i.cacheIndex = T(Math.max(e, t));
                i.cacheIndex = y(i.cacheIndex, i.minDimension, i.maxDimension);
                i.cacheScale = i.cacheIndex / Math.max(i.normalViewport.width, i.normalViewport.height);
                if (i.cache[i.cacheIndex] == void 0) i.cache[i.cacheIndex] = [];
                if (a !== i.cacheIndex) {
                    for (var o = 0; o < n.children.length; o++) {
                        var r = n.children[o];
                        r.name = "-1"
                    }
                    n.refresh()
                }
                var s = n.container.find(".linkAnnotation");
                s.css({
                    transform: "matrix(" + i.viewport.clone({
                        dontFlip: true
                    }).transform.join(",") + ")"
                })
            } else {
                if (i.cache[i.cacheIndex] == void 0) i.cache[i.cacheIndex] = []
            }
        };
        o.prototype.getCache = function(e, t) {
            return t == true ? this.cache[this.thumbsize] == void 0 ? void 0 : this.cache[this.thumbsize][e] : this.cache[this.cacheIndex] == void 0 ? void 0 : this.cache[this.cacheIndex][e]
        };
        o.prototype.setCache = function(e, t, i, n) {
            if (i == true) {
                if (this.cache[this.thumbsize] != void 0) this.cache[this.thumbsize][e] = t
            } else {
                var a = n == void 0 ? this.cacheIndex : n;
                if (this.cache[a] != void 0) this.cache[a][e] = t
            }
        };
        o.prototype.setTarget = function(e) {
            var t = this;
            if (e == void 0) {
                return this.targetObject
            } else {
                this.targetObject = e;
                e.contentProvider = this;
                e.container.removeClass("df-loading");
                if (t.linkService !== void 0) {
                    t.linkService.setViewer(e);
                    t.initOutline()
                }
                e.processPage = function(e, i) {
                    if (e > 0 && e <= t.pageCount) {
                        t.getPage(e, i)
                    } else {
                        t.setPage(e, n.textureLoadFallback, i)
                    }
                };
                e.requestPage = function(e) {
                    t.setPage(e, n.textureLoadFallback);
                    t.review("Request")
                };
                if (e.resize !== void 0) e.resize()
            }
        };
        o.prototype.review = function(e) {
            var t = this;
            e = e || "timer review";
            clearTimeout(a);
            a = setTimeout(function() {
                a = setTimeout(t.reviewPages, t.waitPeriod / 2, t, e)
            }, t.waitPeriod)
        };
        o.prototype.reviewPages = function(e, t) {
            e = e || this;
            var n = e.targetObject;
            if (n == void 0) return;
            if (t !== void 0) S(t);
            var a = false;
            var o, r;
            for (o = 0; o < e.targetObject.children.length; o++) {
                r = n.children[o];
                if (r.isFlipping == true) {
                    a = true;
                    break
                }
            }
            if (a == false) {
                var s = n.children.length;
                var l = s / 2;
                var c = R(n._activePage);
                if (e.zoomScale > 1) {
                    s = 1
                }
                for (o = 0; o < s; o++) {
                    var d = Math.floor(o / 2);
                    var u = o % 2 == 0 ? -d * 2 : (d == 0 ? 1 : d) * 2;
                    var f = c + u,
                        h = c + u + 1;
                    var g = n.getPageByNumber(f);
                    var p = n.getPageByNumber(h);
                    var v = 0;
                    if (g !== void 0 && g.frontTextureLoaded != true) {
                        n.processPage(f, function() {
                            e.review("Batch Call")
                        });
                        g.frontTextureLoaded = true;
                        v++
                    }
                    if (p !== void 0 && p.backTextureLoaded != true) {
                        n.processPage(h, function() {
                            e.review("Batch Call")
                        });
                        p.backTextureLoaded = true;
                        v++
                    }
                    if (u == 0 && e.annotedPage !== c && n.mode !== "css") {
                        e.getAnnotations(f);
                        e.getAnnotations(h);
                        e.annotedPage = c
                    }
                    if (v > 0) {
                        break
                    }
                }
                if (v == 0) e.setLoading(c), e.setLoading(c + 1)
            } else {
                e.review("Revisit request");
                if (e.annotedPage !== void 0 && n.mode !== "css") {
                    var m = R(n._activePage);
                    i(n.getContentLayer(m)).html("");
                    i(n.getContentLayer(m + 1)).html("");
                    e.annotedPage = void 0
                }
            }
        };
        o.prototype.getPage = function(e, i, a) {
            var o = this;
            e = parseInt(e, 10);
            var r = o.contentSource;
            if (e <= 0 && e >= o.pageCount) {
                o.setPage(e, n.textureLoadFallback, i, a)
            } else {
                if (o.contentSourceType == l.PDF) {
                    if (o.getCache(e, a) !== void 0) {
                        o.setPage(e, o.getCache(e, a), i, a);
                        S("Page " + e + " loaded from cache")
                    } else {
                        if (a !== true) o.setLoading(e, true);
                        r.getPage(e, a).then(function(t) {
                            c(t, e, i, a)
                        })
                    }
                } else if (o.contentSourceType == l.IMAGE || o.contentSourceType == l.HTML) {
                    if (o.getCache(e, a) !== void 0) {
                        o.setPage(e, o.getCache(e, a), i, a);
                        S("Page " + e + " loaded from cache")
                    } else {
                        if (a !== true) o.setLoading(e, true);
                        s(r[e - 1], function(t) {
                            o.setCache(e, t, a, o.cacheIndex);
                            o.setPage(e, t, i, a);
                            if (i != void 0) i()
                        }, o.isCrossOrigin)
                    }
                }
            }

            function s(e, i, a) {
                var o = new Image;
                o.crossOrigin = "Anonymous";
                o.onload = function() {
                    if (a == true) {
                        var r = document.createElement("canvas"),
                            s = r.getContext("2d");
                        r.width = o.width;
                        r.height = o.height;
                        s.drawImage(o, 0, 0);
                        if (n.canvasToBlob == true) {
                            r.toBlob(function(e) {
                                var n = t.createObjectURL(e, "image/jpeg");
                                if (i != void 0) i(n)
                            }, "image/jpeg", .85)
                        } else {
                            if (i != void 0) i(r)
                        }
                    } else {
                        if (i != void 0) i(e)
                    }
                    o.onload = null;
                    o = null
                };
                o.src = e;
                if (o.complete || o.complete === undefined) {
                    o.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                    o.src = e
                }
            }

            function c(e, i, n, a) {
                S("rendering" + i);
                var r = o.cacheScale;
                var s;
                var l = document.createElement("canvas");
                var c = performance.now();
                var d = o.cacheIndex;
                var u = l.getContext("2d");
                if (a == true) {
                    r = o.thumbsize / o.normalViewport.height
                }
                l.height = o.normalViewport.height * r;
                l.width = o.normalViewport.width * r;
                s = e.getViewport(r);
                var f = {
                    canvasContext: u,
                    viewport: s
                };
                e.cleanupAfterRender = true;
                var h = e.render(f);
                h.promise.then(function() {
                    S(performance.now() - c);
                    c = performance.now();
                    if (a == true || o.options.canvasToBlob == true && o.webgl !== true) {
                        l.toBlob(function(e) {
                            var r = t.createObjectURL(e, "image/jpeg");
                            S(performance.now() - c);
                            o.setCache(i, r, a, d);
                            o.setPage(i, r, n, a)
                        }, "image/jpeg", .85)
                    } else {
                        o.setPage(i, l, n, a)
                    }
                    f = null
                })
            }
        };
        o.prototype.getTargetPage = function(e) {};
        o.prototype.setLoading = function(e, t) {
            if (this.targetObject !== void 0) {
                var n = i(this.targetObject.getContentLayer(e));
                if (n !== void 0) {
                    if (t == true) n.addClass("df-page-loading");
                    else n.removeClass("df-page-loading")
                }
            }
        };
        o.prototype.getAnnotations = function(e) {
            var t = this;
            var n = t.targetObject;
            e = parseInt(e, 10);
            var a = t.contentSource;
            var o = i(n.getContentLayer(e));
            o.empty();
            if (e > 0 && e <= t.pageCount) {
                if (t.contentSourceType == l.PDF) {
                    var r = R(e);
                    a.getPage(e).then(function(i) {
                        if (o !== void 0 && o.length > 0) {
                            t.setupAnnotations(i, t.viewport, o, e)
                        }
                    })
                }
                if (t.links !== void 0 && t.links[e] !== void 0) {
                    var s = t.links[e];
                    for (var c = 0; c < s.length; c++) {
                        var d = s[c];
                        var u = document.createElement("a");
                        u.setAttribute("dest", d.dest);
                        u.className = "customLinkAnnotation";
                        u.href = "#" + d.dest;
                        u.onclick = function() {
                            var e = this.getAttribute("dest");
                            if (e) {
                                t.linkService.customNavigateTo(e)
                            }
                            return false
                        };
                        u.style.left = d.x + "%";
                        u.style.top = d.y + "%";
                        u.style.width = d.w + "%";
                        u.style.height = d.h + "%";
                        o[0].appendChild(u)
                    }
                }
            }
        };
        o.prototype.setPage = function(e, i, a, o) {
            var r = this;
            var s = r.targetObject;
            if (o == true) {
                var l = r.targetObject.container.find("#df-thumb" + e);
                l.css({
                    backgroundImage: P(i)
                })
            } else {
                if (i == n.textureLoadFallback) {
                    S("Fallback on " + e)
                } else {
                    if (s.mode == "css") r.getAnnotations(e)
                }
                var c = s.getPageByNumber(e);
                if (c !== void 0) {
                    if (e % 2 != 0 && s.direction == t.DIRECTION.LTR || e % 2 != 1 && s.direction == t.DIRECTION.RTL) {
                        S(e + "rendered to back of " + c.color);
                        c.backImage(i, function() {
                            r.setLoading(e);
                            if (a != void 0) a()
                        })
                    } else {
                        S(e + "rendered to front of " + c.color);
                        c.frontImage(i, function() {
                            r.setLoading(e);
                            if (a != void 0) a()
                        })
                    }
                } else {
                    S("Invalid set request on Page " + e)
                }
            }
        };
        o.prototype.setupAnnotations = function(e, t, n, a) {
            if (n == void 0 || i(n).length == 0) return;
            var o = this;
            return e.getAnnotations().then(function(a) {
                t = t.clone({
                    dontFlip: true
                });
                if (n == void 0) {
                    return
                }
                n = i(n);
                if (n.find(".annotationDiv").length == 0) {
                    n.append(i("<div class='annotationDiv'>"))
                }
                var r = n.find(".annotationDiv");
                r.empty();
                PDFJS.AnnotationLayer.render({
                    annotations: a,
                    div: r[0],
                    page: e,
                    viewport: t,
                    linkService: o.linkService
                })
            })
        };
        return o
    }({});
    var W = function() {
        function e(e) {
            this.angles = e.angles || [0, 0, 0, 0, 0, 0];
            this.stiffness = e.angles || .1;
            this.segments = e.segments || 1;
            this.initDOM()
        }

        function n(e) {
            var t = e.contentLayer = i(f.div, {
                "class": "df-page-content"
            });
            e.append(t)
        }
        e.prototype = {
            initDOM: function() {
                var e = this.element = i(f.div, {
                    "class": "df-book-page"
                });
                var t = this.wrapper = i(f.div, {
                    "class": "df-page-wrapper"
                });
                var a = this.front = i(f.div, {
                    "class": "df-page-front"
                });
                var o = this.back = i(f.div, {
                    "class": "df-page-back"
                });
                var r = this.foldInnerShadow = i(f.div, {
                    "class": "df-page-fold-inner-shadow"
                });
                var s = this.foldOuterShadow = i(f.div, {
                    "class": "df-page-fold-outer-shadow"
                });
                n(a, this.segments, true);
                n(o, this.segments, false);
                e.append(t).append(s);
                t.append(a).append(o).append(r)
            },
            updatePoint: function(e) {
                if (e == void 0) return;
                var i = this.parent.dragPage != void 0 ? this.parent.dragPage : e.page != void 0 ? e.page : this;
                var n = i.element.width(),
                    a = i.element.height();
                var o = this.parent.corner !== void 0 ? this.parent.corner : e.corner,
                    r = t.CORNERS;
                var s = i.side == d.right,
                    l = o == r.BL || o == r.BR;
                e.rx = s == true ? n * 2 - e.x : e.x;
                e.ry = l == true ? a - e.y : e.y;
                var c = Math.atan2(e.ry, e.rx);
                c = Math.PI / 2 - y(c, 0, h(90));
                var u = s ? e.x / 2 : n - e.x / 2,
                    f = e.ry / 2,
                    p = Math.max(0, Math.sin(c - Math.atan2(f, u)) * x(u, f)),
                    m = .5 * x(e.rx, e.ry);
                var b = n - p * Math.sin(c),
                    P = p * Math.cos(c),
                    C = g(c);
                var E = l ? s ? 180 + (90 - C) : 180 + C : s ? C : 90 - C;
                var k = l ? s ? 180 + (90 - C) : C : s ? C + 180 : E,
                    S = l ? s ? 90 - C : C + 90 : s ? E - 90 : E + 180,
                    T = s ? n - b : b,
                    L = l ? a + P : -P,
                    R = s ? -b : b - n,
                    I = l ? -a - P : P;
                var O = y(e.distance * .5 / n, 0, .5);
                var D = y((n * 2 - e.rx) * .5 / n, .05, .3);
                i.element.addClass("df-folding");
                var F = s ? i.back : i.front;
                var B = s ? i.front : i.back;
                var N = i.foldOuterShadow;
                var z = i.foldInnerShadow;
                i.wrapper.css({
                    transform: v(T, L) + w(E)
                });
                F.css({
                    transform: w(-E) + v(-T, -L)
                });
                B.css({
                    transform: w(k) + v(R, I),
                    boxShadow: "rgba(0, 0, 0, " + O + ") 0px 0px 20px"
                });
                z.css({
                    transform: w(k) + v(R, I),
                    opacity: D / 2,
                    backgroundImage: M.css + "linear-gradient( " + S + "deg, rgba(0, 0, 0, 0.25) , rgb(0, 0, 0) " + m * .7 + "px, rgb(255, 255, 255) " + m + "px)"
                });
                N.css({
                    opacity: D / 2,
                    left: s ? "auto" : 0,
                    right: s ? 0 : "auto",
                    backgroundImage: M.css + "linear-gradient( " + (-S + 180) + "deg, rgba(0, 0, 0,0) " + m / 3 + "px, rgb(0, 0, 0) " + m + "px)"
                })
            },
            updateAngle: function(e, t) {
                var i = this.element.width() * 5;
                this.wrapper.css({
                    perspective: i,
                    perspectiveOrigin: t == true ? "0% 50%" : "100% 50%"
                });
                this.front.css({
                    display: t == true ? e <= -90 ? "block" : "none" : e < 90 ? "block" : "none",
                    transform: (M.dom !== "MfS" ? "" : "perspective(" + i + "px) ") + (t == true ? "translateX(-100%) " : "") + "rotateY(" + ((t == true ? 180 : 0) + e) + "deg)"
                });
                this.back.css({
                    display: t == true ? e > -90 ? "block" : "none" : e >= 90 ? "block" : "none",
                    transform: (M.dom !== "MSd" ? "" : "perspective(" + i + "px) ") + (t == false ? "translateX(100%) " : "") + "rotateY(" + ((t == false ? -180 : 0) + e) + "deg)"
                });
                return
            },
            tween: function(e) {
                var i = this;
                if (i == void 0 || i.parent == void 0) return;
                var n = i.side == d.right;
                var a = i.parent.corner == t.CORNERS.BL || i.parent.corner == t.CORNERS.BR;
                var o = a ? i.parent.height : 0;
                var r, s, l, c = 0;
                var u = i.end = i && i.animateToReset == true ? {
                    x: n ? i.parent.fullWidth : 0,
                    y: o
                } : {
                    x: n ? 0 : i.parent.fullWidth,
                    y: o
                };
                i.ease = i.isHard ? TWEEN.Easing.Quadratic.InOut : TWEEN.Easing.Linear.None;
                var f = i.parent.duration;
                if (i.isHard == true) {
                    if (e != void 0) {
                        c = k(e.distance, e.fullWidth)
                    }
                    r = i.init = {
                        angle: c * (n ? -1 : 1)
                    };
                    u = i.end = i && i.animateToReset == true ? {
                        angle: n ? 0 : -0
                    } : {
                        angle: n ? -180 : 180
                    }
                } else {
                    if (e == void 0) {
                        r = i.init = i && i.animateToReset == true ? {
                            x: n ? 0 : i.parent.fullWidth,
                            y: 0
                        } : {
                            x: n ? i.parent.fullWidth : 0,
                            y: 0
                        };
                        s = i.first = {
                            x: (n ? 3 : 1) * i.parent.fullWidth / 4,
                            y: 0
                        };
                        l = i.mid = {
                            x: (n ? 1 : 3) * i.parent.fullWidth / 4,
                            y: 0
                        }
                    } else {
                        r = i.init = {
                            x: e.x,
                            y: e.y
                        };
                        s = i.first = {
                            x: e.x * 3 / 4,
                            y: e.y * 3 / 4
                        };
                        l = i.mid = {
                            x: e.x / 4,
                            y: e.y / 4
                        };
                        f = i.parent.duration * E(r.x, r.y, u.x, u.y) / i.parent.fullWidth;
                        f = y(f, i.parent.duration / 3, i.parent.duration)
                    }
                }
                i.isFlipping = true;
                var h = function(e) {
                    if (i.isHard == true) {
                        i.updateAngle(e.angle, n)
                    } else {
                        i.updatePoint({
                            x: e.x,
                            y: e.y
                        })
                    }
                };
                var g = i.completeTween = i.completeTween || function(e) {
                    i.isFlipping = false;
                    if (i.isHard == true) {
                        i.updateAngle(i.end.angle);
                        i.back.css({
                            display: "block"
                        });
                        i.front.css({
                            display: "block"
                        })
                    } else {
                        i.updatePoint({
                            x: i.end.x,
                            y: i.end.y
                        })
                    }
                    if (i.animateToReset !== true) {
                        i.side = i.side == d.right ? d.left : d.right
                    } else i.animateToReset = void 0;
                    i.currentTween = void 0;
                    i.pendingPoint = void 0;
                    i.magnetic = false;
                    i.parent.dragPage = void 0;
                    i.parent.corner = t.CORNERS.NONE;
                    if (e != true) i.parent.refresh()
                };
                if (i.isHard == true) {
                    i.currentTween = new TWEEN.Tween(r).delay(0).to(u, i.parent.duration).onUpdate(function() {
                        h(this)
                    }).easing(i.ease).onComplete(i.completeTween).start()
                } else {
                    if (e == void 0) {
                        i.currentTween = new TWEEN.Tween(r).delay(0).to(u, i.parent.duration).onUpdate(function() {
                            h(this)
                        }).easing(TWEEN.Easing.Sinusoidal.Out).onComplete(i.completeTween).start()
                    } else {
                        i.currentTween = new TWEEN.Tween(r).delay(0).to(u, f).onUpdate(function() {
                            h(this)
                        }).easing(TWEEN.Easing.Sinusoidal.Out).onComplete(i.completeTween);
                        i.currentTween.start()
                    }
                }
            },
            frontImage: function(e, t) {
                if (e.nodeName == "CANVAS") {
                    this.front.html("");
                    this.front.append(i(e))
                } else {
                    this.front.css({
                        backgroundImage: P(e)
                    })
                }
                if (t !== void 0) t()
            },
            backImage: function(e, t) {
                if (e.nodeName == "CANVAS") {
                    this.back.html("");
                    this.back.append(i(e))
                } else {
                    this.back.css({
                        backgroundImage: P(e)
                    })
                }
                if (t !== void 0) t()
            },
            updateCSS: function(e) {
                this.element.css(e)
            },
            resetCSS: function() {
                this.wrapper.css({
                    transform: ""
                });
                this.front.css({
                    transform: "",
                    boxShadow: ""
                });
                this.back.css({
                    transform: "",
                    boxShadow: ""
                })
            },
            clearTween: function(e) {
                this.currentTween.stop();
                this.completeTween(e == true);
                this.resetCSS()
            }
        };
        return e
    }();
    var V = function(e) {
        B(r, e);

        function n(e) {
            e.parent.container.find(".df-folding").removeClass("df-folding");
            e.element.addClass("df-folding")
        }

        function o(e) {
            var t = false;
            for (var i = 0; i < e.pages.length; i++) {
                var n = e.pages[i];
                if (n.isFlipping == true) {
                    t = true;
                    break
                }
            }
            return t
        }

        function r(e, r) {
            var s = this;
            s.type = "BookCSS";
            s.images = e.images || [];
            s.pageCount = e.pageCount || 2;
            s.foldSense = 50;
            s.stackCount = 4;
            s.mode = "css";
            s.pages = [];
            s.duration = e.duration;
            s.container = i(r);
            s.options = e;
            s.drag = d.none;
            s.pageMode = e.pageMode || (D ? t.PAGE_MODE.SINGLE : t.PAGE_MODE.DOUBLE);
            s.swipe_threshold = D ? 15 : 50;
            this.direction = e.direction || t.DIRECTION.LTR;
            this.startPage = 1;
            this.endPage = this.pageCount;
            this._activePage = e.activePage || this.startPage;
            s.hardConfig = e.hard;
            a = "WebKitCSSMatrix" in window || document.body && "MozPerspective" in document.body.style;
            this.animateF = function() {
                if (TWEEN.getAll().length > 0) TWEEN.update();
                else clearInterval(s.animate)
            };
            s.init(e);
            s.skipDrag = false;

            function l(e) {
                if (s.dragPage != e.page && e.page.visible == true) {
                    s.dragPage.clearTween(true);
                    s.dragPage = e.page;
                    s.corner = e.corner;
                    s.dragPage.pendingPoint = e
                }
            }
            var c = function(e) {
                    var i = s.eventToPoint(e);
                    if (e.touches !== void 0 && e.touches.length > 1) return;
                    var n = s.dragPage || i.page;
                    if (s.contentProvider.zoomScale !== 1) {
                        if (e.touches !== void 0 || s.isPanning == true) {
                            s.pan(i);
                            e.preventDefault()
                        }
                    } else {
                        if (s.skipDrag !== true) {
                            var a = i.distance;
                            if (!o(s)) {
                                if (s.dragPage !== void 0 || i.isInside == true) {
                                    if (s.dragPage !== void 0) {
                                        S("set mouse down move")
                                    } else {
                                        i.y = y(i.y, 1, s.height - 1);
                                        i.x = y(i.x, 1, i.fullWidth - 1)
                                    }
                                    var r = s.corner || i.corner;
                                    if (n.isHard) {
                                        var l = r == t.CORNERS.BR || r == t.CORNERS.TR;
                                        var c = k(i.distance, i.fullWidth);
                                        n.updateAngle(c * (l ? -1 : 1), l)
                                    } else {
                                        n.updatePoint(i, s)
                                    }
                                    n.magnetic = true;
                                    n.magneticCorner = i.corner;
                                    e.preventDefault()
                                }
                                if (s.dragPage == void 0 && n !== void 0 && i.isInside == false && n.magnetic == true) {
                                    n.pendingPoint = i;
                                    n.animateToReset = true;
                                    s.corner = n.magneticCorner;
                                    s.animatePage(n);
                                    n.pendingPoint = void 0;
                                    n.magnetic = false;
                                    n.magneticCorner = void 0
                                }
                                if (s.isPanning == true && s.dragPage == void 0 && s.contentProvider.zoomScale == 1) {
                                    var u = i.x - s.lastPos,
                                        f = performance.now() - s.lastTime;
                                    if (Math.abs(u) > s.swipe_threshold) {
                                        if (u < 0) {
                                            s.next()
                                        } else {
                                            s.prev()
                                        }
                                        s.drag = d.none;
                                        s.isPanning = false;
                                        e.preventDefault()
                                    }
                                    s.lastPos = i.x;
                                    s.lastTime = performance.now()
                                }
                            }
                        }
                    }
                },
                u = function(e) {
                    s.isPanning = false;
                    if (e.touches !== void 0 && e.touches.length > 1) return;
                    if (s.skipDrag !== true) {
                        if (s.dragPage) {
                            e.preventDefault();
                            var i = s.eventToPoint(e);
                            s.dragPage.pendingPoint = i;
                            if (i.x == s.startPoint.x && i.y == s.startPoint.y && i.isInside == true) {
                                if (s.corner == t.CORNERS.BR || s.corner == t.CORNERS.TR) {
                                    l(i);
                                    if (s.dragPage.isFlipping !== true) s.next()
                                } else if (s.corner == t.CORNERS.BL || s.corner == t.CORNERS.TL) {
                                    l(i);
                                    if (s.dragPage.isFlipping !== true) s.prev()
                                }
                            } else if (s.dragPage.isFlipping !== true) {
                                if (i.distance > i.fullWidth / 2) {
                                    if (i.x > i.fullWidth / 2) s.prev();
                                    else s.next()
                                } else {
                                    s.dragPage.animateToReset = true;
                                    s.animatePage(s.dragPage)
                                }
                            }
                            if (s.dragPage) {
                                s.dragPage.pendingPoint = void 0;
                                s.dragPage.magnetic = false
                            }
                        }
                        s.drag = d.none
                    }
                },
                f = function(e) {
                    if (e.touches !== void 0 && e.touches.length > 1) return;
                    var t = s.eventToPoint(e);
                    s.startPoint = t;
                    s.left = s.left || 0;
                    s.top = s.top || 0;
                    s.isPanning = true;
                    s.lastPos = t.x;
                    s.lastTime = performance.now();
                    if (s.skipDrag !== true) {
                        if (t.isInside == true && !o(s)) {
                            s.startPoint = t;
                            s.drag = t.drag;
                            s.dragPage = t.page;
                            s.corner = t.corner;
                            S(s.corner);
                            n(s.dragPage);
                            if (t.page.isHard) {} else {
                                t.page.updatePoint(t, s)
                            }
                        }
                    }
                },
                h = function(e) {
                    var t = 0;
                    if (e.wheelDelta != void 0) {
                        t = e.wheelDelta / 120
                    } else if (e.detail !== void 0) {
                        t = -e.detail / 3
                    }
                    var i = s.contentProvider.zoomScale,
                        n = s.contentProvider.maxZoom;
                    if (t) {
                        if (t > 0 && i < n || t < 0 && i > 1) {
                            e.stopPropagation();
                            e.preventDefault();
                            var a = s.eventToPoint(e);
                            var o = s.eventToPoint(e);
                            var r = {
                                x: s.container.width() / 2,
                                y: -23 + s.container.height() / 2
                            };
                            s.previewObject.zoom(t);
                            var l = s.contentProvider.zoomScale;
                            if (i !== l) {
                                var c = l / i;
                                if (l == 1) {
                                    s.left = 0;
                                    s.top = 0
                                } else {
                                    s.left *= c;
                                    s.top *= c
                                }
                                var d = (a.raw.x - r.x) * c,
                                    u = (a.raw.y - r.y) * c;
                                o.raw.x = r.x + d;
                                o.raw.y = r.y + u;
                                s.startPoint = o;
                                s.pan(a);
                                var f = s.dragPage || a.page;
                                if (s.dragPage == void 0 && f !== void 0 && a.isInside == true && f.magnetic == true) {
                                    f.pendingPoint = a;
                                    f.animateToReset = true;
                                    s.corner = f.magneticCorner;
                                    s.animatePage(f);
                                    f.pendingPoint = void 0;
                                    f.magnetic = false;
                                    f.magneticCorner = void 0
                                }
                            }
                        }
                    }
                };
            var g = s.container[0];
            var p = s.stage[0];
            if (g) {
                g.addEventListener("mousemove", c, false);
                g.addEventListener("touchmove", c, false);
                g.addEventListener("mousedown", f, false);
                g.addEventListener("mouseup", u, false);
                g.addEventListener("touchend", u, false);
                g.addEventListener("touchstart", f, false);
                p.addEventListener("mousewheel", h, false);
                p.addEventListener("DOMMouseScroll", h, false)
            }
            this.dispose = function() {
                g.removeEventListener("mousemove", c, false);
                g.removeEventListener("touchmove", c, false);
                g.removeEventListener("mousedown", f, false);
                g.removeEventListener("mouseup", u, false);
                g.removeEventListener("touchend", u, false);
                g.removeEventListener("touchstart", f, false);
                p.removeEventListener("mousewheel", h, false);
                p.removeEventListener("DOMMouseScroll", h, false);
                s.flipCallback = null;
                s.animateF = null;
                s.stage.remove()
            }
        }

        function s(e, t) {
            return true
        }
        r.prototype = {
            add: function(e) {
                if (e instanceof W) this.container.append(i(e.element));
                else this.container.append(i(e))
            },
            pan: function(e) {
                var t = this.startPoint;
                var i = this.contentProvider.zoomScale;
                var n = this.left + (e.raw.x - t.raw.x),
                    a = this.top + (e.raw.y - t.raw.y);
                this.left = y(n, -this.shiftWidth, this.shiftWidth);
                this.top = y(a, -this.shiftHeight, this.shiftHeight);
                this.startPoint = e;
                this.stage.css({
                    transform: "translate3d(" + this.left + "px," + this.top + "px,0)"
                })
            },
            getPageByNumber: function(e) {
                var t = Math.floor((e - 1) / 2);
                var i;
                for (var n = 0; n < this.pages.length; n++) {
                    if (t == parseInt(this.pages[n].name, 10)) i = this.pages[n]
                }
                return i
            },
            getPageSide: function(e) {
                var i = this.direction == t.DIRECTION.RTL;
                var n = this.getPageByNumber(e);
                if (n == void 0) return;
                if (e % 2 == 0) return i ? n.back : n.front;
                else return i ? n.front : n.back
            },
            getContentLayer: function(e) {
                var t = this.getPageSide(e);
                return t == void 0 ? void 0 : t.contentLayer
            }
        };
        r.prototype.init = function(e) {
            var t = this;
            t.stage = i(f.div, {
                "class": "df-book-stage"
            });
            t.wrapper = i(f.div, {
                "class": "df-book-wrapper"
            });
            t.shadow = i(f.div, {
                "class": "df-book-shadow"
            });
            t.container.append(t.stage);
            t.stage.append(t.wrapper);
            t.wrapper.append(t.shadow);
            t.container.height(e.height);
            t.createStack(e)
        };
        r.prototype.createStack = function(e) {
            var t = "red,green,blue,yellow,orange,black".split(",");
            for (var i = 0; i < this.stackCount; i++) {
                e.angles = [, this.stackCount - i];
                e.stiffness = (this.stackCount - i) / 100;
                var n = new W(e);
                n.angles[1] = 180;
                n.index = i;
                n.parent = this;
                n.textureReady = false;
                n.textureRequested = false;
                this.wrapper.append(n.element);
                n.isFlipping = false;
                this.pages.push(n);
                n.color = t[i]
            }
            this.children = this.pages
        };
        r.prototype.isPageHard = function(e) {
            if (this.hardConfig !== void 0) {
                var t = this.hardConfig;
                if (t == "cover") {
                    return e == 0 || e == Math.floor(this.pageCount / 2) - 1
                } else if (t == "all") {
                    return true
                } else {
                    var i = ("," + t + ",").indexOf("," + (e * 2 + 1) + ",") > -1;
                    var n = ("," + t + ",").indexOf("," + (e * 2 + 2) + ",") > -1;
                    return i || n
                }
            }
            return false
        };
        r.prototype.setDuration = function(e) {
            this.duration = e
        };
        r.prototype.moveBy = function(e) {
            var t = this._activePage + e;
            t = y(t, this.startPage, this.endPage);
            this.gotoPage(t)
        };
        r.prototype.next = function(e) {
            if (e == void 0) e = this.direction == t.DIRECTION.RTL ? -this.pageMode : this.pageMode;
            this.moveBy(e)
        };
        r.prototype.prev = function(e) {
            if (e == void 0) e = this.direction == t.DIRECTION.RTL ? this.pageMode : -this.pageMode;
            this.moveBy(e)
        };
        r.prototype.eventToPoint = function(e) {
            e = O(e);
            var n = this.wrapper,
                a = this.pages,
                o = this.pageWidth,
                r = this.fullWidth,
                s = this.height,
                l = i(window),
                c = {
                    x: e.clientX,
                    y: e.clientY
                };
            var u = c.x - n[0].getBoundingClientRect().left;
            var f = c.y - n[0].getBoundingClientRect().top;
            c.x = c.x - this.container[0].getBoundingClientRect().left;
            c.y = c.y - this.container[0].getBoundingClientRect().top;
            var h = this.drag == d.none ? u < o ? u : r - u : this.drag == d.left ? u : r - u;
            var g = u < o ? a[this.stackCount / 2 - 1] : a[this.stackCount / 2];
            var p = u < this.foldSense ? d.left : u > r - this.foldSense ? d.right : d.none;
            var v = u,
                m = f,
                w = s,
                b = r,
                P = this.foldSense,
                C = t.CORNERS,
                y;
            if (v >= 0 && v < P) {
                if (m >= 0 && m <= P) y = C.TL;
                else if (m >= w - P && m <= w) y = C.BL;
                else if (m > P && m < w - P) y = C.L;
                else y = C.NONE
            } else if (v >= b - P && v <= b) {
                if (m >= 0 && m <= P) y = C.TR;
                else if (m >= w - P && m <= w) y = C.BR;
                else if (m > P && m < w - P) y = C.R;
                else y = C.NONE
            } else y = C.NONE;
            return {
                isInside: y !== C.NONE && y !== C.L && y !== C.R,
                x: u,
                y: f,
                fullWidth: r,
                rawDistance: r - u,
                distance: h,
                page: g,
                drag: p,
                foldSense: this.foldSense,
                event: e,
                raw: c,
                corner: y
            }
        };
        r.prototype.gotoPage = function(e) {
            e = parseInt(e, 10);
            this._activePage = e;
            this.updatePage(e)
        };
        r.prototype.refresh = function() {
            this.updatePage(this._activePage);
            if (this.flipCallback !== void 0) this.flipCallback()
        };
        r.prototype.updatePage = function(e) {
            var n = this.direction == t.DIRECTION.RTL;
            e = Math.floor(e / 2);
            if (n) e = Math.floor(this.pageCount / 2) - e;
            var a = this.oldBaseNumber || 0;
            var o = this.pageCount / 2;
            var r = this.stackCount;
            var s = Math.floor(r / 2);
            if (a > e) {
                this.children[r - 1].skipFlip = true;
                this.children.unshift(this.children.pop())
            } else if (a < e) {
                this.children[0].skipFlip = true;
                this.children.push(this.children.shift())
            }
            for (var l = 0; l < r; l++) {
                var c = this.children[l];
                if (a !== e) {
                    if (c.currentTween !== void 0) {
                        c.clearTween(true)
                    }
                }
                var u = c.side;
                var f;
                var h = e - s + l;
                var g = c.name;
                c.isHard = this.isPageHard(h);
                if (c.isHard) {
                    c.element.addClass("df-hard-page")
                } else {
                    c.element.removeClass("df-hard-page");
                    c.front.css({
                        display: "block"
                    });
                    c.back.css({
                        display: "block"
                    })
                }
                i(c.element).attr("pageNumber", h);
                c.visible = h >= 0 && h < o;
                if (this.requestPage !== void 0 && c.visible == true) {
                    if (n) h = Math.floor(this.pageCount / 2) - h - 1;
                    c.name = h.toString();
                    if (c.name != g) {
                        c.backTextureLoaded = false;
                        c.frontTextureLoaded = false;
                        c.thumbLoaded = false;
                        this.requestPage(h * 2 + 1);
                        this.requestPage(h * 2 + 2)
                    }
                }
                c.isEdge = false;
                if (l == 0) {} else if (l == r - 1) {} else {
                    c.isEdge = false
                }
                if (l < s) {
                    f = d.left
                } else {
                    f = d.right
                }
                if (c.isFlipping == false) {
                    if (f !== u && c.skipFlip == false) {
                        this.animatePage(c);
                        if (this.preFlipCallback !== void 0) this.preFlipCallback()
                    } else {
                        c.skipFlip = false;
                        c.element.removeClass("df-flipping df-quick-turn df-folding df-left-side df-right-side");
                        c.element.addClass(l < s ? "df-left-side" : "df-right-side");
                        c.side = f
                    }
                }
                c.oldDepth = c.depth;
                c.updateCSS({
                    display: c.visible == true ? "block" : "none",
                    zIndex: 6 + (l < s ? l - s : s - l),
                    transform: ""
                });
                if (c.pendingPoint == void 0) {
                    c.resetCSS()
                }
            }
            if (TWEEN.getAll().length == 0) {
                clearInterval(this.animate)
            }
            i(".quick-hint").html(e);
            this.oldBaseNumber = e;
            if (this.updatePageCallback !== void 0) this.updatePageCallback()
        };
        r.prototype.animatePage = function(e) {
            e.element.addClass("df-flipping");
            e.isFlipping = true;
            if (this.animate !== void 0) {
                clearInterval(this.animate)
            }
            this.animate = setInterval(this.animateF, 30);
            e.tween(e.pendingPoint)
        };
        return r
    }({});
    var q = function(e) {
        B(n, e);

        function n(t, i, n) {
            e.call(this, n);
            var a = this;
            a.type = "FlipBook";
            a.container = t;
            a.activePage = 0;
            a.options = n;
            a.options.source = i;
            a.contentSource = i;
            a.container.css({
                position: "relative",
                overflow: "hidden",
                backgroundColor: n.backgroundColor
            });
            var o = a.webgl = n.webgl == true && F == true;
            t.addClass("df-container df-loading");
            a.init(o, i);
            if (a.options.onCreate !== void 0) a.options.onCreate();
            return a
        }
        n.prototype.init = function(e) {
            var n = this;
            var a = n.target;
            var o = n.options;
            if (e == true) {
                A(function() {
                    var r = i("<canvas/>");
                    n.container.append(r);
                    n.container.css({
                        minHeight: 300,
                        minWidth: 300
                    });
                    n.stage = new _(L(n.options, {
                        canvas: r[0]
                    }));
                    n.stage.previewObject = n;
                    n.contentProvider = new U(n.contentSource, function(o) {
                        var r = {
                            pageCount: Math.ceil(o.pageCount / 2) * 2,
                            stackCount: 6,
                            segments: 20,
                            width: 300 * o.pageRatio,
                            height: 300
                        };
                        n.target = a = n.stage.target = new MOCKUP.Book(L(n.options, r), n.stage);
                        z(n.container, n);
                        a.ui = n.ui;
                        a.container = n.container;
                        o.webgl = e;
                        o.setTarget(n.target);
                        a.getContentLayer = function(e) {
                            var i = a.direction == t.DIRECTION.RTL,
                                o = n.stage.cssScene.divLeft.element,
                                r = n.stage.cssScene.divRight.element;
                            var s = R(a._activePage);
                            if (e % 2 == 0) return i ? r : o;
                            else return i ? o : r
                        };
                        a.stage = n.stage;
                        a.flipCallback = function() {
                            n.contentProvider.review("flipCallback");
                            var e = R(a._activePage);
                            var o, r;
                            var s = a.getPageByNumber(e),
                                l = a.getPageByNumber(e + 1);
                            var c = a.parent.cssScene.divLeft,
                                d = a.parent.cssScene.divRight;
                            var u = a.pageMode == t.PAGE_MODE.SINGLE;
                            var f = a.direction == t.DIRECTION.RTL;
                            if (s !== void 0 && c !== void 0) {
                                o = Math.abs(s.geometry.boundingBox.max.x - s.geometry.boundingBox.min.x);
                                r = Math.abs(s.geometry.boundingBox.max.z - s.geometry.boundingBox.min.z);
                                c.rotation.y = -Math.atan2(r, o) * .9;
                                c.position.z = r * .8;
                                c.position.x = r / 2.5;
                                i(c.element).css({
                                    width: o,
                                    left: -o / 2
                                })
                            }
                            if (l !== void 0 && d !== void 0) {
                                o = Math.abs(l.geometry.boundingBox.max.x - l.geometry.boundingBox.min.x);
                                r = Math.abs(l.geometry.boundingBox.max.z - l.geometry.boundingBox.min.z);
                                d.rotation.y = Math.atan2(r, o) * .9;
                                d.position.z = r * .8;
                                d.position.x = -r / 2.5;
                                i(d.element).css({
                                    width: o,
                                    left: o / 2
                                })
                            }
                            if (n.options.onFlip !== void 0) n.options.onFlip()
                        };
                        a.resize = function() {
                            n.resize()
                        }();
                        a.updatePageCallback = function() {
                            n.ui.update();
                            n.checkCenter();
                            n.stage.renderRequestPending = true
                        };
                        a.preFlipCallback = function() {
                            if (n.options.beforeFlip !== void 0) n.options.beforeFlip();
                            n.playSound()
                        };
                        i(window).trigger("resize");
                        var s = n.stage.cssScene.divLeft;
                        var l = n.stage.cssScene.divRight;
                        i(s.element).css({
                            width: 300 * o.pageRatio,
                            height: 300,
                            left: -300 * o.pageRatio / 2
                        });
                        i(l.element).css({
                            width: 300 * o.pageRatio,
                            height: 300,
                            left: 300 * o.pageRatio / 2
                        });
                        a.ease = TWEEN.Easing.Cubic.InOut;
                        a.contentProvider = o;
                        a.duration = n.options.duration;
                        a.gotoPage(a.startPage);
                        a.flipCallback();
                        if (n.options.onReady !== void 0) n.options.onReady()
                    }, o)
                })
            } else {
                n.contentProvider = new U(n.contentSource, function(t) {
                    var o = {
                        pageCount: Math.ceil(t.pageCount / 2) * 2
                    };
                    n.target = a = new V(L(n.options, o), n.container);
                    n.target.previewObject = n;
                    z(n.container, n);
                    t.webgl = e;
                    t.setTarget(n.target);
                    t.waitPeriod = 2;
                    a.ease = TWEEN.Easing.Quadratic.InOut;
                    a.duration = n.options.duration;
                    a.container = n.container;
                    a.updatePageCallback = function() {
                        n.ui.update();
                        n.checkCenter()
                    };
                    a.gotoPage(a.startPage);
                    a.resize = function() {
                        n.resize()
                    }();
                    i(window).trigger("resize");
                    a.flipCallback = function() {
                        n.contentProvider.review("flipCallback");
                        if (n.options.onFlip !== void 0) n.options.onFlip()
                    };
                    a.preFlipCallback = function() {
                        if (n.options.beforeFlip !== void 0) n.options.beforeFlip();
                        n.playSound()
                    };
                    if (n.options.onReady !== void 0) n.options.onReady()
                }, o)
            }
        };
        n.prototype.end = function() {
            this.target.gotoPage(this.target.endPage)
        };
        n.prototype.gotoPage = function(e) {
            this.target.gotoPage(e);
            if (this.ui !== void 0) this.ui.update()
        };
        n.prototype.prev = function() {
            this.target.prev()
        };
        n.prototype.next = function() {
            this.target.next()
        };
        return n
    }(H);
    var G = function(e) {
        B(n, e);

        function n(i, n, a) {
            e.call(this, a);
            var o = this;
            o.type = "FlipBook";
            a.width = a.width || 297;
            a.height = a.height || 210;
            a.stiffness = .05;
            o.container = i;
            o.container.css({
                position: "relative",
                overflow: "hidden"
            });
            o.contentSource = n;
            a.minTextureSize = a.maxTextureSize;
            o.pageCount = 6;
            o.options = a;
            this.direction = a.direction || t.DIRECTION.LTR;
            this.startPage = this.direction == t.DIRECTION.RTL ? this.pageCount : 1;
            this.endPage = this.direction == t.DIRECTION.RTL ? 1 : this.pageCount;
            o._activePage = this.startPage;
            this.trifold = void 0;
            var r = o.webgl = a.webgl == true;
            o.init(r, n);
            return o
        }
        n.prototype.getPageByNumber = function() {
            return this.trifold
        };
        n.prototype.init = function(e) {
            var t = this;
            var n;
            if (e == true) {
                A(function() {
                    var e = i("<canvas/>");
                    t.container.append(e);
                    t.container.css({
                        minHeight: 300,
                        minWidth: 360
                    });
                    var a = t.stage = new _(L(t.options, {
                        canvas: e[0]
                    }));
                    i(window).trigger("resize");
                    t.box = new THREE.BoxHelper;
                    a.add(t.box);
                    t.stage.previewObject = t;
                    t.contentProvider = new U(t.contentSource, function(e) {
                        var o = {
                            pageCount: Math.ceil(e.pageCount / 2) * 2,
                            stackCount: 6,
                            segments: 50,
                            width: 300 * e.pageRatio,
                            height: 300
                        };
                        n = t.target = a.target = new MOCKUP.TriFold(L(t.options, o), a);
                        n.stage = a;
                        n.ui = t.ui;
                        n.name = "self";
                        n.container = t.container;
                        z(t.container, t);
                        n.refresh = function() {
                            t.refresh()
                        };
                        e.setTarget(n);
                        n.next = function() {
                            t.next()
                        };
                        n.prev = function() {
                            t.prev()
                        };
                        n.getPageByNumber = function() {
                            return n
                        };
                        n.getContentLayer = function(e) {
                            var t = R(n._activePage);
                            if (e % 2 == 0 && e == t) return a.cssScene.divLeft.element;
                            else if (e == t + 1) return a.cssScene.divRight.element;
                            else return void 0
                        };
                        n.resize = function() {
                            t.resize()
                        }();
                        n.updatePageCallback = function() {
                            t.ui.update()
                        };
                        e.minDimension = 2048;
                        n.ease = TWEEN.Easing.Quadratic.InOut;
                        n.duration = t.options.duration;
                        n.processPage(1);
                        n.processPage(2);
                        i(window).trigger("resize");
                        n.refresh()
                    }, t.options)
                })
            } else {
                console.warn("CSS Fallback yet to come.")
            }
        };
        n.prototype.end = function() {
            this.gotoPage(this.endPage)
        };
        n.prototype.gotoPage = function(e) {
            this._activePage = e;
            this.refresh()
        };
        n.prototype.prev = function() {
            this._activePage--;
            this.refresh()
        };
        n.prototype.next = function() {
            this._activePage++;
            this.refresh()
        };
        n.prototype.refresh = function() {
            var e = this._activePage > this.oldPage;
            var t = this.target;
            var n = this;
            if (this._activePage > this.pageCount) this._activePage = 1;
            if (this._activePage < 1) this._activePage = this.pageCount;
            t._activePage = n._activePage;
            var a = {
                angle: t.angles[1],
                angle2: t.angles[4],
                rotation: t.rotation.y,
                position: t.position.y
            };
            t.init = {
                angle: a.angle,
                angle2: a.angle2,
                rotation: a.rotation,
                position: a.position
            };
            i(".df-quick-hint").html(this._activePage);
            switch (this._activePage) {
                case 1:
                    t.mid = {
                        angle: e ? 90 : 178,
                        angle2: 180,
                        rotation: e ? -Math.PI / 2 : 0,
                        position: t.width / 3
                    };
                    t.end = {
                        angle: 178,
                        angle2: 180,
                        rotation: 0,
                        position: 2
                    };
                    break;
                case 2:
                    t.mid = {
                        angle: 2,
                        angle2: 90,
                        rotation: 0,
                        position: 2
                    };
                    t.end = {
                        angle: 2,
                        angle2: 180,
                        rotation: 0,
                        position: 1
                    };
                    break;
                case 3:
                    t.mid = {
                        angle: 180,
                        angle2: 2,
                        rotation: 0,
                        position: 2
                    };
                    t.end = {
                        angle: 2,
                        angle2: 2,
                        rotation: 0,
                        position: 1
                    };
                    break;
                case 4:
                    t.mid = {
                        angle: e ? 2 : 90,
                        angle2: e ? 90 : 90,
                        rotation: e ? 0 : -Math.PI / 2,
                        position: e ? 1 : t.width / 3
                    };
                    t.end = {
                        angle: 2,
                        angle2: 178,
                        rotation: 0,
                        position: 1
                    };
                    break;
                case 5:
                    t.mid = {
                        angle: 90,
                        angle2: e ? 90 : 2,
                        rotation: e ? -Math.PI / 2 : -Math.PI,
                        position: e ? t.width / 3 : 3
                    };
                    t.end = {
                        angle: 178,
                        angle2: 2,
                        rotation: -Math.PI,
                        position: 3
                    };
                    break;
                case 6:
                    t.mid = {
                        angle: 178,
                        angle2: 178,
                        rotation: -Math.PI / 2,
                        position: t.width / 3
                    };
                    t.end = {
                        angle: 2,
                        angle2: 2,
                        rotation: -Math.PI,
                        position: 3
                    };
                    break;
                case 222:
                    t.mid = {
                        angle: 90,
                        angle2: 90,
                        rotation: -Math.PI,
                        position: t.width / 3
                    };
                    t.end = {
                        angle: 178,
                        angle2: 180,
                        rotation: -Math.PI,
                        position: 2
                    };
                    break;
                default:
                    break
            }
            n.oldPage = n.activePage;
            S(t.init, t.mid, t.end);
            n.isFlipping = true;
            var o = function(e) {
                if (isNaN(e.angle) || isNaN(e.angle2) || isNaN(e.rotation)) return;
                t.angles[1] = e.angle;
                t.angles[4] = e.angle2;
                t.rotation.y = e.rotation;
                t.updateAngle();
                n.box.update(t);
                n.box.visible = false;
                t.position.z = t.position.z - n.box.geometry.attributes.position.array[20]
            };
            var r;
            if (t.mid !== void 0) {
                r = new TWEEN.Tween(t.init).delay(0).to(t.mid, t.duration * .5).onUpdate(function() {
                    o(this)
                }).easing(TWEEN.Easing.Linear.None).chain(new TWEEN.Tween(t.init).delay(0).to(t.end, t.duration * .5).onUpdate(function() {
                    o(this)
                }).easing(TWEEN.Easing.Linear.None))
            } else {
                r = new TWEEN.Tween(t.init).delay(0).to(t.end, t.duration).onUpdate(function() {
                    o(this)
                }).easing(TWEEN.Easing.Linear.None)
            }
            r.onComplete(function() {
                t.updateAngle();
                t.isFlipping = false
            }).start();
            if (t.updatePageCallback !== void 0) t.updatePageCallback()
        };
        return n
    }(H);
    i.fn.extend({
        shelf: function() {},
        flipBook: function(e, t) {
            return new q(i(this), e, N(t))
        },
        triFold: function(e, t) {
            return new G(i(this), e, N(t))
        }
    })
})(DFLIP, jQuery);
(function(e) {
    "use strict";
    e.URL = e.URL || e.webkitURL;
    if (e.Blob && e.URL) {
        try {
            new Blob;
            return
        } catch (t) {}
    }
    var i = e.BlobBuilder || e.WebKitBlobBuilder || e.MozBlobBuilder || function(e) {
        var t = function(e) {
                return Object.prototype.toString.call(e).match(/^\[object\s(.*)\]$/)[1]
            },
            i = function b() {
                this.data = []
            },
            n = function P(e, t, i) {
                this.data = e;
                this.size = e.length;
                this.type = t;
                this.encoding = i
            },
            a = i.prototype,
            o = n.prototype,
            r = e.FileReaderSync,
            s = function(e) {
                this.code = this[this.name = e]
            },
            l = ("NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR " + "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR").split(" "),
            c = l.length,
            d = e.URL || e.webkitURL || e,
            u = d.createObjectURL,
            f = d.revokeObjectURL,
            h = d,
            g = e.btoa,
            p = e.atob,
            v = e.ArrayBuffer,
            m = e.Uint8Array,
            w = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;
        n.fake = o.fake = true;
        while (c--) {
            s.prototype[l[c]] = c + 1
        }
        if (!d.createObjectURL) {
            h = e.URL = function(e) {
                var t = document.createElementNS("http://www.w3.org/1999/xhtml", "a"),
                    i;
                t.href = e;
                if (!("origin" in t)) {
                    if (t.protocol.toLowerCase() === "data:") {
                        t.origin = null
                    } else {
                        i = e.match(w);
                        t.origin = i && i[1]
                    }
                }
                return t
            }
        }
        h.createObjectURL = function(e) {
            var t = e.type,
                i;
            if (t === null) {
                t = "application/octet-stream"
            }
            if (e instanceof n) {
                i = "data:" + t;
                if (e.encoding === "base64") {
                    return i + ";base64," + e.data
                } else if (e.encoding === "URI") {
                    return i + "," + decodeURIComponent(e.data)
                }
                if (g) {
                    return i + ";base64," + g(e.data)
                } else {
                    return i + "," + encodeURIComponent(e.data)
                }
            } else if (u) {
                return u.call(d, e)
            }
        };
        h.revokeObjectURL = function(e) {
            if (e.substring(0, 5) !== "data:" && f) {
                f.call(d, e)
            }
        };
        a.append = function(e) {
            var i = this.data;
            if (m && (e instanceof v || e instanceof m)) {
                var a = "",
                    o = new m(e),
                    l = 0,
                    c = o.length;
                for (; l < c; l++) {
                    a += String.fromCharCode(o[l])
                }
                i.push(a)
            } else if (t(e) === "Blob" || t(e) === "File") {
                if (r) {
                    var d = new r;
                    i.push(d.readAsBinaryString(e))
                } else {
                    throw new s("NOT_READABLE_ERR")
                }
            } else if (e instanceof n) {
                if (e.encoding === "base64" && p) {
                    i.push(p(e.data))
                } else if (e.encoding === "URI") {
                    i.push(decodeURIComponent(e.data))
                } else if (e.encoding === "raw") {
                    i.push(e.data)
                }
            } else {
                if (typeof e !== "string") {
                    e += ""
                }
                i.push(unescape(encodeURIComponent(e)))
            }
        };
        a.getBlob = function(e) {
            if (!arguments.length) {
                e = null
            }
            return new n(this.data.join(""), e, "raw")
        };
        a.toString = function() {
            return "[object BlobBuilder]"
        };
        o.slice = function(e, t, i) {
            var a = arguments.length;
            if (a < 3) {
                i = null
            }
            return new n(this.data.slice(e, a > 1 ? t : this.data.length), i, this.encoding)
        };
        o.toString = function() {
            return "[object Blob]"
        };
        o.close = function() {
            this.size = 0;
            delete this.data
        };
        return i
    }(e);
    e.Blob = function(e, t) {
        var n = t ? t.type || "" : "";
        var a = new i;
        if (e) {
            for (var o = 0, r = e.length; o < r; o++) {
                if (Uint8Array && e[o] instanceof Uint8Array) {
                    a.append(e[o].buffer)
                } else {
                    a.append(e[o])
                }
            }
        }
        var s = a.getBlob(n);
        if (!s.slice && s.webkitSlice) {
            s.slice = s.webkitSlice
        }
        return s
    };
    var n = Object.getPrototypeOf || function(e) {
        return e.__proto__
    };
    e.Blob.prototype = n(new e.Blob)
})(window);
(function(e) {
    "use strict";
    var t = e.Uint8Array,
        i = e.HTMLCanvasElement,
        n = i && i.prototype,
        a = /\s*;\s*base64\s*(?:;|$)/i,
        o = "toDataURL",
        r, s = function(e) {
            var i = e.length,
                n = new t(i / 4 * 3 | 0),
                a = 0,
                o = 0,
                s = [0, 0],
                l = 0,
                c = 0,
                d, u;
            while (i--) {
                u = e.charCodeAt(a++);
                d = r[u - 43];
                if (d !== 255 && d !== void 0) {
                    s[1] = s[0];
                    s[0] = u;
                    c = c << 6 | d;
                    l++;
                    if (l === 4) {
                        n[o++] = c >>> 16;
                        if (s[1] !== 61) {
                            n[o++] = c >>> 8
                        }
                        if (s[0] !== 61) {
                            n[o++] = c
                        }
                        l = 0
                    }
                }
            }
            return n
        };
    if (t) {
        r = new t([62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51])
    }
    if (i && !n.toBlob) {
        n.toBlob = function(e, i) {
            if (!i) {
                i = "image/png"
            }
            if (this.mozGetAsFile) {
                e(this.mozGetAsFile("canvas", i));
                return
            }
            if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(i)) {
                e(this.msToBlob());
                return
            }
            var n = Array.prototype.slice.call(arguments, 1),
                r = this[o].apply(this, n),
                l = r.indexOf(","),
                c = r.substring(l + 1),
                d = a.test(r.substring(0, l)),
                u;
            if (Blob.fake) {
                u = new Blob;
                if (d) {
                    u.encoding = "base64"
                } else {
                    u.encoding = "URI"
                }
                u.data = c;
                u.size = c.length
            } else if (t) {
                if (d) {
                    u = new Blob([s(c)], {
                        type: i
                    })
                } else {
                    u = new Blob([decodeURIComponent(c)], {
                        type: i
                    })
                }
            }
            e(u)
        };
        if (n.toDataURLHD) {
            n.toBlobHD = function() {
                o = "toDataURLHD";
                var e = this.toBlob();
                o = "toDataURL";
                return e
            }
        } else {
            n.toBlobHD = n.toBlob
        }
    }
})(window);
(function t() {
    if ("performance" in window === false) {
        window.performance = {}
    }
    Date.now = Date.now || function() {
        return (new Date).getTime()
    };
    if ("now" in window.performance === false) {
        var e = window.performance.timing && window.performance.timing.navigationStart ? window.performance.timing.navigationStart : Date.now();
        window.performance.now = function() {
            return Date.now() - e
        }
    }
})();
(function i() {
    var e = e || function() {
        var e = [];
        return {
            getAll: function() {
                return e
            },
            removeAll: function() {
                e = []
            },
            add: function(t) {
                e.push(t)
            },
            remove: function(t) {
                var i = e.indexOf(t);
                if (i !== -1) {
                    e.splice(i, 1)
                }
            },
            update: function(t) {
                if (e.length === 0) {
                    return false
                }
                var i = 0;
                t = t !== void 0 ? t : window.performance.now();
                while (i < e.length) {
                    if (e[i].update(t)) {
                        i++
                    } else {
                        e.splice(i, 1)
                    }
                }
                return true
            }
        }
    }();
    e.Tween = function(t) {
        var i = t;
        var n = {};
        var a = {};
        var o = {};
        var r = 1e3;
        var s = 0;
        var l = false;
        var c = false;
        var d = false;
        var u = 0;
        var f = null;
        var h = e.Easing.Linear.None;
        var g = e.Interpolation.Linear;
        var p = [];
        var v = null;
        var m = false;
        var w = null;
        var b = null;
        var P = null;
        for (var C in t) {
            n[C] = parseFloat(t[C], 10)
        }
        this.to = function(e, t) {
            if (t !== void 0) {
                r = t
            }
            a = e;
            return this
        };
        this.start = function(t) {
            e.add(this);
            c = true;
            m = false;
            f = t !== void 0 ? t : window.performance.now();
            f += u;
            for (var r in a) {
                if (a[r] instanceof Array) {
                    if (a[r].length === 0) {
                        continue
                    }
                    a[r] = [i[r]].concat(a[r])
                }
                if (n[r] === void 0) {
                    continue
                }
                n[r] = i[r];
                if (n[r] instanceof Array === false) {
                    n[r] *= 1
                }
                o[r] = n[r] || 0
            }
            return this
        };
        this.stop = function() {
            if (!c) {
                return this
            }
            e.remove(this);
            c = false;
            if (P !== null) {
                P.call(i)
            }
            this.stopChainedTweens();
            return this
        };
        this.stopChainedTweens = function() {
            for (var e = 0, t = p.length; e < t; e++) {
                p[e].stop()
            }
        };
        this.complete = function() {
            if (!c) {
                return this
            }
            e.remove(this);
            c = false;
            if (b !== null) {
                b.call(i)
            }
            this.completeChainedTweens();
            return this
        };
        this.completeChainedTweens = function() {
            for (var e = 0, t = p.length; e < t; e++) {
                p[e].complete()
            }
        };
        this.delay = function(e) {
            u = e;
            return this
        };
        this.repeat = function(e) {
            s = e;
            return this
        };
        this.yoyo = function(e) {
            l = e;
            return this
        };
        this.easing = function(e) {
            h = e == void 0 ? h : e;
            return this
        };
        this.interpolation = function(e) {
            g = e;
            return this
        };
        this.chain = function() {
            p = arguments;
            return this
        };
        this.onStart = function(e) {
            v = e;
            return this
        };
        this.onUpdate = function(e) {
            w = e;
            return this
        };
        this.onComplete = function(e) {
            b = e;
            return this
        };
        this.onStop = function(e) {
            P = e;
            return this
        };
        this.update = function(e) {
            var t;
            var c;
            var P;
            if (e < f) {
                return true
            }
            if (m === false) {
                if (v !== null) {
                    v.call(i)
                }
                m = true
            }
            c = (e - f) / r;
            c = c > 1 ? 1 : c;
            P = h(c);
            for (t in a) {
                if (n[t] === void 0) {
                    continue
                }
                var C = n[t] || 0;
                var y = a[t];
                if (y instanceof Array) {
                    i[t] = g(y, P)
                } else {
                    if (typeof y === "string") {
                        if (y.startsWith("+") || y.startsWith("-")) {
                            y = C + parseFloat(y, 10)
                        } else {
                            y = parseFloat(y, 10)
                        }
                    }
                    if (typeof y === "number") {
                        i[t] = C + (y - C) * P
                    }
                }
            }
            if (w !== null) {
                w.call(i, P)
            }
            if (c === 1) {
                if (s > 0) {
                    if (isFinite(s)) {
                        s--
                    }
                    for (t in o) {
                        if (typeof a[t] === "string") {
                            o[t] = o[t] + parseFloat(a[t], 10)
                        }
                        if (l) {
                            var x = o[t];
                            o[t] = a[t];
                            a[t] = x
                        }
                        n[t] = o[t]
                    }
                    if (l) {
                        d = !d
                    }
                    f = e + u;
                    return true
                } else {
                    if (b !== null) {
                        b.call(i)
                    }
                    for (var E = 0, k = p.length; E < k; E++) {
                        p[E].start(f + r)
                    }
                    return false
                }
            }
            return true
        }
    };
    e.Easing = {
        Linear: {
            None: function(e) {
                return e
            }
        },
        Quadratic: {
            In: function(e) {
                return e * e
            },
            Out: function(e) {
                return e * (2 - e)
            },
            InOut: function(e) {
                if ((e *= 2) < 1) {
                    return .5 * e * e
                }
                return -.5 * (--e * (e - 2) - 1)
            }
        },
        Quartic: {
            In: function(e) {
                return e * e * e * e
            },
            Out: function(e) {
                return 1 - --e * e * e * e
            },
            InOut: function(e) {
                if ((e *= 2) < 1) {
                    return .5 * e * e * e * e
                }
                return -.5 * ((e -= 2) * e * e * e - 2)
            }
        },
        Sinusoidal: {
            In: function(e) {
                return 1 - Math.cos(e * Math.PI / 2)
            },
            Out: function(e) {
                return Math.sin(e * Math.PI / 2)
            },
            InOut: function(e) {
                return .5 * (1 - Math.cos(Math.PI * e))
            }
        },
        Cubic: {
            In: function(e) {
                return e * e * e
            },
            Out: function(e) {
                return --e * e * e + 1
            },
            InOut: function(e) {
                if ((e *= 2) < 1) {
                    return .5 * e * e * e
                }
                return .5 * ((e -= 2) * e * e + 2)
            }
        }
    };
    e.Interpolation = {
        Linear: function(t, i) {
            var n = t.length - 1;
            var a = n * i;
            var o = Math.floor(a);
            var r = e.Interpolation.Utils.Linear;
            if (i < 0) {
                return r(t[0], t[1], a)
            }
            if (i > 1) {
                return r(t[n], t[n - 1], n - a)
            }
            return r(t[o], t[o + 1 > n ? n : o + 1], a - o)
        },
        Bezier: function(t, i) {
            var n = 0;
            var a = t.length - 1;
            var o = Math.pow;
            var r = e.Interpolation.Utils.Bernstein;
            for (var s = 0; s <= a; s++) {
                n += o(1 - i, a - s) * o(i, s) * t[s] * r(a, s)
            }
            return n
        },
        Utils: {
            Linear: function(e, t, i) {
                return (t - e) * i + e
            },
            Bernstein: function(t, i) {
                var n = e.Interpolation.Utils.Factorial;
                return n(t) / n(i) / n(t - i)
            },
            Factorial: function() {
                var e = [1];
                return function(t) {
                    var i = 1;
                    if (e[t]) {
                        return e[t]
                    }
                    for (var n = t; n > 1; n--) {
                        i *= n
                    }
                    e[t] = i;
                    return i
                }
            }(),
            CatmullRom: function(e, t, i, n, a) {
                var o = (i - e) * .5;
                var r = (n - t) * .5;
                var s = a * a;
                var l = a * s;
                return (2 * t - 2 * i + o + r) * l + (-3 * t + 3 * i - 2 * o - r) * s + o * a + t
            }
        }
    };
    window.TWEEN = e
})();
DFLIP.createBlob = function n(e, t) {
    if (typeof Blob !== "undefined") {
        return new Blob([e], {
            type: t
        })
    }
    var i = new MozBlobBuilder;
    i.append(e);
    return i.getBlob(t)
};
DFLIP.createObjectURL = function a() {
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    return function t(i, n) {
        if (typeof URL !== "undefined" && URL.createObjectURL) {
            var a = DFLIP.createBlob(i, n);
            return URL.createObjectURL(a)
        }
        var o = "data:" + n + ";base64,";
        for (var r = 0, s = i.length; r < s; r += 3) {
            var l = i[r] & 255;
            var c = i[r + 1] & 255;
            var d = i[r + 2] & 255;
            var u = l >> 2,
                f = (l & 3) << 4 | c >> 4;
            var h = r + 1 < s ? (c & 15) << 2 | d >> 6 : 64;
            var g = r + 2 < s ? d & 63 : 64;
            o += e[u] + e[f] + e[h] + e[g]
        }
        return o
    }
}();
var ThumbList = function o() {
    function e(t) {
        var i = t && t.w + "px" || "100%";
        var n = t && t.h + "px" || "100%";
        var a = this.itemHeight = t.itemHeight;
        this.items = t.items;
        this.generatorFn = t.generatorFn;
        this.totalRows = t.totalRows || t.items && t.items.length;
        this.addFn = t.addFn;
        this.scrollFn = t.scrollFn;
        var o = e.createScroller(a * this.totalRows);
        this.container = e.createContainer(i, n);
        this.container.appendChild(o);
        this.screenItemsLen = Math.ceil(t.h / a);
        this.offsetItems = this.screenItemsLen;
        this.cachedItemsLen = this.screenItemsLen + this.offsetItems * 2;
        this._renderChunk(this.container, 0);
        var r = this;
        r.lastRepaintY = 0;
        var s = this.screenItemsLen * a;
        var l = 0;
        var c;

        function d(e) {
            var t = e.target.scrollTop;
            if (!r.lastRepaintY || Math.abs(t - r.lastRepaintY) >= r.offsetItems * r.itemHeight) {
                var i = parseInt(t / a, 10) - r.offsetItems;
                r._renderChunk(r.container, i < 0 ? 0 : i);
                r.lastRepaintY = t
            }
            r.lastScrolled = l = Date.now();
            if (r.scrollFn !== void 0) {
                r.scrollFn()
            }
            e.preventDefault && e.preventDefault()
        }
        r.dispose = function() {
            if (r.container) {
                if (r.container.parentNode) {
                    r.container.parentNode.removeChild(r.container)
                }
            }
            r.container.removeEventListener("scroll", d)
        };
        r.container.addEventListener("scroll", d)
    }
    e.prototype.reset = function(e) {
        this.screenItemsLen = Math.ceil(e / this.itemHeight);
        this.cachedItemsLen = this.screenItemsLen + this.offsetItems * 2;
        var t = parseInt(this.lastRepaintY / this.itemHeight, 10) - this.offsetItems;
        this.needReset = true;
        this._renderChunk(this.container, Math.max(t, 0))
    };
    e.prototype.createRow = function(e) {
        var t;
        if (this.generatorFn) {
            t = this.generatorFn(e);
            t.classList.add("df-vrow");
            t.style.position = "absolute";
            t.style.top = e * this.itemHeight + "px";
            t.setAttribute("index", e)
        }
        return t
    };
    e.prototype._renderChunk = function(e, t) {
        var i = this.range == void 0;
        this.range = this.range || {
            min: 0,
            max: this.cachedItemsLen
        };
        var n = this.range;
        var a = n.min,
            o = n.max;
        var r = i ? true : t >= a;
        if (!i && t == a && this.needReset == false) return;
        var s;
        var l = i ? a : r ? o : t;
        l = l > this.totalRows ? this.totalRows : l < 0 ? 0 : l;
        var c = t + this.cachedItemsLen;
        c = c > this.totalRows ? this.totalRows : c;
        for (s = l; s < c; s++) {
            if (r) e.appendChild(this.createRow(s));
            else e.insertBefore(this.createRow(s), e.childNodes[1 + s - l]);
            if (this.addFn !== void 0) {
                this.addFn(s)
            }
        }
        var d = Math.abs(t - a);
        this.needReset = false;
        if (!i && e.childNodes.length > this.cachedItemsLen + 1) {
            var u = r ? 1 : 1 + this.cachedItemsLen,
                f = u + (c - l);
            for (var h = f; h > u; h--) {
                if (e.childNodes[u]) this.container.removeChild(e.childNodes[u])
            }
        }
        this.range.min = t;
        this.range.max = c
    };
    e.createContainer = function(e, t) {
        var i = document.createElement("div");
        i.style.width = e;
        i.style.height = t;
        i.style.overflow = "auto";
        i.style.position = "relative";
        i.style.padding = 0;
        return i
    };
    e.createScroller = function(e) {
        var t = document.createElement("div");
        t.style.opacity = 0;
        t.style.position = "absolute";
        t.style.top = 0;
        t.style.left = 0;
        t.style.width = "1px";
        t.style.height = e + "px";
        return t
    };
    return e
}();
var BookMarkViewer = function r() {
    function e(e) {
        this.outline = null;
        this.lastToggleIsShow = true;
        this.container = e.container;
        this.linkService = e.linkService;
        this.outlineItemClass = e.outlineItemClass || "outlineItem";
        this.outlineToggleClass = e.outlineToggleClass || "outlineItemToggler";
        this.outlineToggleHiddenClass = e.outlineToggleHiddenClass || "outlineItemsHidden"
    }
    e.prototype = {
        dispose: function() {
            if (this.container) {
                if (this.container.parentNode) {
                    this.container.parentNode.removeChild(this.container)
                }
            }
            this.linkService = null
        },
        reset: function t() {
            this.outline = null;
            this.lastToggleIsShow = true;
            var e = this.container;
            while (e.firstChild) {
                e.removeChild(e.firstChild)
            }
        },
        _dispatchEvent: function i(e) {
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("outlineloaded", true, true, {
                outlineCount: e
            });
            this.container.dispatchEvent(t)
        },
        _bindLink: function n(e, t) {
            var i = this.linkService;
            if (t.custom == true) {
                e.href = i.getCustomDestinationHash(t.dest);
                e.onclick = function n(e) {
                    i.customNavigateTo(t.dest);
                    return false
                }
            } else {
                if (t.url) {
                    PDFJS.addLinkAttributes(e, {
                        url: t.url
                    });
                    return
                }
                e.href = i.getDestinationHash(t.dest);
                e.onclick = function a(e) {
                    i.navigateTo(t.dest);
                    return false
                }
            }
        },
        _addToggleButton: function a(e) {
            var t = document.createElement("div");
            t.className = this.outlineToggleClass + " " + this.outlineToggleHiddenClass;
            t.onclick = function(i) {
                i.stopPropagation();
                t.classList.toggle(this.outlineToggleHiddenClass);
                if (i.shiftKey) {
                    var n = !t.classList.contains(this.outlineToggleHiddenClass);
                    this._toggleOutlineItem(e, n)
                }
            }.bind(this);
            e.insertBefore(t, e.firstChild)
        },
        _toggleOutlineItem: function o(e, t) {
            this.lastToggleIsShow = t;
            var i = e.querySelectorAll("." + this.outlineToggleClass);
            for (var n = 0, a = i.length; n < a; ++n) {
                i[n].classList[t ? "remove" : "add"](this.outlineToggleHiddenClass)
            }
        },
        toggleOutlineTree: function r() {
            if (!this.outline) {
                return
            }
            this._toggleOutlineItem(this.container, !this.lastToggleIsShow)
        },
        render: function s(e) {
            var t = e && e.outline || null;
            var i = 0;
            if (this.outline) {
                this.reset()
            }
            this.outline = t;
            if (!t) {
                return
            }
            var n = document.createDocumentFragment();
            var a = [{
                parent: n,
                items: this.outline
            }];
            var o = false;
            while (a.length > 0) {
                var r = a.shift();
                var s = r.custom;
                for (var l = 0, c = r.items.length; l < c; l++) {
                    var d = r.items[l];
                    var u = document.createElement("div");
                    u.className = this.outlineItemClass;
                    var f = document.createElement("a");
                    if (d.custom == void 0 && s !== void 0) d.custom = s;
                    this._bindLink(f, d);
                    f.textContent = d.title.replace(/\x00/g, "");
                    u.appendChild(f);
                    if (d.items && d.items.length > 0) {
                        o = true;
                        this._addToggleButton(u);
                        var h = document.createElement("div");
                        h.className = this.outlineItemClass + "s";
                        u.appendChild(h);
                        a.push({
                            parent: h,
                            custom: d.custom,
                            items: d.items
                        })
                    }
                    r.parent.appendChild(u);
                    i++
                }
            }
            if (o) {
                if (this.container.classList != void 0) {
                    this.container.classList.add(this.outlineItemClass + "s")
                } else if (this.container.className != void 0) {
                    this.container.className += " picWindow"
                }
            }
            this.container.appendChild(n);
            this._dispatchEvent(i)
        }
    };
    return e
}();
var DFLightBox = function s(e) {
    function t(t) {
        this.duration = 300;
        var i = this;
        i.lightboxWrapper = e("<div>").addClass("df-lightbox-wrapper");
        i.container = e("<div>").addClass("df-container").appendTo(i.lightboxWrapper);
        i.controls = e("<div>").addClass("df-lightbox-controls").appendTo(i.lightboxWrapper);
        i.closeButton = e("<div>").addClass("df-lightbox-close df-ui-btn ti-close").on("click", function() {
            i.close(t)
        }).appendTo(i.controls);
        i.lightboxWrapper.append(i.container);
        return i
    }
    t.prototype.show = function(t) {
        if (this.lightboxWrapper.parent().length == 0) e("body").append(this.lightboxWrapper);
        this.lightboxWrapper.fadeIn(this.duration, t);
        return this
    };
    t.prototype.close = function(e) {
        this.lightboxWrapper.fadeOut(this.duration, e);
        return this
    };
    return t
}(jQuery);
var PDFLinkService = function() {
    function e() {
        this.baseUrl = null;
        this.pdfDocument = null;
        this.pdfViewer = null;
        this.pdfHistory = null;
        this._pagesRefCache = null
    }
    e.prototype = {
        dispose: function() {
            this.baseUrl = null;
            this.pdfDocument = null;
            this.pdfViewer = null;
            this.pdfHistory = null;
            this._pagesRefCache = null
        },
        setDocument: function t(e, i) {
            this.baseUrl = i;
            this.pdfDocument = e;
            this._pagesRefCache = Object.create(null)
        },
        setViewer: function i(e) {
            this.pdfViewer = e
        },
        setHistory: function n(e) {
            this.pdfHistory = e
        },
        get pagesCount() {
            return this.pdfDocument.numPages
        },
        get page() {
            return this.pdfViewer.currentPageNumber
        },
        set page(e) {
            this.pdfViewer.currentPageNumber = e
        },
        navigateTo: function a(e) {
            var t = "";
            var i = this;
            var n = function(a) {
                var o = a instanceof Object ? i._pagesRefCache[a.num + " " + a.gen + " R"] : a + 1;
                if (o) {
                    if (o > i.pagesCount) {
                        o = i.pagesCount
                    }
                    i.pdfViewer.gotoPage(o);
                    if (i.pdfHistory) {
                        i.pdfHistory.push({
                            dest: e,
                            hash: t,
                            page: o
                        })
                    }
                } else {
                    i.pdfDocument.getPageIndex(a).then(function(e) {
                        var t = e + 1;
                        var o = a.num + " " + a.gen + " R";
                        i._pagesRefCache[o] = t;
                        n(a)
                    })
                }
            };
            var a;
            if (typeof e === "string") {
                t = e;
                a = this.pdfDocument.getDestination(e)
            } else {
                a = Promise.resolve(e)
            }
            a.then(function(t) {
                e = t;
                if (!(t instanceof Array)) {
                    return
                }
                n(t[0])
            })
        },
        customNavigateTo: function o(e) {
            if (e == "" || e == void 0 || e == "void 0") return;
            var t = void 0;
            if (!isNaN(Math.round(e))) {
                t = e
            } else if (typeof e === "string") {
                t = parseInt(e.replace("#", ""), 10);
                if (isNaN(t)) {
                    window.open(e);
                    return
                }
            }
            if (t !== void 0) this.pdfViewer.gotoPage(t)
        },
        getDestinationHash: function r(e) {
            if (typeof e === "string") {
                return this.getAnchorUrl("#" + escape(e))
            }
            if (e instanceof Array) {
                var t = e[0];
                var i = t instanceof Object ? this._pagesRefCache[t.num + " " + t.gen + " R"] : t + 1;
                if (i) {
                    var n = this.getAnchorUrl("#page=" + i);
                    var a = e[1];
                    if (typeof a === "object" && "name" in a && a.name === "XYZ") {
                        var o = e[4] || this.pdfViewer.currentScaleValue;
                        var r = parseFloat(o);
                        if (r) {
                            o = r * 100
                        }
                        n += "&zoom=" + o;
                        if (e[2] || e[3]) {
                            n += "," + (e[2] || 0) + "," + (e[3] || 0)
                        }
                    }
                    return n
                }
            }
            return this.getAnchorUrl("")
        },
        getCustomDestinationHash: function s(e) {
            return "#" + escape(e)
        },
        getAnchorUrl: function l(e) {
            return (this.baseUrl || "") + e
        },
        setHash: function c(e) {
            if (e.indexOf("=") >= 0) {
                var t = parseQueryString(e);
                if ("nameddest" in t) {
                    if (this.pdfHistory) {
                        this.pdfHistory.updateNextHashParam(t.nameddest)
                    }
                    this.navigateTo(t.nameddest);
                    return
                }
                var i, n;
                if ("page" in t) {
                    i = t.page | 0 || 1
                }
                if ("zoom" in t) {
                    var a = t.zoom.split(",");
                    var o = a[0];
                    var r = parseFloat(o);
                    if (o.indexOf("Fit") === -1) {
                        n = [null, {
                            name: "XYZ"
                        }, a.length > 1 ? a[1] | 0 : null, a.length > 2 ? a[2] | 0 : null, r ? r / 100 : o]
                    } else {
                        if (o === "Fit" || o === "FitB") {
                            n = [null, {
                                name: o
                            }]
                        } else if (o === "FitH" || o === "FitBH" || (o === "FitV" || o === "FitBV")) {
                            n = [null, {
                                name: o
                            }, a.length > 1 ? a[1] | 0 : null]
                        } else if (o === "FitR") {
                            if (a.length !== 5) {
                                console.error("PDFLinkService_setHash: " + "Not enough parameters for 'FitR'.")
                            } else {
                                n = [null, {
                                    name: o
                                }, a[1] | 0, a[2] | 0, a[3] | 0, a[4] | 0]
                            }
                        } else {
                            console.error("PDFLinkService_setHash: '" + o + "' is not a valid zoom value.")
                        }
                    }
                }
                if (n) {
                    this.pdfViewer.scrollPageIntoView(i || this.page, n)
                } else if (i) {
                    this.page = i
                }
                if ("pagemode" in t) {
                    var s = document.createEvent("CustomEvent");
                    s.initCustomEvent("pagemode", true, true, {
                        mode: t.pagemode
                    });
                    this.pdfViewer.container.dispatchEvent(s)
                }
            } else if (/^\d+$/.test(e)) {
                this.page = e
            } else {
                if (this.pdfHistory) {
                    this.pdfHistory.updateNextHashParam(unescape(e))
                }
                this.navigateTo(unescape(e))
            }
        },
        executeNamedAction: function d(e) {
            switch (e) {
                case "GoBack":
                    if (this.pdfHistory) {
                        this.pdfHistory.back()
                    }
                    break;
                case "GoForward":
                    if (this.pdfHistory) {
                        this.pdfHistory.forward()
                    }
                    break;
                case "NextPage":
                    this.page++;
                    break;
                case "PrevPage":
                    this.page--;
                    break;
                case "LastPage":
                    this.page = this.pagesCount;
                    break;
                case "FirstPage":
                    this.page = 1;
                    break;
                default:
                    break
            }
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("namedaction", true, true, {
                action: e
            });
            this.pdfViewer.container.dispatchEvent(t)
        },
        cachePageRef: function u(e, t) {
            var i = t.num + " " + t.gen + " R";
            this._pagesRefCache[i] = e
        }
    };
    return e
}();
DFLIP.ConvertPageLinks = function() {
    var e = arguments[0] / 100,
        t = arguments[1] / 100;
    var i = function(i, n, a, o, r) {
        return {
            x: i / e,
            y: n / t,
            w: a / e,
            h: o / t,
            dest: r
        }
    };
    var n = [];
    var a;
    for (var o = 2; o < arguments.length; o++) {
        a = arguments[o];
        n[o - 2] = i.apply(this, a)
    }
    return n
};
DFLIP.parseLinks = function(e) {
    var t;
    if (e !== void 0 && e.length > 0) {
        for (var i = 0; i < e.length; i++) {
            t = e[i];
            if (t !== void 0 && t[0] !== void 0 && t[0].dest == void 0) {
                t = DFLIP.ConvertPageLinks.apply(this, t);
                e[i] = t
            }
        }
    }
    return e
};
(function(e) {
    DFLIP.parseBooks = function() {
        e("._df_thumb").each(function() {
            var t = e(this);
            var i = e("<div class='_df_book-cover'>");
            var n = t.attr("df-thumb");
            var a = t.html();
            t.html("");
            var o = e("<span class='_df_book-title'>").html(a).appendTo(i);
            var r = t.attr("df-tags");
            if (r) {
                r = r.split(",");
                if (r.length > 0) {
                    for (var s = 0; s < r.length; s++) {
                        t.append("<span class='_df_book-tag'>" + r[s] + "</span>")
                    }
                }
            }
            if (n !== void 0 && n.toString().trim() != "") {
                i.css({
                    backgroundImage: "url(" + n + ")"
                })
            } else {
                i.addClass("_df_thumb-not-found")
            }
            t.append(i)
        });
        e("._df_button, ._df_thumb").on("click", function() {
            var t = e(this);
            var i = t.attr("id");
            var n = "option_" + i,
                a = t.attr("df-source");
            if (!window.dfLightBox) {
                window.dfLightBox = new DFLightBox(function() {
                    window.dfActiveLightBoxBook.dispose();
                    window.dfActiveLightBoxBook = null
                })
            }
            window.dfLightBox.duration = 500;
            n = n == void 0 || n == "" || window[n] == void 0 ? {} : window[n];
            a = a == void 0 || a == "" ? n.source : a;
            if (DFLIP.isWPPlugin == true && DFLIP.parseWordPressOptions) DFLIP.parseWordPressOptions(n);
            if (window.dfActiveLightBoxBook && window.dfActiveLightBoxBook.dispose) {
                window.dfActiveLightBoxBook.dispose()
            } else {
                window.dfLightBox.show(function() {
                    window.dfActiveLightBoxBook = e(window.dfLightBox.container).flipBook(a, n)
                })
            }
        });
        e("._df_book").each(function() {
            var t = e(this);
            var i = t.attr("id");
            var n = "option_" + i,
                a = t.attr("df-source");
            n = n == void 0 || n == "" || window[n] == void 0 ? {} : window[n];
            a = a == void 0 || a == "" ? n.source : a;
            if (DFLIP.isWPPlugin == true && DFLIP.parseWordPressOptions) DFLIP.parseWordPressOptions(n);
            window[i.toString()] = e(t).flipBook(a, n)
        })
    }
})(jQuery);