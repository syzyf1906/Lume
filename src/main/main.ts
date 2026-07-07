import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import si from 'systeminformation'

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

  win.loadFile(path.join(__dirname, '../renderer/index.html'))
}

// IPC handler to expose system stats to renderer
ipcMain.handle('get-stats', async () => {
  try {
    const cpu = await si.currentLoad()
    const mem = await si.mem()
    return {
      cpu: Math.round(cpu.currentLoad) + '%',
      ram: (mem.active / 1024 / 1024 / 1024).toFixed(1) + ' GB'
    }
  } catch (e) {
    return { cpu: '—', ram: '—' }
  }
})

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
