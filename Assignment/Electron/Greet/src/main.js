const elect = require("electron");

const newapp = elect.app;
const UIWindow = elect.BrowserWindow;

let primewindow;

newapp.on('ready', _ => {
    primewindow = new UIWindow({
        height: 500,
        width: 600
    });

    primewindow.loadURL(`file://${__dirname}/Count.html`);

    primewindow.on('closed', _ => {
        console.log("Window is closed");
        primewindow = null;
    })
})

