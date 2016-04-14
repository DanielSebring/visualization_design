/*
Daniel Sebring
INFO 474 Visual Design Assignment

This assignment uses a dataset of bacteria and their response to different antibiotics.  
The assignment is to create and explain three visualizations that might help a user 
get a better understanding of these datasets.
*/

//first create this variable so we can populate it with information about the bacteria
var bacteria_data = [];
        
        //We've imported d3 and utilize it so we can read in .csv files    
d3.csv("data/antibiotics_data.csv", function(error, data) {
    // initial dataset parsing and setup
    var bacteriaDataArray = getBacteria(data, "scatter"); //splits data into various attributes
    var bacteria_data = bacteriaDataArray[0]; //the first array is all objects that represent different bacteria
    var drugs = [bacteriaDataArray[1], bacteriaDataArray[2], bacteriaDataArray[3]]; //these arrays hold the MIC for the 16 bacteria
    var nameArray = bacteriaDataArray[4] // the names of all bacteria

    // functions to create visualizations
    drawFirstVis(drugs, nameArray); //draws stacked bar graph
    drawSecondVis(data); //draws box plot
    drawThirdVis(bacteria_data, nameArray); //draws scatter plot
});

function getBacteria(data, type) {
    var Penicilin = [];
    var Streptomycin = [];
    var Neomycin = [];
    var nameArray = [];
    var chartData = [];
    
    // parse through all parts of the data set and get their specific values- note, some of the categories in the dataset
    // end in a whitespace character, so either strip the values or look for which ones end in a " "
    for( var i = 0; i < data.length; i++) {
        //console.log(data[i]);
        nameArray.push(data[i]["Bacteria "]);
        Penicilin.push(data[i].Penicilin);
        Streptomycin.push(data[i]["Streptomycin "]);
        Neomycin.push(data[i].Neomycin);
        
        //this creates the individual bacteria object, with y being the bacteria's combined MIC
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


// In this function we're going to be drawing a stacked bar graph
// to graph a stacked bar graph in Plotly, we need to give plotly three datasets-
// datasets for the three stacked categories (the three antibiotics) which should be their MIC for each bacteria as a y value
// and the x value should be the name of the bacteria
function drawFirstVis(data, nameArray) {
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
        title: 'Total MIC for Different Bacteria',
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


// In this function we're going to be drawing a box plot 
// to graph a box plot in Plotly, we're going to need to give Plotly a dataset for each box we
// want to graph, in this case, all the Gram positive and Gram negative bacteria
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
    
    // if something is gram positive, add it to that dataset, else add it to negative dataset
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
        title: 'MIC of Gram-positive and Gram-negative Bacteria',
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

// In this function we're going to be drawing a connected scatter plot
// to graph a stacked bar graph in Plotly, we need to give plotly datasets for each bacteria, so we can
// connect the dots and demonstrate that specific bacteria.  To do that, we set up objects that represent
// each bactera with x as the array of names of antibiotics and y the array of MICs for that antibiotics/bacteria combo
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
        title: 'Bacterial Response to Different Antibiotics',
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