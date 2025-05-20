import { dimensions } from 'src/utils';

import type { VideoProps } from './types';

const defaultValues: Required<Omit<VideoProps, 'source'>> = {
  autoPlay: false,
  contentFit: 'contain',
  initialPosition: 0,
  loop: false,
  muted: false,
  shadow: 'none',
  shouldPlayOnPress: false,
  showControls: false,
  thumbnail: { enabled: false, time: 1 },
  volume: 1,
  size: {
    borderRadius: 0,
    height: dimensions.hp(50),
    width: dimensions.wp(50),
  },
};

const mergeVideoProps = (
  props: Partial<VideoProps>
): Required<Omit<VideoProps, 'source'>> & Pick<VideoProps, 'source'> => {
  const { source, ...rest } = props;
  return { ...defaultValues, ...rest, source: source! };
};

export { mergeVideoProps };
