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
	clockNumbers:true,
	clock:0,
	stopwatch:0,
	pitch:1.0,
	rate:0.8,
	shiftH:0,
	shiftM:0,
	shiftS:0
},options);

let base = this;
this.synth = window.speechSynthesis;
this.timerId = 0;
this.sec = 0;

$(this).bind({
	click : function(e){
		if(base.opt.stopwatch){
			if(base.timerId){
				clearInterval(base.timerId);
				base.Speak('stopwatch off');
				base.timerId = 0;
			}else{
				base.sec = 0;
				base.Speak('stopwatch on');
				base.timerId = setInterval(function(){
					base.sec += base.opt.stopwatch;
					let t = base.sec;
					let s = t % 60;
					t = Math.floor(t / 60);
					let m = t % 60;
					h = Math.floor(t / 60);
					if(s <= 9) s = '0' + s;
					if(m <= 9) m = '0' + m;
					if(h <= 9) h = '0' + h;
					base.Speak(h + ':' + m + ':' + s);
				},base.opt.stopwatch * 1000);
			}
		}else if(base.opt.clock){
			base.Speak('clock off');
			base.opt.clock = 0;
		}else{
			base.Speak('clock on');
			base.opt.clock = 1;
		}
	}
});

this.Render = function(){
$(this).empty();
var w = $(this).width();
$(this).addClass('rapClock').height(w);
if(this.opt.caption)
	$('<div>').addClass('rapClockCaption').css({'font-size':(w * 0.08)+ 'px'}).text(this.opt.caption).appendTo(this);
for(var n = 0;n < 12;n++)
	if(this.opt.clockNumbers)
		$('<div>').text((n + 5) % 12 + 1).addClass('rapClockNumbers').css({'font-size':(w * 0.1)+ 'px',transform:'translate(-50%,-50%) rotate(' + (n * 30) + 'deg) translate(0,' + (w * 0.36) + 'px) rotate(-' + (n * 30) + 'deg)'}).appendTo(this);
	else
		$('<div>').addClass('rapClockHours').css('transform','translate(-50%,-50%) rotate(' + (n * 30) + 'deg) translate(0,500%)').appendTo(this);
$('<div>').addClass('rapClockHands rapClockH').appendTo(this);
$('<div>').addClass('rapClockHands rapClockM').appendTo(this);
$('<div>').addClass('rapClockHands rapClockS').appendTo(this);
this.ShowTime();
}

this.ShowTime = function(){
let d = new Date();
let t = d.getTime() + this.opt.shiftH * 3600000 + this.opt.shiftM * 60000 + this.opt.shiftS * 1000;
d.setTime(t);
let h = d.getHours();
let m = d.getMinutes();
let s = d.getSeconds();
$('.rapClockH',this).css('transform','translate(-50%,-50%) rotate(' + (h * 30 + m / 2) + 'deg) translate(0,-40%)');
$('.rapClockM',this).css('transform','translate(-50%,-50%) rotate(' + (m * 6) + 'deg) translate(0,-45%)');
$('.rapClockS',this).css('transform','translate(-50%,-50%) rotate(' + (s * 6) + 'deg) translate(0,-30%)');
if(this.opt.clock && !this.timerId)
	if((!(m % this.opt.clock)) && !s){
		if(h <= 9) h = '0' + h;
		if(m <= 9) m = '0' + m;
		if(!m)
			this.Speak(h + 'o’clock');
		else
			this.Speak(m + ' past ' + h);
	}
}

this.Speak =function(s){
let utterThis = new SpeechSynthesisUtterance(s);
utterThis.pitch = this.opt.pitch;
utterThis.rate = this.opt.rate;
this.synth.speak(utterThis);
}

this.Render();
setInterval( function(){
	base.ShowTime();
},1000 );

});

}})(jQuery);