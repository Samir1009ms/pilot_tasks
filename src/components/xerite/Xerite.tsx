import React, { useEffect, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import WKT from 'ol/format/WKT';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { getCenter } from 'ol/extent';
import { useSelector } from 'react-redux';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

const MapComponent = () => {
    const WKTS = useSelector((state: any) => state.FileSlice.wkt)
    const [wkt, setWKT] = useState<string>("");
    const [isValidWKT, setIsValidWKT] = useState<boolean>(true);

    useEffect(() => {
        if (WKTS !== '') {
            setWKT(WKTS);
        }
    }, [WKTS]);

    const handleWKTChange = (e: any) => {
        const newWKT = e.target.value;
        setWKT(newWKT);

        const format = new WKT();
        if (WKTS.trim() === '') {
            setIsValidWKT(false);
        } else {
            try {
                format.readFeature(newWKT, {
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857',
                });
                setIsValidWKT(true);
            } catch (error) {
                setIsValidWKT(false);
            }
        }
    };

    useEffect(() => {
        if (wkt !== '') {
            const raster = new TileLayer({
                source: new OSM(),
            });

            const format = new WKT();

            const feature: any = format.readFeature(wkt, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857',
            });

            const extent = feature.getGeometry().getExtent();
            const transformedCenter = getCenter(extent);

            const vector = new VectorLayer({
                source: new VectorSource({
                    features: [feature],
                }),
                style: (feature) => {
                    return [
                        new Style({
                            stroke: new Stroke({
                                color: 'red',
                                width: 5,
                            }),
                            fill: new Fill({
                                color: 'rgba(124, 231, 121, 0.1)',
                            }),
                        }),
                    ];
                }
            });

            const map = new Map({
                layers: [raster, vector],
                target: 'map',
                view: new View({
                    center: transformedCenter,
                    zoom: 19,
                }),
            });
            return () => {
                map.setTarget(undefined);
            };
        }
    }, [wkt]);

    return (
        <div style={{ width: '40%', height: '100%' }}>
            <input
                type="text"
                value={wkt}
                onChange={handleWKTChange}
                style={{ display: "none" }}
            />
            {!isValidWKT && <div style={{ color: 'red' }}>Invalid WKT format!</div>}
            <div id="map" className='map' style={{ width: '100%', height: '455px' }}></div>
        </div>
    );
};

export default MapComponent;
