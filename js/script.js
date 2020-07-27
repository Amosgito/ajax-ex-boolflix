function addBtnListener() {

    var btn = $("#btn");
    btn.click(sendRequest);
} 

function sendRequest() {

    var title = $("#input");
    var titleVal = title.val();

    console.log("title:", titleVal);

    var template = $('#film-template').html();
    var compiled = Handlebars.compile(template);
    var target = $('#append-list');

    $.ajax({

        url: "https://api.themoviedb.org/3/search/movie",
        data: {
            "api_key": "c2288f003510b1c242783a71ec02e712",
            "query": titleVal
        },
        method: "GET",
        success: function (data) {

            var result = data["results"];
            console.log("result:", result);

            for(var i = 0; i < result.length; i++) {
                
                var title = result[i]["title"];
                var origTitle = result[i]["original_title"];
                var language = result[i]["original_language"];
                var vote = result[i]["vote_average"];

                var listHtml = compiled({

                    "title": title,
                    "originalT": origTitle,
                    "lang": language,
                    "vote": vote
                })

                target.append(listHtml);
            }
            
        },

        error: function (err) {

            console.log("error", err)
        }
    })

}


function init () {

    addBtnListener();
}

$(document).ready(init);