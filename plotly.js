

var bacteria_data = [];
            
d3.csv("data/antibiotics_data.csv", function(error, data) {
    var bacteriaDataArray = getBacteria(data, "scatter");
    var bacteria_data = bacteriaDataArray[0];
    var drugs = [bacteriaDataArray[1], bacteriaDataArray[2], bacteriaDataArray[3]];
    var nameArray = bacteriaDataArray[4]

    drawFirstVis(drugs, nameArray);
    drawSecondVis(data);
    drawThirdVis(bacteria_data, nameArray);
});

function getBacteria(data, type) {
    var Penicilin = [];
    var Streptomycin = [];
    var Neomycin = [];
    var nameArray = [];
    var chartData = [];
    
    for( var i = 0; i < data.length; i++) {
        //console.log(data[i]);
        nameArray.push(data[i]["Bacteria "]);
        Penicilin.push(data[i].Penicilin);
        Streptomycin.push(data[i]["Streptomycin "]);
        Neomycin.push(data[i].Neomycin);
        
        var newChartData = {
            Penicilin: Penicilin[i],
            Streptomycin: Streptomycin[i],
            Neomycin: Neomycin[i],
            mode: type,
            type: type,
            name: data[i]["Bacteria "],
            x: ['Penicilin', 'Streptomycin', 'Neomycin'],
            y: Penicilin[i] + Streptomycin[i] +  Neomycin[i]
        };
        
        chartData.push(newChartData); 
    }
    var dataArray = [chartData, Penicilin, Streptomycin, Neomycin, nameArray];

    return dataArray;
}

function drawFirstVis(data, nameArray) {
     //need three data points (one for each type of antibiotic)
     //x = array of all names
     // y = values for each drug 
     var chartData = [];

     //Penicilin
     chartData[0] = {
         mode: "bar",
         type: "bar",
         name: "Penicilin",
         x: nameArray,
         y: data[0]
     }
     
     //Strepomycin
     chartData[1] = {
         mode: "bar",
         type: "bar",
         name: "Strepomycin",
         x: nameArray,
         y: data[1]
     }
     
     //Neomycin
     chartData[2] = {
         mode: "bar",
         type: "bar",
         name: "Neomycin",
         x: nameArray,
         y: data[2]
     }
     
     var chartLayout = {
        title: 'Bacteria Visualization 1',
        xaxis: {
            title: "Bacteria"
        },
        yaxis: {
        title:   "Penicilin MIC (Minimum Inhibitory Concentration)"
        },
        height: 1000,
        width: window.width,
        barmode: 'stack'
    };
    
    Plotly.plot(document.getElementById('plot1'), chartData, chartLayout, {staticPlot: true});
}

function drawSecondVis(data) {
        
    var negGram = {
        y: [],
        label: [],
        mode: 'markers',
        name: 'Gram-negative',
        color: 'purple',
        type: 'box'
    };
    var posGram = {
        y: [],
        label: [],
        mode: 'markers',
        name: 'Gram-positive',
        color: 'blue',
        type: 'box'
    };
    
    for( var i = 0; i < data.length; i++) {
        if (data[i]["Gram Staining "] == "positive") {
            posGram.label.push(data[i]["Bacteria "]);
            posGram.y.push(data[i].Penicilin);
        } else {
            negGram.label.push(data[i]["Bacteria "]);
            negGram.y.push(data[i].Penicilin);
        }
    };
    var chartData = [negGram, posGram];

    var chartLayout = {
        title: 'Bacteria Visualization 2',
        xaxis: {
            title: "Gram Positive or Gram Negative"
        },
        yaxis: {
        title:   "Penicilin MIC (Minimum Inhibitory Concentration)"
        },
        height: 1000,
        width: window.width
    };

    Plotly.plot(document.getElementById('plot2'), chartData, chartLayout, {staticPlot: true});     
}

function drawThirdVis(data, nameArray) {
    var chartData = [];
    for (var i = 0; i < data.length; i++) {
         var newChartData = {
            mode: "markers+lines",
            type: "scatter",
            name: nameArray[i],
            x: ["Penicilin", "Streptomycin", "Neomycin"],
            y: [data[i]["Penicilin"], data[i]["Streptomycin"], data[i]["Neomycin"]]
        }
        chartData.push(newChartData);
    }

    var chartLayout = {
        title: 'Bacteria Visualization 3',
        xaxis: {
            title: "Antibiotic"
        },
        yaxis: {
        title:   "MIC (Minimum Inhibitory Concentration)"
        },
        height: 1300,
        width: window.width,
        type: 'lines+markers'
    };
    
    Plotly.plot(document.getElementById('plot3'), chartData, chartLayout, {staticPlot: true});     
}