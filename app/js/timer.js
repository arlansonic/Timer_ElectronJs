const { ipcRenderer } = require('electron');
const moment = require('moment');
let segundos
let timer
let tempo 

const secondsToTime = (segundos) => {
    return moment().startOf('day').seconds(segundos).format('HH:mm:ss')
}

const start = (el) => {
    tempo = moment.duration(el.textContent)
    segundos = tempo.asSeconds()    
    // Limpando ID do SetInterval a cada Play dado no botão Start
    clearInterval(timer)
    timer = setInterval(() => {
        segundos++
        el.textContent = secondsToTime(segundos)
    }, 1000)
}

const stop = (curso) => {
    clearInterval(timer)    
    let tempoEstudado = secondsToTime(segundos)
    ipcRenderer.send('curso-stop', curso, tempoEstudado)
}

module.exports = { start, stop }