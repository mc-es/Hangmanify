import { Dimensions } from 'src/utils';

import type { VideoProps } from './types';

const InitialValues: Required<Omit<VideoProps, 'source'>> = {
  autoPlay: false,
  contentFit: 'contain',
  initialPosition: 0,
  loop: false,
  muted: false,
  shadow: 'lg',
  shouldPlayOnPress: false,
  showControls: false,
  thumbnail: { enabled: false, time: 1 },
  volume: 1,
  size: {
    borderRadius: 0,
    height: Dimensions.hp(50),
    width: Dimensions.wp(50),
  },
};

const mergeVideoProps = (
  props: Partial<VideoProps>
): Required<Omit<VideoProps, 'source'>> & Pick<VideoProps, 'source'> => {
  const { source, ...rest } = props;
  return { ...InitialValues, ...rest, source: source! };
};

export { InitialValues, mergeVideoProps };
