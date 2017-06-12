
$(document).ready(function(){
  $('nav a').bind("mouseover", function(){
            var color  = $(this).css("background-color");

            $(this).css("background", "teal");
            $(this).css("height","40px");

            $(this).bind("mouseout", function(){
                $(this).css("background", color);
            })
        })

        $('.sign-up a').bind("mouseover", function(){
                  var color  = $(this).css("color");

                  $(this).css("color", "gray");

                  $(this).bind("mouseout", function(){
                      $(this).css("color", color);
                  })
              })

              $('.sign-in a').bind("mouseover", function(){
                        var color  = $(this).css("color");

                        $(this).css("color", "gray");


                        $(this).bind("mouseout", function(){
                            $(this).css("color", color);
                        })
                    })

            ////////////////////
            $(".burg").click(function(){
              $(".panel").slideToggle("slow");
            });
});
