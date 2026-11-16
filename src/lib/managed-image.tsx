import { createContext, useContext, useEffect, useMemo, useState, type ImgHTMLAttributes, type ReactNode, type VideoHTMLAttributes } from "react";

type Overrides = Record<string, string>;
const PhotoContext = createContext<Overrides>({});
const assetUrls = import.meta.glob("/src/assets/*.{jpg,jpeg,png,mp4}", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const slotName = (path: string) => path.split("/").pop()!.replace(/\.[^.]+$/, "");
export const photoSlots = Object.keys(assetUrls).filter((path) => /\.(jpg|jpeg|png)$/i.test(path)).map(slotName).sort();
export const videoSlots = Object.keys(assetUrls).filter((path) => /\.mp4$/i.test(path)).map(slotName).sort();
export const mediaSlots = [...photoSlots, ...videoSlots];

function resolveMedia(src: string | undefined, overrides: Overrides): string | undefined {
  if (!src) return src;
  const match = Object.entries(assetUrls).find(([, url]) => url === src);
  const slot = match && slotName(match[0]);
  return (slot && overrides[slot]) || src;
}

export function PhotoOverridesProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Overrides>({});
  useEffect(() => {
    fetch("/api/photos", { cache: "no-store" }).then((response) => response.ok ? response.json() : {}).then(setOverrides).catch(() => undefined);
  }, []);
  return <PhotoContext.Provider value={overrides}>{children}</PhotoContext.Provider>;
}

export function ManagedImage({ src, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const overrides = useContext(PhotoContext);
  const resolved = useMemo(() => resolveMedia(typeof src === "string" ? src : undefined, overrides), [src, overrides]);
  return <img src={resolved} {...props} />;
}

export function ManagedVideo({ src, poster, ...props }: VideoHTMLAttributes<HTMLVideoElement>) {
  const overrides = useContext(PhotoContext);
  const resolvedSrc = useMemo(() => resolveMedia(typeof src === "string" ? src : undefined, overrides), [src, overrides]);
  const resolvedPoster = useMemo(() => resolveMedia(typeof poster === "string" ? poster : undefined, overrides), [poster, overrides]);
  return <video src={resolvedSrc} poster={resolvedPoster} {...props} />;
}
