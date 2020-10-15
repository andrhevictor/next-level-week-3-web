import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowDownRight, FiPlus } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import mapIcon from "../utils/mapIcon";
import mapMarketImg from "../images/map-marker.svg";

import "../styles/pages/orphanages-map.css";
import api from "../services/api";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

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
        center={[-27.2092052, -49.6401092]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map((orphanage) => {
          return (
            <Marker
              position={[orphanage.latitude, orphanage.longitude]}
              icon={mapIcon}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowDownRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
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
