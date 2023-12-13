import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

type Genre = {
  name: string;
  id: string;
};

export default function Genres() {
    const [loaded, setLoaded] = useState(false);
    const [genres, setGenres] = useState([]);

    const fetchGenres = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/genre`);
        if(!res.ok) await fetchGenres();
        const { result } = await res.json();
        setGenres(result);
        setLoaded(true);
      } catch (err) {
        fetchGenres();
      }
    }

    useEffect(() => {
      fetchGenres();

      return () => {};
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
  return (
    <>
    {
        loaded
        ? <div className="genres-container">
            {
              genres.map((el: Genre, i) => (
                <Link to={`/genre/${el.id}`} className="genre-name" key={i}>{el.name}</Link>
              ))
            }
          </div>
        : <div className="spinner"></div>
    }
    </>
  )
}
