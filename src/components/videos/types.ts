import type { ViewStyle } from 'react-native';

/**
 * ### Props for configuring the customizable Video component.
 * @export
 * @interface VideoProps
 */
export interface VideoProps {
  /**
   * ### Source of the video; can be a local module (number) or a remote URL (string).
   * @type {(number | string)}
   * @memberof VideoProps
   */
  source: number | string;

  /**
   * ### If true, the video starts playing automatically when loaded.
   * @type {boolean}
   * @memberof VideoProps
   */
  autoPlay?: boolean;

  /**
   * ### Defines how the video content should scale to fit its container.
   * @type {('contain' | 'cover' | 'fill')}
   * @memberof VideoProps
   */
  contentFit?: 'contain' | 'cover' | 'fill';

  /**
   * ### Initial playback position of the video in seconds.
   * @type {number}
   * @memberof VideoProps
   */
  initialPosition?: number;

  /**
   * ### If true, the video will replay automatically after finishing.
   * @type {boolean}
   * @memberof VideoProps
   */
  loop?: boolean;

  /**
   * ### Mutes the video audio if set to true.
   * @type {boolean}
   * @memberof VideoProps
   */
  muted?: boolean;

  /**
   * ### Adds a shadow effect around the video container.
   * @type {boolean}
   * @memberof VideoProps
   */
  shadow?: '2xl' | 'lg' | 'md' | 'none' | 'sm' | 'xl' | 'xs';

  /**
   * ### Plays the video when it is pressed, if enabled.
   * @type {boolean}
   * @memberof VideoProps
   */
  shouldPlayOnPress?: boolean;

  /**
   * ### Shows native or custom playback controls over the video.
   * @type {boolean}
   * @memberof VideoProps
   */
  showControls?: boolean;

  /**
   * ### Sets custom dimensions and border radius for the video container.
   * @type {(Pick<ViewStyle, 'borderRadius' | 'height' | 'width'>)}
   * @memberof VideoProps
   */
  size?: Pick<ViewStyle, 'borderRadius' | 'height' | 'width'>;

  /**
   * ### Thumbnail generation options for the video.
   * @type {{ enabled: boolean; time: number }}
   * @memberof VideoProps
   * @example
   * // Generate a thumbnail from the 3rd second of the video
   * thumbnail: { enabled: true, time: 3 }
   */
  thumbnail?: { enabled: boolean; time: number };

  /**
   * ### Volume level of the video from 0 (muted) to 1 (maximum).
   * @type {number}
   * @memberof VideoProps
   */
  volume?: number;
}
