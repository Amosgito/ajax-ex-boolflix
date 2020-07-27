function addBtnListener() {

    var btn = $("#btn");
    btn.click(sendRequest);
} 

function sendRequest() {

    var title = $("#input");
    var titleVal = title.val();

    console.log("title:", titleVal);

    $.ajax({

        url: "https://api.themoviedb.org/3/search/movie",
        data: {
            "api_key": "c2288f003510b1c242783a71ec02e712",
            "query": titleVal
        },
        method: "GET",
        success: function (data) {

            var success = data["success"];
            var results = data["results"];
            var title = results[0]["title"];
            var origTitle = results[0]["original_title"];
            var language = results[0]["original_language"];
            var vote = results[0]["vote_average"];

            console.log("result:", results);
            console.log("title:", title);
            console.log("original title:", origTitle);
            console.log("language:", language);
            console.log("vote:", vote);

            
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