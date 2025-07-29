import React, { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Image as ExpoImage } from 'expo-image';

import { useTheme } from 'src/contexts';

import { mergeImageProps } from './initial';
import type { ImageProps } from './types';

/**
 * ### Custom Image component built on top of expo-image
 * @param {Readonly<ImageProps>} props - Image configuration and display options
 * @returns {React.JSX.Element} Rendered image with optional blurhash and loading indicator
 * @example
 * <Image
 *   source={require('./image.jpg')}
 *   blurRadius={5}
 *   cachePolicy="memory"
 *   contentFit="cover"
 * />
 */
const Image: React.FC<Readonly<ImageProps>> = (props): React.JSX.Element => {
  const {
    blurRadius,
    cachePolicy,
    contentFit,
    onDisplay,
    onError,
    onLoad,
    onLoadEnd,
    onLoadStart,
    shadow,
    size,
    source,
    transition,
  } = useMemo(() => mergeImageProps(props), [props]);

  const blurhash = 'LKN]Rv%2Tw=w]~RBVZRi};RPxuwH';
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <View
      className={shadow ? `shadow-${shadow}` : ''}
      style={[size, shadow && { shadowColor: theme.palette.shadow }]}
    >
      {isLoading && (
        <ActivityIndicator color={theme.global.color.primary} style={StyleSheet.absoluteFill} />
      )}
      <ExpoImage
        blurRadius={blurRadius}
        cachePolicy={cachePolicy}
        contentFit={contentFit}
        placeholder={{ blurhash }}
        source={source}
        style={size}
        transition={transition}
        onDisplay={() => {
          onDisplay?.();
        }}
        onError={() => {
          onError?.();
        }}
        onLoad={() => {
          onLoad?.();
        }}
        onLoadEnd={() => {
          setIsLoading(false);
          onLoadEnd?.();
        }}
        onLoadStart={() => {
          setIsLoading(true);
          onLoadStart?.();
        }}
      />
    </View>
  );
};

export default Image;
