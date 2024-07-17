// HTML structure for the calculator
const calculatorHtml = `
<div class="calculator">
  <input type="text" class="calculator-screen" value="" disabled />
  <div class="calculator-keys">
    <button type="button" class="operator" value="+">+</button>
    <button type="button" class="operator" value="-">-</button>
    <button type="button" class="operator" value="*">&times;</button>
    <button type="button" class="operator" value="/">&divide;</button>
    <button type="button" value="7">7</button>
    <button type="button" value="8">8</button>
    <button type="button" value="9">9</button>
    <button type="button" value="4">4</button>
    <button type="button" value="5">5</button>
    <button type="button" value="6">6</button>
    <button type="button" value="1">1</button>
    <button type="button" value="2">2</button>
    <button type="button" value="3">3</button>
    <button type="button" value="0">0</button>
    <button type="button" class="decimal" value=".">.</button>
    <button type="button" class="all-clear" value="all-clear">AC</button>
    <button type="button" class="equal-sign operator" value="=">=</button>
  </div>
</div>
`;

// Append the calculator HTML to the body
document.body.innerHTML += calculatorHtml;

// Calculator functionality
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const screen = calculator.querySelector('.calculator-screen');

keys.addEventListener('click', e => {
  if (!e.target.matches('button')) return;

  const key = e.target;
  const action = key.classList[0];
  const keyContent = key.textContent;
  const displayedNum = screen.value;
  const previousKeyType = calculator.dataset.previousKeyType;

  if (!action) {
    if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
      screen.value = keyContent;
    } else {
      screen.value = displayedNum + keyContent;
    }
    calculator.dataset.previousKeyType = 'number';
  }

  if (action === 'decimal') {
    if (!displayedNum.includes('.')) {
      screen.value = displayedNum + '.';
    } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
      screen.value = '0.';
    }
    calculator.dataset.previousKeyType = 'decimal';
  }

  if (action === 'operator') {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;

    if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
      const calcValue = calculate(firstValue, operator, secondValue);
      screen.value = calcValue;
      calculator.dataset.firstValue = calcValue;
    } else {
      calculator.dataset.firstValue = displayedNum;
    }

    calculator.dataset.previousKeyType = 'operator';
    calculator.dataset.operator = key.value;
  }

  if (action === 'all-clear') {
    screen.value = '0';
    delete calculator.dataset.firstValue;
    delete calculator.dataset.operator;
    calculator.dataset.previousKeyType = 'all-clear';
  }

  if (action === 'equal-sign') {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;

    if (firstValue) {
      if (previousKeyType === 'calculate') {
        firstValue = displayedNum;
        secondValue = calculator.dataset.modValue;
      }
      screen.value = calculate(firstValue, operator, secondValue);
    }

    calculator.dataset.previousKeyType = 'calculate';
    calculator.dataset.modValue = secondValue;
  }
});

function calculate(n1, operator, n2) {
  let result = '';

  if (operator === '+') {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === '-') {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === '*') {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === '/') {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result.toString();
}