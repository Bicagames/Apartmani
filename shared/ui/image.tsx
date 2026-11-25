import { getImageProps, type ImageProps } from "next/image";
import { preload as preloadAsset } from "react-dom";

type AppImageProps = ImageProps;

/**
 * Server-rendered image. `getImageProps` produces the same optimized
 * `src` / `srcSet` / `sizes` as `next/image`, without the client component
 * (blur state, load effects) that component always ships.
 */
export const getAppImageProps = (props: AppImageProps) => {
  const imgProps = getImageProps(props).props;
  // Drop undefined style fields (fill sets objectFit/objectPosition only when
  // passed). Undefined values cannot cross the server → client boundary.
  if (imgProps.style) {
    const style = Object.fromEntries(
      Object.entries(imgProps.style).filter(([, value]) => value !== undefined),
    );
    imgProps.style = style;
  }
  return imgProps;
};

export type AppImageElementProps = ReturnType<typeof getAppImageProps>;

export const AppImage = ({ preload, ...props }: AppImageProps) => {
  const imgProps = getAppImageProps({ ...props, preload });

  // `preload()` dedupes. A `<link>` in the tree was emitted twice (hoisted and in place).
  if (preload && imgProps.src) {
    preloadAsset(imgProps.src, {
      as: "image",
      imageSrcSet: imgProps.srcSet,
      imageSizes: imgProps.sizes,
      fetchPriority: imgProps.fetchPriority,
    });
  }

  // Optimized attributes come from getImageProps; a native img stays server-rendered.
  // alt is repeated so the JSX a11y check can see it (the rest is a spread).
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...imgProps} alt={imgProps.alt ?? ""} />;
};
