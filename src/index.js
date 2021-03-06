const {app, BrowserWindow, shell, Menu} = require('electron');
const path = require('path');

const fs = require('fs');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

let menuTemplate = [
    {
        label: "Window Manager",
        submenu: [
            {label: "create New"}
        ]
    },
    {
        label: "View",
        submenu: [
            {role: "reload"},
            {label: "custom reload"}
        ]
    }
];

const createWindow = () => {

    let config = JSON.parse(fs.readFileSync(path.join(__dirname, '../appconf.json'), 'utf8'));
    console.log(config);
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: config.windowWidth,
        height: config.windowHeight,
        webPreferences: {
            nodeIntegration: true
        },
        title: config.windowTitle
    });

    if (config.openExternal) {
        mainWindow.webContents.on("new-window", function (event, externalUrl) {
            event.preventDefault();
            shell.openExternal(externalUrl).then(r => {
                console.log(r);
            });
        });
    }

    // and load the index.html of the app.
    // mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.loadURL(config.url);

    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
