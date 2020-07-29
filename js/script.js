function addBtnListener() {

    var btn = $("#btn");
    btn.click(function(){

        sendRequest();
        sendRequestSeries();
    });
    $("input").val("");
}

$(document).keydown(function () {
    var key = event.which;
    if (key == 13) {
        sendRequest();
        sendRequestSeries();
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

            for (var i = 0; i < result.length; i++) {

                // var movie = result[i];

                // var movieHtml = compiled(movie);

                // target.append(movieHtml);

                var title = result[i]["title"];
                var original_title = result[i]["original_title"];
                var original_language = result[i]["original_language"];
                var vote_average = result[i]["vote_average"];
                var voteHalf = vote_average / 2;
                var voteRound = Math.round(voteHalf);
                var voteRoundForHandlebars = "";
                var origLangImg =  '<img src="img/' + original_language + '.png" alt="' + original_language + '">';

                for(var k =1; k <= voteRound; k++) {

                   voteRoundForHandlebars += '<i class="fas fa-star"></i>';
                }

                var listHtml = compiled({

                    "title": title,
                    "original_title": original_title,
                    "original_language": origLangImg,
                    "vote_average": voteRoundForHandlebars
                })


                target.append(listHtml);
                
                
            }

        },

        error: function (err) {

            console.log("error", err)
        }
    })


}

function sendRequestSeries() {

    var title = $("#input");
    var titleVal = title.val();

    var template = $('#series-template').html();
    var compiled = Handlebars.compile(template);
    var target = $('#append-list');
    target.html("");

    $.ajax({

        url: "https://api.themoviedb.org/3/search/tv",
        data: {
            "api_key": "c2288f003510b1c242783a71ec02e712",
            "query": titleVal
        },
        method: "GET",
        success: function (data) {

            var result = data["results"];

            for (var i = 0; i < result.length; i++) {

                // var movie = result[i];

                // var movieHtml = compiled(movie);

                // target.append(movieHtml);

                var title = result[i]["name"];
                var original_title = result[i]["original_name"];
                var original_language = result[i]["original_language"];
                var vote_average = result[i]["vote_average"];
                var voteHalf = vote_average / 2;
                var voteRound = Math.round(voteHalf);
                var voteRoundForHandlebars = "";
                var origLangImg =  '<img src="img/' + original_language + '.png" alt="' + original_language + '">';

                 

                for(var k =1; k <= voteRound; k++) {

                   voteRoundForHandlebars += '<i class="fas fa-star"></img>';
                }

                var listHtml = compiled({

                    "name": title,
                    "original_name": original_title,
                    "original_language": origLangImg,
                    "vote_average": voteRoundForHandlebars
                })


                target.append(listHtml);   
                
            }

        },

        error: function (err) {

            console.log("error", err)
        }
    })


}


function init() {

    addBtnListener();
}

$(document).ready(init);