const data = require('./data')

templateInicial : null
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

module.exports = {
    generateTrayTemplate, adicionaCursoNoTray
}