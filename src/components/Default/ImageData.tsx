import { Image } from '@chakra-ui/react';
import { Config } from '../../environment/config';
import './default.scss';

interface ImageProps {
  src: string;
  width?: string;
  height?: string;
  classField?: string;
  label?: string;
}
export const ImageData = ({
  src,
  width,
  height,
  classField,
  label,
}: ImageProps) => {
  return (
    <Image
      src={`${Config.baseApiUrl}/${src}`}
      w={width ? width : '50px'}
      h={height ? height : '50px'}
      className={classField ? classField : 'defaut-image_data'}
      aria-label={label ? label : ''}
    />
  );
};
