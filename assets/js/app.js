

function createProblem(operator){
    var problem = {
            'equation': [],
            'direction': 'horizontal',
            'solution': null
        },
        questionType = Math.floor(Math.random() * 6) + 1,
        direction = Math.floor(Math.random() * 2) + 1 == 1 ? 'horizontal' : 'vertical',
        w = Math.floor(Math.random() * 10) + 1,
        x = Math.floor(Math.random() * 10) + 1,
        y = Math.floor(Math.random() * 10) + 1,
        z = Math.floor(Math.random() * 10) + 1;
    console.log(questionType);
    switch(questionType) {
        case 1: // X + Y = Z : Unknown Z
            problem.equation.push(x);
            problem.equation.push(operator);
            problem.equation.push(y);
            problem.equation.push('=');
            problem.equation.push('[solve]');
            problem.direction = direction;
            problem.solution = eval(x.toString() + operator + y.toString());
            break;
        case 2: // X + Y = Z : Unknown X
            problem.equation.push('[solve]');
            problem.equation.push(operator);
            problem.equation.push(y);
            problem.equation.push('=');
            problem.equation.push(z);
            problem.direction = direction;
            problem.solution = eval(z.toString() + (operator == '+' ? '-' : '+') + y.toString());
            break;
        case 3: // X + Y = Z : Unknown Y
            problem.equation.push(x);
            problem.equation.push(operator);
            problem.equation.push('[solve]');
            problem.equation.push('=');
            problem.equation.push(z);
            problem.direction = direction;
            problem.solution = x + y;
            problem.solution = eval(z.toString() + (operator == '+' ? '-' : '+') + x.toString());
            break;
        case 4: // W + X + Y = Z : Unknown Z
            problem.equation.push(w);
            problem.equation.push(operator);
            problem.equation.push(x);
            problem.equation.push(operator);
            problem.equation.push(y);
            problem.equation.push('=');
            problem.equation.push('[solve]');
            problem.solution = eval(w.toString() + operator + x.toString() + operator +  y.toString());
            break;
        case 5: // W + X + Y = Z : Unknown X
            problem.equation.push(w);
            problem.equation.push(operator);
            problem.equation.push('[solve]');
            problem.equation.push(operator);
            problem.equation.push(y);
            problem.equation.push('=');
            problem.equation.push(z);
            problem.solution = eval(z.toString() + (operator == '+' ? '-' : '+') + w.toString() + (operator == '+' ? '-' : '+') + y.toString());
            break;
        case 6: // W + X + Y = Z : Unknown W
            problem.equation.push(w);
            problem.equation.push(operator);
            problem.equation.push(x);
            problem.equation.push(operator);
            problem.equation.push(y);
            problem.equation.push('=');
            problem.equation.push('[solve]');
            problem.solution = eval(z.toString() + (operator == '+' ? '-' : '+') + x + (operator == '+' ? '-' : '+') + y.toString());
            break;
        default:
            break;
    }
    return problem;
}

function renderProblem(problem){
    var $solveFor = $('<input/>').attr({ type: 'text', id: 'solvefor', name: 'solvefor'}),
        i,
        $part;
    
    $('#problem').html('');
    for(i = 0; i < problem.equation.length; i++){
        $part = problem.equation[i] == '[solve]' ? $solveFor : problem.equation[i];
        $('#problem').append($part);
    }
}

function changeView(view){
    problem.solution = null;
    $('.nav li').removeClass('active');
    $('.' + view).addClass('active');
    $('.view').hide();
    $('#' + view).show();
    $('.navbar-toggle').click() 
    
    switch(view) {
        case 'addition':
            while (problem.solution == null || problem.solution < 1){
                problem = createProblem('+');
            }
            break;
        case 'subtraction':
            problem = createProblem('-');
            break;
        default:
            break;
    }
    
    renderProblem(problem);
}

function checkProblem(){
    if($('#solvefor').val() == problem.solution) {
        alert('true');   
    }
    else {
        alert('false');   
    }
}