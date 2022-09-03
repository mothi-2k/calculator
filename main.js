const funButtons = ['clear', 'backspace', 'decimal', 'plusminus'];
const action = ['add', 'subtract', 'multiply', 'divide', 'modulus'];

let expression = '';

document.querySelector('.button-equal').addEventListener(
    'click',
    () => {
        evaluate(expression);
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
            numberClick(i)
        }
    );
}

function numberClick(number) {
    expression += number;
    document.querySelector('.calc-content-main').innerHTML = expression;
}

function funClick(element) {
    let button = document.querySelector('.button-'+element);
    console.log(button);
}

function evaluate(expression) {
    console.log(expression);
}

function actionClick(action) {
    if (expression.length > 0 && expression.charAt(expression.length-1).charCodeAt(0) >= 48 && expression.charAt(expression.length-1).charCodeAt(0) <= 57)  { 
        expression += action
        document.querySelector('.calc-content-main').innerHTML = expression;
    }
    console.log(expression);
}