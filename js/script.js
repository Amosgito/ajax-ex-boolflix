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
                var poster_path = result[i]["poster_path"];
                var voteHalf = vote_average / 2;
                var voteRound = Math.round(voteHalf);
                var voteRoundFor = "";
                var origLangImg =  '<img src="img/' + original_language + '.png" alt="' + original_language + '">';
                var postPathImg = '<img src="https://image.tmdb.org/t/p/w185' + poster_path + '" alt="">'

                console.log(poster_path);
                console.log(postPathImg);
                console.log(origLangImg);

                for(var k =1; k <= voteRound; k++) {

                   voteRoundFor += '<i class="fas fa-star"></img>';
                }

                var listHtml = compiled({

                    "title": title,
                    "original_title": original_title,
                    "original_language": origLangImg,
                    "vote_average": voteRoundFor,
                    "poster_path": postPathImg
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

            for (var j = 0; j < result.length; j++) {

                // var movie = result[i];

                // var movieHtml = compiled(movie);

                // target.append(movieHtml);

                var title = result[j]["name"];
                var original_title = result[j]["original_name"];
                var original_language = result[j]["original_language"];
                var vote_average = result[j]["vote_average"];
                var poster_path = result[j]["poster_path"];
                var voteHalf = vote_average / 2;
                var voteRound = Math.round(voteHalf);
                var voteRoundFor = "";
                var origLangImg =  '<img src="img/' + original_language + '.png" alt="' + original_language + '">';
                var postPathImg = '<img src="https://image.tmdb.org/t/p/w185' + poster_path + '" alt="">'

                console.log(poster_path);
                console.log(postPathImg);
                console.log(origLangImg);

                 

                for(var a =1; a <= voteRound; a++) {

                   voteRoundFor += '<i class="fas fa-star"></img>';
                }

                var listHtml = compiled({

                    "name": title,
                    "original_name": original_title,
                    "original_language": origLangImg,
                    "vote_average": voteRoundFor,
                    "poster_path": postPathImg
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