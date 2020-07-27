function addBtnListener() {

    var btn = $("#btn");
    btn.click(sendRequest);
} 

function sendRequest() {

    var title = $("#input");
    var titleVal = title.val();

    console.log("title:", titleVal);

    $.ajax({

        url: "https://api.themoviedb.org/3/movie/550?api_key=c2288f003510b1c242783a71ec02e712",
        data: titleVal,
        method: "GET",
        success: function (data) {

            var success = data["success"];
            var response = data["response"];

            if(success) {

                console.log("result", response);
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