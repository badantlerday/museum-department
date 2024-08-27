"use client"; 
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function StudioPlaylist({ data, playlistUrl }) {
  const [currentCover, setCurrentCover] = useState(null);
  const [activeTrackId, setActiveTrackId] = useState(null);

  useEffect(() => {
    if (data && data.tracks.items.length > 0) {
      // Set the initial cover to the first track's album cover
      setCurrentCover(data.tracks.items[0].track.album.images[0].url);
      // Set the initial active track ID to the first track's ID
      setActiveTrackId(data.tracks.items[0].track.id);
    }
  }, [data]);

  const { name, images, tracks } = data;

  return (
    <section className="px-4 lg:px-20 mx-auto mb-32">
      <div className="border-t border-[#E6E6E6] pt-6 pb-4 grid grid-cols-2">
        <div className="flex flex-col aspect-square">
          <div className="flex-auto text-xl font-medium">
            <h2 className="">Studio Sounds</h2>
            <div className="italic text-2xl">
              {name.includes("Studio Sounds -") ? name.replace("Studio Sounds -", "") : name}
            </div>
          </div>
          <div className="justify-self-end">
            <ul className="mb-6 text-xl font-medium cursor-default">
              {tracks.items?.map((item) => (
                <li
                  key={item.track.id}
                  onMouseEnter={() => {
                    setCurrentCover(item.track.album.images[0].url);
                    setActiveTrackId(item.track.id);
                  }}
                  onMouseLeave={() => {
                    setCurrentCover(tracks.items[0].track.album.images[0].url);
                    setActiveTrackId(data.tracks.items[0].track.id); // Reset to first track
                  }}
                  className={activeTrackId === item.track.id ? "text-md-grey-300 py-1" : "py-1"}
                >
                  {item.track.artists[0].name} - <span className="italic">{item.track.name}</span>
                </li>
              ))}
            </ul>
            <Link
              href={playlistUrl}
              className="inline-block border border-md-black p-3 text-xs uppercase tracking-[10%]"
            >
              <div className="flex">
                <Image
                  src="/icon_spotify.svg"
                  width={13}
                  height={13}
                  className="mr-2"
                  alt="Cover"
                />
                <span>Listen</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="aspect-square relative">
          <Image
            src={currentCover || images[0].url}
            alt={name}
            className="object-cover aspect-square"
            width={640}
            height={640}
          />
        </div>
      </div>
    </section>
  );
}