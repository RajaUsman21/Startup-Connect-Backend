import axios from "axios";
import "dotenv/config";
const getCoordsForAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAP_API}`
    );
    const data = response.data;
    if (!data || data.status === "ZERO_RESULTS") {
      const err = "404 Error";
      return console.log(err);
    }
    const coordinates = data.results[0].geometry.location;
    return coordinates;
  } catch (error) {
    console.log(error);
  }
};

export default getCoordsForAddress;
