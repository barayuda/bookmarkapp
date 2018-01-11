// Root vue instance here
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow () {
  // buat ukuran aplikasi
  mainWindow = new BrowserWindow({ width: 800, height: 600, transparent: true, resizeable: false });
  // tampilkan main vue main html
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // set null klo mainWindow di close
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

// panggil createWindow setelah initial
app.on('ready', createWindow);

// panggil ini saat mainWindow di close
app.on('window-all-closed', function () {
  // check saat osx
  if ( process.platform !== 'darwin' ) {
    app.quit();
  }
})

// saat aplikasi running
app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});
