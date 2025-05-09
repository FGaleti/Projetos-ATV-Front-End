document.getElementById("display").addEventListener("input", function (event) {
    this.value = this.value.replace(/[^0-9+\-*/().]/g, '');
});
function appendToDisplay(value) {
    document.getElementById("display").value += value;
}
function clearDisplay() {
    document.getElementById("display").value = "";
}
function calculateResult() {
    let expression = document.getElementById("display").value;
    try {
        let result = compute(expression);
        document.getElementById("display").value = result;
    } catch (error) {
        document.getElementById("display").value = "Erro";
    }
}
function compute(expression) {
    let operators = /[+\-*/]/;
    let tokens = expression.split(/([+\-*/()])/).filter(token => token.trim() !== "");
    let postfix = infixToPostfix(tokens);
    return evaluatePostfix(postfix);
}
function infixToPostfix(tokens) {
    let precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
    let output = [];
    let stack = [];
    for (let token of tokens) {
        if (!isNaN(token)) {
            output.push(parseFloat(token));
        } else if (token in precedence) {
            while (stack.length && precedence[stack[stack.length - 1]] >= precedence[token]) {
                output.push(stack.pop());
            }
            stack.push(token);
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop();
        }
    }
    while (stack.length) {
        output.push(stack.pop());
    }
    return output;
}
function evaluatePostfix(postfix) {
    let stack = [];
    for (let token of postfix) {
        if (!isNaN(token)) {
            stack.push(token);
        } else {
            let b = stack.pop();
            let a = stack.pop();
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/': stack.push(a / b); break;
            }
        }
    }
    return stack.pop();
}
