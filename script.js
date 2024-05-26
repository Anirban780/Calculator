function append_to_display(value){
    document.getElementById('display').value+= value;
}

function append_to_display1(value){
    document.getElementById('display').value= value + document.getElementById('display').value;
}

function clear_display(){
    document.getElementById('display').value= '';
}

function delete_last(){
    let display= document.getElementById('display').value;
    document.getElementById('display').value= display.substring(0, display.length -1);
}

function calculate_result(){
    let display= document.getElementById('display').value;
    let dis= display.substring(0,4);
    let dis2= display.substring(0,3);
    
    try{
        if(display.includes('sin'))
            display = display.replace('sin', 'Math.sin');
            
        else if(display.includes('cos'))
            display = display.replace('cos', 'Math.cos');
            
        else if(display.includes('tan'))
            display = display.replace('tan', 'Math.tan');
            
        else if(display.includes('log'))
            display = display.replace('log', 'Math.log10');
            
        else if(display.includes('ln'))
            display = display.replace('ln', 'Math.log');
            
        else if(display.includes('^'))
            display = display.replace('^', '**');

        else if(display.includes('√'))
            display= display.replace('√', 'Math.sqrt');
            
        document.getElementById('display').value= eval(display);
    }
    catch(e){
        document.getElementById('display').value= 'Error!';
    }

    // Re-attach the event listener
    attachKeyboardInputListener();
}

function convert_to_fraction(){
    let val= document.getElementById('display').value;

    if(val.includes('.'))
    {
        let decimal_part= val.split('.')[1];
        let decimal_places= decimal_part.length;

        let new_val= parseFloat(val).toFixed(4);
        decimal_places= Math.min(4, decimal_places);

        let num= new_val.replace('.', '');
        let deno= Math.pow(10, decimal_places);

        let gcd= function(a,b){
            return b===0 ? a: gcd(b, a % b);
        }

        let divisor= gcd(num, deno);
        num/= divisor;
        deno/= divisor;

        if(deno === 1)
            document.getElementById('display').value= num;
        else
            document.getElementById('display').value= num+'/'+deno;
    }
    else
        alert("ERROR! No fractional part");
}

function applyFunction(func){
    let display= document.getElementById('display').value;
    let result;

    switch(func)
    {
        case 'ceil':
            result= Math.ceil(parseFloat(display));
            break;

        case 'floor':
            result= Math.floor(parseFloat(display));
            break;

        case 'abs':
            result= Math.abs(parseFloat(display));
            break;

        case 'sin(':
            result= Math.sin(parseFloat(display));
            break;

        default:
            result= NaN;
            break;
    }

    document.getElementById('display').value= result;
}

// Function to attach keyboard input listener
function attachKeyboardInputListener() {
    document.addEventListener('keydown', handleKeyDown);
}

// Keyboard input functionality
function handleKeyDown(event) {
    const display = document.getElementById('display');
    const key = event.key;

    if (event.target === document.body) {
        if (key >= '0' && key <= '9') {
            append_to_display(key);
        } else if (key === '.') {
            append_to_display(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '^') {
            append_to_display(key);
        } else if (key === 'Enter') {
            event.preventDefault();  // Prevent the form from being submitted if inside a form
            calculate_result();
        } else if (key === 'Backspace') {
            delete_last();
        } else if (key === 'Escape') {
            clear_display();
        }
    }
}

// Attach the initial event listener
attachKeyboardInputListener();

// Webpage buttons functionality
document.querySelectorAll('.calc-button').forEach(button => {
    button.addEventListener('click', () => {
        append_to_display(button.textContent.trim());
    });
});

