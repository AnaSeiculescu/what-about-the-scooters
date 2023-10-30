
const search_map = document.getElementById('map');

/* PE HARTA se pot identifica STATIILE de trotinete, trotinete disponibile in statie, dar si 
TROTINETE care sunt pozitionate/lasate IN AFARA STATIILOR 
    DECI - pe harta se vor gasi trotinetele disponibile de selectat */


const products = [
    {
        id: 0,
        name: 'Runner',
        lat: 45.748035,
        lng: 21.238690,
        location: 'Aleea Studentilor Station',
        status: 'public', 
        battery: "43% - charging",
        km: 'km left at max speed: 7',
    },

    {
        id: 1,
        name: 'InTime',
        lat: 45.754090,
        lng: 21.225549,
        location: 'Piata Victoriei Station',
        status: 'private', 
        battery: "80%",
        km: 'km left at max speed: 12',
    },

    {
        id: 2,
        name: 'Walker',
        lat: 45.761888,
        lng: 21.226370,
        location: 'Calea Alexandru Ioan Cuza 1, Botanic Park',
        status: 'public', 
        battery: "55%",
        km: 'km left at max speed: 8.5',
    },

    {
        id: 3,
        name: 'Bug',
        lat: 45.774961, 
        lng: 21.238971,
        location: 'Petru si Pavel Station',
        status: 'private', 
        battery: "25% - charging",
        km: 'km left at max speed: 4',
    },
];

const stations = [
    ['Aleea Studentilor Station', 45.748035, 21.238690],
    ['Piata Victoriei Station', 45.754090, 21.225549],
    ['Petru si Pavel Station', 45.774961, 21.238971]
];

function generate_map(map_el = search_map, lat_val = 45.755998, lng_val = 21.229103, zoom_nr = 14) {

    

    let map_options_obj = {
        zoom: zoom_nr,
        center: {lat: lat_val, lng: lng_val},
    }

    let map_obj = new google.maps.Map(map_el, map_options_obj);

    for (let j = 0; j < products.length; j++) {

        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(products[j].lat, products[j].lng),
            map: map_obj,
            title: products[j].name,
        });

        let info_options_obj = {
            content: '<h4>' + products[j].name + '</h4>',
        };

        let info_obj = new google.maps.InfoWindow(info_options_obj);
        info_obj.open(map_obj, marker);

        marker.addListener("click", function(ev) {
            info_obj.open(map_obj, marker);

            let info_text = document.getElementById('info-context');
            let info = document.getElementById('info');
            let name = document.getElementById('name');
            let location = document.getElementById('location');
            let status = document.getElementById('status');
            let battery = document.getElementById('battery');
            let km = document.getElementById('km');

            search_map.style.width = "68%";
            search_map.style.transition = "width 2s";

            info_text.style.width = "25%";
            info_text.style.transition = "width 2s";

            info.style.transition = "width 2s";
            info.style.display = "grid";

            name.innerText = products[j].name;
            location.innerText = products[j].location;
            status.innerText = products[j].status;
            battery.innerText = products[j].battery;
            km.innerText = products[j].km;
            
        });

    }

}

generate_map();

/*
   avem posibilitatea de a selecta o statie dintr-o lista, iar in urma selectiei harta se va mari pentru zona statiei selectate. 
   in statie selectata putem gasi o alta lista a produselor disponibile in statie. Produsele pot fi selectate pe harta.

*/

function generate_map_for_station(map_el = search_map, lat_val, lng_val) {

    let map_options_obj = {
        zoom: 18,
        center: {lat: lat_val, lng: lng_val},
    }

    let map_obj = new google.maps.Map(map_el, map_options_obj);

    let descr = search_box.value;

    let scootersHere = findTheScootersInStation(descr);
    console.log(scootersHere);

    for (let j = 0; j < scootersHere.length; j++) {
        
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat_val, lng_val),
            map: map_obj,
            title: scootersHere[j].name,
        });
    
        let info_options_obj = {
            content: '<h4>' + scootersHere[j].name + '</h4>',
        };
    
        let info_obj = new google.maps.InfoWindow(info_options_obj);
        info_obj.open(map_obj, marker);
    
        marker.addListener("click", function(ev) {
            info_obj.open(map_obj, marker);

            let info_text = document.getElementById('info-context');
            let info = document.getElementById('info');
            let name = document.getElementById('name');
            let location = document.getElementById('location');
            let status = document.getElementById('status');
            let battery = document.getElementById('battery');
            let km = document.getElementById('km');

            search_map.style.width = "68%";
            search_map.style.transition = "width 2s";

            info_text.style.width = "25%";
            info_text.style.transition = "width 2s";

            info.style.transition = "width 2s";
            info.style.display = "grid";

            name.innerText = scootersHere[j].name;
            location.innerText = scootersHere[j].location;
            status.innerText = scootersHere[j].status;
            battery.innerText = scootersHere[j].battery;
            km.innerText = scootersHere[j].km;

        });

    }

}

function findTheScootersInStation(stationLocation) {
    let scootersInStation = [];
    for (let j = 0; j < products.length; j++) {
        if (products[j].location === stationLocation) {
            scootersInStation.push(products[j]);
        }
    }

    return scootersInStation;
}


const search_btn = document.getElementById('search-button');
const search_box = document.getElementById('search-box');

search_btn.onclick = function(ev) {
    ev.preventDefault();

    for (let i = 0; i < stations.length; i++) {

        if (search_box.value === stations[i][0]) {

            // console.log(stations[i][1])
            // console.log(search_box)

            generate_map_for_station(search_map, stations[i][1], stations[i][2])
        }

    }

}

const returnBtn = document.getElementById('back-to-all-map');

returnBtn.onclick = function(ev) {
    ev.preventDefault();

    generate_map();
}

