const { ipcRenderer } = require('electron');
const timer = require('./timer')
const data = require('../../data')

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play')
let tempo = document.querySelector('.tempo')
let curso = document.querySelector('.curso')

window.onload = async () => {
    data.getData(curso.textContent)
    let dados = await data.getData(curso.textContent)
    tempo.textContent = dados.tempo
}

linkSobre.addEventListener('click', () => {
    ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg']
let play = false
botaoPlay.addEventListener('click', () => {
    if (play) {
        timer.stop(curso.textContent)
        play = false
    } else {
        timer.start(tempo)
        play = true
    }
    imgs = imgs.reverse()
    botaoPlay.src = imgs[0]
})

ipcRenderer.on('curso-trocado', async (event, nomeCurso) => {
    data.getData(nomeCurso)
    let dados = await data.getData(nomeCurso)
    tempo.textContent = dados.tempo
    curso.textContent = nomeCurso
})