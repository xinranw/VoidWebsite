// Generated by CoffeeScript 1.6.3
(function() {
  var AutoRun;

  AutoRun = (function() {
    function AutoRun() {
      this.setup_dropdowns();
      this.setup_homepage_slider();
      this.load_nav_button();
      this.highlight_nav_links();
      this.change_album();
      this.setup_scrollable_gallery();
      AutoRun.set_first_image();
    }

    AutoRun.prototype.setup_dropdowns = function() {
      $('dd').filter(':nth-child(n+2)').addClass('hide');
      return $('dl').on('mousedown', 'dt', function() {
        return $(this).next().slideDown(200).siblings('dd').slideUp(200);
      });
    };

    AutoRun.prototype.setup_homepage_slider = function() {
      Galleria.loadTheme('scripts/classic/galleria.classic.min.js');
      Galleria.run('#home_page_slider', {
        dummy: 'images/teamPhotos/void2013.jpg',
        showCounter: false,
        autoplay: 3000,
        showImagenav: true,
        carousel: false,
        showInfo: false,
        pauseOnInteraction: true,
        imageCrop: "height",
        imageMargin: 0,
        extend: function() {
          var gallery;
          gallery = this;
          this.bind(Galleria.IMAGE, function(e) {
            var currImg, current, titleText;
            current = gallery.getData(gallery.getIndex());
            currImg = current.original;
            if (currImg.className === "video") {
              return $('#title_text').hide();
            } else {
              titleText = $(currImg).attr('title');
              if (($('#title_text').length)) {
                $('#title_text').show();
                return $('#title_text').text(titleText);
              } else {
                return $('.galleria-stage').append('<span id="title_text">' + titleText + '</span>');
              }
            }
          });
          return $('.galleria-thumbnails-container').hide();
        }
      });
      return Galleria.configure({
        youtube: {
          showInfo: 1
        }
      });
    };

    AutoRun.prototype.load_nav_button = function() {
      return $(".nav-button").click(function() {
        return $(".nav-button,.nav").toggleClass("open");
      });
    };

    AutoRun.prototype.highlight_nav_links = function() {
      var link, linkName, start, url;
      ({
        find_a: function(text) {
          return $(this).text() === text;
        }
      });
      url = $(location).attr('href');
      start = url.lastIndexOf('/') + 1;
      linkName = url.substring(start);
      link = $('a[href$="' + linkName + '"]');
      link.addClass("selected");
      return link.parents(".dropdown").children('a[href$="#"]').addClass("selected");
    };

    AutoRun.set_first_image = function() {
      return $(".items:not(.hide) img").first().click();
    };

    AutoRun.prototype.change_album = function() {
      var links;
      links = $(".photos-dropdown .type-selector li");
      return links.each(function() {
        var _this = this;
        return this.onclick = function() {
          var category, years;
          years = $(_this).parents('label').attr('for');
          category = $(_this).text().toLowerCase();
          $(".scrollable").addClass("hide");
          $(".scrollable[id=photos_" + years + "]").removeClass("hide");
          $(".items").addClass("hide");
          $(".items[id=photos_" + years + "_" + category + "]").removeClass("hide");
          return AutoRun.set_first_image();
        };
      });
    };

    AutoRun.prototype.setup_scrollable_gallery = function() {
      $(".items:not(.default_items)").addClass("hide");
      $(".scrollable").scrollable();
      $(".items img").click(function() {
        var img, url, wrap;
        if ($(this).hasClass("active")) {
          return;
        }
        url = $(this).attr("src").replace("thumbnails", "images");
        wrap = $("#image_wrap");
        img = new Image();
        img.onload = function() {
          wrap.fadeTo("fast", 1);
          return wrap.find("img").attr("src", url);
        };
        img.src = url;
        $(".items img").removeClass("active");
        return $(this).addClass("active");
      });
      return $(".photos-dropdown .type-selector:first li:first").click();
    };

    return AutoRun;

  })();

  this.AutoRun = AutoRun;

}).call(this);
