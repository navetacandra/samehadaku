import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Embed = {
  label: string;
  url: string;
};

type Player = {
  title: string;
  embed: Embed[];
};

export default function Play() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [player, setPlayer] = useState({} as Player);
  const [selected, setSelected] = useState(0);

  const fetchStream = async () => {
    if (loaded) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/stream?id=${encodeURIComponent(id ?? "")}`
      );
      if (!res.ok) await fetchStream();
      const { result } = await res.json();
      setPlayer(result);
      setLoaded(true);
    } catch (err) {
      fetchStream();
    }
  };

  useEffect(() => {
    if(!id?.length) return navigate('/');
    fetchStream();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loaded ? (
    <div className="player-container">
        <h1>{player.title}</h1>
      <div className="server-container">
        {
          player.embed.map((el, i) => (
            <div className={"server" + (selected == i ? ' active' : '')} key={i} onClick={() => setSelected(i)}>{el.label}</div>
          ))
        }
      </div>
      <div className="player">
        <iframe src={player.embed[selected].url} width="100%" height="100%" scrolling="no" allowFullScreen></iframe>
      </div>
    </div>
  ) : (
    <div className="spinner"></div>
  );
}
