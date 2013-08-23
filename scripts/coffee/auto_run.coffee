class AutoRun
  # keys correlate to @page_name
  auto_run_functions = {
    index : ()->
      AutoRun.setup_homepage_slider()
    videos : ()->
      AutoRun.setup_videos_slider()
    photos : ()->
      AutoRun.setup_dropdowns()
    alumni : ()->
      AutoRun.setup_dropdowns()
    player_profile : ()->
      AutoRun.setup_player_profile()
    }

  constructor: (@page_name)->
    AutoRun.add_header()  
    auto_run_functions[@page_name]() if @page_name?
    AutoRun.load_nav_button()
    AutoRun.change_album()
    AutoRun.setup_scrollable_gallery()
    AutoRun.set_first_image()

  @set_first_image: ()->
    $(".items:not(.hide) img").first().click()

  @highlight_nav_links: ()->
    $(()-> 
      url = $(location).attr('href')
      start = url.lastIndexOf('/') + 1
      linkName = url.substring(start)
      link = $('a[href$="' + linkName + '"]')
      link.addClass("selected")
      link.parents(".dropdown").children('a[href$="#"]').addClass("selected")
    )

  @add_header: ()=>
    $.get('partials/_header.html', (data)->
      $('header').html(data)
      AutoRun.highlight_nav_links()
    , 'html')
    # $('header').load('partials/_header.html')

  @setup_dropdowns: ()->
    $('dd').filter(':nth-child(n+2)').addClass('hide')
    $('dl').on('mousedown', 'dt', ()-> 
      $(this)
      .next()
      .slideDown(200)
      .siblings('dd')
      .slideUp(200)
      )

  @setup_homepage_slider: ()->
    Galleria.loadTheme('scripts/classic/galleria.classic.min.js')
    Galleria.run('#home_page_slider', 
      {
        dummy: 'images/teamPhotos/void2013.jpg',
        showCounter: false,
        autoplay: 3000,
        showImagenav: true,
        carousel: false,
        showInfo: false,
        pauseOnInteraction: true,
        imageCrop: "height",
        imageMargin: 0,
        extend: ()->
          gallery = this; # "this" is the gallery instance
          this.bind(Galleria.IMAGE, (e)->
            current = gallery.getData(gallery.getIndex())
            currImg = current.original
            if (currImg.className == "video")
              $('#title_text').hide()      
            else 
              titleText = $(currImg).attr('title')
              if ($('#title_text').length)
                $('#title_text').show()
                $('#title_text').text(titleText)
              else
                $('.galleria-stage').append('<span id="title_text">' + titleText + '</span>')
          )
          # hide thumbnails (thumbnails: false doesn't work)
          $('.galleria-thumbnails-container').hide()
      }
    )
    # display video info (doesn't work if above the extend function for some reason)
    Galleria.configure({
      youtube: {
        showInfo: 1
      }
    })

  @setup_videos_slider: ()->
    Galleria.loadTheme('scripts/classic/galleria.classic.min.js')
    Galleria.run('#videos_slider', 
      {
        dummy: 'images/teamPhotos/void2013.jpg',
        showCounter: false,
        autoplay: false,
        showImagenav: true,
        carousel: false,
        showInfo: false,
        pauseOnInteraction: true,
        extend: ()->
          # hide thumbnails (thumbnails: false doesn't work)
          $('.galleria-thumbnails-container').hide()
      }
    )

    # display video info (doesn't work if above the extend function for some reason)
    Galleria.configure({
      youtube: {
        showInfo: 1
      }
    })

  @load_nav_button: ()->
    $(".nav-button").click(()-> 
      $(".nav-button,.nav").toggleClass("open"))

  

  @change_album: ()->
    links = $(".photos-dropdown .type-selector li")
    links.each(()-> 
      this.onclick = ()=> 
        years = $(this).parents('label').attr('for')
        category = $(this).text().toLowerCase()
        $(".scrollable").addClass("hide")
        $(".scrollable[id=photos_"+years+"]").removeClass("hide")
        $(".items").addClass("hide")
        $(".items[id=photos_"+years+"_"+category+"]").removeClass("hide")
        AutoRun.set_first_image()
        )

  @setup_scrollable_gallery: ()->
    $(".items:not(.default_items)").addClass("hide")

    $(".scrollable").scrollable()

    $(".items img").click(()->
      # see if same thumb is being clicked
      if ($(this).hasClass("active"))
        return

      # calclulate large image's URL based on the thumbnail URL (flickr specific)
      url = $(this).attr("src").replace("thumbnails", "images")

      # get handle to element that wraps the image and make it semi-transparent
      wrap = $("#image_wrap"); # .fadeTo("medium", 0.5)

      # the large image
      img = new Image();


      # call this function after it's loaded
      img.onload = ()->

        # make wrapper fully visible
        wrap.fadeTo("fast", 1)

        # change the image
        wrap.find("img").attr("src", url)

      # load images
      img.src = url

      # activate item
      $(".items img").removeClass("active")
      $(this).addClass("active")
    )

    $(".photos-dropdown .type-selector:first li:first").click()

  @setup_player_profile: ()->
    $(document).ready(()->
      void2014 = new Void2014
      roster = void2014.getTeamRoster().getRoster()
      name = $('#player_profile #info #name').text()
      player = roster[name]
      $.each(player.getData(), (key, val)->
        $('dl#data').append("<dt>" + capitalizeSentence(key) + "</dt><dd>" + val + "</dd>")
        )
      $('#description').text(player.getDescription())
      $('#player_photo').attr("src", player.getImg())
      )


this.AutoRun = AutoRun