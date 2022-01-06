import { useEffect, useState } from "react";
const API_KEY = process.env.REACT_APP_GIF_API;


const useFetch = ({ gif }) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${gif.split(" ").join("")}&limit=1`);
      const { data } = await response.json();

      setGifUrl(data[0]?.images?.downsized_medium.url);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (gif) fetchGifs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gif]);

  return gifUrl;
};

export default useFetch;