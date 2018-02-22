$(document).ready(function () {

    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(initialize);

    function initialize() {
        drawPieChart("pieChart");
        drawLineChart("lineChart");
    }

    function drawPieChart(HTMLElementId){

        var jsonData;

        var chartData = {
            "cols": [
                {"id":"","label":"","type":"string"},
                {"id":"","label":"","type":"number"}
            ],
            "rows": [
            ]
        };

        $.ajax({
            url: "https://sheets.googleapis.com/v4/spreadsheets/1HbwSWnXwlbeHviTTF0YmDvROMyQ11DBHC1T00JK_FgA/values/'Ark1'!A1%3AC2?majorDimension=COLUMNS&valueRenderOption=FORMULA&key=AIzaSyAwZUBlSKTadTWUnRHKz9tMu9ruZkYnPTw",
            dataType: "json",
            async: false
        }).done(function (data) {
            jsonData = data;
        });

        $.each(jsonData.values, function (k, v) {
            chartData.rows.push(
                {"c":[{"v":v[0]}, {"v": v[1]}]});
        });

        // Create our data table out of JSON data loaded from server.
        var data = new google.visualization.DataTable(chartData);

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById(HTMLElementId));
        var options = {
            width: 400,
            height: 240
        };
        chart.draw(data, options);
    }

    function drawLineChart(HTMLElementId){

        var jsonData;

        var chartData = {
            "cols": [
                {"id":"","label":"Week","type":"string"},
                {"id":"","label":"Facebook","type":"number"},
                {"id":"","label":"Instagram","type":"number"}
            ],
            "rows": [
            ]
        };

        $.ajax({
            url: "https://sheets.googleapis.com/v4/spreadsheets/1HbwSWnXwlbeHviTTF0YmDvROMyQ11DBHC1T00JK_FgA/values/'Ark2'!A2%3AC6?majorDimension=ROWS&valueRenderOption=FORMULA&key=AIzaSyAwZUBlSKTadTWUnRHKz9tMu9ruZkYnPTw",
            dataType: "json",
            async: false
        }).done(function (data) {
            jsonData = data;
        });

        $.each(jsonData.values, function (k, v) {
            chartData.rows.push(
                {"c":[{"v":v[0]}, {"v": v[1]}, {"v": v[2]}]});
        });


        var data = new google.visualization.DataTable(chartData);

        var chart = new google.visualization.LineChart(document.getElementById(HTMLElementId));
        var options = {
            title: 'Likes development',
            curveType: 'function',
            legend: { position: 'bottom' }
        };
        chart.draw(data, options);
    }

});