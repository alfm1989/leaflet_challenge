var apiKey = "pk.eyJ1IjoiYWRyaWxmbSIsImEiOiJjazkza2RxOXUwMzZrM2VudWRzaWhtYm80In0.y0pAR7Md3lRKHCnJHhYkkw";

//Map object
var myMap = L.map("map", {
    center: [40, -15],
    zoom: 2
});

//The title layer is created and then added to the map object
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: 'pk.eyJ1IjoiYWRyaWxmbSIsImEiOiJjazkza2RxOXUwMzZrM2VudWRzaWhtYm80In0.y0pAR7Md3lRKHCnJHhYkkw'
}).addTo(myMap);

//URL for retrievieng all the earthquake data from the json
const url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url, function(data) {

    //Function to set the marker size
    function markerSize(magnitude) {
        return magnitude*5;
    }

    //Choose the color according 
    function chooseColor(magnitude) {
        switch (true) {
        case magnitude>5:
            return "#800000";
        case magnitude>4:
            return "#FD6A02";
        case magnitude>3:
            return "#F9812A";
        case magnitude>2:
            return "#FCE205";
        case magnitude>1:
            return "#4CBB17";
        default:
            return "#D9DDDC";
        }
    }
    L.geoJson(data, {
        // Style each feature 
        style: function(feature) {
            return {
              color: "white",
              fillColor: chooseColor(feature.properties.mag),
              fillOpacity: 0.4,
              opacity:1,
              radius:markerSize(feature.properties.mag),
              weight: 1,
              stroke:true
            };
        },

        //Popup information for each earthquake
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        },

        //Parameter to give the circle style marker
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        }

    }).addTo(myMap);

    var legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function(myMap) {
        var div = L.DomUtil.create("div", "info legend");
    
        var grades = [0, 1, 2, 3, 4, 5];
        var colors = ["#D9DDDC","#800000","#FD6A02","#F9812A","#FCE205","#4CBB17"];
    

        // Looping through our intervals to generate a label with a colored square for each interval.
        for (var i = 0; i < grades.length; i++) {
            if( i<=4){
                div.innerHTML +='<i class="square" style="background:' + colors[i] + '"></i>'+ grades[i] +"-"+ (grades[i + 1] +"<br>");
                console.log(colors[i])
            }
            else{
                div.innerHTML +='<i class="square" style="background:' + colors[i] + '"></i>'+ grades[i] + "+";
                console.log(colors[i])
            }
          
        }
        return div;
      };

      legend.addTo(myMap);
      
});







