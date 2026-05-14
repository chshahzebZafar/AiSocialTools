import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  platform: process.platform,
  onNavigate: (callback: (path: string) => void) =>
    ipcRenderer.on("navigate", (_event, path) => callback(path)),
});
