function GetPrevPage(){$.ajax({method:"POST",async:!0,data:{week:Number($("#fullWeekNumber").text())-1},url:"/weeks/getPrev"}).done(function(e){e?($(".need-more-minerals").remove(),$(".container").append("<hr />").append(e)):toastr.warning("Ошибка получения альбомов")}).fail(function(e){toastr.error("Oh, something went wrong...")})}function ShowModal(e,n){e.preventDefault();var t=$(window).height(),i=$(window).width();$(".mask").css({width:i,height:t}),$(".mask").fadeIn(1e3),$(".mask").fadeTo("slow",.8);var o=$(window).height(),a=$(window).width(),d=n.next().find("#dialog");d.css("top",o/2-d.height()/2),d.css("left",a/2-d.width()/2),d.fadeIn(2e3)}function CloseModal(e){e.preventDefault(),$(".mask, .window").hide()}!function(){$(".mask").click(function(){$(".mask, .window").hide()})}();