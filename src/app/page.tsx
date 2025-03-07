"use client";
import Head from "next/head";
import Hero from "./components/hero";
import ContentRow from "./components/contentRow";
import { useState, useEffect } from "react";
import { Video } from "./types/Video"; // Adjust the import path as necessary

export default function Home() {
  const [allVideos, setAllVideos] = useState<Video[]>([]);
  const [films, setFilms] = useState<Video[]>([]);
  const [tvShows, setTvShows] = useState<Video[]>([]);

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        const response = await fetch("/api/videos");
        const data = await response.json();
        setAllVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    const fetchFilms = async () => {
      try {
        const response = await fetch("/api/videos?category=films");
        const data = await response.json();
        setFilms(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    const fetchTvShows = async () => {
      try {
        const response = await fetch("/api/videos?category=tv%20shows");
        const data = await response.json();
        setTvShows(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchAllVideos();
    fetchFilms();
    fetchTvShows();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Head>
        <title>ModernFlix - Stream Your Favorites</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pt-14">
        <Hero movies={allVideos} />

        <ContentRow title="All Videos" movies={allVideos} />
        {films.length > 0 && <ContentRow title="Movies" movies={films} />}
        {tvShows.length > 0 && <ContentRow title="TV Shows" movies={tvShows} />}
      </main>
    </div>
  );
}
