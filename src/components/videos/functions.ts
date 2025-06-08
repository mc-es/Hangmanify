import { Asset } from 'expo-asset';
import * as VideoThumbnails from 'expo-video-thumbnails';

interface GenerateThumbnail {
  request: {
    time: number;
    uri: string;
  };
  response: {
    readonly height: number;
    readonly uri: string;
    readonly width: number;
  };
}
interface LoadVideoAsset {
  request: {
    source: number | string;
  };
  response: {
    readonly uri: string | null;
  };
}

/**
 * ### Generates a thumbnail image from the specified video URI and time.
 * @param {GenerateThumbnail['request']} { time: number, uri: string }
 * @returns {GenerateThumbnail['response']} { height: number; uri: string; width: number } | null;
 */
const generateThumbnail = async ({
  time,
  uri,
}: GenerateThumbnail['request']): Promise<GenerateThumbnail['response'] | null> => {
  try {
    const result = await VideoThumbnails.getThumbnailAsync(uri, { time });
    return { height: result.height, uri: result.uri, width: result.width };
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * ### Loads a local or remote video asset and returns its local URI.
 * @param {LoadVideoAsset['request']} { source: number | string }
 * @returns {LoadVideoAsset['response']} { uri: string | null } | null;
 */
const loadVideoAsset = async ({
  source,
}: LoadVideoAsset['request']): Promise<LoadVideoAsset['response'] | null> => {
  try {
    const asset = Asset.fromModule(source);
    await asset.downloadAsync();
    return { uri: asset.localUri };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { generateThumbnail, loadVideoAsset };
