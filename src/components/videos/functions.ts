import { Asset } from 'expo-asset';
import * as VideoThumbnails from 'expo-video-thumbnails';

interface GenerateThumbnail {
  request: {
    time: number;
    uri: string;
  };
  readonly response: {
    height: number;
    uri: string;
    width: number;
  } | null;
}
interface LoadVideoAsset {
  request: {
    source: number | string;
  };
  readonly response: {
    uri: string | null;
  } | null;
}

/**
 * ### Generates a thumbnail image from the specified video URI and time.
 * @param {GenerateThumbnail['request']} { time: number, uri: string }
 * @return {GenerateThumbnail['response']} { height: number; uri: string; width: number } | null;
 */
const generateThumbnail = async ({
  time,
  uri,
}: GenerateThumbnail['request']): Promise<GenerateThumbnail['response']> => {
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
 * @return {LoadVideoAsset['response']} { uri: string | null } | null;
 */
const loadVideoAsset = async ({
  source,
}: LoadVideoAsset['request']): Promise<LoadVideoAsset['response']> => {
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
