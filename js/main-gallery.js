// var widthActual = window.innerWidth;
var gallery_currentPhotoExpanded;
var gallery_movingPhoto = false;

$(document).ready(function(){
	gallery_loadImages();
	$(".container-photo").click(function(){
		gallery_currentPhotoExpanded = $(this).index();
		gallery_showExpandedPhoto(gallery_currentPhotoExpanded);

	});
	$(".button-close").click(gallery_hideExpandedPhoto);
	$(".button-next-photo").click(gallery_nextPhotoExpanded);
	$(".button-previous-photo").click(gallery_previousPhotoExpanded);
});


$(window).load(function(){
	$(window).resize(init);
	init();
});

function init(){
	if(window.innerWidth > 1600){
		gallery_dinamicHeight(0.5);
		
	}else if(window.innerWidth > 1000 && window.innerWidth < 1600){
		gallery_dinamicHeight(0.75);
	}else{
		gallery_dinamicHeight(1);
	}
}

function gallery_loadImages(){
	var amountOfImages = $(".container-photo").length;
	for (var i = 0; i < amountOfImages; i++) {
		$(".container-photos").append("<div class='photo-expanded'><img src=" + $($(".container-photo .photo img")[i]).attr("src") + "></div>");
	};
}

function gallery_dinamicHeight(ratio){
	$(".container-photo").height($(".container-photo").innerWidth()*ratio);
}

function gallery_showExpandedPhoto(index){

	if(window.innerWidth > 1000){
		$(".container-expanded-photo").css("display","block");
		$("body").css("overflow","hidden");

		if(gallery_currentPhotoExpanded == 0){
			gallery_disableButtonPreviousPhoto();
			console.log("deshabilitar boton anterior")
		}
		if(gallery_currentPhotoExpanded == $(".container-photo").length-1){
			gallery_disableButtonNextPhoto();
			console.log("deshabilitar boton siguiente")
		}

		TweenLite.to(
			$(".container-expanded-photo"),
			1,
			{
				opacity: 1,
				ease: Power2.easeOut
			}
		)
		TweenLite.to(
			$($(".photo-expanded img")[index]),
			1,
			{
				opacity: 1,
				ease: Power2.easeOut
			}
		);
	}
}

function gallery_nextPhotoExpanded(){
	var amountOfPhotos = $(".container-photo").length -1;
	if(gallery_currentPhotoExpanded != amountOfPhotos && gallery_movingPhoto == false){
		gallery_movingPhoto = true;
		if(gallery_currentPhotoExpanded == amountOfPhotos-1){
			gallery_disableButtonNextPhoto();
		}
		gallery_putNextPhotoToRight();
		gallery_slideToNextPhoto();
		gallery_putInInitialPosition();
		gallery_currentPhotoExpanded = gallery_currentPhotoExpanded+1;
	}
}

function gallery_previousPhotoExpanded(){
	var amountOfPhotos = $(".container-photo").length -1;
	if(gallery_currentPhotoExpanded != 0 && gallery_movingPhoto == false){
		console.log(gallery_currentPhotoExpanded);
		gallery_movingPhoto = true;
		if(gallery_currentPhotoExpanded == 1){
			gallery_disableButtonPreviousPhoto();
		}
		gallery_putPreviousPhotoToLeft();
		gallery_slideToPreviousPhoto();
		gallery_putInInitialPosition();
		gallery_currentPhotoExpanded = gallery_currentPhotoExpanded-1;
	}
}

function gallery_putNextPhotoToRight(){
	$($(".photo-expanded")[gallery_currentPhotoExpanded+1]).css("left","100vw");
}
function gallery_putPreviousPhotoToLeft(){
	$($(".photo-expanded")[gallery_currentPhotoExpanded-1]).css("left","-100vw");
}

function gallery_slideToNextPhoto(){
	var toMove = window.innerWidth;

	TweenLite.to(
		$($(".photo-expanded")[gallery_currentPhotoExpanded+1]),
		1,
		{
			"left":"0px;",
			opacity: 1,
			ease: Power2.easeOut
		}
	);

	TweenLite.to(
		$($(".photo-expanded img")[gallery_currentPhotoExpanded+1]),
		1,
		{
			opacity: 1,
			ease: Power2.easeOut,
			onComplete: function(){
				$(".button-previous-photo").css("display","block");
			}
		}
	);

	TweenLite.to(
		$($(".photo-expanded")[gallery_currentPhotoExpanded]),
		1,
		{
			"left":"-100%",
			opacity: 0,
			ease: Power2.easeOut
		}
	);
}

function gallery_slideToPreviousPhoto(){
	var toMove = window.innerWidth;

	TweenLite.to(
		$($(".photo-expanded")[gallery_currentPhotoExpanded-1]),
		1,
		{
			"left":"0px",
			opacity: 1,
			ease: Power2.easeOut
		}
	);

	TweenLite.to(
		$($(".photo-expanded img")[gallery_currentPhotoExpanded-1]),
		1,
		{
			opacity: 1,
			ease: Power2.easeOut,
			onComplete: function(){
				$(".button-next-photo").css("display","block");
			}
		}
	);

	TweenLite.to(
		$($(".photo-expanded")[gallery_currentPhotoExpanded]),
		1,
		{
			"left":"100%",
			opacity: 0,
			ease: Power2.easeOut
		}
	);
}

function gallery_putInInitialPosition(){
	var toMove = window.innerWidth;
	TweenLite.to(
		$($(".photo-expanded")[gallery_currentPhotoExpanded]),
		0,
		{
			"left":"0px",
			opacity: 0,
			delay: 1,
			onComplete: function(){
				gallery_movingPhoto = false;
			}
		}
	);
}

function gallery_disableButtonNextPhoto(){
	$(".button-next-photo").css("display","none");
}

function gallery_disableButtonPreviousPhoto(){
	$(".button-previous-photo").css("display","none");
}

function gallery_hideExpandedPhoto(){
	$("body").css("overflow","auto");
	$("body").css("overflow-x","hidden");
	TweenLite.to(
		$(".container-expanded-photo"),
		0.5,
		{
			opacity: 0,
			ease: Power2.easeOut,
			onComplete: function(){
				$(".container-expanded-photo").css("display","none");	
			}
		}
	)
	TweenLite.to(
		$(".photo-expanded img"),
		1,
		{
			opacity: 0,
			ease: Power2.easeOut
		}
	);
}