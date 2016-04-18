//Problem: User when clicking on image goes to a dead end
//Solution: Create an overlay with the large image - Lightbox

var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");

//Add image to overlay
$overlay.append($image);

var $leftArrow = $('<div id="leftArrow"> < </div>');
var $rightArrow = $('<div id="rightArrow"> > </div>');
var $closeLightbox = $('<div id="closeLightbox"> x </div>');

//Add buttons to overlay
$overlay.append($closeLightbox);
$overlay.append($leftArrow);
$overlay.append($rightArrow);

//Add caption to overlay
$overlay.append($caption);

//Add overlay
$("body").append($overlay);

//Capture the click event on a link to an image
$("#lightbox a").on("click",function(event){
  event.preventDefault();//Prevent link from opening in new window
  getCurrentImage(this);//Call getCurrentImage function
  $overlay.fadeIn("slow");//Show the overlay.
});
//Capture the click event on leftArrow
$leftArrow.on("click", function(){
  getPrevImage();//Call getPrevImage function
});
//Capture the click event on rightArrow
$rightArrow.on("click", function(){
  getNextImage();//Call getNextImage function
});

function getCurrentImage (currentImage) {  //Create function called getCurrentImage, declared parameter currenImage outside of function
    thisImage = currentImage;// store value of currentImage inside thisImage
    var imageLocation = $(currentImage).attr("href");// accessing attributes from currentImage to pull the href value 
    $image.attr("src", imageLocation);//Update overlay with the image linked in the link

    //Get child's alt attribute and set caption
    var captionText = $(currentImage).children("img").attr("alt");
    $caption.text(captionText);
}

function getPrevImage() {//Create function called getPrevImage
    imageParent = $(thisImage).parent().prev();
    if(imageParent.length!=0){
      thisImage = $(imageParent).children("a");
      // imageLocation = $(thisImage).attr("href");
      // $image.attr("src", imageLocation);
    }
    getCurrentImage(thisImage);
    
}

function getNextImage() {//Create function called getNextImage
    imageParent = $(thisImage).parent().next();
    if(imageParent.length!=0){
    thisImage = $(imageParent).children("a");
    // imageLocation = $(thisImage).attr("href");
    // $image.attr("src", imageLocation);
    }
    getCurrentImage(thisImage);
}

//When overlay is clicked
$closeLightbox.click(function(){
  //Hide the overlay
  $overlay.fadeOut();
});


/*****************************
KEYBOARD NAVIGATION
*****************************/


$("body").keyup( function(e){
  if(e.keycode == 37){
    getPrevImage();
  } else if (e.keycode == 39){
    getNextImage();
  } else if (e.keycode == 27){
    $("#lightbox").fadeOut();
  }
});