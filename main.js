const funButtons = ['clear', 'backspace', 'decimal', 'plusminus'];
const action = ['add', 'subtract', 'multiply', 'divide', 'modulus'];

let expression = '0';

document.querySelector('.button-equal').addEventListener(
    'click',
    () => {
        evaluate();
    }
);

document.querySelector('.button-decimal').addEventListener(
    'click',
    () => {
        decimalClick();
    }
);

document.querySelector('.button-clear').addEventListener(
    'click',
    () => {
        expression = '0';
        displayArea(expression);
    }
);

document.querySelector('.button-backspace').addEventListener(
    'click', 
    () => {
        if(expression.length > 1) {
            expression = expression.substring(0, expression.length-1);
            displayArea(expression);
        } else {
            expression = '0'
            displayArea(expression);
        }
    }
);

action.forEach(element => {
    let button = document.querySelector('.button-' + element);
    button.addEventListener(
        'click',
        () => {
            actionClick(button.innerHTML);
        }
    );
});

for(let i = 0; i < 10; i++) {
    let button = document.querySelector('.button-num' + i);
    button.addEventListener(
        'click',
        () => {
            numberClick(i.toString())
        }
    );
}

function numberClick(number) {
    if (expression.length === 1 && expression === '0') {
        expression = number;
    } else if (expression[expression.length-1] === '%') {
        expression += '×' + number;
    } else {
        expression += number;
    }
    displayArea(expression);
}

function decimalClick() {
    if(expression.charCodeAt(expression.length-1) >= 48 && expression.charCodeAt(expression.length-1) <= 57 && expression.split('.').length - 1 === 0) {
        expression += '.';
    } else if((expression.charCodeAt(expression.length-1) < 48 || expression.charCodeAt(expression.length-1) > 57) && expression.split('.').length - 1 === 0) {
        expression = expression.substring(0, expression.length - 1) + '.';
    }
    displayArea(expression);
}

function evaluate() {
    console.log(expression);
    let result;
    let exp = expression;
    if ((expression.charCodeAt(expression.length-1) >= 48 && expression.charCodeAt(expression.length-1) <= 57) || expression[expression.length-1] === '%') {
        exp = exp.replaceAll('÷', '/');
        exp = exp.replaceAll('×', '*');
        exp = exp.replaceAll('%', '/100');
        console.log(exp);
        result = eval(exp);
        if (isNaN(result)) {
            displayArea('= ( ͡╥ ͜ʖ ͡╥))');
            expression = '0';
        } else {
            displayArea(`= ${parseFloat(result.toFixed(7))}`);
            for(let i = 4; i > 1; i--) {
                let old = document.querySelector('.old'+i);
                old.innerHTML = document.querySelector('.old'+(i-1)).innerHTML;
                old.scrollLeft = old.scrollWidth;
            }
            document.querySelector('.old1').innerHTML = expression;
            document.querySelector('.old1').scrollLeft = document.querySelector('.old1').scrollWidth;;
            expression = result.toString(); 
        }
        
    }    
}

function actionClick(action) {
    console.log('in action'  + expression);
    if ((expression.length > 0 && expression.charCodeAt(expression.length-1) >= 48 && expression.charCodeAt(expression.length-1) <= 57) || expression[expression.length-1] === '%')   { 
        if((action === '%' && expression.split('%').length < 3) || action !== '%') {
            expression += action;
        }
    } else {
        if (action !== '%') {
            expression = expression.substring(0, expression.length-1) + action;
        }
    }
    displayArea(expression);
    console.log(expression);
}

function displayArea(content) {
    let mainContent = document.querySelector('.calc-content-main');
    mainContent.innerHTML = content;
    mainContent.scrollLeft = mainContent.scrollWidth;
}