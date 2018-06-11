//Déclaration des elements de Electron nécessaires
const {app, BrowserWindow} = require('electron')

//Garde une référence globale à l'objet Windows, il restera dispnible après le passage au Garbage Collector
let win

//Fonction d'affichage d'une fenêtre
function createWindow()
{
    //Création d'une BrowserWindow (fenêtre basique de Electron)
    win = new BrowserWindow({width: 800, height: 600})

    //Chargement du fichier index.html
    win.loadFile('index.html')

    //Ouvre les dev tools
    win.webContents.openDevTools()

    //Evenement lors de la fermeture de la fenêtre
    win.on('close', () => {
        //Dé-référence l'objet Window.
        win = null
    })
}

//Evenement à la fin de l'initialisation de Electron
app.on('ready', createWindow)

//Evenement lorsque toutes les fenêtres sont fermées
app.on('window-all-closed', () => {
    //Si macOS, en général, on ne ferme pas l'application même si il n'y à plus de fenêtre enfant
    if (process.platform !== 'darwin')
    {
        app.quit()
    }
})
//Evenement lors de l'ouverture de l'application
app.on('activate', () => {
    //Ouvre une feneêtre si aucune d'ouverte
    if (win === null)
    {
        createWindow()
    }
})
