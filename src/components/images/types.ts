import type { ViewStyle } from 'react-native';

import type { ImageSource } from 'expo-image';

/**### Props for configuring the customizable Image component */
export interface ImageProps {
  /**- Source of the image; can be a local module (number) or a remote URL (string or object) */
  source: ImageSource;

  /**- Applies a blur effect to the image; higher values increase the blur intensity */
  blurRadius?: number;

  /**- Determines the caching behavior for the image */
  cachePolicy?: 'disk' | 'memory-disk' | 'memory' | 'none';

  /**- Defines how the image should scale to fit within its container */
  contentFit?: 'contain' | 'cover' | 'fill';

  /**- Adds a shadow effect around the image container */
  shadow?: '2xl' | 'lg' | 'md' | 'none' | 'sm' | 'xl' | 'xs';

  /**- Sets custom dimensions and border radius for the image container */
  size?: Pick<ViewStyle, 'borderRadius' | 'height' | 'width'>;

  /**- Duration of the fade-in transition when the image is loaded (in milliseconds) */
  transition?: number;

  /**- Called when the image is displayed (i.e., rendered on screen) */
  onDisplay?: () => void;

  /**- Called when the image fails to load */
  onError?: () => void;

  /**- Called when the image has been successfully loaded */
  onLoad?: () => void;

  /**- Called when the image finishes loading, regardless of success or error */
  onLoadEnd?: () => void;

  /**- Called right before the image starts loading */
  onLoadStart?: () => void;
}
