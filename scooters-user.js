const search_map = document.getElementById('map');

/* PE HARTA se pot identifica STATIILE de trotinete, trotinete disponibile in statie, dar si 
TROTINETE care sunt pozitionate/lasate IN AFARA STATIILOR 
    DECI - pe harta se vor gasi trotinetele disponibile de selectat */

function generate_map(map_el = search_map, lat_val = 45.760696, lng_val = 21.226788) {
    
    let locations = [['Runner', 45.748035, 21.238690], 
                ['InTime', 45.754090, 21.225549], 
                ['Walker', 45.761888, 21.226370]];

    let map_options_obj = {
        zoom: 14,
        center: {lat: lat_val, lng: lng_val},
    }

    let map_obj = new google.maps.Map(map_el, map_options_obj);

    for (let j = 0; j < locations.length; j++) {

        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[j][1], locations[j][2]),
            map: map_obj,
            title: locations[j][0],
        });

        let info_options_obj = {
            content: '<h4>' + locations[j][0] + '</h4>',
        };

        let info_obj = new google.maps.InfoWindow(info_options_obj);
        info_obj.open(map_obj, marker);

        marker.addListener("click", function(ev) {
            info_obj.open(map_obj, marker);

            search_map.style.width = "65%";
            search_map.style.transition = "width 1s";

            let info_text = document.getElementById('info-context');
            info_text.style.width = "29%";
            info_text.style.transition = "width 2s";
            info_text.style.display = "block";
            info_text.style.transition = "display 2s";
            
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