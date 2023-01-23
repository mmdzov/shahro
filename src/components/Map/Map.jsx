import { memo } from "react";
import { useSelector } from "react-redux";
import { Map as MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Map = () => {
  const { homeCinema: c, loading } = useSelector(({ cinema }) => cinema);
  if (!loading && c.length === 0) return <div className=""></div>;

  // const position = [33.9823, 51.45];
  const position = [33.9869087, 51.4457112];

  return (
    <div
      style={{
        marginTop: 10,
        height: 170,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Layout to="/map" className="homeMap" />
      <MapWrapper
        center={position}
        zoom={14}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>میرسه</Popup>
        </Marker>
      </MapWrapper>
    </div>
  );
};
const MapWrapper = styled(MapContainer)`
  & .leaflet-bottom.leaflet-right {
    z-index: 0 !important;
    opacity: 0;
    position: unset !important;
  }
`;
const Layout = styled(Link)`
  width: 100%;
  height: 100%;
  z-index: 9999;
  position: absolute;
  cursor: pointer;
`;

export default memo(Map);
