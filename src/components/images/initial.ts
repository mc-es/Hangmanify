import { dimensions } from 'src/utils';

import type { ImageProps } from './types';

const defaultValues: Required<Omit<ImageProps, 'source'>> = {
  blurRadius: 0,
  cachePolicy: 'disk',
  contentFit: 'contain',
  shadow: 'none',
  transition: 300,
  onDisplay: () => {},
  onError: () => {},
  onLoad: () => {},
  onLoadEnd: () => {},
  onLoadStart: () => {},
  size: {
    borderRadius: 0,
    height: dimensions.hp(50),
    width: dimensions.wp(50),
  },
};

/**
 * ### Merges incoming image props with default values
 * @param {Partial<ImageProps>} props - Partial image props including at least a `source`
 * @returns {Required<Omit<ImageProps, 'source'>> & Pick<ImageProps, 'source'>} Complete image props with defaults applied
 * @example
 * const finalProps = mergeImageProps({ source: imageUri, blurRadius: 5 });
 */
const mergeImageProps = (
  props: Partial<ImageProps>
): Required<Omit<ImageProps, 'source'>> & Pick<ImageProps, 'source'> => {
  const { source, ...rest } = props;
  return { ...defaultValues, ...rest, source: source! };
};

export { mergeImageProps };
