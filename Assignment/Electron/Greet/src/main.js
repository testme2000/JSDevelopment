const elect = require("electron");
const verify = require('./countsupport');


const newapp = elect.app;
const UIWindow = elect.BrowserWindow;
const interprocess = elect.ipcMain;

let primewindow;

newapp.on('ready', _ => {
    primewindow = new UIWindow({
        height: 500,
        width: 600
    });

    primewindow.loadURL(`file://${__dirname}/Count.html`);

    verify();

    primewindow.on('closed', _ => {
        console.log("Window is closed");
        primewindow = null;
    })
})


interprocess.on('counting-begin', _ => {
    console.log("Counting started");

})
