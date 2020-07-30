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
    var target = $('#append-list-movies');
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

                // WHAT API RETURNS FOR EACH KEY
                var title = result[i]["title"];
                var original_title = result[i]["original_title"];
                var original_language = result[i]["original_language"];
                var vote_average = result[i]["vote_average"];
                var poster_path = result[i]["poster_path"];
                var overview = result[i]["overview"];

                // SETS VOTE BASE FROM DECIMAL TO 5RADIX
                var voteHalf = vote_average / 2;
                var voteRound = Math.round(voteHalf);
                var voteRoundFor = "";

                // ADDS FLAG ACCORDING TO LANGUAGE
                var origLangImg =  '<img src="img/' + original_language + '.png" alt="' + original_language + '">';

                // ADDS POSTER TO MOVIE
                var postPathImg = '<img class="poster" src="https://image.tmdb.org/t/p/w342' + poster_path + '" alt="POSTER IMAGE MISSING">'

                // ADDS STARS ACCORDING TO VOTE
                for(var k =1; k <= voteRound; k++) {

                   voteRoundFor += '<i class="fas fa-star"></i>';
                }

                // VARIABLES SENT TO HANDLEBARS FOR TEMPLATE
                var listHtml = compiled({

                    "title": title,
                    "original_title": original_title,
                    "original_language": origLangImg,
                    "vote_average": voteRoundFor,
                    "poster_path": postPathImg,
                    "overview": overview
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
    var target = $('#append-list-series');
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

            for (var j = 0; j < result.length; j++) {

                // WHAT API RETURNS FOR EACH KEY
                var title = result[j]["name"];
                var original_title = result[j]["original_name"];
                var original_language = result[j]["original_language"];
                var vote_average = result[j]["vote_average"];
                var poster_path = result[j]["poster_path"];
                var overview = result[j]["overview"];

                // SETS VOTE BASE FROM DECIMAL TO 5RADIX
                var voteHalf = vote_average / 2;
                var voteRound = Math.round(voteHalf);
                var voteRoundFor = "";

                // ADDS FLAG ACCORDING TO LANGUAGE
                var origLangImg =  '<img src="img/' + original_language + '.png" alt="' + original_language + '">';

                // ADDS POSTER TO SERIES
                var postPathImg = '<img class="poster" src="https://image.tmdb.org/t/p/w342' + poster_path + '" alt="POSTER IMAGE MISSING">'

                 
                // ADDS STARS ACCORDING TO VOTE
                for(var a =1; a <= voteRound; a++) {

                   voteRoundFor += '<i class="fas fa-star"></i>';
                }

                // VARIABLES SENT TO HANDLEBARS FOR TEMPLATE
                var listHtml = compiled({

                    "name": title,
                    "original_name": original_title,
                    "original_language": origLangImg,
                    "vote_average": voteRoundFor,
                    "poster_path": postPathImg,
                    "overview": overview
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


// "poster_sizes": [
//     "w92",
//     "w154",
//     "w185",
//     "w342",
//     "w500",
//     "w780",
//     "original"
//   ],