import { DrawEvents, Events, latLng, LatLngTuple, Polygon } from 'leaflet';
import { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

const Map = () => {
  const [position, setPosition] = useState<LatLngTuple>([28.6542, 77.2373]);
  const [mapLayers, setMapLayers] = useState<
    Array<{
      id: number;
      latlngs: Array<{ id: number; latLng: { lat: number; lng: number } }>;
    }>
  >([]);
  const _onCreated = (e: DrawEvents.Created) => {
    const { layerType } = e;
    if (layerType === 'polygon') {
      const { _leaflet_id, _latlngs } = e.layer as any;
      setMapLayers((mapLayers) => [
        ...mapLayers,
        { id: _leaflet_id, latlngs: _latlngs[0] },
      ]);
    }
  };
  const _onEdited = (e: DrawEvents.Edited) => {};
  const _onDeleted = (e: DrawEvents.Deleted) => {
    setMapLayers([]);
  };
  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={true}
      style={{
        height: '100%',
      }}
    >
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={_onCreated}
          onDeleted={_onDeleted}
          onEdited={_onEdited}
          draw={{
            circle: false,
            marker: false,
            polyline: false,
            rectangle: false,
            circlemarker: false,
          }}
        />
      </FeatureGroup>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
