

var bacteria_data = [];
            
d3.csv("data/antibiotics_data.csv", function(error, data) {

    console.log("Here's the data\n" + data);
   
    drawFirstVis(data);
    drawSecondVis(data);
});



function drawFirstVis(data) {
    
    /*
    Object {"Bacteria ": "Streptococcus fecalis ", Penicilin: "1", "Streptomycin ": "1", Neomycin: "0.1", "Gram Staining ": "positive"}
    */
    
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
        //if (data[i]("positive")) {
        //    console.log('another positive gram stained one!');
        //}
        console.log(data[i]);
        console.log("Penicilin: " + data[i].Penicilin);
        console.log("Gram Staining: " + data[i]["Gram Staining "]);
        if (data[i]["Gram Staining "] == "positive") {
            posGram.label.push(data[i]["Bacteria "]);
            
            posGram.y.push(data[i].Penicilin);
            console.log(posGram);
        } else {
            negGram.label.push(data[i]["Bacteria "]);
            negGram.y.push(data[i].Penicilin);
            console.log(negGram);
        }
    };
    

    var chartLayout = {
        title: 'Bacteria Visualization v2',
        xaxis: {
            title: "Gram Positive or Gram Negative"
        },
        yaxis: {
        title:   "Penicilin MIC (Minimum Inhibitory Concentration)"
        },
        height: 1000,
        width: window.width
    };

    var chartData = [negGram, posGram];

    Plotly.plot(document.getElementById('plot2'), chartData, chartLayout, {staticPlot: true});     
}

function drawSecondVis(data) {
       
       var Penicilin = [];
    var Streptomycin = [];
    var Neomycin = [];
      
    var nameArray = [];
    var chartData = [];
    
      for( var i = 0; i < data.length; i++) {
        //if (data[i]("positive")) {
        //    console.log('another positive gram stained one!');
        //}
        console.log(data[i]);
        nameArray.push(data[i]["Bacteria "]);
        console.log("Bacteria: " + data[i]["Bacteria "]);
        Penicilin.push(data[i].Penicilin);
        console.log("Penicilin: " + data[i].Penicilin);
        Streptomycin.push(data[i]["Streptomycin "]);
        console.log("Streptomycin: " + data[i]["Streptomycin "]);
        Neomycin.push(data[i].Neomycin);
        console.log("Neomycin: " + data[i].Neomycin);
        var newChartData = {
            Penicilin: data[i].Penicilin,
            Streptomycin: data[i]["Streptomycin "],
            Neomycin: data[i].Neomycin,
            y: [data[i].Penicilin, data[i]["Streptomycin "], data[i].Neomycin],
            mode: 'lines+markers',
            name: data[i]["Bacteria "],
            type: 'scatter'
        };
        chartData.push(newChartData);
        console.log(newChartData);
    };
    console.log("~~~~~~~~~~~~~~~~~~~END OF VARIABLE PREP~~~~~~~~~~~~~~~~~~")
    console.log(Penicilin);
    console.log(Streptomycin);
    console.log(Neomycin);
    var chartLayout = {
        title: 'Bacteria Visualization 3',
        xaxis: {
            title: "Antibiotic"
        },
        yaxis: {
        title:   "MIC (Minimum Inhibitory Concentration)"
        },
        height: 1300,
        width: window.width
    };

    Plotly.plot(document.getElementById('plot3'), chartData, chartLayout, {staticPlot: true});     
}