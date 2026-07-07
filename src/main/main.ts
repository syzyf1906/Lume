import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import os from 'os'
import si from 'systeminformation'
import { installModFromZip, defaultTargetFolder, listLocalModBackups } from './fileManager'

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
    const disk = await si.fsSize()
    return {
      cpu: Math.round(cpu.currentLoad) + '%',
      ram: (mem.active / 1024 / 1024 / 1024).toFixed(1) + ' GB',
      disk: disk[0] ? `${Math.round(disk[0].use)}%` : '—',
      platform: os.platform()
    }
  } catch (e) {
    return { cpu: '—', ram: '—', disk: '—', platform: os.platform() }
  }
})

ipcMain.handle('mods:list-backups', async () => {
  try {
    const backups = await listLocalModBackups()
    return { success: true, backups }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
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

// IPC handler to install a mod zip via fileManager
ipcMain.handle('mods:install', async (_, url: string, targetFolder?: string) => {
  try {
    const result = await installModFromZip(url, targetFolder || defaultTargetFolder)
    return { success: true, result }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
})

// Example IPC handler (safe via preload)
ipcMain.handle('example:ping', async () => {
  return 'pong'
})
