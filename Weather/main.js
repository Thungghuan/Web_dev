var current_city = ""

$(document).ready(function() {
    $('#select-city > button')[0].addEventListener("click", function () {
        ChangeCity();
        $('#select-city > input')[0].value = ""
    })
    $('#select-city > input')[0].addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            $('#select-city > button')[0].click();
        }
    })
    GetWeekWeather(current_city);
})

function ChangeCity() {
    current_city = $('#select-city > input')[0].value;
    GetWeekWeather(current_city);
}

function GetWeekWeather(cityName = "") {
    var dataParam = {
        appid: '67142924',
        appsecret: '9hCmUXG3',
    }
    if (cityName) {
        dataParam.city = cityName;
    }
    $.ajax({
        type: "GET",
        url: "https://www.tianqiapi.com/free/week",
        data: dataParam,
        datatype: "jsonp",
        success: function (response) {
            $('#day-weather > #update-time').text("更新时间:" + response.update_time);
            $('#day-weather > #city').text(`${response.city}`);
            $('#day-weather > #weather').text(`${response.data[0].wea}`);
            $('#day-weather > #tem').text(`${response.data[0].tem_night}~${response.data[0].tem_day}℃`);
            $('#day-weather > #wea_img')[0].style.backgroundImage = `url(img/${response.data[0].wea_img}.png)`
            $('#week-weather').html("");
            for (let i = 1; i < 7; ++i) {
                var day = $('<div class="week-day"></div>');
                var date = $('<div class="week-date"></div>');
                var wea = $('<div class="week-wea"></div>');
                var tem = $('<div class="week-tem"></div>');
                day.css("left", `${100 / 6 * (i - 1) + '%'}`)
                date.text(`${response.data[i].date.substring(5)}`);
                wea.css("background-image", `url(img/${response.data[i].wea_img}.png)`)
                tem.text(`${response.data[0].tem_night}~${response.data[0].tem_day}℃`);
                day.append(date, wea, tem);
                $('#week-weather').append(day);
            }
            console.log($('#week-weather'))
            console.log(response);
        }
    });
}