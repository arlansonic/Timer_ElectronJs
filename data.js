const jsonfile = require('jsonfile')
const fs = require('fs')

const addTimeToCourse = async (PathCourse, tempoEstudado) => {
    let dados = {
        ultimoTempo: new Date().toString(),
        tempo: tempoEstudado
    }

    try {
        await jsonfile.writeFile(PathCourse, dados, { spaces: 2 })
        console.log('Tempo Salvo com Sucesso')
    } catch (err) {
        console.log(err)
    }
}

const createCourseFile = async (fileName, contentFile) => {
    try {
        await jsonfile.writeFile(fileName, contentFile)
        console.log('Arquivo Criado com Sucesso')
    } catch (err) {
        console.log(err)
    }
}

const saveData = (curso, tempoEstudado) => {
    let PathCourse = `./data/${curso}.json`
    if (fs.existsSync(PathCourse)) {
        // Salvar os Dados
        addTimeToCourse(PathCourse, tempoEstudado)
    } else {
        createCourseFile(PathCourse, {})
        addTimeToCourse(PathCourse, tempoEstudado)
    }
}

const getData = (curso) => {
    let PathCourse = `./data/${curso}.json`
    return jsonfile.readFile(PathCourse)
}

const getFileNameCursos = () => {
    let files = fs.readdirSync('./data')
    let cursos = files.map((file) => {
        return file.replace('.json', '')
    })
    return cursos
}

module.exports = {
    createCourseFile, saveData, getData, getFileNameCursos
}