import { useCallback, useEffect, useState } from 'react';

import type { VideoPlayer as ExpoVideoPlayer, VideoSource } from 'expo-video';
import { useVideoPlayer as useExpoVideoPlayer } from 'expo-video';

import { generateThumbnail, loadVideoAsset } from './functions';

interface LoadVideo {
  request: {
    source: number | string;
  };
  response: {
    readonly uri: string | null;
  };
}
interface Thumbnail {
  request: {
    enabled: boolean;
    time: number;
    uri: string | null;
  };
  response: {
    readonly uri: string | null;
  };
}
interface VideoPlayer {
  request: {
    source: VideoSource;
    config: {
      autoPlay: boolean;
      initialPosition: number;
      loop: boolean;
      muted: boolean;
      volume: number;
    };
    onPlay?: () => void;
  };
  response: {
    readonly player: ExpoVideoPlayer;
  };
}

/**
 * ### Loads a video asset from a local module or remote URL and returns its local URI.
 * @param {LoadVideo['request']} { source: number | string }
 * @return {LoadVideo['response']}  { uri: string | null }
 */
const useLoadVideo = ({ source }: LoadVideo['request']): LoadVideo['response'] => {
  const [videoUri, setVideoUri] = useState<string | null>(null);

  useEffect((): (() => void) => {
    let isActive = true;

    const loadVideo = async (): Promise<void> => {
      try {
        const result = await loadVideoAsset({ source });
        if (isActive && result) setVideoUri(result.uri);
      } catch (error) {
        console.error(error);
      }
    };

    loadVideo();

    return () => {
      isActive = false;
    };
  }, [source]);

  return { uri: videoUri };
};

/**
 * ### Generates a thumbnail image from a video at the specified time if enabled.
 * @param {Thumbnail['request']} { enabled: boolean, time: number, uri: string | null }
 * @return {Thumbnail['response']}  { uri: string | null }
 */
const useThumbnail = ({
  enabled,
  time,
  uri,
}: Thumbnail['request']): Thumbnail['response'] => {
  const [thumbnailUri, setThumbnailUri] = useState<string | null>(null);

  useEffect((): (() => void) => {
    let isActive = true;

    const generate = async (): Promise<void> => {
      if (!enabled || !uri) return;

      try {
        const results = await generateThumbnail({ time: Math.max(0, time) * 1000, uri });
        if (isActive && results) setThumbnailUri(results.uri);
      } catch (error) {
        console.error(error);
        if (isActive) setThumbnailUri(null);
      }
    };

    generate();

    return () => {
      isActive = false;
    };
  }, [enabled, uri, time]);

  return { uri: thumbnailUri };
};

/**
 * ### Initializes and returns a video player instance with the provided config.
 * @param {VideoPlayer['request']} {
 *   config: { autoPlay: boolean, initialPosition: number, loop: boolean, muted: boolean, volume: number },
 *   onPlay?: () => void,
 *   source: VideoSource
 * }
 * @return {VideoPlayer['response']}  { player: ExpoVideoPlayer }
 */
const useVideoPlayer = ({
  config,
  onPlay,
  source,
}: VideoPlayer['request']): VideoPlayer['response'] => {
  const initializePlayer = useCallback(
    (play: ExpoVideoPlayer) => {
      play.loop = config.loop;
      play.muted = config.muted;
      play.volume = Math.min(1, Math.max(0, config.volume));

      if (config.initialPosition > 0) play.currentTime = config.initialPosition;
      if (config.autoPlay) {
        play.play();
        onPlay?.();
      }
    },
    [
      config.autoPlay,
      config.initialPosition,
      config.loop,
      config.muted,
      config.volume,
      onPlay,
    ]
  );

  const player = useExpoVideoPlayer(source, initializePlayer);
  return { player };
};

export { useLoadVideo, useThumbnail, useVideoPlayer };
