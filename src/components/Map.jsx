import { useEffect, useRef } from 'react'
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import { GH_GEOLOCATION, regionalGeoCodes } from '../utils/key_geocodes';
import { animateMap } from '../utils/mapHelpers';
import GeoJSONFile from "/geojson_boundaries_ghana_regions.geojson?url"

const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
if (!mapboxToken) throw new Error('Missing MAPBOX_ACCESS_TOKEN environment variable');
mapboxgl.accessToken = mapboxToken;

const Map = ({currRegion}) => {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) return;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [GH_GEOLOCATION.longitude,GH_GEOLOCATION.latitude],
            style: "mapbox://styles/mapbox/standard",
            zoom: 6.2,
            minZoom: 6,
            maxZoom: 8
        });

        mapRef.current.on("load", () => {
            let popup;
            mapRef.current.addSource("regionsSource", {
                type: "geojson",
                data: GeoJSONFile
            });

            mapRef.current.addLayer({
                id: "population_density_layer",
                type: "fill",
                source: "regionsSource",
                paint: {
                    "fill-color": [
                        "interpolate",
                        ["linear"],
                        ["get", "density"],
                        0, "#f7fbff",
                        50, "#f7fbff",
                        100, "#deebf7",
                        200, "#9ecae1",
                        500, "#3182bd",
                        1000, "#08519c",
                        2000, "#4b0082",
                    ],
                    "fill-opacity": 0.8
                }
            })

            mapRef.current.addLayer({
                id: "regions_boundary_layer",
                type: "line",
                source: "regionsSource",
                paint: {
                    "line-color": "#000000",
                    "line-width": 1
                }
            });

            mapRef.current.on("click", ["population_density_layer", "regions_boundary_layer"], (Event) => {
                mapRef.current.getCanvas().style.cursor = 'pointer';

                const regionName = Event.features[0].properties.name;
                const regionDensity = Event.features[0].properties.density;

                if (popup) popup.remove();

                popup = new mapboxgl.Popup().setLngLat(Event.lngLat).setHTML(`Region: <strong>${regionName}</strong> <br /> Density: <b>${regionDensity}/km<sup>2</sup></b> `).addTo(mapRef.current);
            });
        });
        

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        }

    }, []);

    useEffect(() => {
        if (currRegion === "") return;

        const regionSelected = regionalGeoCodes.find(regionObject => regionObject.regionName === currRegion);

        animateMap(mapRef, regionSelected?.longitude, regionSelected?.latitude, 8);
    }, [currRegion]);

  return (
    <div className='h-full w-full' ref={mapContainerRef} />
  )
}

export default Map