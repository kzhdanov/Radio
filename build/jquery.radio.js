!function(t,o,i){o.Radio=function(t,i){this.$el=o(i),this._init(t)},o.Radio.defaults={fallbackMessage:"HTML5 audio not supported",initialVolume:.3,url:"http://firewall.pulsradio.com"},o.Radio.prototype={_init:function(t){var i=this;this.options=o.extend(!0,{},o.Radio.defaults,t),this.songs="",this.$loader=this.$el.find("div.vc-loader").show(),o.when(this._createSides()).done(function(){i.$loader.hide(),i._createPlayer(),i.sound=new o.Sound,i._loadEvents()})},_createSides:function(){var t=this;return o.Deferred(function(i){var n=new o.Song;o.when(n.loadMetadata()).done(function(o){t.songs=o,i.resolve()})}).promise()},_createPlayer:function(){this.$audioEl=o('<audio id="audioElem"><span>'+this.options.fallbackMessage+"</span></audio>"),this.$el.prepend(this.$audioEl),this.audio=this.$audioEl.get(0),this._createControls()},_createControls:function(){var t=this;this.$controls=o('<ul class="vc-controls" style="display:none;"/>'),this.$cPlay=o('<li class="vc-control-play">Play<span></span></li>'),this.$cStop=o('<li class="vc-control-stop">Stop<span></span></li>'),this.$controls.append(this.$cPlay).append(o('<li class="vc-control-empty"><span></span></li>')).append(this.$cStop).appendTo(this.$el),this.$volume=o('<div style="display:none;" class="vc-volume-wrap"><div class="vc-volume-control"><div class="vc-volume-knob"></div></div></div> ').appendTo(this.$el),document.createElement("audio").canPlayType&&(document.createElement("audio").canPlayType("audio/mpeg")||document.createElement("audio").canPlayType("audio/ogg")?(this.$controls.show(),this.$volume.show(),this.$volume.find("div.vc-volume-knob").knobKnob({snap:10,value:359*this.options.initialVolume,turn:function(o){t._changeVolume(o)}}),this.audio.volume=this.options.initialVolume):console.log("wrong"))},_loadEvents:function(){var t=this;this.$cPlay.on("mousedown",function(i){t._setButtonActive(o(this)),t._play()}),this.$cStop.on("mousedown",function(i){t._setButtonActive(o(this)),t._stop()})},_setButtonActive:function(t){t.addClass("vc-control-pressed"),setTimeout(function(){t.removeClass("vc-control-pressed")},100)},_prepare:function(t){this._clear(),this.$audioEl.attr("src",o.Radio.defaults.url)},_updateButtons:function(t){var o="vc-control-active";switch(this.$cPlay.removeClass(o),this.$cStop.removeClass(o),t){case"play":this.$cPlay.addClass(o)}},_changeVolume:function(t){this.audio.volume=t},_play:function(){var t=this;this._updateButtons("play"),o.when(this.sound.play("click")).done(function(){t._prepare(t.songs),t.$audioEl.on("canplay",function(i){o(this).off("canplay"),t.audio.currentTime=0,t.audio.play()})})},_stop:function(t){t||(this._updateButtons("stop"),this.sound.play("click")),this.audio.pause(),this._clearSrc()},_clear:function(){this.$audioEl.children("source").remove()},_clearSrc:function(){this.audio.src=""}},o.Song=function(){},o.Song.prototype={loadMetadata:function(){var t=this;return o.Deferred(function(i){var n=o("<audio/>");n.attr("preload","auto"),n.attr("src","sounds/click.mp3"),n.on("loadedmetadata",function(o){t.duration=n.get(0).duration,i.resolve(t)})}).promise()}},o.Sound=function(){this._init()},o.Sound.prototype={_init:function(){this.$audio=o("<audio/>").attr("preload","auto")},getSource:function(t){return"sounds/"+this.action+"."+t},play:function(t,i){var n=this;return o.Deferred(function(e){n.action=t;var a=n.getSource("mp3");n.$audio.attr("src",a),i?n.$audio.attr("loop",i):n.$audio.removeAttr("loop"),n.$audio.on("canplay",function(t){setTimeout(function(){e.resolve()},500),o(this).get(0).play()})})}};var n=function(o){t.console&&t.console.error(o)};o.fn.radio=function(t){if("string"==typeof t){var i=Array.prototype.slice.call(arguments,1);this.each(function(){var e=o.data(this,"cassette");return e?o.isFunction(e[t])&&"_"!==t.charAt(0)?void e[t].apply(e,i):void n("no such method '"+t+"' for cassette instance"):void n("cannot call methods on cassette prior to initialization; attempted to call method '"+t+"'")})}else this.each(function(){var i=o.data(this,"cassette");i||o.data(this,"cassette",new o.Radio(t,this))});return this}}(window,jQuery);