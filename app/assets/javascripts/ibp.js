
var loadedFirstTime = false;
var reservedXandY;
  	  $(window).scroll(function () {
  			var elem = document.getElementById("myBar");
  			var width = 100;

        if(!loadedFirstTime && $(window).scrollTop() >= 800){
          var id = setInterval(frame, 10);
          loadedFirstTime = true
        }
  			function frame(){
          if(true){
            if (width <= 38){
      					clearInterval(id);
   					 }else{
     				 	width--;
      				elem.style.width = width + '%';
    				}
          }
  			}
  		 });

       const DEAFAULT_PIXEL = 20;
       const DEFAULT_BOX_WIDTH_HEIGHT = [1020, 1000];
       // var reservedXandY = [[0,0],[20,0],[0,20],[20,20], [200,200],[200,220],[220,200],[220,220], [400,400],[400,420],[420,400],[420,420]];

       // $.ajax({
       //   type: 'GET',
       //   cache: false,
       //   dataType: 'json',
       //   url: '/api/v1/board/pixels',
       //   beforeSend() {
       //   },
       //   success(data) {
       //     var x_y = checkAndGiveCorrectCords(data.width,data.height, data.left_x, data.top_y);
       //     // console.log(reservedXandY);
       //   },
       //   error(jqXHR, textStatus, errorThrown) {
       //     console.error('error');
       //   },
       // }).done(function(){
       //
       // });

       $.ajax({
         type: 'GET',
         cache: false,
         dataType: 'json',
         url: '/api/v1/board/fetch_reserved_images',
         data: $('#pixelInfoForm').serialize(),
         beforeSend() {
         },
         error(jqXHR, textStatus, errorThrown) {
           console.error('error');
         },
       }).done(function(data){
         // var imgUrls = Object.keys(data.images);
         $.each( data.images, function( key, value ) {

           $('#reservedImages').append('<a href="https://www.blockchain.com/" target="_blank"><img src="' + key + '" height= "'+value.height+'px;" width="'+value.width+'px;" style=" top: '+value.top_y+'px; left: '+value.side_x+'px; position:absolute; overflow:hidden; white-space:nowrap; z-index:10  " /> </a>');

        });

         // for(var i = 0; i < imgUrls.length; i++)
         //  {
         //     // var mt = i * 10 * DEAFAULT_PIXEL;
         //     $('#reservedImages').append('<a href="https://www.blockchain.com/" target="_blank"><img src="' + imgUrls[i] + '" height="40px;" width="40px;" style=" top: '+mt+'px; left: '+mt+'px; position:absolute; overflow:hidden; white-space:nowrap; z-index:10  " /> </a>');
         //
         //  }
       });

       function checkAndGiveCorrectCords(width, height, newX, newY){
         // This will check new position of draggable div.
         var t_i = 0;
         var wt = width / DEAFAULT_PIXEL;
         var ht = height / DEAFAULT_PIXEL;
         var cords = [];
         for(var i = 0; i < wt; i++){
           readyX = newX + t_i;
           t_i += DEAFAULT_PIXEL;
           var t_j = 0;
           for(var j = 0; j < ht; j++){
             readyY = newY + t_j;
             cords.push([readyX, readyY]);
             t_j += DEAFAULT_PIXEL;
           }
         }
         return cords;
       }

      $(document).ready(function() {

        $("#buyPixel").on("click",function(){
          $(".before-buy").addClass('hide');
          $(".currently-buying").removeClass('hide');
        });

        $("#purchasePixels").on("click", function(){
          if($('#resizeDiv').is(':hidden')){
            $.ajax({
              type: 'GET',
              cache: false,
              dataType: 'json',
              url: '/api/v1/board/pixels',
              beforeSend() {
              },
              success(data) {
                // var reservedXandY = checkAndGiveCorrectCords(data.width,data.height, data.left_x, data.top_y);
                // console.log(reservedXandY);
              },
              error(jqXHR, textStatus, errorThrown) {
                console.error('error');
              },
            }).done(function(data){
              reservedXandY = data.reserved_pixels;
              // console.log(reservedXandY);
              pixelboard:
              for(var i = 0; i <= (DEFAULT_BOX_WIDTH_HEIGHT[0]/DEAFAULT_PIXEL); i++){
                var t_y = i * DEAFAULT_PIXEL;
                for(var j = 0; j <= (DEFAULT_BOX_WIDTH_HEIGHT[1]/DEAFAULT_PIXEL); j++){
                  var l_x = j * DEAFAULT_PIXEL;
                  var newXandY = [l_x, t_y];
                  if(!isNewCordinateReserved(reservedXandY, newXandY)){
                    new_x = l_x;
                    new_y = t_y;
                    break pixelboard;
                  }
                }
              }
              $("#ibpTopY").val(new_y);
              $("#ibpSideX").val(new_x);
              $('#resizeDiv').css({'left': new_x,'top': new_y});
              $(".pixle-position").html(new_x+'x'+new_y);
            });


            $(this).addClass('hide');
            $('#resizeDiv').removeClass('hide');
            $("#adBuy").removeClass('hide');
            // Intiaize tooltipster
            $('#resizeDiv').tooltipster({
              content: $("#adBuy"),
              contentAsHTML: true,
              trackerInterval: 10,
              trackOrigin: true,
              trigger: 'custom',
              theme: 'tooltipster-noir'
            }).tooltipster('open');
          }
        });

        $("#submitInfo").on('click', function(){
          if($("#email").val() === ""){
            return false;
          }
          $.ajax({
            type: 'POST',
            cache: false,
            dataType: 'json',
            url: '/api/v1/board/reserve_pixels',
            data: $('#pixelInfoForm').serialize(),
            beforeSend() {
              $(this).attr('disabled', true);
            },
            error(jqXHR, textStatus, errorThrown) {
              console.error('error');
            },
          }).done(function(){
            $("#adBuy").html("Thanks for subscribing. We'll reach you on this email within 12 hours. :)");
          });
        });

        $("#emailSubscribe").on("submit", function(e){
          e.preventDefault();
          let txtFields = $("#emailSubscribe input[type=text]");
          $.each(txtFields, function(value ) {
            if(value === ""){
              return false;
            }
          });
          $.ajax({
            type: 'POST',
            cache: false,
            dataType: 'json',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            beforeSend() {
              $("#submitEmail").attr('disabled', true);
            },
            error(jqXHR, textStatus, errorThrown) {
              console.error('error');
            },
          }).done(function(){
            $("#emailSubscribe").html("Thanks for subscribing. :)")
          });
        });


        const DEAFAULT_PIXEL = 20;
        const DEFAULT_BOX_WIDTH_HEIGHT = [1020, 1000];
        // var imgUrls = ["/uploads/board_pixel/image/2/profile.png","img/bitcoin.png","img/bitcoin.png"];
        //
        // for(var i = 0; i < imgUrls.length; i++)
        //  {
        //     var mt = i * 10 * DEAFAULT_PIXEL;
        //     $('#reservedImages').append('<a href="https://www.blockchain.com/" target="_blank"><img src="' + imgUrls[i] + '" height="40px;" width="40px;" style=" top: '+mt+'px; left: '+mt+'px; position:absolute; overflow:hidden; white-space:nowrap; z-index:10  " /> </a>');
        //
        //  }

        var width = DEAFAULT_PIXEL;
        var height = DEAFAULT_PIXEL;
        var new_x = 0;
        var new_y = 0;
        // Instead of this we'll fetch x and y distances from rails-api.
        // this is just an example.
        // var left_x = [0, 30, 60];
        // var top_y = [0, 30, 60];




        // var reservedXandY = [[0,0],[20,0],[0,20],[20,20], [200,200],[200,220],[220,200],[220,220], [400,400],[400,420],[420,400],[420,420]];

        // Logic for empty slot on board.
        // This is still WIP need to furnish/refactor it later.
        // pixelboard:
        // for(var i = 0; i <= (DEFAULT_BOX_WIDTH_HEIGHT[0]/DEAFAULT_PIXEL); i++){
        //   var t_y = i * DEAFAULT_PIXEL;
        //   for(var j = 0; j <= (DEFAULT_BOX_WIDTH_HEIGHT[1]/DEAFAULT_PIXEL); j++){
        //     var l_x = j * DEAFAULT_PIXEL;
        //     var newXandY = [l_x, t_y];
        //     console.log(reservedXandY);
        //     if(!isNewCordinateReserved(reservedXandY, newXandY)){
        //       new_x = l_x;
        //       new_y = t_y;
        //       break pixelboard;
        //     }
        //     // if((left_x.indexOf(l_x) === -1) && (top_y.indexOf(t_y) === -1)){
        //     //   new_x = l_x;
        //     //   new_y = t_y;
        //     //   break pixelboard;
        //     // }
        //   }
        // }
        // $('#resizeDiv').css({'left': new_x,'top': new_y});
        // $(".pixle-position").html(new_x+'x'+new_y);

        $('#resizeDiv').draggable({
          grid: [ DEAFAULT_PIXEL, DEAFAULT_PIXEL ],
          containment: ".adGrid",
          scroll: false,
          drag: function( event, ui ) {
            // console.log("[" + ui.position.left + "," + ui.position.top + "]");
            $(".pixle-position").html(ui.position.left+'x'+ui.position.top);
          },
          start: function(event, ui) {
              $("#adBuy").removeClass('hide');
              ui.helper.tooltipster({
                content: $("#adBuy"),
      					contentAsHTML: true,
      					trackerInterval: 10,
      					trackOrigin: true,
      					trigger: 'custom',
                multiple: true,
                theme: 'tooltipster-noir'
      				}).tooltipster('open');
        },
          stop: function(event, ui) {
            console.log("[Drag] Original Position [left, top] : [" + ui.originalPosition.left + "," + ui.originalPosition.top + "]");
            console.log("[Drag] Position [left, top] : [" + ui.position.left + "," + ui.position.top + "]");
            // ui.helper.tooltipster('destroy');
            // Logic for height check
            // if(height > DEAFAULT_PIXEL){
            //   if ((newY + height) > 500 && newY < 500){
            //     $(".tooltipster-box").css({'border': '3px solid red'});
            //     $("#buyPixel").attr('disabled', true);
            //   }else{
            //     $(".tooltipster-box").css({'border': '3px solid black'});
            //     $("#buyPixel").attr('disabled', false);
            //   }
            // }

            var newX = ui.position.left;
            var newY = ui.position.top;
            var oldX = ui.originalPosition.left;
            var oldY = ui.originalPosition.top;
            $("#ibpTopY").val(newY);
            $("#ibpSideX").val(newX);

            // This will check new position of draggable div.
            // var t_i = 0;
            // var wt = width / DEAFAULT_PIXEL;
            // var ht = height / DEAFAULT_PIXEL;
            // var cords = [];
            // for(var i = 0; i < wt; i++){
            //   readyX = newX + t_i;
            //   t_i += DEAFAULT_PIXEL;
            //   var t_j = 0;
            //   for(var j = 0; j < ht; j++){
            //     readyY = newY + t_j;
            //     cords.push([readyX, readyY]);
            //     t_j += DEAFAULT_PIXEL;
            //   }
            // }
            var cordinates = checkAndGiveCorrectCords(width, height, newX, newY);

            checkAndSetAvailablePixelsOnBoard(cordinates);
            // checkAndSetAvailablePixelsOnBoard(newX, newY, oldX, oldY);

            heightChecker(height, newY, newX);
            widthChecker(width, newX);

          }
        }).resizable({
          maxHeight: 120,
          maxWidth: 120,
          minHeight: DEAFAULT_PIXEL,
          minWidth: DEAFAULT_PIXEL,
          grid: DEAFAULT_PIXEL,
          resize: function( event, ui ) {
            var oSize = [ui.originalSize.width, ui.originalSize.height];
            if((ui.position.left + ui.size.width) > 1024){
              $('#resizeDiv').css({'width': oSize[0]+'px'});
            }
            if ((ui.position.top + ui.size.height) > 1000) {
              $('#resizeDiv').css({'height': oSize[1]+'px'});
            }

          },
          stop: function(event, ui) {
            console.log("[Resize] Original Position [left, top] : [" + ui.originalPosition.left + "," + ui.originalPosition.top + "]");
            console.log("[Resize] Original Size [width, height] : " + ui.originalSize.width + "x" + ui.originalSize.height);

            console.log("[Resize] Current Position [left, top] : [" + ui.position.left + "," + ui.position.top + "]");
            console.log("[Resize] New Size [width, height] : " + ui.size.width + "x" + ui.size.height);
            width = ui.size.width;
            height = ui.size.height;
            var newX = ui.position.left;
            var newY = ui.position.top;
            $("#ibpWidth").val(width);
            $("#ibpHeight").val(height);
            // new pixel size on canvas
            $('.pixle-board').html(width+'x'+height);

            var cordinates = checkAndGiveCorrectCords(width, height, newX, newY);
            checkAndSetAvailablePixelsOnBoard(cordinates);
            heightChecker(height, newY, newX);
            widthChecker(width, newX);

          }
        });

        function heightChecker(height, newY, newX){
          var middleXrange = range(340, 680);
          if(height > DEAFAULT_PIXEL && middleXrange.indexOf(newX) == -1){
            if ((newY + height) > 500 && newY < 500){
              $(".tooltipster-box").css({'border': '3px solid red'});
              $("#buyPixel").attr('disabled', true);
            }
          }
        }

        function range(start, edge, step) {
          if (arguments.length == 1) {
            edge = start;
            start = 0;
          }
          edge = edge || 0;
          step = step || 1;
          for (var ret = []; (edge - start) > 0; start += step) {
            ret.push(start);
          }
          return ret;
        }

        function widthChecker(width, newX){
          if(width > DEAFAULT_PIXEL){
            if ((newX + width) > 340 && newX < 340){
              $(".tooltipster-box").css({'border': '3px solid red'});
              $("#buyPixel").attr('disabled', true);
            }else if ((newX + width) > 680 && (newX > 340 && newX < 680) ) {
              $(".tooltipster-box").css({'border': '3px solid red'});
              $("#buyPixel").attr('disabled', true);
            }
          }
        }

        function checkAndSetAvailablePixelsOnBoard(reservedCords){
          if(checkArrayForMultiple(reservedXandY, reservedCords)){
            // $('#resizeDiv').css({'left': oldX,'top': oldY});
            $(".tooltipster-box").css({'border': '3px solid red'});
            $("#buyPixel").attr('disabled', true);
          }else{
            $(".tooltipster-box").css({'border': '3px solid black'});
            $("#buyPixel").attr('disabled', false);
          }
        }

        function checkArrayForMultiple(source, cords) {
          for(var j=0, l=cords.length; j< l; j++) {
            for(var i = 0, len = source.length; i < len; i++) {
              if (source[i][0] === cords[j][0] && source[i][1] === cords[j][1]) {
                return true;
              }
            }
          }
          return false;
        }

        function isArrayInArray(source, search) {
          for(var i = 0, len = source.length; i < len; i++) {
            if (source[i][0] === search[0] && source[i][1] === search[1]) {
              return true;
            }
          }
          return false;
        }
        function isNewCordinateReserved(reservedXandY, newXandY) {
          return (reservedXandY.some(arrVal => (newXandY[0] === arrVal[0] && newXandY[1] === arrVal[1]) ));
        }
        // return reservedXandY.some(function(arrVal) {
        //   // return (newXandY[0] === arrVal[0] && newXandY[1] === arrVal[1]);
        //
        // });

        $(".faq-section, .email-section").fancybox({
      		maxWidth	: 400,
      		maxHeight	: 400,
      		fitToView	: false,
      		width		: '25%',
      		height		: '25%',
      		autoSize	: false,
      		closeClick	: false,
      		openEffect	: 'none',
      		closeEffect	: 'none'
      	});
        $(".road-map-section").fancybox({
            maxWidth	: 478,
            maxHeight	: 618,
            fitToView	: false,
            width		: '80%',
            height		: '100%',
            autoSize	: false,
            closeClick	: false,
            openEffect	: 'none',
            closeEffect	: 'none'
        });

      });

	  // $(document).ready(function(){

	// $(".fancybox").fancybox({
	// 	openEffect  : 'none',
	// 	closeEffect : 'none',
	// 	iframe : {
	// 		preload: false
	// 	}
	// });
  //
  //
  //

  //
  //
  //
	// $('.fancybox-media').fancybox({
	// 	openEffect  : 'none',
	// 	closeEffect : 'none',
	// 	helpers : {
	// 		media : {}
	// 	}
	// });
// });
