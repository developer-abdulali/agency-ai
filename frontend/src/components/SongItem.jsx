import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SongItem = ({ id, name, desc, image }) => {
  const { playSongWithId } = useContext(PlayerContext);
  return (
    <div
      onClick={() => playSongWithId(id)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img src={image} alt={name} className="rounded" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};
export default SongItem;
