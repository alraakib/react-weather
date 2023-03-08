import { useLocation } from "../contexts/LocationProvider";
import { useThemeColor } from "../contexts/ThemeProvider";
import { useDataValidation } from "../utils/Hooks";

export default function Location() {
  const { location, setLocation } = useLocation();
  const primaryColor = useThemeColor("primary");
  const secondaryColor = useThemeColor("secondary");

  useDataValidation(location.data);
  const locate = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
          )
            .then((data) => data.json())
            .then((data) => {
              setLocation({
                preciseLocation: true,
                data: {
                  lat: data.latitude,
                  lon: data.longitude,
                  country: data.localityInfo.administrative[0].name,
                  regionName: data.localityInfo.administrative[1].name,
                  city: data.localityInfo.administrative[2].name,
                },
              });
            })
            .catch((error) => {
              throw new error(error);
            });
        },
        () => {
          alert(
            "Error getting locaiton! Try again or grant permission for location to this app"
          );
        }
      );
    } else {
      alert("Sorry, your device don't have location service");
    }
  };

  return (
    <div
      data-aos="zoom-out"
      data-aos-duration="300"
      data-aos-easing="ease-in-out"
      className="d-flex align-items-center gap-3"
    >
      <img
        src={`https://img.icons8.com/fluency-systems-regular/28/${primaryColor}/marker.svg`}
        alt="Location"
        className="icon"
      />
      <div>
        <h3 className="font-title mb-1">{`${location?.data?.city}, ${location?.data?.regionName}, ${location?.data?.country}`}</h3>
        <div className="color-secondary d-flex flex-column flex-md-row gap-0 gap-md-3">
          <p className="m-0">
            {location?.preciseLocation
              ? "Precise location"
              : "Your internet location"}
          </p>
          <span
            onClick={locate}
            className="cursor-pointer bottomborder fitcontent text-nowrap"
          >
            <img
              src={`https://img.icons8.com/fluency-systems-regular/20/${secondaryColor}/center-direction.svg`}
              alt=""
            />
            {location?.preciseLocation ? "Locate again" : "Use precise"}
          </span>
        </div>
      </div>
    </div>
  );
}
