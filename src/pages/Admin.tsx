import { useCallback, useEffect, useState, type FormEvent } from "react";
import { mediaSlots, videoSlots } from "@/lib/managed-image";

type Overrides = Record<string, string>;
const CHUNK_SIZE = 768 * 1024;

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return btoa(binary);
}

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
  const [uploadStage, setUploadStage] = useState<"uploading" | "publishing" | null>(null);
  const isVideo = videoSlots.includes(slot);

  const loadOverrides = useCallback(async () => {
    try {
      const response = await fetch("/api/photos", { cache: "no-store", credentials: "include" });
      if (response.ok) setOverrides(await response.json());
    } catch {
      // Replacements are optional for signing in; the manager remains usable.
    }
  }, []);

  const refresh = useCallback(async () => {
    let isAuthenticated = false;
    try {
      const authResponse = await fetch("/api/admin/login", {
        credentials: "include",
        signal: AbortSignal.timeout(5000),
      });
      const auth = authResponse.ok ? await authResponse.json() : { authenticated: false };
      isAuthenticated = Boolean(auth.authenticated);
      setAuthenticated(isAuthenticated);
    } catch {
      // If the auth endpoint is unavailable, still let the administrator enter
      // a password and see the server's actionable error on submit.
      setAuthenticated(false);
    } finally {
      setChecking(false);
    }
    if (isAuthenticated) await loadOverrides();
  }, [loadOverrides]);
  useEffect(() => { void refresh(); }, [refresh]);

  const login = async (event: FormEvent) => {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not sign in");
      setPassword("");
      setAuthenticated(Boolean(result.authenticated));
      setChecking(false);
      await loadOverrides();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not sign in"); }
    finally { setBusy(false); }
  };

  const upload = async () => {
    if (!file || busy) return;
    const maxSize = isVideo ? 500 * 1024 * 1024 : 4 * 1024 * 1024;
    if (file.size > maxSize) { setMessage(`File is too large. Maximum size is ${isVideo ? "500 MB" : "4 MB"}.`); return; }
    const allowedTypes = isVideo ? ["video/mp4"] : ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) { setMessage(`Choose a supported ${isVideo ? "MP4 video" : "photo file"}.`); return; }
    setBusy(true); setMessage("");
    setProgress(0); setUploadStage("uploading");
    try {
      const startResponse = await fetch("/api/photos", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "start",
          slot,
          kind: isVideo ? "video" : "image",
          contentType: file.type,
          size: file.size,
        }),
      });
      const startResult = await startResponse.json();
      if (!startResponse.ok) throw new Error(startResult.error || "Could not start upload");

      const chunkCount = Math.ceil(file.size / CHUNK_SIZE);
      for (let index = 0; index < chunkCount; index += 1) {
        const chunk = new Uint8Array(await file.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE).arrayBuffer());
        const chunkResponse = await fetch("/api/photos", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "chunk",
            uploadId: startResult.uploadId,
            index,
            data: toBase64(chunk),
          }),
        });
        const chunkResult = await chunkResponse.json();
        if (!chunkResponse.ok) throw new Error(chunkResult.error || `Could not upload chunk ${index + 1}`);
        setProgress(Math.round(((index + 1) / chunkCount) * 100));
      }

      setUploadStage("publishing");
      const publishResponse = await fetch("/api/photos", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "complete", uploadId: startResult.uploadId }),
      });
      const publishResult = await publishResponse.json();
      if (!publishResponse.ok) throw new Error(publishResult.error || "Upload completed, but publishing failed");
      setOverrides((current) => ({ ...current, [slot]: publishResult.url })); setFile(null);
      const input = document.getElementById("media-file") as HTMLInputElement | null; if (input) input.value = "";
      setMessage(`${isVideo ? "Video" : "Photo"} updated. Refresh the public site to see the replacement.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed");
      setProgress(0);
    } finally { setBusy(false); setUploadStage(null); }
  };

  const remove = async (mediaSlot: string) => {
    if (busy || !window.confirm(`Remove the replacement for "${mediaSlot.replaceAll("-", " ")}" and restore the original media?`)) return;
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/photos", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove", slot: mediaSlot }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not remove replacement");
      setOverrides((current) => {
        const next = { ...current };
        delete next[mediaSlot];
        return next;
      });
      setMessage(`Replacement removed. The original ${videoSlots.includes(mediaSlot) ? "video" : "photo"} is restored.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not remove replacement");
    } finally { setBusy(false); }
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
        <form onSubmit={(event) => event.preventDefault()} className="rounded-xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="mb-2 text-xl">Replace a site photo or video</h2><p className="mb-6 text-sm text-stone-400">Choose a media location and upload a JPEG, PNG, WebP, GIF, or MP4 replacement. Photos can be up to 4 MB; videos can be up to 500 MB. Files are sent as base64 chunks and saved in PostgreSQL.</p>
          <label htmlFor="slot" className="mb-2 block text-sm text-stone-300">Media location</label>
          <select id="slot" value={slot} onChange={(event) => { setSlot(event.target.value); setFile(null); }} className="mb-5 w-full rounded-md border border-stone-700 bg-stone-950 px-3 py-2">{mediaSlots.map((item) => <option key={item} value={item}>{item.replaceAll("-", " ")} ({videoSlots.includes(item) ? "video" : "photo"})</option>)}</select>
          <label htmlFor="media-file" className="mb-2 block text-sm text-stone-300">New {isVideo ? "video" : "photo"}</label>
          <input id="media-file" type="file" accept={isVideo ? "video/mp4" : "image/jpeg,image/png,image/webp,image/gif"} required onChange={(event) => setFile(event.target.files?.[0] ?? null)} className="mb-6 block w-full text-sm text-stone-300 file:mr-4 file:rounded-md file:border-0 file:bg-stone-700 file:px-4 file:py-2 file:text-stone-100" />
          <button type="button" onClick={() => void upload()} disabled={busy || !file} className="rounded-md bg-amber-500 px-5 py-2 font-medium text-stone-950 disabled:opacity-60">{busy ? uploadStage === "publishing" ? "Publishing…" : `Uploading ${progress}%…` : "Upload and publish"}</button>
          {message && <p role="status" className="mt-4 text-sm text-amber-200">{message}</p>}
        </form>
        <section><h2 className="mb-4 text-xl">Current replacements</h2><div className="grid grid-cols-2 gap-3">{Object.entries(overrides).length ? Object.entries(overrides).map(([key, url]) => <article key={key} className="overflow-hidden rounded-lg border border-stone-800 bg-stone-900">{videoSlots.includes(key) ? <video src={url} controls className="aspect-square w-full object-cover" /> : <img src={url} alt={key.replaceAll("-", " ")} className="aspect-square w-full object-cover" />}<div className="flex items-center justify-between gap-2 p-3"><p className="text-sm capitalize">{key.replaceAll("-", " ")}</p><button type="button" disabled={busy} onClick={() => void remove(key)} className="text-xs text-rose-300 underline disabled:opacity-60">Remove</button></div></article>) : <p className="text-sm text-stone-400">No media replaced yet.</p>}</div></section>
      </div>}
    </div>
  </main>;
}
