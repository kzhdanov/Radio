!function(t,i,o){i.Radio=function(t,o){this.$el=i(o),this._init(t)},i.Radio.defaults={fallbackMessage:"HTML5 audio not supported",initialVolume:.3,url:"http://eu3.radioboss.fm:8022/live",ws:"ws://92.61.68.163:8080"},i.Radio.prototype={_init:function(o){var n=this;this.options=i.extend(!0,{},i.Radio.defaults,o),this.songs="",this.$loader=this.$el.find("div.vc-loader").show(),n.$loader.hide(),n._createPlayer(),n._loadEvents();var a=new WebSocket(i.Radio.defaults.ws);a.onmessage=function(o){var n=JSON.parse(o.data);"no name"!=n.album&&"no name"!=n.songName?n.imgSrc="./RadioCovers/"+n.autor+"-"+n.album+".jpg":n.imgSrc="./RadioCovers/Avance.jpg",i(".js-group").text(n.autor),i(".js-album").text(n.album),i(".js-song").text(n.songName),i(".js-image").attr("src",n.imgSrc);var a=new i.Rating;a._clean(),t.Play?(a.hoverOn(),a.ratings.off("click"),a.ratings.click(a.SetClick()),a.SetRating()):a.hoverOff()}},_createPlayer:function(){this.$audioEl=i('<audio id="audioElem"><span>'+this.options.fallbackMessage+"</span></audio>"),this.$el.prepend(this.$audioEl),this.audio=this.$audioEl.get(0),this._createControls()},_createControls:function(){var t=this;if(this.$controls=i('<ul class="vc-controls" style="display:none;"/>'),this.$cPlay=i('<li class="vc-control-play">Play<span></span></li>'),this.$cStop=i('<li class="vc-control-stop">Stop<span></span></li>'),this.$controls.append(this.$cPlay).append(i('<li class="vc-control-empty"><span></span></li>')).append(this.$cStop).appendTo(this.$el),this.$volume=i('<div style="display:none;" class="vc-volume-wrap"><div class="vc-volume-control"><div class="vc-volume-knob"></div></div></div> ').appendTo(this.$el),document.createElement("audio").canPlayType)if(document.createElement("audio").canPlayType("audio/mpeg")||document.createElement("audio").canPlayType("audio/ogg")){this.$controls.show(),this.$volume.show(),this.$volume.find("div.vc-volume-knob").knobKnob({snap:10,value:359*this.options.initialVolume,turn:function(i){t._changeVolume(i)}}),this.audio.volume=this.options.initialVolume;new i.NewWindowPopUp}else toastr.warning("wrong")},_loadEvents:function(){var t=this;this.$cPlay.on("mousedown",function(o){t._setButtonActive(i(this)),t._play()}),this.$cStop.on("mousedown",function(o){t._setButtonActive(i(this)),t._stop()})},_setButtonActive:function(t){t.addClass("vc-control-pressed"),setTimeout(function(){t.removeClass("vc-control-pressed")},100)},_prepare:function(t){this._clear(),this.$audioEl.attr("src",i.Radio.defaults.url)},_updateButtons:function(t){var i="vc-control-active";switch(this.$cPlay.removeClass(i),this.$cStop.removeClass(i),t){case"play":this.$cPlay.addClass(i)}},_changeVolume:function(t){this.audio.volume=t},_play:function(){var o=this;this._updateButtons("play");try{o._prepare(o.songs),i(this).off("canplay"),o.audio.currentTime=0,o.audio.play();var n=new i.Rating;n.SetRating(),n.SetClick(),n.hoverOn(),t.Play=!0,i(".songInfo").after().addClass("animating")}catch(t){console.log(t)}},_stop:function(t){var o=new i.Rating;o.hoverOff(),t||this._updateButtons("stop"),this.audio.pause(),i(".songInfo").after().removeClass("animating"),this._clear()},_clear:function(){this.$audioEl.children("source").remove()}},i.NewWindowPopUp=function(){this._init()},i.NewWindowPopUp.prototype={newWindowEl:i(".newWindow_link"),_init:function(){this.newWindowEl.click(function(){t.open("/window/new","RadioAvance.ru","width=480,height=260,scrollbars=no,status=yes")})}},i.Rating=function(){this._init()},i.Rating.prototype={ratintDiv:i(".Rating"),ratings:i(".Rating li"),ratingTitle:i(".Rating__Title"),url:"/Rating/Save",key:"i@#4rv98*oo#a12N$_RadioKey",_init:function(){this.setOpacity(!0)},SetClick:function(){var t=this,i="";this.ratings.off("click"),this.ratings.click(function(){t.hoverOff(),t.ratings.off("click");try{var o=localStorage.getItem(t.key);o?t.saveRating(t.buildRating.call({shortGuid:o,ratings:t.ratings})):(i=t.randomGuid(),localStorage.setItem(t.key,i),t.saveRating(t.buildRating.call({shortGuid:i,ratings:t.ratings})))}catch(t){console.log(t)}})},SetRating:function(){var t=this;localStorage.getItem(this.key)?i.ajax({method:"POST",async:!0,url:"/Rating/Get",data:{user:localStorage.getItem(this.key),album:i.trim(i(".js-album").text()),group:i.trim(i(".js-group").text())}}).done(function(i){var o=0;if(0!==Number(i.points)){for(;o<i.points;o+=1)t.ratings[o].style.backgroundColor="#333";t.hoverOff(),t.ratings.off("click")}}).fail(function(t){console.log("Oh, something went wrong...")}):(t._clean(),t.hoverOn())},buildRating:function(){return{autor:i.trim(i(".songInfo__group").text()),song:i.trim(i(".songInfo__song").text()),album:i.trim(i(".songInfo__album").text()),rate:[].slice.call(this.ratings).filter(function(t,i){return"transparent"!==t.style["background-color"]}).length,userTempId:this.shortGuid}},saveRating:function(t){i.ajax({method:"POST",async:!0,url:this.url,data:t}).fail(function(t){console.log("Oh, something went wrong...")})},randomGuid:function(){return"xxxxxxxx-xxxx-4xxx".replace(/[xy]/g,function(t){var i=16*Math.random()|0,o="x"==t?i:3&i|8;return o.toString(16)})},_clean:function(){this.ratings.css({backgroundColor:"transparent"})},hoverOn:function(){this.ratings.mouseenter(function(){var t=i(this);i(".Rating li").each(function(o,n){n.id<=Number(t.attr("id"))&&i(this).css({backgroundColor:"#333"})})}).mouseleave(function(){var t=i(this);i(".Rating li").each(function(o,n){n.id<=Number(t.attr("id"))&&i(this).css({backgroundColor:"transparent"})})})},setOpacity:function(t){t?(this.ratintDiv.css({opacity:".8"}),this.ratingTitle.css({opacity:".5"})):(this.ratintDiv.css({opacity:".3"}),this.ratingTitle.css({opacity:".3"}))},hoverOff:function(){this.setOpacity(!1),this.ratings.off("mouseenter mouseleave")}};var n=function(t){toastr.error(t)};i.fn.radio=function(t){if("string"==typeof t){var o=Array.prototype.slice.call(arguments,1);this.each(function(){var a=i.data(this,"cassette");return a?i.isFunction(a[t])&&"_"!==t.charAt(0)?void a[t].apply(a,o):void n("no such method '"+t+"' for cassette instance"):void n("cannot call methods on cassette prior to initialization; attempted to call method '"+t+"'")})}else this.each(function(){var o=i.data(this,"cassette");o||i.data(this,"cassette",new i.Radio(t,this))});return this}}(window,jQuery);