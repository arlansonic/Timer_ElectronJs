const data = require('./data')

const generateTrayTemplate = () => {
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
            type: 'radio'
        }
        template.push(menuItem)
    })
    return template
}

module.exports = {
    generateTrayTemplate
}