(function autorun(){
  setup_dropdowns();
  add_slider_effect();
  load_nav_button();
  highlight_nav_links();
  change_album();
  setup_scrollable_gallery()
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



function add_slider_effect(){
  $('#slider').nivoSlider({
    effect: 'fade',
    controlNav: false,
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
  links = $("#photos_dropdown li");
  links.each(function(){
    this.onclick = function(){
      years = $(this).parents("dd").prev().text().replace("-", "_");
      category = $(this).text().toLowerCase();
      $(".photo_gallery").addClass("hide");
      $("article[id=photos_"+years+"]").removeClass("hide");
      $(".items").addClass("hide");
      if (category == "old")
        $("div[id=photos_old]").removeClass("hide");
      else if (category == "field" || category == "social")
        $("div[id=photos_"+years+"_"+category+"]").removeClass("hide");
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
  // when page loads simulate a "click" on the first image
  set_first_image();
}

function set_first_image(){
  $(".items:not(.hide) img").filter(":first").click()
}