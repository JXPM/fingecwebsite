'use client';

import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

declare global {
  interface Window {
    tarteaucitron?: {
      state?: Record<string, boolean | undefined>;
      userInterface?: {
        openPanel?: () => void;
      };
    };
  }
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type ViewState = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export default function MapBox() {
  const [hasMapConsent, setHasMapConsent] = useState(false);
  const [isTacReady, setIsTacReady] = useState(false);
  const [viewState, setViewState] = useState<ViewState>({
    latitude: 48.5249,
    longitude: 7.6824,
    zoom: 15
  });

  useEffect(() => {
    const syncConsent = () => {
      const tac = window.tarteaucitron;
      if (!tac) {
        setIsTacReady(false);
        setHasMapConsent(false);
        return;
      }

      setIsTacReady(true);
      setHasMapConsent(tac.state?.mapbox === true);
    };

    syncConsent();

    const onRootReady = () => syncConsent();
    const onAllowed = () => setHasMapConsent(true);
    const onDisallowed = () => setHasMapConsent(false);

    window.addEventListener('tac.root_available', onRootReady as EventListener);
    document.addEventListener('mapbox_allowed', onAllowed);
    document.addEventListener('mapbox_disallowed', onDisallowed);

    return () => {
      window.removeEventListener('tac.root_available', onRootReady as EventListener);
      document.removeEventListener('mapbox_allowed', onAllowed);
      document.removeEventListener('mapbox_disallowed', onDisallowed);
    };
  }, []);

  if (!hasMapConsent) {
    return (
      <div className="h-[250px] w-full rounded-lg border border-gray-200 bg-gray-50 p-4 flex flex-col items-start justify-center gap-3">
        <p className="text-sm text-muted-foreground">
          La carte interactive est desactivee tant que vous n'avez pas accepte les cookies/services Mapbox.
        </p>
        <button
          type="button"
          onClick={() => window.tarteaucitron?.userInterface?.openPanel?.()}
          className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          disabled={!isTacReady}
        >
          Gerer mes cookies
        </button>
      </div>
    );
  }

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