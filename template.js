const data = require('./data')

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
    return template
}

module.exports = {
    generateTrayTemplate
}