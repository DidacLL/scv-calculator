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
            outputMessage(i + ' press')
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
        outputMessage('/ press')
    });
    operators.prod.addEventListener('click', () => {
        outputMessage('* press')
    });
    operators.add.addEventListener('click', () => {
        outputMessage('+ press')
    });
    operators.subs.addEventListener('click', () => {
        outputMessage('- press')
    });

    metaButtons.ans.addEventListener('click', () => {
        outputMessage('ANS press')
    });
    metaButtons.c.addEventListener('click', () => {
        outputMessage('C press')
    });
    metaButtons.ac.addEventListener('click', () => {
        outputMessage('AC press')
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


