import electron, { BrowserWindow, ipcMain } from 'electron';
import Ffmpeg from 'fluent-ffmpeg';

const { app } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow();
    mainWindow.loadFile('./index.html');
});

ipcMain.on('video-submit', (event, { path }) => {
    Ffmpeg.ffprobe(path, (err, metadata) => {
        const videoDuration = metadata.format.duration;
        mainWindow.webContents.send('video-metadata', { videoDuration });
    });
});
