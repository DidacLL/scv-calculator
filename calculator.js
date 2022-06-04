/*------------------------------------------------------------------GLOBAL*/
const maxAnsVal=999999999999999999;
const maxVal=999999999;
let ansVal='';
let currentInput='';
const currentOperation={
    firstOperand:null,
    operator:null,
    secondOperand:null,
    isReady:false,
    result: null,
    sendOperator:function (op){
        if(parseInt(currentInput)<=maxVal){
            if (this.operator === null) {
                if (this.firstOperand === null && currentInput !== "") {
                    this.sendNewInput(currentInput, op);
                    currentInput = '';
                } else if (this.firstOperand === null) {
                    this.sendNewInput(ansVal, op);
                    screen.firstLine.textContent = ansVal + op;
                } else {
                    screen.firstLine.textContent += op;
                    this.operator = op;
                }
            } else if (this.secondOperand === null) {
                this.sendNewInput(currentInput, op)
                currentInput = '';
            }
        }else{showError('ERR_ Input value out of range')}
    },
    sendNewInput:function (numStr,opStr){
        if(this.firstOperand===null){
            this.firstOperand=numStr;
            this.operator=opStr;
            screen.mainLine.textContent="";
            screen.firstLine.textContent=this.firstOperand + this.operator;
            // updateScreen(true);
        }
        else if(this.secondOperand===null){
            this.secondOperand=numStr;
            this.isReady=true;
            this.solve(opStr);
        }
    },
    solve: function (lastOp){
        if(this.isReady){
            let tempRes= eval(this.firstOperand + this.operator + this.secondOperand).toString();
            if(tempRes<maxAnsVal) {
                this.result =tempRes
                ansVal = this.result;
                screen.mainLine.textContent = this.result;
                screen.firstLine.textContent = this.firstOperand + this.operator + this.secondOperand;
                if (lastOp === "=") {
                    this.firstOperand = null;
                    this.operator = null;
                    this.secondOperand = null;
                    this.isReady = false;
                } else {
                    this.firstOperand = this.result;
                    this.operator = lastOp;
                    this.secondOperand = null;
                    this.result = null;
                    this.isReady = false;
                }
            }else{
                showError('ERR_ Result is greater than allowed range.')
            }
        }
    },
    resetOperationData: function (){
        this.firstOperand=null;
        this.operator=null;
        this.secondOperand=null;
        this.isReady=false;
        this.result= null;
    }
}
/*------------------------------------------------------------------ELEMENTS SELECTION */
    const calculator = document.querySelector('.calculator');
    const consoleOut = document.querySelector('.console');
    const screen = {
        firstLine: document.querySelector('#first-line'),
        mainLine: document.querySelector('#main-line')
    };
    const numberPad = [];



//NUMBER PAD SELECTION & ASSIGNMENT
    for (let i = 0; i < 10; i++) {
        let str = '#\\3' + i + '-btn'
        numberPad.push(document.querySelector(str));
        numberPad[i].addEventListener('click', () => {
            currentInput+=i.toString();
            checkFirstOperandSkipped();
            updateScreen(false);
        });
    }
    const operators = {
        div: document.querySelector('#div-btn'),
        prod: document.querySelector('#product-btn'),
        add: document.querySelector('#add-btn'),
        subs: document.querySelector('#subs-btn')
    }
    const metaButtons = {
        ac: document.querySelector('#ac-btn'),
        c: document.querySelector('#c-btn'),
        ans: document.querySelector('#ans-btn')
    }
    const equalButton = document.querySelector('#equal-btn');
/*------------------------------------------------------------------ INPUT & LISTENERS ASSIGNMENT */


    operators.div.addEventListener('click', () => {
        currentOperation.sendOperator("/");
    });
    operators.prod.addEventListener('click', () => {
        currentOperation.sendOperator("*");
    });
    operators.add.addEventListener('click', () => {
        currentOperation.sendOperator("+");
    });
    operators.subs.addEventListener('click', () => {
        currentOperation.sendOperator("-");
    });
    equalButton.addEventListener('click', () => {
        currentOperation.sendOperator("=");
    });
    metaButtons.ans.addEventListener('click', () => {
        ansFunction();
    });
    metaButtons.c.addEventListener('click', () => {
        cFunction();
    });
    metaButtons.ac.addEventListener('click', () => {
        resetData();
        outputMessage('ALL DATA CLEARED')
    });

    document.addEventListener("keyup", function (e) {
        filterKeyEvent(e, true);
    })
    document.addEventListener("keydown", function (e) {
        filterKeyEvent(e, false);
    })
/*----------------------------------------------------------------------------------FUNCTIONS */
    const outputMessage = function (str) {
        const mssg = `</br> &gt; ${str}`
        consoleOut.insertAdjacentHTML("beforeend", mssg);
        consoleOut.scroll(0, consoleOut.scrollHeight);
    }
    function filterKeyEvent(e, isDown) {
        //TODO better implementatio with individual buttonObject key values
        let elem;
        let baseClass;
        let newClass;
        e.preventDefault();
        switch (e.key) {
            case 'Enter':
                elem = equalButton;
                baseClass = 'button ';
                newClass = isDown ? 'numdown' : 'numover'
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
                elem = numberPad[parseInt(e.key, 10)];
                baseClass = 'button';
                newClass = isDown ? 'numdown' : 'numover';
                break
            case '/':
                elem = operators.div;
                baseClass = 'button';
                newClass = isDown ? 'opdown' : 'opover';
                break
            case '+':
                elem = operators.add;
                baseClass = 'button';
                newClass = isDown ? 'opdown' : 'opover';
                break
            case '-':
                elem = operators.subs;
                baseClass = 'button';
                newClass = isDown ? 'opdown' : 'opover';
                break
            case '*':
                elem = operators.prod;
                baseClass = 'button';
                newClass = isDown ? 'opdown' : 'opover';
                break
            case 'Backspace':
                elem = metaButtons.c;
                baseClass = 'button';
                newClass = isDown ? 'metadown' : 'metaover';
                break
            case 'Delete':
                elem = metaButtons.ac;
                baseClass = 'button';
                newClass = isDown ? 'metadown' : 'metaover';
                break
            case ' ':
                elem = metaButtons.ans;
                baseClass = 'button';
                newClass = isDown ? 'metadown' : 'metaover';
                break
            default:
                break
        }
        handleKeyPress(elem, baseClass, newClass, isDown);
    }

    const handleKeyPress = function (elem, baseClass, newClass, isDown) {
        elem.className = newClass;
        if (isDown) {
            elem.click();
            setTimeout(() => {
                elem.className = baseClass;
            }, 150);
        }
    }
    function updateScreen(isOperator){
        if(isOperator) {
            screen.mainLine.textContent="";
            screen.firstLine.textContent=currentOperation.firstOperand + currentOperation.operator;
        }else{
            screen.mainLine.textContent=currentInput;
        }
    }
    function showError(mssg){
        outputMessage(mssg);
        screen.mainLine.textContent='ERR_'
        setTimeout(()=>{screen.mainLine.textContent=""},500);
    }
    function resetData(){
        ansVal='';
        currentInput='';
        // screen.mainLine.textContent='';
        screen.firstLine.textContent='';
        currentOperation.resetOperationData();
        updateScreen(false);
    }
    function ansFunction(){
        currentInput=ansVal;
        updateScreen(false);
    }
    function cFunction() {
        if(currentInput!==''){
            currentInput=currentInput.slice(0,-1);
        }else if(currentOperation.operator!==null){
            currentOperation.operator=null;
            screen.firstLine.textContent=screen.firstLine.textContent.slice(0,-1);
        }
        updateScreen(false);

    }
    function checkFirstOperandSkipped() {
        if(currentOperation.firstOperand!==null){
            updateScreen(true);
        }
    }

