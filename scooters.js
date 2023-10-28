const search_map = document.getElementById('map');

/* PE HARTA se pot identifica STATIILE de trotinete, trotinete disponibile in statie, dar si 
TROTINETE care sunt pozitionate/lasate IN AFARA STATIILOR 
    DECI - pe harta se vor gasi trotinetele disponibile de selectat */

function generate_map(map_el = search_map, lat_val = 45.760696, lng_val = 21.226788, descr_val = 'TImisoara') {
    
    let map_options_obj = {
        zoom: 12,
        center: {lat: lat_val, lng: lng_val},
    }

    let map_obj = new google.maps.Map(map_el, map_options_obj);

    let marker_options_obj = {
        position: map_options_obj.center,
        map: map_obj,
    };

    let marker_obj = new google.maps.Marker(marker_options_obj);

    let info_options_obj = {

        content: '<h4>' + descr_val + '</h4>',

    };

    let info_obj = new google.maps.InfoWindow(info_options_obj);
    info_obj.open(map_obj, marker_obj);

    marker_obj.addListener("click", function(ev) {
        info_obj.open(map_obj, marker_obj);
    });

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