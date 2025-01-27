// NYC lat/long = 40.730610, -73.935242
// SFO lat/long = 37.7749, -122.4194 

var HeatMap = L.map("h_map", {
  center: [40.730610, -73.935242],
  zoom: 13
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(HeatMap);

//var url = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=10000"; //original SFO line of code
var url = "http://127.0.0.1:5000/heatData"; //NYC

d3.json(url, function(response) {
  console.log("-- Next line is the json data")
  console.log(response);

  var heatArray = [];
  console.log("-- Next line is the heatArray list.   Should be empty")
  console.log(heatArray)

  for (var i = 0; i < response.length; i++) {
    //var location = response[i].location; //SFO
    var peaches = response[i];
    
    console.log("-- response[i]")
    console.log(peaches)

    if (peaches) {
      //heatArray.push([location.coordinates[1], location.coordinates[0]]); //SFO
      heatArray.push([peaches.lat, peaches.long]);
    }
  }

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(HeatMap);

});