$(window).resize(function(){
$('.rapClock').each(function(){
	this.Render();
});
});

(function($){
$.fn.jsRapClock = function(options){

return this.each(function(){
this.opt = $.extend({
	caption:'',
	shiftH:0,
	shiftM:0,
	shiftS:0
},options);
var base = this;

this.Render = function(){
$(this).empty();
var w = $(this).width();
$(this).addClass('rapClock').height(w);
if(this.opt.caption)
	$('<div>').addClass('rapClockCaption').text(this.opt.caption).appendTo(this);
for(var n = 0;n < 12;n++)
	$('<div>').addClass('rapHours').css('transform','translate(-50%,-50%) rotate(' + (n * 30) + 'deg) translate(0,500%)').appendTo(this);
$('<div>').addClass('rapHands rapClockH').appendTo(this);
$('<div>').addClass('rapHands rapClockM').appendTo(this);
$('<div>').addClass('rapHands rapClockS').appendTo(this);
this.ShowTime();
}

this.ShowTime = function(){
var d = new Date();	
var h = d.getHours() + this.opt.shiftH;
var m = d.getMinutes() + this.opt.shiftM;
var s = d.getSeconds() + this.opt.shiftS;
$('.rapClockH',this).css('transform','translate(-50%,-50%) rotate(' + (h * 30 + m / 2) + 'deg) translate(0,-40%)');
$('.rapClockM',this).css('transform','translate(-50%,-50%) rotate(' + (m * 6) + 'deg) translate(0,-48%)');
$('.rapClockS',this).css('transform','translate(-50%,-50%) rotate(' + (s * 6) + 'deg) translate(0,-35%)');
}

this.Render();
setInterval( function(){
	base.ShowTime();
},1000 );
});

}})(jQuery);