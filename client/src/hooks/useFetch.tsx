import { useEffect, useState } from "react";
import { GifProp } from "../types";
const API_KEY = process.env.REACT_APP_GIF_API;


const useFetch = (prop: GifProp) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${prop.gifurl.split(" ").join("")}&limit=1`);
      const { data } = await response.json();

      setGifUrl(data[0]?.images?.downsized_medium.url);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (prop.gifurl) fetchGifs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop.gifurl]);

  return gifUrl;
};

export default useFetch;