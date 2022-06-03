

const calculator = document.querySelector('.calculator')
const consoleOut = document.querySelector('.console')

function outputMessage() {
    consoleOut.insertAdjacentHTML("beforeend", '</br> &gt; I am a message');
    consoleOut.scroll(0,consoleOut.scrollHeight)
}

document.addEventListener('click',outputMessage)