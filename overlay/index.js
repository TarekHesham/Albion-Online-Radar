const { app, BrowserWindow } = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 408,
        height: 408,
        x: 50,
        y: 150,
        alwaysOnTop: true,
        frame: false,
        transparent: true,
        resizable: false,
        hasShadow: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadURL('http://localhost:5001');

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        mainWindow.loadURL(url);
        mainWindow.setIgnoreMouseEvents(true, { forward: true });
        return { action: 'deny' };
    });
});

app.on('window-all-closed', () => {
    app.quit();
});