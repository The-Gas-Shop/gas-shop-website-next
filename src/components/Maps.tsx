"use client";
import GoogleMapReact from "google-map-react";

export default function Maps() {
  // @ts-expect-error // Google Maps unknown types
  const handleApiLoaded = async (map, maps) => {
    const serviceAreaCoords = [
      { lat: 52.207401, lng: 1.62319 },
      { lat: 52.23838, lng: 1.568159 },
      { lat: 52.265033, lng: 1.511743 },
      { lat: 52.276159, lng: 1.492003 },
      { lat: 52.279225, lng: 1.454944 },
      { lat: 52.26489, lng: 1.344351 },
      { lat: 52.253457, lng: 1.249973 },
      { lat: 52.19806, lng: 0.990799 },
      { lat: 52.137089, lng: 0.932806 },
      { lat: 52.09734, lng: 0.914749 },
      { lat: 52.045061, lng: 0.952825 },
      { lat: 51.990698, lng: 1.000504 },
      { lat: 51.957523, lng: 1.056787 },
      { lat: 51.947285, lng: 1.063318 },
      { lat: 51.953007, lng: 1.175405 },
      { lat: 51.946292, lng: 1.223127 },
      { lat: 51.953014, lng: 1.248533 },
      { lat: 51.950848, lng: 1.294882 },
      { lat: 51.924525, lng: 1.315567 },
      { lat: 52.082093, lng: 1.604816 },
      { lat: 52.190304, lng: 1.635715 },
      { lat: 52.207401, lng: 1.62319 },
    ];
    const travelChargeCoords = [
      { lat: 51.926162020512, lng: 1.3162184555315226 },
      { lat: 51.95647296960748, lng: 1.2939454490034583 },
      { lat: 51.96605422116518, lng: 1.2786064916775273 },
      { lat: 51.98896323243379, lng: 1.275454651131103 },
      { lat: 51.99465630996629, lng: 1.24687796351019 },
      { lat: 51.98288119096803, lng: 1.2212429937326068 },
      { lat: 51.96942012069055, lng: 1.1741755082393386 },
      { lat: 51.965665831875896, lng: 1.1239561821996464 },
      { lat: 51.96605422154538, lng: 1.0976908315504132 },
      { lat: 51.976927755235955, lng: 1.0722659844759248 },
      { lat: 51.98676344081834, lng: 1.052514450385 },
      { lat: 52.00474680531503, lng: 1.0262491124981314 },
      { lat: 52.03203149150095, lng: 1.0348641432155286 },
      { lat: 52.05671560193298, lng: 1.025198498873161 },
      { lat: 52.10410702317911, lng: 1.0241478853941852 },
      { lat: 52.16253442109718, lng: 1.0367552481516944 },
      { lat: 52.16936529100784, lng: 1.056927027648809 },
      { lat: 52.16652996286963, lng: 1.0857138379728168 },
      { lat: 52.16665884534101, lng: 1.1432874586208321 },
      { lat: 52.17220043853013, lng: 1.2233442220896735 },
      { lat: 52.162018841245924, lng: 1.3107552665771711 },
      { lat: 52.15931194872795, lng: 1.3887107894253963 },
      { lat: 52.15557868046266, lng: 1.4087138876331755 },
      { lat: 52.137908812150144, lng: 1.4443933150162174 },
      { lat: 52.1023000992197, lng: 1.490200064290916 },
      { lat: 52.06110820396054, lng: 1.5233994513799174 },
    ];
    const serviceArea = new maps.Polygon({
      paths: serviceAreaCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.3,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.05,
    });
    const travelChargeArea = new maps.Polygon({
      paths: travelChargeCoords,
      strokeColor: "#0000FF",
      strokeOpacity: 0.3,
      strokeWeight: 2,
      fillColor: "#0000FF",
      fillOpacity: 0.05,
    });

    const { AdvancedMarkerElement, PinElement } =
      await maps.importLibrary("marker");

    const glyphImg = document.createElement("img");
    glyphImg.src = "/logo.svg";
    glyphImg.style.width = "40px";
    glyphImg.style.height = "40px";

    const glyphSvgPinElement = new PinElement({
      glyph: glyphImg,
      scale: 2.0,
      background: "#3e4954",
      borderColor: "#3e4954",
    });

    const shop = new AdvancedMarkerElement({
      position: { lat: 51.96161743764017, lng: 1.3521739883445862 },
      content: glyphSvgPinElement.element,
      title: "The Gas Shop",
    });
    const scale = Math.pow(2, map.getZoom());

    const worldCoordinateCenter = map
      .getProjection()
      .fromLatLngToPoint({ lat: 51.96161743764017, lng: 1.3521739883445862 });
    const pixelOffset = new maps.Point(100 / scale || 0, 0);

    const worldCoordinateNewCenter = new maps.Point(
      worldCoordinateCenter.x - pixelOffset.x,
      worldCoordinateCenter.y + pixelOffset.y,
    );

    const newCenter = map
      .getProjection()
      .fromPointToLatLng(worldCoordinateNewCenter);

    map.setCenter(newCenter);
    serviceArea.setMap(map);
    travelChargeArea.setMap(map);
    shop.setMap(map);
  };
  return (
    <div className="h-[70vh] w-full">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${process.env.NEXT_PUBLIC_GOOGLE_API}`,
          libraries: ["places", "marker"],
        }}
        options={{
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
          streetViewControl: true,
          mapTypeControl: true,
          rotateControl: false,
        }}
        defaultCenter={{ lat: 51.96163568599276, lng: 1.3521915142267933 }}
        defaultZoom={9}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      ></GoogleMapReact>

      <gmp-place-details-compact
        className="w-[40%] relative top-[-70vh] mt-17 ml-4"
        truncation-preferred
        slot="control-block-start-inline-center"
      >
        <gmp-place-details-place-request place={`${process.env.NEXT_PUBLIC_GOOGLE_PLACES_ID}`}></gmp-place-details-place-request>
        <gmp-place-content-config>
          <gmp-place-media lightbox-preferred></gmp-place-media>
          <gmp-place-rating></gmp-place-rating>
          <gmp-place-type></gmp-place-type>
          <gmp-place-price></gmp-place-price>
          <gmp-place-accessible-entrance-icon></gmp-place-accessible-entrance-icon>
          <gmp-place-open-now-status></gmp-place-open-now-status>
          <gmp-place-attribution
            light-scheme-color="gray"
            dark-scheme-color="white"
          ></gmp-place-attribution>
        </gmp-place-content-config>
      </gmp-place-details-compact>
    </div>
  );
}
