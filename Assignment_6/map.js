/*
window.onload = function(){
    loadMap();
}

function searchLocation(){
    var geo = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken;
    });
}*/
/*
var geocoder = new MapboxGeocoder({
    mapboxgl.accessToken = 'pk.eyJ1IjoidGJvLTAiLCJhIjoiY2ptdDhsZXY1MmM3NTNrbnhiOGJ1bHZoaCJ9.qh77ltMqwFPAZrbUcTNNMw';
    accessToken: mapboxgl.accessToken;
});

//Load map function
function loadMap(){
    //window.location.href = "searchTrain.html";
    mapboxgl.accessToken = 'pk.eyJ1IjoidGJvLTAiLCJhIjoiY2ptdDhsZXY1MmM3NTNrbnhiOGJ1bHZoaCJ9.qh77ltMqwFPAZrbUcTNNMw';
    window.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v10',       
        center: [18.4241, -33.9249], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
    
    window.startPin = new mapboxgl.Marker({draggable : true}).setLngLat([0, 0]).addTo(window.map)
    window.destinationPin = new mapboxgl.Marker({draggable : true}).setLngLat([0, 0]).addTo(window.map)
    window.map.on('click', function(event){
        event.preventDefault();
        if(window.startPoint == true){
            window.destinationPin.setLngLat(event.lngLat);
            window.startPoint = false;
            //document.getElementById('destination').value = event.lngLat.lng + "," + event.lngLat.lat;
        }else{
            window.startPin.setLngLat(event.lngLat);
            window.startPoint = true;
            //document.getElementById('start').value = event.lngLat.lng + "," + event.lngLat.lat;
        }
    })
}
document.getElementById('map').appendChild(geocoder.onAdd(map));
*/

//New
/*
function loadMap() {  
    var mymap = L.map('map').setView([-33.9249,18.4241], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoidXdjbGVjdHVyZXIiLCJhIjoiY2ptdWJ6aWt1MGQ4aDN3bzhiM2V1dnRiYyJ9.lWYq773rwVmRzbyHcYAVHw'
    }).addTo(mymap)
}

function searchLocation(){
    var strRegion = document.getElementById('startLocation').innerText;
    var endRegion = document.getElementById('destLocation').innerText;
    const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1IjoidGJvLTAiLCJhIjoiY2ptdDhsZXY1MmM3NTNrbnhiOGJ1bHZoaCJ9.qh77ltMqwFPAZrbUcTNNMw' });

// geocoding with proximity
geocodingClient
  .forwardGeocode({
    query: 'Paris, France',
    proximity: [stsRegion, endRegion]
  })
  .send()
  .then(response => {
    const match = response.body;
  });
}*/

var appID= 'CVNwhRsBKjQXRlbOZIJs'
var appCode = '5bgs6vvyBoKP9cAOjBy1gA'



var url = "http://autocomplete.geocoder.api.here.com/6.2/suggest.json" + "?app_id=" +appID + " &app_code=" + appCode + "&query="

var geocodeUrl = "https://geocoder.api.here.com/6.2/geocode.json" 
        + "?app_id=" + appID
        + " &app_code=" + appCode 
        + "&searchtext="


var app = new Vue({
    el: '#app',
    data: {
        address: '',
        results: [],
        geocodeResults: []
    },
    methods:{
        klick: function(result){
            this.address = result.label
        },

        find: function(){
            var _this = this
            fetch(geocodeUrl + this.address)
            .then(function (response){    
                return response.json()
            })
            .then(function(response){
                console.log('geocode' , response)
                console.log('location', response.Response.View[0].Result[0].Location.DisplayPosition)
                _this.geocodeResults = response.Response.View[0].Result

            })
        },

        search: function(){
            if(this.address.length>5){
                var _this = this
                console.log('search', this)
                fetch(url+this.address)
                    .then(function(response){
                        return response.json()
                    })
                    .then(function(response){
                        _this.results = response.suggestions
                    })

            }else{
                console.log('must use a valid address')
            }
        }
    }
})