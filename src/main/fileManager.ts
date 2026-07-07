import fs from 'fs'
import path from 'path'
import os from 'os'
import axios from 'axios'
import AdmZip from 'adm-zip'

const appData = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming')
export const defaultTargetFolder = path.join(appData, 'Citizen', 'FiveM', 'mods')

export async function downloadModZip(url: string, destPath: string): Promise<string> {
  const response = await axios.get(url, { responseType: 'arraybuffer' })
  await fs.promises.writeFile(destPath, response.data)
  return destPath
}

export async function extractZip(zipPath: string, targetFolder: string): Promise<void> {
  const zip = new AdmZip(zipPath)
  zip.extractAllTo(targetFolder, true)
}

export async function ensureDir(folder: string): Promise<void> {
  await fs.promises.mkdir(folder, { recursive: true })
}

export async function backupFolder(sourceFolder: string): Promise<string> {
  const backupRoot = path.join(path.dirname(sourceFolder), `backup-${Date.now()}`)
  await ensureDir(backupRoot)
  const backupPath = path.join(backupRoot, path.basename(sourceFolder))
  await fs.promises.cp(sourceFolder, backupPath, { recursive: true })
  return backupPath
}

export async function installModFromZip(url: string, targetFolder = defaultTargetFolder): Promise<{ backupPath: string; installedPath: string }> {
  const tempFolder = path.join(os.tmpdir(), 'lume-mods', `${Date.now()}`)
  const zipPath = path.join(tempFolder, 'mod.zip')
  const extractFolder = path.join(tempFolder, 'extracted')
  await ensureDir(extractFolder)

  const backupPath = await backupFolder(targetFolder).catch(() => '')
  await downloadModZip(url, zipPath)
  await extractZip(zipPath, extractFolder)
  await ensureDir(targetFolder)
  await fs.promises.cp(extractFolder, targetFolder, { recursive: true })

  return {
    backupPath,
    installedPath: targetFolder
  }
}

export async function listLocalModBackups(): Promise<Array<{ name: string; path: string; modified: string }>> {
  const parent = path.dirname(defaultTargetFolder)
  const items = await fs.promises.readdir(parent, { withFileTypes: true })
  const backupDirs = items.filter((item) => item.isDirectory() && item.name.startsWith('backup-'))
  const backups = await Promise.all(
    backupDirs.map(async (dir) => {
      const stat = await fs.promises.stat(path.join(parent, dir.name))
      return {
        name: dir.name,
        path: path.join(parent, dir.name),
        modified: stat.mtime.toISOString()
      }
    })
  )
  return backups
}
