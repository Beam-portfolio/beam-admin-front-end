declare module 'react-lazy-load-image-component' {
  import { ComponentType, ImgHTMLAttributes } from 'react';

  export interface LazyLoadImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt?: string;
    effect?: 'blur' | 'opacity' | 'none';
    placeholderSrc?: string;
    threshold?: number;
    beforeLoad?: () => void;
    afterLoad?: () => void;
    wrapperClassName?: string;
    wrapperProps?: object;
    placeholderComponent?: ComponentType<any>;
  }

  const LazyLoadImage: ComponentType<LazyLoadImageProps>;
  export default LazyLoadImage;
}
