

var bacteria_data = [];
            
d3.csv("data/antibiotics_data.csv", function(error, data) {
    console.log("Here's the data\n" + data);
    
    bacteria_data = data;
});

var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'lines',
    type: 'scatter'
};

var chartLayout = {
    title: 'Bacteria Visualization',
    height: window.height,
    width: window.width
};

console.log(bacteria_data);

var chartData = [trace1, bacteria_data];

Plotly.plot(document.getElementById('plot'), chartData, chartLayout);