'use client';

import React, { useState } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type ViewState = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export default function MapBox() {
  const [viewState, setViewState] = useState<ViewState>({
    latitude: 48.5249,
    longitude: 7.6824,
    zoom: 15
  });

  return (
    <div className="h-[250px] w-full rounded-lg overflow-hidden border border-gray-200">
      <ReactMapGL
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker longitude={7.6824} latitude={48.5249}>
          <div className="text-red-500 text-2xl">📍</div>
        </Marker>
        <NavigationControl position="top-left" />
      </ReactMapGL>
    </div>
  );
}