import { useEffect, useState, type FormEvent } from "react";
import { upload as uploadToBlob } from "@vercel/blob/client";
import { mediaSlots, videoSlots } from "@/lib/managed-image";

type Overrides = Record<string, string>;

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [slot, setSlot] = useState(mediaSlots[0] ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [overrides, setOverrides] = useState<Overrides>({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const isVideo = videoSlots.includes(slot);

  const refresh = async () => {
    const [authResponse, photoResponse] = await Promise.all([fetch("/api/admin/login"), fetch("/api/photos", { cache: "no-store" })]);
    setAuthenticated(authResponse.ok && (await authResponse.json()).authenticated);
    if (photoResponse.ok) setOverrides(await photoResponse.json());
    setChecking(false);
  };
  useEffect(() => { refresh().catch(() => setChecking(false)); }, []);

  const login = async (event: FormEvent) => {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not sign in");
      setPassword(""); await refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not sign in"); }
    finally { setBusy(false); }
  };

  const upload = async (event: FormEvent) => {
    event.preventDefault(); if (!file) return;
    const maxSize = isVideo ? 500 * 1024 * 1024 : 4 * 1024 * 1024;
    if (file.size > maxSize) { setMessage(`File is too large. Maximum size is ${isVideo ? "500 MB" : "4 MB"}.`); return; }
    const allowedTypes = isVideo ? ["video/mp4"] : ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) { setMessage(`Choose a supported ${isVideo ? "MP4 video" : "photo file"}.`); return; }
    const extension = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
    setBusy(true); setMessage("");
    try {
      const result = await uploadToBlob(`photo-overrides/${slot}.${extension}`, file, {
        access: "public",
        handleUploadUrl: "/api/photos",
        clientPayload: JSON.stringify({ slot, kind: isVideo ? "video" : "image" }),
        multipart: isVideo,
        onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage)),
      });
      setOverrides((current) => ({ ...current, [slot]: `${result.url}?v=${Date.now()}` })); setFile(null); setProgress(0);
      const input = document.getElementById("media-file") as HTMLInputElement | null; if (input) input.value = "";
      setMessage(`${isVideo ? "Video" : "Photo"} updated. Refresh the public site to see the replacement.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Upload failed"); }
    finally { setBusy(false); }
  };

  if (checking) return <main className="min-h-screen grid place-items-center bg-stone-950 text-stone-100">Loading admin…</main>;
  return <main className="min-h-screen bg-stone-950 px-5 py-12 text-stone-100">
    <div className="mx-auto max-w-5xl">
      <header className="mb-10 flex items-center justify-between border-b border-stone-800 pb-6">
        <div><p className="text-xs uppercase tracking-[0.3em] text-amber-400">Tuljaram Saraf</p><h1 className="mt-2 text-3xl font-serif">Media manager</h1></div>
        {authenticated && <button className="text-sm text-stone-300 underline" onClick={async () => { await fetch("/api/admin/login", { method: "DELETE" }); setAuthenticated(false); }}>Sign out</button>}
      </header>
      {!authenticated ? <form onSubmit={login} className="max-w-md rounded-xl border border-stone-800 bg-stone-900 p-6">
        <h2 className="mb-5 text-xl">Admin sign in</h2>
        <label className="mb-2 block text-sm text-stone-300" htmlFor="password">Admin password</label>
        <input id="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mb-4 w-full rounded-md border border-stone-700 bg-stone-950 px-3 py-2" />
        <button disabled={busy} className="rounded-md bg-amber-500 px-5 py-2 font-medium text-stone-950 disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
      </form> : <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.8fr)]">
        <form onSubmit={upload} className="rounded-xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="mb-2 text-xl">Replace a site photo or video</h2><p className="mb-6 text-sm text-stone-400">Choose a media location and upload a JPEG, PNG, WebP, GIF, or MP4 replacement. Photos can be up to 4 MB; videos can be up to 500 MB.</p>
          <label htmlFor="slot" className="mb-2 block text-sm text-stone-300">Media location</label>
          <select id="slot" value={slot} onChange={(event) => { setSlot(event.target.value); setFile(null); }} className="mb-5 w-full rounded-md border border-stone-700 bg-stone-950 px-3 py-2">{mediaSlots.map((item) => <option key={item} value={item}>{item.replaceAll("-", " ")} ({videoSlots.includes(item) ? "video" : "photo"})</option>)}</select>
          <label htmlFor="media-file" className="mb-2 block text-sm text-stone-300">New {isVideo ? "video" : "photo"}</label>
          <input id="media-file" type="file" accept={isVideo ? "video/mp4" : "image/jpeg,image/png,image/webp,image/gif"} required onChange={(event) => setFile(event.target.files?.[0] ?? null)} className="mb-6 block w-full text-sm text-stone-300 file:mr-4 file:rounded-md file:border-0 file:bg-stone-700 file:px-4 file:py-2 file:text-stone-100" />
          <button disabled={busy || !file} className="rounded-md bg-amber-500 px-5 py-2 font-medium text-stone-950 disabled:opacity-60">{busy ? `Uploading ${progress}%…` : "Upload and publish"}</button>
          {message && <p role="status" className="mt-4 text-sm text-amber-200">{message}</p>}
        </form>
        <section><h2 className="mb-4 text-xl">Current replacements</h2><div className="grid grid-cols-2 gap-3">{Object.entries(overrides).length ? Object.entries(overrides).map(([key, url]) => <article key={key} className="overflow-hidden rounded-lg border border-stone-800 bg-stone-900">{videoSlots.includes(key) ? <video src={url} controls className="aspect-square w-full object-cover" /> : <img src={url} alt={key.replaceAll("-", " ")} className="aspect-square w-full object-cover" />}<p className="p-3 text-sm capitalize">{key.replaceAll("-", " ")}</p></article>) : <p className="text-sm text-stone-400">No media replaced yet.</p>}</div></section>
      </div>}
    </div>
  </main>;
}
