const buttons = document.querySelectorAll("button");
            const display = document.getElementById("display");
            const pressedButtons = [];

            function parseExpression(arr){
                let num = [];
                let temp = "";

                for(let i = 0; i<arr.length; i++){
                    if (!isNaN(arr[i]) || arr[i] === "."){
                        temp += arr[i];
                    }else{
                        num.push(parseFloat(temp));
                        num.push(arr[i]);
                        temp = "";
                    }
                }
                num.push(parseFloat(temp));
                return num;
            }

            function precedence(op) {
                if (op === '+' || op === '-') return 1;
                if (op === '*' || op === '/') return 2;
                return 0;
            }

            function applyOperation(a, b, op) {
                switch (op) {
                    case '+': return a + b;
                    case '-': return a - b;
                    case '*': return a * b;
                    case '/': return a / b;
                }
            }

        function evaluate(expression) {
            let values = [];
            let operators = [];

            for (let i = 0; i < expression.length; i++) {

                let ch = expression[i];

                if (ch === ' ') continue;

                if (!isNaN(ch)) {
                    let num = "";

                    while (
                        i < expression.length &&
                        !isNaN(expression[i]) &&
                        expression[i] !== " "
                    ) {
                        num += expression[i];
                        i++;
                    }

                    values.push(Number(num));
                    i--;
                }

                else if (ch === '(') {
                    operators.push(ch);
                }

                else if (ch === ')') {

                    while (operators[operators.length - 1] !== '(') {
                        let op = operators.pop();
                        let b = values.pop();
                        let a = values.pop();

                        values.push(applyOperation(a, b, op));
                    }

                    operators.pop();
                }

                else {

                    while (
                        operators.length &&
                        precedence(operators[operators.length - 1]) >= precedence(ch)
                        ) {
                            let op = operators.pop();
                            let b = values.pop();
                            let a = values.pop();

                            values.push(applyOperation(a, b, op));
                        }

                        operators.push(ch);
                    }
                }

                while (operators.length) {
                    let op = operators.pop();
                    let b = values.pop();
                    let a = values.pop();

                    values.push(applyOperation(a, b, op));
                }

                return values.pop();
            }
            buttons.forEach(button => {
                button.addEventListener("click",function(){

                    if (this.innerText === "=") {
                        console.log(pressedButtons.join("")," = ",evaluate(pressedButtons));
                        display.innerText = evaluate(pressedButtons);
                        pressedButtons.length = 0;
                        return;
                    }
                    if(this.innerText === "()"){
                        let open = pressedButtons.filter(ch => ch === "(").length;
                        let close = pressedButtons.filter(ch => ch === ")").length;

                        if (open === close){
                            pressedButtons.push("(");
                        } else {
                            pressedButtons.push(")");
                        }

                        display.innerText = pressedButtons.join("");
                        return;
                    }

                    if (this.innerText === "⌫"){
                        pressedButtons.pop();

                    }else{
                        pressedButtons.push(this.innerText);
                    }

                    display.innerText = pressedButtons.join("");

                })
            })