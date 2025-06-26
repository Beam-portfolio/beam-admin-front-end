import { forwardRef } from 'react';
import NextImage from 'next/image';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
//
import { getRatio } from './utils';
import { ImageProps } from './types';

// ----------------------------------------------------------------------

const Image = forwardRef<HTMLSpanElement, ImageProps>(
  (
    {
      ratio,
      overlay,
      disabledEffect = false,
      //
      alt,
      src,
      afterLoad,
      delayTime,
      threshold,
      beforeLoad,
      delayMethod,
      placeholder,
      wrapperProps,
      scrollPosition,
      effect = 'blur',
      visibleByDefault,
      wrapperClassName,
      useIntersectionObserver,
      sx,
      ...other
    },
    ref
  ) => {
    const theme = useTheme();

    const overlayStyles = !!overlay && {
      '&:before': {
        content: "''",
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        zIndex: 1,
        position: 'absolute',
        background: overlay || alpha(theme.palette.grey[900], 0.48),
      },
    };

    return (
      <Box
        ref={ref}
        component="span"
        className="component-image"
        sx={{
          overflow: 'hidden',
          position: 'relative',
          verticalAlign: 'bottom',
          display: 'inline-block',
          width: '28%',
          // Apply 70% width for mobile devices
          '@media (max-width:600px)': {
            width: '80%', // For mobile screens, width will be 70%
          },
          ...(!!ratio && {
            width: '28%', // Keep the width as 28% for larger screens
          }),
          '& span.component-image-wrapper': {
            width: 1,
            height: 1,
            verticalAlign: 'bottom',
            backgroundSize: 'cover !important',
            ...(!!ratio && {
              pt: getRatio(ratio),
            }),
          },
          ...overlayStyles,
          ...sx,
        }}
        {...other}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <NextImage
            alt={alt || ''}
            src={src || ''}
            fill
            priority={!disabledEffect}
            quality={80}
            sizes="(max-width: 600px) 80%, 28%"
            style={{
              objectFit: 'cover',
              ...(!!ratio && {
                position: 'absolute',
                height: '100%',
                width: '100%',
                top: 0,
                left: 0,
              }),
            }}
            onLoadingComplete={afterLoad}
          />
        </div>
      </Box>
    );
  }
);

export default Image;
