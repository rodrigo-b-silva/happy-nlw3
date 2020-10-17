import Leaflet from 'leaflet';

import mapMarkerImg from '../assets/images/logo.svg';

const happyMapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [190, 8]
});

export default happyMapIcon;