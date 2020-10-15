import React from "react";
import { Link } from "react-router-dom";
import { FiArrowDownRight, FiPlus } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import mapIcon from "../utils/mapIcon";
import mapMarketImg from "../images/map-marker.svg";

import "../styles/pages/orphanages-map.css";

function OrphanagesMap() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarketImg} alt="Happy" />

          <h2>Escolha um ornafato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita.</p>
        </header>

        <footer>
          <strong>Ji-Paraná</strong>
          <span>Rondônia</span>
        </footer>
      </aside>

      <Map
        center={[-10.8638136, -61.9696815]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        <Marker position={[-10.8638136, -61.9696815]} icon={mapIcon}>
          <Popup
            closeButton={false}
            minWidth={240}
            maxWidth={240}
            className="map-popup"
          >
            Lar das meninas
            <Link to="/orphanages/1">
              <FiArrowDownRight size={20} color="#FFF" />
            </Link>
          </Popup>
        </Marker>
      </Map>

      <div>
        <Link to="/orphanages/create" className="create-orphanage">
          <FiPlus size={32} color="#FFF" />
        </Link>
      </div>
    </div>
  );
}

export default OrphanagesMap;
