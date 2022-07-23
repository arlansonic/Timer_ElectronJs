const { ipcRenderer } = require('electron');
const timer = require('./timer')
const data = require('../../data')

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play')
let botaoAdicionar = document.querySelector('.botao-adicionar')
let campoAdicionar = document.querySelector('.campo-adicionar')
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
        new Notification('Alura Timer', {
            body: `Timer parado para ${curso.textContent}`,
            icon: 'img/stop-button.svg'
        })
    } else {
        timer.start(tempo)
        play = true
        new Notification('Alura Timer', {
            body: `O curso ${curso.textContent} foi iniciado!!!`,
            icon: 'img/play-button.svg'
        })
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

botaoAdicionar.addEventListener('click', () => {
    let novoCurso = campoAdicionar.value;
    curso.textContent = novoCurso;
    tempo.textContent = '00:00:00';
    campoAdicionar.textContent = '';
    ipcRenderer.send('curso-adicionado', novoCurso);
})

ipcRenderer.on('atalho-iniciar-e-parar', () => {
    console.log('Atalho Iniciar e Parar')
    let click = new MouseEvent('click')
    botaoPlay.dispatchEvent(click)
})