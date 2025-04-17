        const display = document.getElementById('display');
        const buttons = document.querySelectorAll('button');
        let currentInput = '';
        let operator = '';
        let previousInput = '';

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.innerText;

                if (value === 'C') {
                    currentInput = '';
                    previousInput = '';
                    operator = '';
                    display.value = '';
                } else if (value === '=') {
                    if (currentInput && previousInput && operator) {
                        currentInput = evaluate(previousInput, currentInput, operator);
                        display.value = currentInput;
                        operator = '';
                    }
                } else if (['+', '-', '*', '/'].includes(value)) {
                    if (currentInput) {
                        if (previousInput && operator) {
                            currentInput = evaluate(previousInput, currentInput, operator);
                            display.value = currentInput;
                        }
                        previousInput = currentInput;
                        operator = value;
                        currentInput = '';
                    }
                } else {
                    currentInput += value;
                    display.value = currentInput;
                }
            });
        });

        function evaluate(a, b, operator) {
            a = parseFloat(a);
            b = parseFloat(b);

            switch (operator) {
                case '+':
                    return a + b;
                case '-':
                    return a - b;
                case '*':
                    return a * b;
                case '/':
                    if (b === 0) {
                        alert("Error: Division by 0");
                        return '';
                    }
                    return a / b;
                default:
                    return b;
            }
        }
