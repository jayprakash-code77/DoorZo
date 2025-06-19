
const styles = {
    normal: {
        version: 8,
        sources: {
            osm: {
                type: 'raster',
                tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution: '&copy; OpenStreetMap contributors'
            }
        },
        layers: [{
            id: 'osm',
            type: 'raster',
            source: 'osm'
        }]
    },
    satellite: {
        version: 8,
        sources: {
            esri: {
                type: 'raster',
                tiles: [
                    'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                ],
                tileSize: 256,
                attribution: '© Esri, Maxar, Earthstar Geographics, and the GIS user community'
            },
            labels: {
                type: 'raster',
                tiles: [
                    'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'
                ],
                tileSize: 256,
                attribution: 'Labels © Esri'
            }
        },
        layers: [
            {
                id: 'satellite',
                type: 'raster',
                source: 'esri'
            },
            {
                id: 'labels',
                type: 'raster',
                source: 'labels'
            }
        ]
    }

};

// extracting the data that is passed through the "Data Attribute" method
const mapElement = document.getElementById("map");
const coordinates = JSON.parse(mapElement.dataset.coordinates);
const listingDescription = mapElement.dataset.description;
const listingLocation = mapElement.dataset.location;

const map = new maplibregl.Map({
    container: 'map',
    style: styles.normal,
    center: coordinates, // coordinates = [longitude, Latitude]
    zoom: 12
});

map.addControl(new maplibregl.NavigationControl());

const marker = new maplibregl.Marker({ color: 'red' })
    .setLngLat(coordinates)
    .setPopup(
        new maplibregl.Popup({ offset: 25 }).setHTML(`
            <div style="font-family: 'Segoe UI', sans-serif;">
                <h5 style="margin: 0; color: #d9534f;">📍 ${listingLocation}</h5>
                <p style="margin: 4px 0 0; font-size: 0.9rem;">${listingDescription}</p>
            </div>
        `)
    )
    .addTo(map);

document.getElementById('styleToggle').addEventListener('change', function () {
    const newStyle = this.checked ? styles.satellite : styles.normal;
    const center = map.getCenter();
    const zoom = map.getZoom();

    map.setStyle(newStyle);
    map.once('style.load', () => {
        map.setCenter(center);
        map.setZoom(zoom);
        marker.addTo(map); // Add marker again
    });
});

// Debug
/*
console.log(coordinates);
console.log(coordinates[0], coordinates[1]);

*/

