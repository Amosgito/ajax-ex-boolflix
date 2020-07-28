function addBtnListener() {

    var btn = $("#btn");
    btn.click(sendRequest);
    $("input").val("");
} 

$(document).keydown(function() {
    var key = event.which;
    if (key == 13) {
        sendRequest();
        $("input").val("");
    }
})

function sendRequest() {

    var title = $("#input");
    var titleVal = title.val();

    var template = $('#film-template').html();
    var compiled = Handlebars.compile(template);
    var target = $('#append-list');
    target.html("");

    $.ajax({

        url: "https://api.themoviedb.org/3/search/movie",
        data: {
            "api_key": "c2288f003510b1c242783a71ec02e712",
            "query": titleVal
        },
        method: "GET",
        success: function (data) {

            var result = data["results"];

            for(var i = 0; i < result.length; i++) {

                // var movie = result[i];

                // var movieHtml = compiled(movie);

                // target.append(movieHtml);
                
                var title = result[i]["title"];
                var original_title = result[i]["original_title"];
                var original_language = result[i]["original_language"];
                var vote_average = result[i]["vote_average"];
                var voteHalf = vote_average / 2;
                var voteRound = Math.round(voteHalf);
            


                var listHtml = compiled({

                    "title": title,
                    "original_title": original_title,
                    "original_language": original_language,
                    "vote_average": voteRound
                })

                
                // stars(voteRound, listHtml);
                
                target.append(listHtml);
                
                if(original_language === "ja") {

                    $(".flag").addClass("jp");
                } else if(original_language === "en") {
                    
                    $(".flag").addClass("en");
                } else if(original_language === "it") {
                    
                    $(".flag").addClass("it");
                } else if(original_language === "cs") {
                    
                    $(".flag").addClass("cs");
                } else if(original_language === "fr") {
                    
                    $(".flag").addClass("fr");
                } else if(original_language === "de") {
                    
                    $(".flag").addClass("de");
                }

                stars(voteRound, compiled);
            }

        },

        error: function (err) {

            console.log("error", err)
        }
    })


}

function stars (vote, compiled) {

    if(vote === 1) {

    $(".star1").removeClass("far fa-star");
    $(".star1").addClass("fas fa-star");
        
    } else if(vote === 2) {

       $(".star1.star2").removeClass("far fa-star");
       $(".star1.star2").addClass("fas fa-star");
    } else if(vote === 3) {

        var listHtml = compiled({

            "star1": '<i class="fas fa-star"></i>',
            "star2": '<i class="fas fa-star"></i>',
            "star3": '<i class="fas fa-star"></i>'
        })
    } else if(vote === 4) {

        var listHtml = compiled({

            "star1": '<i class="fas fa-star"></i>',
            "star2": '<i class="fas fa-star"></i>',
            "star3": '<i class="fas fa-star"></i>',
            "star4": '<i class="fas fa-star"></i>'
        })
    } else if(vote === 5) {

        var listHtml = compiled({

            "star1": '<i class="fas fa-star"></i>',
            "star2": '<i class="fas fa-star"></i>',
            "star3": '<i class="fas fa-star"></i>',
            "star4": '<i class="fas fa-star"></i>',
            "star5": '<i class="fas fa-star"></i>'
        })
    }

    return listHtml
}




function init () {

    addBtnListener();
}

$(document).ready(init);