import { app, BrowserWindow, shell, Menu, net } from "electron";
import * as path from "path";

const isDev = process.env.NODE_ENV === "development";

// In dev: load local Next.js. In production: load live site.
const APP_URL = isDev
  ? "http://localhost:3000/tools"
  : "https://aisocialtools.co/tools";

const ALLOWED_ORIGIN = isDev ? "http://localhost:3000" : "https://aisocialtools.co";

let mainWindow: BrowserWindow | null = null;

/* ── Offline check page ── */
const OFFLINE_HTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>No Connection — AI Social Tools</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #09090b; color: #fafafa; display: flex; align-items: center;
      justify-content: center; height: 100vh; flex-direction: column; gap: 16px; }
    h1 { font-size: 20px; font-weight: 600; }
    p  { font-size: 14px; color: #a1a1aa; max-width: 320px; text-align: center; line-height: 1.6; }
    button { margin-top: 8px; padding: 10px 24px; background: #fff; color: #09090b;
      border: none; border-radius: 6px; font-size: 14px; font-weight: 500;
      cursor: pointer; }
    button:hover { background: #e4e4e7; }
  </style>
</head>
<body>
  <h1>No internet connection</h1>
  <p>AI Social Tools requires an internet connection to load. Please check your network and try again.</p>
  <button onclick="location.reload()">Try Again</button>
</body>
</html>`;

/* ── Build the application menu ── */
function buildMenu() {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: "AI Social Tools",
      submenu: [
        { label: "About AI Social Tools", role: "about" },
        { type: "separator" },
        { label: "Quit", accelerator: "CmdOrCtrl+Q", click: () => app.quit() },
      ],
    },
    {
      label: "Navigate",
      submenu: [
        {
          label: "All Tools",
          accelerator: "CmdOrCtrl+1",
          click: () => mainWindow?.loadURL(`${ALLOWED_ORIGIN}/tools`),
        },
        {
          label: "AI Directory",
          accelerator: "CmdOrCtrl+2",
          click: () => mainWindow?.loadURL(`${ALLOWED_ORIGIN}/ai-directory`),
        },
        { type: "separator" },
        {
          label: "Go Back",
          accelerator: "CmdOrCtrl+Left",
          click: () => mainWindow?.webContents.goBack(),
        },
        {
          label: "Go Forward",
          accelerator: "CmdOrCtrl+Right",
          click: () => mainWindow?.webContents.goForward(),
        },
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+R",
          click: () => mainWindow?.webContents.reload(),
        },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "togglefullscreen" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        ...(isDev ? [{ role: "toggleDevTools" as const }] : []),
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "selectAll" },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

/* ── Create the main window ── */
async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    title: "AI Social Tools",
    backgroundColor: "#09090b",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
    show: false,
    titleBarStyle: process.platform === "darwin" ? "hiddenInset" : "default",
  });

  buildMenu();

  // Check connectivity before loading
  const isOnline = net.isOnline();
  if (!isOnline) {
    mainWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(OFFLINE_HTML)}`);
  } else {
    await mainWindow.loadURL(APP_URL);
  }

  // Show window once ready — prevents white flash
  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
    mainWindow?.focus();
  });

  // Open any link outside our domain in the system browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith(ALLOWED_ORIGIN)) {
      shell.openExternal(url);
      return { action: "deny" };
    }
    return { action: "allow" };
  });

  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (!url.startsWith(ALLOWED_ORIGIN)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

/* ── App lifecycle ── */
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
