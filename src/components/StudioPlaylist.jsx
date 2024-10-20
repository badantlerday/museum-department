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
              {name.includes("Studio Sounds -")
                ? name.replace("Studio Sounds -", "")
                : name}
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
                  className={
                    activeTrackId === item.track.id
                      ? "text-md-grey-300 py-1"
                      : "py-1"
                  }
                >
                  {item.track.artists[0].name} -{" "}
                  <span className="italic">{item.track.name}</span>
                </li>
              ))}
            </ul>
            <Link
              href={playlistUrl}
              className="inline-block border border-md-black p-3 text-xs uppercase tracking-[1px] hover:bg-md-black hover:text-white transition-all group"
            >
              <div className="flex">
                <svg className="mr-2 " width="13" height="14" viewBox="0 0 13 14" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1283_2926)">
                  <path d="M11.0953 11.5962C13.6337 9.0578 13.6337 4.9422 11.0953 2.40377C8.55689 -0.13465 4.44129 -0.13465 1.90287 2.40377C-0.635559 4.9422 -0.635559 9.0578 1.90287 11.5962C4.44129 14.1347 8.55689 14.1347 11.0953 11.5962Z" className="group-hover:fill-white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2495 5.72662C11.2475 6.19724 10.7541 6.48549 10.3408 6.25163C10.0604 6.09303 9.77356 5.94925 9.47469 5.82943C8.88091 5.59135 8.26555 5.43117 7.63659 5.32021C7.19877 5.24301 6.75762 5.19187 6.31411 5.1652C5.85296 5.13748 5.39145 5.13424 4.9296 5.15819C4.40047 5.18556 3.87546 5.24371 3.35738 5.35556C3.16623 5.39688 2.97728 5.44889 2.78824 5.49942C2.67228 5.53039 2.55806 5.53433 2.44254 5.50056C2.18981 5.42661 2.01551 5.20012 2.00805 4.93494C2.00077 4.6773 2.15972 4.43791 2.40938 4.35554C2.59219 4.29527 2.77982 4.2479 2.96755 4.20448C3.43229 4.09702 3.90344 4.03071 4.37845 3.98729C4.88276 3.94123 5.38803 3.92641 5.89357 3.94088C7.13912 3.97658 8.36055 4.15869 9.5425 4.56677C10.0244 4.73318 10.4883 4.93967 10.9291 5.19687C11.0863 5.28863 11.1918 5.41784 11.2319 5.59662C11.2415 5.63907 11.2438 5.6832 11.2494 5.72644L11.2495 5.72662Z" className="group-hover:fill-black" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.36423 7.17797C4.62185 7.18104 3.86131 7.27315 3.11849 7.49359C2.99743 7.52947 2.87594 7.53193 2.75734 7.48386C2.56435 7.4057 2.43874 7.21227 2.44558 7.00762C2.45268 6.79411 2.58286 6.60822 2.78866 6.54533C2.99805 6.48138 3.21068 6.42594 3.42446 6.37848C3.95078 6.26164 4.48413 6.19979 5.02309 6.17936C6.18258 6.13532 7.31524 6.28532 8.42026 6.63954C8.97904 6.81858 9.51353 7.05315 10.0185 7.35333C10.0435 7.36824 10.0685 7.3835 10.0935 7.39877C10.3567 7.55965 10.3882 7.88351 10.2626 8.08983C10.119 8.3258 9.82047 8.39914 9.5723 8.25922C9.4323 8.18027 9.29388 8.0979 9.1508 8.02501C8.49474 7.69061 7.79902 7.47377 7.07716 7.33719C6.52136 7.23201 5.96039 7.1806 5.36423 7.17806V7.17797Z" className="group-hover:fill-black" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.48137 8.2793C6.33603 8.28833 7.17201 8.40377 7.98343 8.67746C8.43099 8.82843 8.85836 9.02361 9.26425 9.26546C9.29934 9.28633 9.33504 9.30704 9.3675 9.33169C9.53127 9.45607 9.57382 9.68126 9.46838 9.85854C9.36609 10.0305 9.14925 10.0997 8.96372 10.0178C8.92644 10.0013 8.89161 9.97924 8.85643 9.95837C8.16853 9.55055 7.42623 9.298 6.63718 9.17721C6.15296 9.10309 5.66611 9.07738 5.17724 9.09659C4.54477 9.12151 3.92028 9.20923 3.30246 9.34598C3.24009 9.35984 3.17588 9.37239 3.11237 9.373C2.92105 9.37511 2.75956 9.2394 2.72605 9.05545C2.69052 8.86062 2.78701 8.67808 2.9657 8.60623C3.00342 8.59106 3.04368 8.58141 3.08351 8.57246C3.58887 8.45904 4.09897 8.37325 4.61512 8.32956C4.9032 8.30517 5.19259 8.29561 5.48145 8.27938L5.48137 8.2793Z" className="group-hover:fill-black" fill="white"/>
                  </g>
                </svg>
                {/* <Image
                  src="/icon_spotify.svg"
                  width={13}
                  height={13}
                  className="mr-2"
                  alt="Cover"
                /> */}
                <span>Listen</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="aspect-square relative bg-red-100">
          <Image
            src={currentCover || images[0].url}
            alt={name}
            className="object-cover aspect-square wi-full"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </section>
  );
}
