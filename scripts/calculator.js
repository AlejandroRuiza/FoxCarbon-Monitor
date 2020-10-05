button.addEventListener('click', calculate, true);

function calculate() {
    let electricity = (document.getElementById('electricity').value / 0.1188) * 12;

    let vehicle = (document.getElementById('vehicle').value * 19.86822098 + (document.getElementById('vehicle').value * 19.86822098) * 0.04) * (30 / 7);

    let gas = (document.getElementById('gas').value / 10.68) * 1434.93048;

    let oil = (document.getElementById('oil').value / 4.02) * 271.357222;

    let propane = (document.getElementById('propane').value / 2.47) * 149.112054;

    let garbage = 692;

    if (document.getElementById('plastic').checked) {
        garbage -= 35.56;
    }
    if (document.getElementById('glass').checked) {
        garbage -= 25.39;
    }
    if (document.getElementById('newspaper').checked) {
        garbage -= 113.14;
    }
    if (document.getElementById('magazines').checked) {
        garbage -= 27.46;
    }
    if (document.getElementById('aluminum').checked) {
        garbage -= 89.38;
    }

    let result = electricity + vehicle + gas + oil + propane + garbage;

    document.getElementById('pie-chart').style.height = '50rem';

    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = google.visualization.arrayToDataTable([
            ['Ambit', 'lbs CO2 per Month'],
            ['electricity', electricity],
            ['vehicle', vehicle],
            ['gas', gas],
            ['oil', oil],
            ['garbage', garbage]
        ]);

        var options = {
            title: `Your Carbon Footprint: ${result} lbs of CO2 per month`
        };

        var chart = new google.visualization.PieChart(document.getElementById('pie-chart'));

        chart.draw(data, options);
    }
}