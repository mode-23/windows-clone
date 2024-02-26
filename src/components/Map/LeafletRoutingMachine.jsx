import { useEffect } from "react";
import L, { Icon } from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet-control-geocoder";

const LeafletRoutingMachine = ({map}) => {
  const customIcon = new Icon({
    iconUrl: "./icons/placeholder.png",
    iconSize: [25, 25]
  });

  useEffect(() => {
    let marker1 = L.marker([35.8245, 10.6346], { icon: customIcon }).addTo(
      map.target
    );
    map?.target?.on("click", function (e) {
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(map?.target);
      L.Routing.control({
        waypoints: [
          L.latLng(35.8245, 10.6346),
          L.latLng(e.latlng.lat, e.latlng.lng),
        ],
        lineOptions: {
          styles: [
            {
              color: "#196bff",
              weight: 4,
              opacity: .8,
            },
          ],
        },
        routeWhileDragging: false,
        geocoder: L.Control.Geocoder.nominatim(),
        addWaypoints: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false,
      })
        .on("routesfound", function (e) {
          e.routes[0].coordinates.forEach((coordinate, index) => {
            setTimeout(() => {
              marker1.setLatLng([coordinate.lat, coordinate.lng]);
            }, 500 * index);
          });
        })
        .addTo(map?.target);
    });
  }, [map]);
  return null;
};
let DefaultIcon = L.icon({
  iconUrl: "./icons/placeholder.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;
export default LeafletRoutingMachine;