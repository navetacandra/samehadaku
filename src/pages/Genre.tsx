import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Anime = {
  poster: string;
  rate: number;
  showType: string;
  slug: string;
  status: string;
  title: string;
  type: string;
};

export default function Genre() {
  const { slug } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [animes, setAnimes] = useState([]);

  const fetchHome = async () => {
    if (loaded) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/genre/${slug}`);
      if (!res.ok) await fetchHome();
      const { result } = await res.json();
      setAnimes(result);
      setLoaded(true);
    } catch (err) {
      fetchHome();
    }
  };

  useEffect(() => {
    fetchHome();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loaded ? (
        <div className="animes-container">
          {animes.map((el: Anime, i) => (
            <Link to={`/anime/${el.slug}`} className="anime-card" key={i}>
              <div
                className="card-poster"
                style={{
                  background: `url(${el.poster})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <div className="overlay"></div>
              </div>
              <div className="title">{el.title}</div>
              <div className="rate">
                <span className="star">&#9733;</span>
                {el.rate}
              </div>
              <div className="status">{el.status}</div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="spinner"></div>
      )}
    </>
  );
}
