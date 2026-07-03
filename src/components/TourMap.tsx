import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDestinations } from "@/hooks/useDestinations";
import { useTours } from "@/hooks/useTours";
import L from "leaflet";
import { Link } from "react-router-dom";

// Fix default marker icon missing in Vite/Webpack builds
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Static coordinates mapping for destinations (as database doesn't have lat/lng columns)
const destinationCoordinates: Record<string, [number, number]> = {
  kashmir: [34.0837, 74.7973],     // Srinagar, Kashmir
  dubai: [25.2048, 55.2708],       // Dubai
  kerala: [10.8505, 76.2711],      // Kerala
  malaysia: [3.1390, 101.6869],    // Kuala Lumpur, Malaysia
  phuket: [7.8804, 98.3922],       // Phuket, Thailand
  goa: [15.2993, 74.1240],         // Goa
  bangkok: [13.7563, 100.5018],    // Bangkok, Thailand
  europe: [48.8566, 2.3522],       // Paris, Europe (representative point)
};

const TourMap = () => {
  const { data: destinations, isLoading: loadingDest } = useDestinations();
  const { data: tours, isLoading: loadingTours } = useTours();

  const isLoading = loadingDest || loadingTours;

  // Center on India/South Asia by default
  const defaultCenter: [number, number] = [20.5937, 78.9629];

  const getStartPrice = (destName: string) => {
    if (!tours) return null;
    // Find tours that belong to this destination
    const destTours = tours.filter(t => 
      t.destination.toLowerCase().includes(destName.toLowerCase()) ||
      destName.toLowerCase().includes(t.destination.toLowerCase())
    );
    if (destTours.length === 0) return null;
    return Math.min(...destTours.map(t => t.discounted_price_inr));
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-6">
          Explore Our Destinations on a Map
        </h2>
        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading map…</p>
        ) : (
          <MapContainer center={defaultCenter} zoom={4} style={{ height: "500px", width: "100%" }} className="rounded-lg shadow-md border z-10">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {destinations?.map((dest) => {
              const coords = destinationCoordinates[dest.slug.toLowerCase()];
              if (!coords) return null; // Skip rendering if we don't have coordinates
              
              const startPrice = getStartPrice(dest.name);

              return (
                <Marker key={dest.slug} position={coords}>
                  <Popup>
                    <div className="text-center p-1">
                      <strong className="text-foreground block text-sm font-semibold">{dest.name}</strong>
                      <span className="text-xs text-muted-foreground block mb-2">{dest.tagline}</span>
                      {startPrice && (
                        <span className="text-xs font-semibold text-primary block mb-2">
                          From ₹{startPrice.toLocaleString()}
                        </span>
                      )}
                      <Link 
                        to={`/destinations/${dest.slug}`} 
                        className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90 transition-colors inline-block font-medium"
                      >
                        View Packages
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}
      </div>
    </section>
  );
};

export default TourMap;

