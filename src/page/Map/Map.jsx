/* eslint-disable no-unused-vars */
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Map as MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect } from "react";
import styled from "styled-components";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";

const Map = () => {
  const { homeCinema: c, loading } = useSelector(({ cinema }) => cinema);
  const handleZoom = () => {
    window.scrollTo(0, 0);
  };
  const [height, setHeight] = useState(window.innerHeight);
  const [lat, setLat] = useState(33.9823);
  const [lng, setLng] = useState(51.45);
  const [msg, setMsg] = useState("");
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setMsg("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setLat(position?.coords?.latitude ?? 33.9823);
    setLng(position?.coords?.longitude ?? 51.45);
  }
  useEffect(() => {
    const gl = document.getElementById("getLocationBtn");
    gl?.click();
    window.addEventListener("resize", () => setHeight(window.innerHeight));
    return () =>
      window.removeEventListener("resize", () => setHeight(window.innerHeight));
  }, []);
  const { loading: l } = useSelector(({ _MainReducer }) => _MainReducer);

  if (l.mode === "adsToHome")
    return <LodingDotPlus isRelative={false} isFixed />;
  if (!loading && c.length === 0) return <div className=""></div>;
  return (
    <LeafletContainer
      style={{ height: height - 42, overflow: "hidden", position: "relative" }}
    >
      <button
        className=""
        onClick={getLocation}
        style={{ position: "fixed", opacity: 0 }}
        id="getLocationBtn"
      />
      <MapContainer
        center={[lat, lng]}
        zoom={14}
        scrollWheelZoom={false}
        onzoom={handleZoom}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>میرسه</Popup>
        </Marker>
      </MapContainer>
    </LeafletContainer>
  );
};

const LeafletContainer = styled.div`
  & .leaflet-control-zoom-in {
    cursor: pointer !important;
  }
  & .leaflet-control-zoom-out {
    cursor: pointer !important;
  }
`;

export default memo(Map);
