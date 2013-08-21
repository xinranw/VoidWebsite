(function autorun(){
  setup_dropdowns();
  set_up_homepage_slider();
  load_nav_button();
  highlight_nav_links();
  change_album();
  setup_scrollable_gallery();
  set_first_image();
})()


function setup_dropdowns(){
  $('dd').filter(':nth-child(n+2)').addClass('hide');
  $('dl').on('mousedown', 'dt', function(){
    $(this)
    .next()
    .slideDown(200)
    .siblings('dd')
    .slideUp(200);
  })
}

function set_up_homepage_slider(){
  Galleria.loadTheme('../Frameworks, Icons, Demos/Photo viewers/galleria/themes/classic/galleria.classic.min.js');
  Galleria.run('#home_page_slider', {
    dummy: 'images/teamPhotos/void2013.jpg',
    showCounter: false,
    autoplay: 3000,
    carousel: false,
    showImagenav: true,
    carousel: false,
    showInfo: false,
    pauseOnInteraction: true,
    imageCrop: "height",
    imageMargin: 0,
    extend: function(){
      var gallery = this; // "this" is the gallery instance
      this.bind(Galleria.IMAGE, function(e) {
        var current = gallery.getData(gallery.getIndex());
        var currImg = current.original;
        if (currImg.className == "video"){
          $('#title_text').hide();       
        } else {
          var titleText = $(currImg).attr('title');
          if ($('#title_text').length){
            $('#title_text').show();
            $('#title_text').text(titleText);
          } else
          $('.galleria-stage').append('<span id="title_text">' + titleText + '</span>');
        }
      });
      // hide thumbnails (thumbnails: false doesn't work)
      $('.galleria-thumbnails-container').hide();
    }
  });
  // display video info (doesn't work if above the extend function for some reason)
  Galleria.configure({
    youtube: {
      showInfo: 1
    }
  })
}

function load_nav_button(){
  $(".nav-button").click(function () {
    $(".nav-button,.nav").toggleClass("open");
  });    
}

function highlight_nav_links(){
  function find_a(text){
    return $(this).text() === text;
  }
  var url = $(location).attr('href');
  var start = url.lastIndexOf('/') + 1;
  var linkName = url.substring(start);
  var link = $('a[href$="' + linkName + '"]');
  link.addClass("selected");
  link.parents(".dropdown").children('a[href$="#"]').addClass("selected")
}

function change_album(){
  links = $(".photos-dropdown .type-selector li");
  links.each(function(){
    this.onclick = function(){
      years = $(this).parents('label').attr('for');
      category = $(this).text().toLowerCase();
      $(".scrollable").addClass("hide");
      $(".scrollable[id=photos_"+years+"]").removeClass("hide");
      $(".items").addClass("hide");
      $(".items[id=photos_"+years+"_"+category+"]").removeClass("hide");
      set_first_image();
    }
  });
}

function setup_scrollable_gallery(){
  $(".items:not(.default_items)").addClass("hide");

  $(".scrollable").scrollable();

  $(".items img").click(function() {
    // see if same thumb is being clicked
    if ($(this).hasClass("active")) { return; }

    // calclulate large image's URL based on the thumbnail URL (flickr specific)
    var url = $(this).attr("src").replace("thumbnails", "images");

    // get handle to element that wraps the image and make it semi-transparent
    var wrap = $("#image_wrap"); /*.fadeTo("medium", 0.5)*/

    // the large image
    var img = new Image();


    // call this function after it's loaded
    img.onload = function() {

      // make wrapper fully visible
      wrap.fadeTo("fast", 1);

      // change the image
      wrap.find("img").attr("src", url);

    };

    // load images
    img.src = url;

    // activate item
    $(".items img").removeClass("active");
    $(this).addClass("active");

    
  });
  $(".photos-dropdown .type-selector:first li:first").click();
  
}

function set_first_image(){
  $(".items:not(.hide) img").first().click();

}