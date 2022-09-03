const funButtons = ['clear', 'backspace', 'decimal', 'plusminus'];
const action = ['add', 'subtract', 'multiply', 'divide', 'modulus'];

let expression = '0';

document.querySelector('.button-equal').addEventListener(
    'click',
    () => {
        evaluate();
    }
);

document.querySelector('.button-clear').addEventListener(
    'click',
    () => {
        expression = '0';
        document.querySelector('.calc-content-main').innerHTML = expression;
    }
);

document.querySelector('.button-backspace').addEventListener(
    'click', 
    () => {
        if(expression.length > 1) {
            expression = expression.substring(0, expression.length-1);
            document.querySelector('.calc-content-main').innerHTML = expression;
        } else {
            expression = '0'
            document.querySelector('.calc-content-main').innerHTML = expression;
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

funButtons.forEach(element => {
    let button = document.querySelector('.button-'+element);
    button.addEventListener(
        'click',
        () => {
            funClick(button.value)
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
    } else {
        expression += number;
    }
    document.querySelector('.calc-content-main').innerHTML = expression;
}

function funClick(element) {
    let button = document.querySelector('.button-'+element);
    console.log(button);
}

function evaluate() {
    console.log(expression);
    let result;
    let exp = expression;
    if (expression.charCodeAt(expression.length-1) >= 48 && expression.charCodeAt(expression.length-1) <= 57) {
        exp = exp.replaceAll('÷', '/');
        exp = exp.replaceAll('×', '*')
        result = eval(exp);
        if (isNaN(result)) {
            document.querySelector('.calc-content-main').innerHTML = '= ( ͡╥ ͜ʖ ͡╥))';
            expression = '0';
        } else {
            document.querySelector('.calc-content-main').innerHTML = `= ${parseFloat(result.toFixed(7))}`;
            for(let i = 4; i > 1; i--) {
                document.querySelector('.old'+i).innerHTML = document.querySelector('.old'+(i-1)).innerHTML;
            }
            document.querySelector('.old1').innerHTML = expression;
            expression = result.toString(); 
        }
        
    }    
}

function actionClick(action) {
    console.log('in action'  + expression);
    if (expression.length > 0 && expression.charCodeAt(expression.length-1) >= 48 && expression.charCodeAt(expression.length-1) <= 57)  { 
        expression += action
    } else {
        expression = expression.substring(0, expression.length-1) + action;
    }
    document.querySelector('.calc-content-main').innerHTML = expression;
    console.log(expression);
}