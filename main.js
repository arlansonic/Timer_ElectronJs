const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data');
const templateGenerator = require('./template')

let tray = null
app.on('ready', () => {
    console.log('Aplicacao Iniciada')
    // Icone barra de Tarefas
    tray = new Tray('./app/img/icon-tray.png')
    let template = templateGenerator.generateTrayTemplate(mainWindow)
    let trayMenu = Menu.buildFromTemplate(template)
    tray.setContextMenu(trayMenu)
})

let mainWindow = null
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
})

app.on('window-all-closed', () => {
    app.quit()
})

// Abrindo tela de Sobre

let = sobreWindow = null
ipcMain.on('abrir-janela-sobre', () => {
    // Impedir que abra mais de uma janela
    if (sobreWindow == null) {
        sobreWindow = new BrowserWindow({
            width: 300,
            height: 200,
            alwaysOnTop: true,
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
            }
        })
        // Não deixar o javascript destruir a janela sobre
        sobreWindow.on('closed', () => {
            sobreWindow = null
        })
    }
    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
})

// Fechar o Sobre
ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close()
})

// 
ipcMain.on('curso-stop', (event, curso, tempoEstudado) => {
    console.log(`O Curso ${curso} foi estudado por ${tempoEstudado}`)
    // Salvar Arquivo
    data.saveData(curso, tempoEstudado)
})

ipcMain.on('curso-adicionado', (event, novoCurso) => {
    let novoTemplate = templateGenerator.adicionaCursoNoTray(novoCurso, mainWindow)
    let novoTrayMenu = Menu.buildFromTemplate(novoTemplate)
    tray.setContextMenu(novoTrayMenu)
});