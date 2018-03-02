var scrolling = false;
var currentSlide = 0;
var slides;
var widthActual = window.innerWidth;

$(document).ready(function(){
	slides = calculateNumberOfSlides();
	$(window).resize(init);
	animateMainWallpaper();
	if(window.innerWidth > 768){
		$(".cp-button").mouseenter(highButton);
		$(".cp-button").mouseleave(lowButton);
		$(".fp-button").mouseenter(highButtonFooter);
		$(".fp-button").mouseleave(lowButtonFooter);
		$(".can-active").mouseenter(highlightGrid);
		$(".can-active").mouseleave(lowlightGrid);
		$(window).bind('mousewheel', downSlide);
	}
});

$(window).load(function(){
	init();
});

function init(){
	slides = calculateNumberOfSlides();
	if(window.innerWidth > 649){
		adjustVh();	
	}
	if(window.innerWidth < 1200 && window.innerHeight > 1051){
		var smallArray = $(".small-grid.can-active");
		var mediumArray = $(".medium-grid.can-active")
		for(var i = 0; i < smallArray.length; i++){
			$(smallArray[i]).addClass("medium-grid");
		}
		for(var j = 0; j < mediumArray.length; j++){
			$(mediumArray[i]).removeClass("small-grid");
		}
	}
	if(window.innerWidth < 1050 && window.innerHeight > 650){
		$(".can-active").css("width","100%");
		$(".can-active").css("height","50%");
		$(".big-grid").css("width","100vw");
	}
	if(window.innerWidth < 649){

		$(".can-active").css("width","100%");
		$(".can-active").css("height","100vw");
		$(".big-grid").css("width","100vw");
		$(".cover-page").css("width","100%");
		$(".cover-page").css("height","100vw");
		$(".footer-page").css("width","100%");
		$(".footer-page").css("height","100vw");
	}
}

function calculateNumberOfSlides(){
	return Math.round($(document).innerHeight()/$(window).innerHeight());
}

function adjustVh(){
	if(window.innerWidth <= 768){
		var oldWidth = widthActual;
		if(window.innerWitdh != oldWidth){
			$(".full-height").height(window.innerHeight);
		}
	}
}

function downSlide(event){
	event.preventDefault();	

	if(scrolling == false){
		
		if (event.originalEvent.wheelDelta >= 0) { // para arriba
			
			if(currentSlide > 0){
				scrolling = true;
				$("html, body").animate({
				    scrollTop: (currentSlide-1) * (window.innerHeight)
				}, 1000, function (){
					scrolling = false;
				});
				currentSlide--;
			}
		}else{
			if(currentSlide < slides){ // para abajo
				scrolling = true;
				$("html, body").animate({
				    scrollTop: (currentSlide+1) * (window.innerHeight)
				}, 1000, function(){
					scrolling = false;
				});
				currentSlide++;
			}
		}
	}
}

function animateMainWallpaper(){
	TweenLite.to(
		$(".cover-page"),
		1,
		{
			opacity: 1,
			y: 20,
			ease: Power2.easeInOut
		}
	)

	TweenLite.to(
		$(".cp-title"),
		0,
		{
			y: -10,
			x: -10
		}
	);

	TweenLite.to(
		$(".cp-title"),
		0.8,
		{
			y: +10,
			x: +5,
			opacity: 1,
			ease: Power2.easeInOut,
			delay: 0.3
		}
	);
	TweenLite.to(
		$(".cp-info"),
		0.8,
		{
			y: +10,
			x: +5,
			opacity: 1,
			ease: Power2.easeInOut,
			delay: 0.8
		}
	);
	TweenLite.to(
		$(".cp-button"),
		0.8,
		{
			y: +10,
			x: +5,
			opacity: 1,
			ease: Power2.easeInOut,
			delay: 1.2
		}
	);
}

function highlightGrid(){

	if(window.innerWidth > 1200){
		TweenLite.to(
			$(this).find(".inverse-curtain"),
			0.4,
			{
				opacity: 0.6,
				ease: Power2.easeOut
			}
		);
		TweenLite.to(
			$(this).find(".grid-curtain"),
			0.4,
			{
				opacity: 0.6,
				ease: Power2.easeOut
			}
		);
		TweenLite.to(
			$(this).find(".grid-photo"),
			0.4,
			{
				scaleX: 1.05,
				scaleY: 1.05,
				transformOrigin: "center",
				ease: Power2.easeOut
			}
		);
	}
}

function lowlightGrid(){
	if(window.innerWidth > 1200){
		TweenLite.to(
			$(this).find(".inverse-curtain"),
			0.4,
			{
				opacity: 1,
				ease: Power2.easeOut
			}
		);
		TweenLite.to(
			$(this).find(".grid-curtain"),
			0.4,
			{
				opacity: 0,
				ease: Power2.easeOut
			}
		);
		TweenLite.to(
			$(this).find(".grid-photo"),
			0.4,
			{
				scaleX: 1,
				scaleY: 1,
				transformOrigin: "center",
				ease: Power2.easeOut
			}
		);
	}
}


function highButton(){
	if(window.innerWidth > 1200){
		TweenLite.to(
			$(".cp-button"),
			1,
			{
				"background-color":"#17252D",
				ease: Power2.easeOut
			}
		);
		TweenLite.to(
			$(".cp-button p"),
			0.1,
			{
				"color":"white",
				ease: Power2.easeOut
			}
		);
	}
}

function lowButton(){
	if(window.innerWidth > 1200){
		TweenLite.to(
			$(".cp-button"),
			1,
			{
				"background-color":"transparent",
				ease: Power2.easeInOut
			}
		);
		TweenLite.to(
			$(".cp-button p"),
			0.1,
			{
				"color":"#17252D",
				ease: Power2.easeInOut
			}
		);
	}
}

function highButtonFooter(){
	if(window.innerWidth > 1200){
		TweenLite.to(
			$(".fp-button"),
			1,
			{
				"background-color":"white",
				ease: Power2.easeOut
			}
		);
		TweenLite.to(
			$(".fp-button p"),
			0.1,
			{
				"color":"#17252D",
				ease: Power2.easeOut
			}
		);
	}
	
}

function lowButtonFooter(){
	if(window.innerWidth > 1200){
		TweenLite.to(
			$(".fp-button"),
			1,
			{
				"background-color":"transparent",
				ease: Power2.easeInOut
			}
		);
		TweenLite.to(
			$(".fp-button p"),
			0.1,
			{
				"color":"white",
				ease: Power2.easeInOut
			}
		);
	}
}

