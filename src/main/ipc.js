import { ipcMain, dialog } from 'electron'
import { createTray, destroyTray } from './tray'
import base64Img from 'base64-img'

import { mainWindow } from './window'
import * as types from '../shared/event-types'

ipcMain.on(types.AVATAR_REQUIRE, event => {
  dialog.showOpenDialog(
    {
      window: mainWindow,
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif', 'jpeg'] }]
    },
    file => {
      if (file) {
        const code = base64Img.base64Sync(file[0])
        event.sender.send(types.AVATAR_RESPONSE, code)
      }
    }
  )
})

ipcMain.on('put-in-tray', event => {
  createTray()
})

ipcMain.on('remove-tray', event => {
  destroyTray()
})
