import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  const isDev = process.env.NODE_ENV !== 'production'
  if (isDev) {
    win.loadURL('http://localhost:5173')
    win.webContents.openDevTools()
  } else {
    const indexPath = path.join(app.getAppPath(), 'dist', 'renderer', 'index.html')
    win.loadFile(indexPath)
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Example IPC handler (safe via preload)
ipcMain.handle('example:ping', async () => {
  return 'pong'
})
