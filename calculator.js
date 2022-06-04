/*------------------------------------------------------------------ELEMENTS SELECTION */
const calculator = document.querySelector('.calculator');
const consoleOut = document.querySelector('.console');
const screen= {
    firstLine: document.querySelector('#first-line'),
    mainLine:document.querySelector('#main-line')
};
// let numberPad = document.querySelectorAll('.num-btns')
const numberPad=[];
for (let i=0; i<10;i++){
    let str='#\\3'+i+'-btn'
    numberPad.push(document.querySelector(str));
    numberPad[i].addEventListener('click',()=>{outputMessage(i+' pressed')});
}

/*------------------------------------------------------------------ INPUT ASSIGNMENT */
document.addEventListener("keyup",function (e){
    e.preventDefault();
    switch (e.key){
        case 'Enter': outputMessage('Enter press!')

            break
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            const num= parseInt(e.key,10);
            numberPad[num].className='numpress';
            numberPad[num].click();
            setTimeout(()=>{

                numberPad[num].className='button';
            },300)
            break
        default:
            break
    }
})
/*----------------------------------------------------------------------------------FUNCTIONS */
const outputMessage= function(str) {
    const mssg= `</br> &gt; ${str}`
    consoleOut.insertAdjacentHTML("beforeend", mssg);
    consoleOut.scroll(0,consoleOut.scrollHeight);
}




/*----------------------------------------------------------------------------------LISTENERS */
// calculator.addEventListener('click',()=>{outputMessage('hi!')},false)