const { ipcRenderer, shell } = require('electron');
    const process = require('process');

let linkFechar = document.querySelector("#link-fechar");
let linkGitHub = document.querySelector("#link-github");
let versaoElectron = document.querySelector('#versao-electron');

window.onload = function(){
    versaoElectron.textContent = process.versions.electron;
}

linkFechar.addEventListener('click', () => {
    ipcRenderer.send('fechar-janela-sobre');
})

linkGitHub.addEventListener('click', () => {
    shell.openExternal("https://github.com/arlansonic");
})
