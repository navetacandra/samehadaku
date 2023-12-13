import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

type Episode = {
  eps: string;
  release: string;
  slug: string;
  title: string;
};

type Details = {
  description: string;
  duration: string;
  episodes: Episode[];
  genres: string[];
  poster: string;
  ratingCount: number;
  ratingValue: number;
  source: string;
  status: string;
  studio: string;
  title: string;
};

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [details, setDetails] = useState({} as Details);

  const fetchDetails = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/details?id=${encodeURIComponent(id ?? "")}`
      );
      if (!res.ok) await fetchDetails();
      const { result } = await res.json();
      setDetails(result);
      setLoaded(true);
    } catch (err) {
      fetchDetails();
    }
  };

  useEffect(() => {
    if (!id?.length) {
      return navigate("/");
    }
    fetchDetails();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return loaded ? (
    <>
      <div className="details-container">
        <div className="details">
          <h1 className="anime-title">
            {details.title}
            <p className="anime-rate">
              <span className="star">&#9733;</span>
              {details.ratingValue ?? 0} /{" "}
              {(details.ratingCount ?? 0).toLocaleString()}
            </p>
          </h1>
          <p className="anime-description">{details.description}</p>
          <div className="genres">
            {details.genres.map((el, i) => (
              <Link
                to={`/genre/${el.replace(/ /g, "-").toLowerCase()}`}
                className="genre-btn"
                key={i}
              >
                {el}
              </Link>
            ))}
          </div>
        </div>
        <div
          className="anime-poster"
          style={{
            background: `url(${details.poster})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="overlay"></div>
        </div>
      </div>
      <div className="episodes-conatiner">
        {details.episodes.map((el, i) => (
          <Link to={`/play/${el.slug}`} className="episode-card" key={i}>
            <div className="episode-label">{el.eps}</div>
            <div className="episode-detail">
              <h3 className="episode-title">{el.title}</h3>
              <p className="episode-date">{el.release}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  ) : (
    <div className="spinner"></div>
  );
}
