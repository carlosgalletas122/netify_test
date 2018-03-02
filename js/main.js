var oldScrollTop = 0;
var cuantomover = 0;
var firstPageAnimated = false;
var secondPageAnimated = false;

$(document).ready(function(){
	$(window).scroll(function(){
		movePhraseAndWallpaper();
		animateFirstPage();
		animateSecondPage();
	});
	$(".button-form1").click(traslateLeftForm);
	$(".button-form2").click(traslateRightForm);
	$(".back-button").click(goBack);
});

$(window).load(function(){
	moveCurtain();
	moveFirstPhrase();
});

function goBack(){
	TweenLite.to(
		$(".container-form2"),
		1,
		{
			"left": "100%",
			ease: Power2.easeOut
		}

	);
	TweenLite.to(
		$(".container-form1"),
		1,
		{
			"left": "-100%",
			ease: Power2.easeOut
		}

	);
}

function traslateRightForm(){
	TweenLite.to(
		$(".container-form2"),
		1,
		{
			"left": "0px",
			ease: Power2.easeOut
		}

	);
}

function traslateLeftForm(){
	TweenLite.to(
		$(".container-form1"),
		1,
		{
			"left": "0",
			ease: Power2.easeOut
		}

	);
}

function animateFirstPage(){
		anchoCortina = $(".parag-curtain").width();
		if( $(".parag").offset().top < $(window).scrollTop() + $(window).innerHeight() * 0.85) {
			if(!firstPageAnimated){
				TweenLite.to(
					$(".parag-curtain"),
					1.5,
					{	
						x: anchoCortina,
						ease:Power2.easeInOut
					}
				)
				TweenLite.to(
					$(".parag p"),
					1,
					{	
						opacity: 1,
						ease:Power2.easeOut
					}
				)
				TweenLite.to(
					$(".parag p"),
					1,
					{	
						x: +25,
						delay: 0.2,
						ease:Power2.easeOut
					}
				)
			}
			if( $(".photo").offset().top < $(window).scrollTop() + $(window).innerHeight() * 0.85){
				if(window.innerWidth > 1024){
					TweenLite.to(
						$(".photo"),
						1,
						{	
							"height":"50%",
							ease:Power2.easeInOut
						}
					)
				}
				TweenLite.to(
					$(".photo"),
					1,
					{	
						opacity: 1,
						ease:Power2.easeInOut
					}
				)
			}
			firstPageAnimated = true;
		}
}

function animateSecondPage(){
	if( $(".par").offset().top < $(window).scrollTop() + $(window).innerHeight() * 0.7 && secondPageAnimated == false ){
			TweenLite.to(
				$(".par p:nth(0)"),
				1,
				{	
					opacity: 1,
					x: 50,
					ease:Power2.easeOut,
				}
			);
			TweenLite.to(
				$(".par p:nth(1)"),
				1,
				{
					opacity: 1,
					x: 50,
					ease:Power2.easeOut,
					delay: 0.4,
				}
			);
			TweenLite.to(
				$(".par p:nth(2)"),
				1,
				{
					opacity: 1,
					x: 50,
					ease:Power2.easeOut,
					delay: 0.8,
					
				}
			);

		}
		if( $(".info p").offset().top < $(window).scrollTop() + $(window).innerHeight() * 0.90 && secondPageAnimated == false ){
			TweenLite.to(
				$(".info p:nth(0)"),
				1,
				{	
					opacity: 1,
					ease:Power2.easeOut,
					onComplete: function (){
						TweenLite.to(
							$(".info p:nth(1)"),
							0.5,
							{
								opacity: 1,
								ease:Power2.easeOut
							}

						);
					}
				}
			)
			secondPageAnimated = true;
		}
}

function movePhraseAndWallpaper (){
	var scrolldif = oldScrollTop - $(window).scrollTop();
	oldScrollTop = $(window).scrollTop();
	cuantomover += scrolldif;

	TweenLite.to(
		$("#second-phrase"),
		0.15,
		{
			y: cuantomover*0.45,
			ease: Power2.easeOut,
		}
	);
	TweenLite.to(
		$(".wallpaper"),
		0.15,
		{
			y: -cuantomover*0.2,
			ease: Power2.easeOut,
		}
	);
}

function moveCurtain(){
	TweenLite.to(
		$(".curtain-part>div"),
		1.5,
		{
			delay: 1.5,
			x: "100%",
			ease: Power2.easeIn
		}
	);
}

function moveFirstPhrase(){
	TweenLite.to(
		$(".line:nth(0)"),
		1,
		{	
			y: -200,
			ease: Power2.easeOut
		}
	);
	TweenLite.to(
		$(".line:nth(1)"),
		1,
		{	
			delay:0.1,
			y: -200,
			ease: Power2.easeOut
		}
	);
	var letters = $("#first-phrase 	.letter p");
	for (var i = 0; i < letters.length; i++) {
		TweenLite.to(
			$(letters[i]),
			1.3,
			{	
				x: 200,
				ease: Power2.easeIn,
				delay: 1.5,
			}
		);	
	};
	moveSecondPhrase();
}

function moveSecondPhrase() {
	TweenLite.to(
		$(".line:nth(2)"),
		0,
		{	
			y: -200,
			ease: Power2.easeOut
		}
	);
	TweenLite.to(
		$(".line:nth(3)"),
		0,
		{	
			y: -200,
			ease: Power2.easeOut
		}
	);

	var letters2 = $("#second-phrase .letter p");
	for (var i = 0; i < letters2.length; i++) {

		TweenLite.to(
			$(letters2[i]),
			0,
			{	
				y: 200,
				ease: Power2.easeIn,
			}
		);	

		TweenLite.to(
			$(letters2[i]),
			1,
			{	
				y: 0,
				ease: Power2.easeOut,
				delay: 3,
				onComplete: function(){
					// $("body").css("overflow","auto");
					// $("body").css("overflow-x","hidden");
				}
			}
		);

	};
}