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
        location: 'Aleea studentilor Station',
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
]

function generate_map(map_el = search_map, lat_val = 45.760696, lng_val = 21.226788) {

    let map_options_obj = {
        zoom: 14,
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

const selected_scooter = document.getElementById('selected');
const scooter_status = document.getElementById('scooter-status');

selected_scooter.onclick = function(ev) {
    ev.preventDefault();

    if (scooter_status.style.display === "none") {
        scooter_status.style.display = "block";
    } else {
        scooter_status.style.display = "none";
    }
}

const requests = document.getElementById('rental-requests');
const user_spec = document.getElementById('user-specifications');

requests.onclick = function(ev) {
    ev.preventDefault();

    if (user_spec.style.display === "none") {
        user_spec.style.display = "block";
    } else {
        user_spec.style.display = "none";
    }
}