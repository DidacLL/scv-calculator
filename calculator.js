/*------------------------------------------------------------------ELEMENTS SELECTION */
const calculator = document.querySelector('.calculator')
const consoleOut = document.querySelector('.console')
const screen= {firstLine: document.querySelector('#first-line'), mainLine:document.querySelector('#main-line')}
// const numberPad=

const outputMessage= function(str) {
    const mssg= `</br> &gt; ${str}`
    consoleOut.insertAdjacentHTML("beforeend", mssg);
    consoleOut.scroll(0,consoleOut.scrollHeight)
}
calculator.addEventListener('click',()=>{outputMessage('hi!')},false)