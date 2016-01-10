//get original height and margin-top outside scroll
// var logo        = $('.logo'),
//     imageHeight = parseInt( logo.css('height') ),
//     imageWidth  = parseInt( logo.css('width') ),
//     imageTop    = parseInt( logo.css('top') ),
//     stopHeight  = imageHeight / 8,
//     stopWidth   = imageWidth / 8,
//     stopTop     = imageTop / 8;

// $(window).scroll(function(e) {

//   var windowScroll  = $(window).scrollTop(),
//       newHeight     = imageHeight - windowScroll,
//       newWidth      = imageWidth - windowScroll,
//       newTop        = imageTop - windowScroll;

//   if ( newHeight >= stopHeight && newWidth >= stopWidth ){
//     logo.css("height", newHeight);
//     logo.css("width", newWidth);

//     if (newTop >= stopTop){
//       logo.css("top", newTop)
//     }
//   } else {
//     logo.css("height", stopHeight);
//     logo.css("width", stopWidth);
//     logo.css("top", stopTop)

//   }

//   if ( logo.height() <= 80 ){
//     logo.attr('done-scrolling', 'true');
//   } else {
//     logo.attr('done-scrolling', 'false');
//   }
// });