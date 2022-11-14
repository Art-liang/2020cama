if(typeof Object.create!=="function"){Object.create=function(b){function a(){}a.prototype=b;return new a()}}(function(a,d,c){var b={init:function(g,f){var e=this;e.$elem=a(f);e.options=a.extend({},a.fn.owlCarousel.options,e.$elem.data(),g);e.userOptions=g;e.loadContent()},loadContent:function(){var e=this,g;function f(j){var k,h="";if(typeof e.options.jsonSuccess==="function"){e.options.jsonSuccess.apply(this,[j])}else{for(k in j.owl){if(j.owl.hasOwnProperty(k)){h+=j.owl[k].item}}e.$elem.html(h)}e.logIn()}if(typeof e.options.beforeInit==="function"){e.options.beforeInit.apply(this,[e.$elem])}if(typeof e.options.jsonPath==="string"){g=e.options.jsonPath;a.getJSON(g,f)}else{e.logIn()}},logIn:function(){var e=this;e.$elem.data("owl-originalStyles",e.$elem.attr("style"));e.$elem.data("owl-originalClasses",e.$elem.attr("class"));e.$elem.css({opacity:0});e.orignalItems=e.options.items;e.checkBrowser();e.wrapperWidth=0;e.checkVisible=null;e.setVars()},setVars:function(){var e=this;if(e.$elem.children().length===0){return false}e.baseClass();e.eventTypes();e.$userItems=e.$elem.children();e.itemsAmount=e.$userItems.length;e.wrapItems();e.$owlItems=e.$elem.find(".owl-item");e.$owlWrapper=e.$elem.find(".owl-wrapper");e.playDirection="next";e.prevItem=0;e.prevArr=[0];e.currentItem=0;e.customEvents();e.onStartup()},onStartup:function(){var e=this;e.updateItems();e.calculateAll();e.buildControls();e.updateControls();e.response();e.moveEvents();e.stopOnHover();e.owlStatus();if(e.options.transitionStyle!==false){e.transitionTypes(e.options.transitionStyle)}if(e.options.autoPlay===true){e.options.autoPlay=5000}e.play();e.$elem.find(".owl-wrapper").css("display","block");if(!e.$elem.is(":visible")){e.watchVisibility()}else{e.$elem.css("opacity",1)}e.onstartup=false;e.eachMoveUpdate();if(typeof e.options.afterInit==="function"){e.options.afterInit.apply(this,[e.$elem])}},eachMoveUpdate:function(){var e=this;if(e.options.lazyLoad===true){e.lazyLoad()}if(e.options.autoHeight===true){e.autoHeight()}e.onVisibleItems();if(typeof e.options.afterAction==="function"){e.options.afterAction.apply(this,[e.$elem])}},updateVars:function(){var e=this;if(typeof e.options.beforeUpdate==="function"){e.options.beforeUpdate.apply(this,[e.$elem])}e.watchVisibility();e.updateItems();e.calculateAll();e.updatePosition();e.updateControls();e.eachMoveUpdate();if(typeof e.options.afterUpdate==="function"){e.options.afterUpdate.apply(this,[e.$elem])}},reload:function(){var e=this;d.setTimeout(function(){e.updateVars()},0)},watchVisibility:function(){var e=this;if(e.$elem.is(":visible")===false){e.$elem.css({opacity:0});d.clearInterval(e.autoPlayInterval);d.clearInterval(e.checkVisible)}else{return false}e.checkVisible=d.setInterval(function(){if(e.$elem.is(":visible")){e.reload();e.$elem.animate({opacity:1},200);d.clearInterval(e.checkVisible)}},500)},wrapItems:function(){var e=this;e.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');e.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');e.wrapperOuter=e.$elem.find(".owl-wrapper-outer");e.$elem.css("display","block")},baseClass:function(){var e=this,f=e.$elem.hasClass(e.options.baseClass),g=e.$elem.hasClass(e.options.theme);if(!f){e.$elem.addClass(e.options.baseClass)}if(!g){e.$elem.addClass(e.options.theme)}},updateItems:function(){var e=this,g,f;if(e.options.responsive===false){return false}if(e.options.singleItem===true){e.options.items=e.orignalItems=1;e.options.itemsCustom=false;e.options.itemsDesktop=false;e.options.itemsDesktopSmall=false;e.options.itemsTablet=false;e.options.itemsTabletSmall=false;e.options.itemsMobile=false;return false}g=a(e.options.responsiveBaseWidth).width();if(g>(e.options.itemsDesktop[0]||e.orignalItems)){e.options.items=e.orignalItems}if(e.options.itemsCustom!==false){e.options.itemsCustom.sort(function(h,i){return h[0]-i[0]});for(f=0;f<e.options.itemsCustom.length;f+=1){if(e.options.itemsCustom[f][0]<=g){e.options.items=e.options.itemsCustom[f][1]}}}else{if(g<=e.options.itemsDesktop[0]&&e.options.itemsDesktop!==false){e.options.items=e.options.itemsDesktop[1]}if(g<=e.options.itemsDesktopSmall[0]&&e.options.itemsDesktopSmall!==false){e.options.items=e.options.itemsDesktopSmall[1]}if(g<=e.options.itemsTablet[0]&&e.options.itemsTablet!==false){e.options.items=e.options.itemsTablet[1]}if(g<=e.options.itemsTabletSmall[0]&&e.options.itemsTabletSmall!==false){e.options.items=e.options.itemsTabletSmall[1]}if(g<=e.options.itemsMobile[0]&&e.options.itemsMobile!==false){e.options.items=e.options.itemsMobile[1]}}if(e.options.items>e.itemsAmount&&e.options.itemsScaleUp===true){e.options.items=e.itemsAmount}},response:function(){var e=this,g,f;if(e.options.responsive!==true){return false}f=a(d).width();e.resizer=function(){if(a(d).width()!==f){if(e.options.autoPlay!==false){d.clearInterval(e.autoPlayInterval)}d.clearTimeout(g);g=d.setTimeout(function(){f=a(d).width();e.updateVars()},e.options.responsiveRefreshRate)}};a(d).resize(e.resizer)},updatePosition:function(){var e=this;e.jumpTo(e.currentItem);if(e.options.autoPlay!==false){e.checkAp()}},appendItemsSizes:function(){var e=this,g=0,f=e.itemsAmount-e.options.items;e.$owlItems.each(function(i){var h=a(this);h.css({width:e.itemWidth}).data("owl-item",Number(i));if(i%e.options.items===0||i===f){if(!(i>f)){g+=1}}h.data("owl-roundPages",g)})},appendWrapperSizes:function(){var e=this,f=e.$owlItems.length*e.itemWidth;e.$owlWrapper.css({width:f*2,left:0});e.appendItemsSizes()},calculateAll:function(){var e=this;e.calculateWidth();e.appendWrapperSizes();e.loops();e.max()},calculateWidth:function(){var e=this;e.itemWidth=Math.round(e.$elem.width()/e.options.items)},max:function(){var e=this,f=((e.itemsAmount*e.itemWidth)-e.options.items*e.itemWidth)*-1;if(e.options.items>e.itemsAmount){e.maximumItem=0;f=0;e.maximumPixels=0}else{e.maximumItem=e.itemsAmount-e.options.items;e.maximumPixels=f}return f},min:function(){return 0},loops:function(){var e=this,j=0,f=0,g,h,k;e.positionsInArray=[0];e.pagesInArray=[];for(g=0;g<e.itemsAmount;g+=1){f+=e.itemWidth;e.positionsInArray.push(-f);if(e.options.scrollPerPage===true){h=a(e.$owlItems[g]);k=h.data("owl-roundPages");if(k!==j){e.pagesInArray[j]=e.positionsInArray[g];j=k}}}},buildControls:function(){var e=this;if(e.options.navigation===true||e.options.pagination===true){e.owlControls=a('<div class="owl-controls"/>').toggleClass("clickable",!e.browser.isTouch).appendTo(e.$elem)}if(e.options.pagination===true){e.buildPagination()}if(e.options.navigation===true){e.buildButtons()}},buildButtons:function(){var e=this,f=a('<div class="owl-buttons"/>');e.owlControls.append(f);e.buttonPrev=a("<div/>",{"class":"owl-prev",html:e.options.navigationText[0]||""});e.buttonNext=a("<div/>",{"class":"owl-next",html:e.options.navigationText[1]||""});f.append(e.buttonPrev).append(e.buttonNext);f.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(g){g.preventDefault()});f.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(g){g.preventDefault();if(a(this).hasClass("owl-next")){e.next()}else{e.prev()}})},buildPagination:function(){var e=this;e.paginationWrapper=a('<div class="owl-pagination"/>');e.owlControls.append(e.paginationWrapper);e.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(f){f.preventDefault();if(Number(a(this).data("owl-page"))!==e.currentItem){e.goTo(Number(a(this).data("owl-page")),true)}})},updatePagination:function(){var e=this,f,j,h,g,k,l;if(e.options.pagination===false){return false}e.paginationWrapper.html("");f=0;j=e.itemsAmount-e.itemsAmount%e.options.items;for(g=0;g<e.itemsAmount;g+=1){if(g%e.options.items===0){f+=1;if(j===g){h=e.itemsAmount-e.options.items}k=a("<div/>",{"class":"owl-page"});l=a("<span></span>",{text:e.options.paginationNumbers===true?f:"","class":e.options.paginationNumbers===true?"owl-numbers":""});k.append(l);k.data("owl-page",j===g?h:g);k.data("owl-roundPages",f);e.paginationWrapper.append(k)}}e.checkPagination()},checkPagination:function(){var e=this;if(e.options.pagination===false){return false}e.paginationWrapper.find(".owl-page").each(function(){if(a(this).data("owl-roundPages")===a(e.$owlItems[e.currentItem]).data("owl-roundPages")){e.paginationWrapper.find(".owl-page").removeClass("active");a(this).addClass("active")}})},checkNavigation:function(){var e=this;if(e.options.navigation===false){return false}if(e.options.rewindNav===false){if(e.currentItem===0&&e.maximumItem===0){e.buttonPrev.addClass("disabled");e.buttonNext.addClass("disabled")}else{if(e.currentItem===0&&e.maximumItem!==0){e.buttonPrev.addClass("disabled");e.buttonNext.removeClass("disabled")}else{if(e.currentItem===e.maximumItem){e.buttonPrev.removeClass("disabled");e.buttonNext.addClass("disabled")}else{if(e.currentItem!==0&&e.currentItem!==e.maximumItem){e.buttonPrev.removeClass("disabled");e.buttonNext.removeClass("disabled")}}}}}},updateControls:function(){var e=this;e.updatePagination();e.checkNavigation();if(e.owlControls){if(e.options.items>=e.itemsAmount){e.owlControls.hide()}else{e.owlControls.show()}}},destroyControls:function(){var e=this;if(e.owlControls){e.owlControls.remove()}},next:function(f){var e=this;if(e.isTransition){return false}e.currentItem+=e.options.scrollPerPage===true?e.options.items:1;if(e.currentItem>e.maximumItem+(e.options.scrollPerPage===true?(e.options.items-1):0)){if(e.options.rewindNav===true){e.currentItem=0;f="rewind"}else{e.currentItem=e.maximumItem;return false}}e.goTo(e.currentItem,f)},prev:function(f){var e=this;if(e.isTransition){return false}if(e.options.scrollPerPage===true&&e.currentItem>0&&e.currentItem<e.options.items){e.currentItem=0}else{e.currentItem-=e.options.scrollPerPage===true?e.options.items:1}if(e.currentItem<0){if(e.options.rewindNav===true){e.currentItem=e.maximumItem;f="rewind"}else{e.currentItem=0;return false}}e.goTo(e.currentItem,f)},goTo:function(h,i,f){var e=this,g;if(e.isTransition){return false}if(typeof e.options.beforeMove==="function"){e.options.beforeMove.apply(this,[e.$elem])}if(h>=e.maximumItem){h=e.maximumItem}else{if(h<=0){h=0}}e.currentItem=e.owl.currentItem=h;if(e.options.transitionStyle!==false&&f!=="drag"&&e.options.items===1&&e.browser.support3d===true){e.swapSpeed(0);if(e.browser.support3d===true){e.transition3d(e.positionsInArray[h])}else{e.css2slide(e.positionsInArray[h],1)}e.afterGo();e.singleItemTransition();return false}g=e.positionsInArray[h];if(e.browser.support3d===true){e.isCss3Finish=false;if(i===true){e.swapSpeed("paginationSpeed");d.setTimeout(function(){e.isCss3Finish=true},e.options.paginationSpeed)}else{if(i==="rewind"){e.swapSpeed(e.options.rewindSpeed);d.setTimeout(function(){e.isCss3Finish=true},e.options.rewindSpeed)}else{e.swapSpeed("slideSpeed");d.setTimeout(function(){e.isCss3Finish=true},e.options.slideSpeed)}}e.transition3d(g)}else{if(i===true){e.css2slide(g,e.options.paginationSpeed)}else{if(i==="rewind"){e.css2slide(g,e.options.rewindSpeed)}else{e.css2slide(g,e.options.slideSpeed)}}}e.afterGo()},jumpTo:function(f){var e=this;if(typeof e.options.beforeMove==="function"){e.options.beforeMove.apply(this,[e.$elem])}if(f>=e.maximumItem||f===-1){f=e.maximumItem}else{if(f<=0){f=0}}e.swapSpeed(0);if(e.browser.support3d===true){e.transition3d(e.positionsInArray[f])}else{e.css2slide(e.positionsInArray[f],1)}e.currentItem=e.owl.currentItem=f;e.afterGo()},afterGo:function(){var e=this;e.prevArr.push(e.currentItem);e.prevItem=e.owl.prevItem=e.prevArr[e.prevArr.length-2];e.prevArr.shift(0);if(e.prevItem!==e.currentItem){e.checkPagination();e.checkNavigation();e.eachMoveUpdate();if(e.options.autoPlay!==false){e.checkAp()}}if(typeof e.options.afterMove==="function"&&e.prevItem!==e.currentItem){e.options.afterMove.apply(this,[e.$elem])}},stop:function(){var e=this;e.apStatus="stop";d.clearInterval(e.autoPlayInterval)},checkAp:function(){var e=this;if(e.apStatus!=="stop"){e.play()}},play:function(){var e=this;e.apStatus="play";if(e.options.autoPlay===false){return false}d.clearInterval(e.autoPlayInterval);e.autoPlayInterval=d.setInterval(function(){e.next(true)},e.options.autoPlay)},swapSpeed:function(e){var f=this;if(e==="slideSpeed"){f.$owlWrapper.css(f.addCssSpeed(f.options.slideSpeed))}else{if(e==="paginationSpeed"){f.$owlWrapper.css(f.addCssSpeed(f.options.paginationSpeed))}else{if(typeof e!=="string"){f.$owlWrapper.css(f.addCssSpeed(e))}}}},addCssSpeed:function(e){return{"-webkit-transition":"all "+e+"ms ease","-moz-transition":"all "+e+"ms ease","-o-transition":"all "+e+"ms ease",transition:"all "+e+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(e){return{"-webkit-transform":"translate3d("+e+"px, 0px, 0px)","-moz-transform":"translate3d("+e+"px, 0px, 0px)","-o-transform":"translate3d("+e+"px, 0px, 0px)","-ms-transform":"translate3d("+e+"px, 0px, 0px)",transform:"translate3d("+e+"px, 0px,0px)"}},transition3d:function(f){var e=this;e.$owlWrapper.css(e.doTranslate(f))},css2move:function(f){var e=this;e.$owlWrapper.css({left:f})},css2slide:function(g,f){var e=this;e.isCssFinish=false;e.$owlWrapper.stop(true,true).animate({left:g},{duration:f||e.options.slideSpeed,complete:function(){e.isCssFinish=true}})},checkBrowser:function(){var f=this,k="translate3d(0px, 0px, 0px)",j=c.createElement("div"),h,e,i,g;j.style.cssText="  -moz-transform:"+k+"; -ms-transform:"+k+"; -o-transform:"+k+"; -webkit-transform:"+k+"; transform:"+k;h=/translate3d\(0px, 0px, 0px\)/g;e=j.style.cssText.match(h);i=(e!==null&&e.length===1);g="ontouchstart" in d||d.navigator.msMaxTouchPoints;f.browser={support3d:i,isTouch:g}},moveEvents:function(){var e=this;if(e.options.mouseDrag!==false||e.options.touchDrag!==false){e.gestures();e.disabledEvents()}},eventTypes:function(){var e=this,f=["s","e","x"];e.ev_types={};if(e.options.mouseDrag===true&&e.options.touchDrag===true){f=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]}else{if(e.options.mouseDrag===false&&e.options.touchDrag===true){f=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]}else{if(e.options.mouseDrag===true&&e.options.touchDrag===false){f=["mousedown.owl","mousemove.owl","mouseup.owl"]}}}e.ev_types.start=f[0];e.ev_types.move=f[1];e.ev_types.end=f[2]},disabledEvents:function(){var e=this;e.$elem.on("dragstart.owl",function(f){f.preventDefault()});e.$elem.on("mousedown.disableTextSelect",function(f){return a(f.target).is("input, textarea, select, option")})},gestures:function(){var e=this,j={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};e.isCssFinish=true;function i(l){if(l.touches!==undefined){return{x:l.touches[0].pageX,y:l.touches[0].pageY}}if(l.touches===undefined){if(l.pageX!==undefined){return{x:l.pageX,y:l.pageY}}if(l.pageX===undefined){return{x:l.clientX,y:l.clientY}}}}function k(l){if(l==="on"){a(c).on(e.ev_types.move,g);a(c).on(e.ev_types.end,f)}else{if(l==="off"){a(c).off(e.ev_types.move);a(c).off(e.ev_types.end)}}}function h(m){var l=m.originalEvent||m||d.event,n;if(l.which===3){return false}if(e.itemsAmount<=e.options.items){return}if(e.isCssFinish===false&&!e.options.dragBeforeAnimFinish){return false}if(e.isCss3Finish===false&&!e.options.dragBeforeAnimFinish){return false}if(e.options.autoPlay!==false){d.clearInterval(e.autoPlayInterval)}if(e.browser.isTouch!==true&&!e.$owlWrapper.hasClass("grabbing")){e.$owlWrapper.addClass("grabbing")}e.newPosX=0;e.newRelativeX=0;a(this).css(e.removeTransition());n=a(this).position();j.relativePos=n.left;j.offsetX=i(l).x-n.left;j.offsetY=i(l).y-n.top;k("on");j.sliding=false;j.targetElement=l.target||l.srcElement}function g(m){var l=m.originalEvent||m||d.event,o,n;e.newPosX=i(l).x-j.offsetX;e.newPosY=i(l).y-j.offsetY;e.newRelativeX=e.newPosX-j.relativePos;if(typeof e.options.startDragging==="function"&&j.dragging!==true&&e.newRelativeX!==0){j.dragging=true;e.options.startDragging.apply(e,[e.$elem])}if((e.newRelativeX>8||e.newRelativeX<-8)&&(e.browser.isTouch===true)){if(l.preventDefault!==undefined){l.preventDefault()}else{l.returnValue=false}j.sliding=true}if((e.newPosY>10||e.newPosY<-10)&&j.sliding===false){a(c).off("touchmove.owl")}o=function(){return e.newRelativeX/5};n=function(){return e.maximumPixels+e.newRelativeX/5};e.newPosX=Math.max(Math.min(e.newPosX,o()),n());if(e.browser.support3d===true){e.transition3d(e.newPosX)}else{e.css2move(e.newPosX)}}function f(m){var l=m.originalEvent||m||d.event,o,n,p;l.target=l.target||l.srcElement;j.dragging=false;if(e.browser.isTouch!==true){e.$owlWrapper.removeClass("grabbing")}if(e.newRelativeX<0){e.dragDirection=e.owl.dragDirection="left"}else{e.dragDirection=e.owl.dragDirection="right"}if(e.newRelativeX!==0){o=e.getNewPosition();e.goTo(o,false,"drag");if(j.targetElement===l.target&&e.browser.isTouch!==true){a(l.target).on("click.disable",function(q){q.stopImmediatePropagation();q.stopPropagation();q.preventDefault();a(q.target).off("click.disable")});n=a._data(l.target,"events").click;p=n.pop();n.splice(0,0,p)}}k("off")}e.$elem.on(e.ev_types.start,".owl-wrapper",h)},getNewPosition:function(){var e=this,f=e.closestItem();if(f>e.maximumItem){e.currentItem=e.maximumItem;f=e.maximumItem}else{if(e.newPosX>=0){f=0;e.currentItem=0}}return f},closestItem:function(){var f=this,e=f.options.scrollPerPage===true?f.pagesInArray:f.positionsInArray,h=f.newPosX,g=null;a.each(e,function(j,k){if(h-(f.itemWidth/20)>e[j+1]&&h-(f.itemWidth/20)<k&&f.moveDirection()==="left"){g=k;if(f.options.scrollPerPage===true){f.currentItem=a.inArray(g,f.positionsInArray)}else{f.currentItem=j}}else{if(h+(f.itemWidth/20)<k&&h+(f.itemWidth/20)>(e[j+1]||e[j]-f.itemWidth)&&f.moveDirection()==="right"){if(f.options.scrollPerPage===true){g=e[j+1]||e[e.length-1];f.currentItem=a.inArray(g,f.positionsInArray)}else{g=e[j+1];f.currentItem=j+1}}}});return f.currentItem},moveDirection:function(){var e=this,f;if(e.newRelativeX<0){f="right";e.playDirection="next"}else{f="left";e.playDirection="prev"}return f},customEvents:function(){var e=this;e.$elem.on("owl.next",function(){e.next()});e.$elem.on("owl.prev",function(){e.prev()});e.$elem.on("owl.play",function(f,g){e.options.autoPlay=g;e.play();e.hoverStatus="play"});e.$elem.on("owl.stop",function(){e.stop();e.hoverStatus="stop"});e.$elem.on("owl.goTo",function(f,g){e.goTo(g)});e.$elem.on("owl.jumpTo",function(f,g){e.jumpTo(g)})},stopOnHover:function(){var e=this;if(e.options.stopOnHover===true&&e.browser.isTouch!==true&&e.options.autoPlay!==false){e.$elem.on("mouseover",function(){e.stop()});e.$elem.on("mouseout",function(){if(e.hoverStatus!=="stop"){e.play()}})}},lazyLoad:function(){var g=this,j,e,k,f,h;if(g.options.lazyLoad===false){return false}for(j=0;j<g.itemsAmount;j+=1){e=a(g.$owlItems[j]);if(e.data("owl-loaded")==="loaded"){continue}k=e.data("owl-item");f=e.find(".lazyOwl");if(typeof f.data("src")!=="string"){e.data("owl-loaded","loaded");continue}if(e.data("owl-loaded")===undefined){f.hide();e.addClass("loading").data("owl-loaded","checked")}if(g.options.lazyFollow===true){h=k>=g.currentItem}else{h=true}if(h&&k<g.currentItem+g.options.items&&f.length){g.lazyPreload(e,f)}}},lazyPreload:function(e,f){var g=this,j=0,i;if(f.prop("tagName")==="DIV"){f.css("background-image","url("+f.data("src")+")");i=true}else{f[0].src=f.data("src")}function k(){e.data("owl-loaded","loaded").removeClass("loading");f.removeAttr("data-src");if(g.options.lazyEffect==="fade"){f.fadeIn(400)}else{f.show()}if(typeof g.options.afterLazyLoad==="function"){g.options.afterLazyLoad.apply(this,[g.$elem])}}function h(){j+=1;if(g.completeImg(f.get(0))||i===true){k()}else{if(j<=100){d.setTimeout(h,100)}else{k()}}}h()},autoHeight:function(){var g=this,e=a(g.$owlItems[g.currentItem]).find("img"),i;function f(){var j=a(g.$owlItems[g.currentItem]).height();g.wrapperOuter.css("height",j+"px");if(!g.wrapperOuter.hasClass("autoHeight")){d.setTimeout(function(){g.wrapperOuter.addClass("autoHeight")},0)}}function h(){i+=1;if(g.completeImg(e.get(0))){f()}else{if(i<=100){d.setTimeout(h,100)}else{g.wrapperOuter.css("height","")}}}if(e.get(0)!==undefined){i=0;h()}else{f()}},completeImg:function(e){var f;if(!e.complete){return false}f=typeof e.naturalWidth;if(f!=="undefined"&&e.naturalWidth===0){return false}return true},onVisibleItems:function(){var e=this,f;if(e.options.addClassActive===true){e.$owlItems.removeClass("active")}e.visibleItems=[];for(f=e.currentItem;f<e.currentItem+e.options.items;f+=1){e.visibleItems.push(f);if(e.options.addClassActive===true){a(e.$owlItems[f]).addClass("active")}}e.owl.visibleItems=e.visibleItems},transitionTypes:function(f){var e=this;e.outClass="owl-"+f+"-out";e.inClass="owl-"+f+"-in"},singleItemTransition:function(){var h=this,k=h.outClass,i=h.inClass,e=h.$owlItems.eq(h.currentItem),f=h.$owlItems.eq(h.prevItem),l=Math.abs(h.positionsInArray[h.currentItem])+h.positionsInArray[h.prevItem],j=Math.abs(h.positionsInArray[h.currentItem])+h.itemWidth/2,g="webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";h.isTransition=true;h.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":j+"px","-moz-perspective-origin":j+"px","perspective-origin":j+"px"});function m(n){return{position:"relative",left:n+"px"}}f.css(m(l,10)).addClass(k).on(g,function(){h.endPrev=true;f.off(g);h.clearTransStyle(f,k)});e.addClass(i).on(g,function(){h.endCurrent=true;e.off(g);h.clearTransStyle(e,i)})},clearTransStyle:function(g,f){var e=this;g.css({position:"",left:""}).removeClass(f);if(e.endPrev&&e.endCurrent){e.$owlWrapper.removeClass("owl-origin");e.endPrev=false;e.endCurrent=false;e.isTransition=false}},owlStatus:function(){var e=this;e.owl={userOptions:e.userOptions,baseElement:e.$elem,userItems:e.$userItems,owlItems:e.$owlItems,currentItem:e.currentItem,prevItem:e.prevItem,visibleItems:e.visibleItems,isTouch:e.browser.isTouch,browser:e.browser,dragDirection:e.dragDirection}},clearEvents:function(){var e=this;e.$elem.off(".owl owl mousedown.disableTextSelect");a(c).off(".owl owl");a(d).off("resize",e.resizer)},unWrap:function(){var e=this;if(e.$elem.children().length!==0){e.$owlWrapper.unwrap();e.$userItems.unwrap().unwrap();if(e.owlControls){e.owlControls.remove()}}e.clearEvents();e.$elem.attr("style",e.$elem.data("owl-originalStyles")||"").attr("class",e.$elem.data("owl-originalClasses"))},destroy:function(){var e=this;e.stop();d.clearInterval(e.checkVisible);e.unWrap();e.$elem.removeData()},reinit:function(f){var e=this,g=a.extend({},e.userOptions,f);e.unWrap();e.init(g,e.$elem)},addItem:function(f,h){var e=this,g;if(!f){return false}if(e.$elem.children().length===0){e.$elem.append(f);e.setVars();return false}e.unWrap();if(h===undefined||h===-1){g=-1}else{g=h}if(g>=e.$userItems.length||g===-1){e.$userItems.eq(-1).after(f)}else{e.$userItems.eq(g).before(f)}e.setVars()},removeItem:function(g){var e=this,f;if(e.$elem.children().length===0){return false}if(g===undefined||g===-1){f=-1}else{f=g}e.unWrap();e.$userItems.eq(f).remove();e.setVars()}};a.fn.owlCarousel=function(e){return this.each(function(){if(a(this).data("owl-init")===true){return false}a(this).data("owl-init",true);var f=Object.create(b);f.init(e,this);a.data(this,"owlCarousel",f)})};a.fn.owlCarousel.options={items:5,itemsCustom:false,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:false,itemsMobile:[479,1],singleItem:false,itemsScaleUp:false,slideSpeed:200,paginationSpeed:800,rewindSpeed:1000,autoPlay:false,stopOnHover:false,navigation:false,navigationText:["prev","next"],rewindNav:true,scrollPerPage:false,pagination:true,paginationNumbers:false,responsive:true,responsiveRefreshRate:200,responsiveBaseWidth:d,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:false,lazyFollow:true,lazyEffect:"fade",autoHeight:false,jsonPath:false,jsonSuccess:false,dragBeforeAnimFinish:true,mouseDrag:true,touchDrag:true,addClassActive:false,transitionStyle:false,beforeUpdate:false,afterUpdate:false,beforeInit:false,afterInit:false,beforeMove:false,afterMove:false,afterAction:false,startDragging:false,afterLazyLoad:false}}(jQuery,window,document));