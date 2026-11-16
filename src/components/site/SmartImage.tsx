import { useEffect, useRef, useState, type ImgHTMLAttributes, type ReactNode } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string | undefined;
  alt: string;
  /** Rendered when there is no src or the file can't be loaded. */
  fallback: ReactNode;
};

/** <img> that swaps to a fallback when the asset file is missing — never a broken image icon. */
export function SmartImage({ src, alt, fallback, ...rest }: Props) {
  const [failed, setFailed] = useState(!src);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) return setFailed(true);
    setFailed(false);
    // An error that fired during SSR, before React hydrated, never reaches onError.
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (failed || !src) return <>{fallback}</>;
  return <img ref={ref} src={src} alt={alt} onError={() => setFailed(true)} {...rest} />;
}
