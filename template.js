const data = require('./data')
const { ipcMain } = require('electron')

templateInicial: null
const generateTrayTemplate = (win) => {
    let template = [
        {
            label: 'Cursos'
        }, {
            type: 'separator'
        }
    ]

    // Adicionando novos cursos ao menu
    let cursos = data.getFileNameCursos()
    cursos.forEach((curso) => {
        let menuItem = {
            label: curso,
            type: 'radio',
            click: () => {
                win.send('curso-trocado', curso)
            }
        }
        template.push(menuItem)
    })
    // console.log('Template:', templateInicial)
    templateInicial = template
    return template
}

const adicionaCursoNoTray = (curso) => {
    templateInicial.push({
        label: curso,
        type: 'radio',
        click: () => {
            win.send('curso-trocado', curso)
        }
    })

    return templateInicial
}

const geraTemplateMenuPrincipal = (app) => {
    let templateMenu = [
        {
            label: 'View',
            submenu: [{
                role: 'reload'
            }, {
                role: 'toggledevtools'
            }]
        }, {
            label: 'window',
            submenu: [{
                role: 'minimize'
            }, {
                role: 'close'
            }]
        },
        {
            label: 'Sobre',
            submenu: [
                {
                    label: 'Sobre o Alura Timer',
                    click: () => {
                        ipcMain.emit('abrir-janela-sobre')
                    },
                    accelerator: 'CommandOrControl+I'
                }
            ]
        }]

    // Menu Somente para MAC OS

    if (process.plataform == 'darwin') {
        templateMenu.unshift({
            label: app.getName(),
            submenu: [{
                label: 'Rodando no MAC'
            }]
        })
    }

    return templateMenu

}

module.exports = {
    generateTrayTemplate, adicionaCursoNoTray, geraTemplateMenuPrincipal
}