function mathProblemGenerator(){}

mathProblemGenerator.prototype = function(){
    var problem = {
            'equation': [],
            'direction': 'horizontal',
            'solution': null,
            'operator': null,
            'checkProblem': function (solvedValue){
                var result = false;

                if(solvedValue == this.solution) {
                    result = true;  
                    this.solution = null;                
                }
                return result;
            }
        },             
    
        createProblem = function (operator){
            console.log(operator);
            var questionType = getRandomProblemType(),
                direction = Math.floor(Math.random() * 2) + 1 == 1 ? 'horizontal' : 'vertical',
                limit = questionType === 1 || questionType === 2 ? 10 : 5,
                w = Math.floor(Math.random() * limit) + 1,
                x = Math.floor(Math.random() * limit) + 1,
                y = Math.floor(Math.random() * limit) + 1,
                z = Math.floor(Math.random() * limit) + 1;
                
            problem.operator = operator;
            problem.equation = [];
            problem.solution = null;
            
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
                case 2: // X + Y = Z : Unknown X => Z - Y || Z + Y
                    problem.equation.push('[solve]');
                    problem.equation.push(operator);
                    problem.equation.push(y);
                    problem.equation.push('=');
                    problem.equation.push(z);
                    problem.direction = direction;
                    console.log(z.toString() + (operator == '+' ? '-' : '+') + y.toString());
                    problem.solution = eval(z.toString() + (operator == '+' ? '-' : '+') + y.toString());
                    break;
                case 3: // X + Y = Z || X - Y = Z : Unknown Y => Z - X || (Z - X) * -1
                    problem.equation.push(x);
                    problem.equation.push(operator);
                    problem.equation.push('[solve]');
                    problem.equation.push('=');
                    problem.equation.push(z);
                    problem.direction = direction;
                    console.log('(' + z.toString() + ' - ' + x.toString() + ') * (0 ' + operator + ')');
                    problem.solution = eval('(' + z.toString() + ' - ' + x.toString() + ') * (0 ' + operator + ' 1)');
                    break;
                case 4: // W + X + Y = Z : Unknown Z => (W + X) + Y || (W - X) - Y
                    problem.equation.push(w);
                    problem.equation.push(operator);
                    problem.equation.push(x);
                    problem.equation.push(operator);
                    problem.equation.push(y);
                    problem.equation.push('=');
                    problem.equation.push('[solve]');
                    problem.solution = eval('(' + w.toString() + operator + x.toString() + ')' + operator +  y.toString());
                    break;
                case 5: // W + X + Y = Z : Unknown X => ((Z - Y) - W) || ((Z + Y) - W) * -1
                    problem.equation.push(w);
                    problem.equation.push(operator);
                    problem.equation.push('[solve]');
                    problem.equation.push(operator);
                    problem.equation.push(y);
                    problem.equation.push('=');
                    problem.equation.push(z);
                    console.log('((' + z.toString() + (operator == '+' ? '-' : '+') + y.toString() + ') - ' + w.toString() + ') * (0 ' + operator + ' 1)');
                    problem.solution = eval('((' + z.toString() + (operator == '+' ? '-' : '+') + y.toString() + ') - ' + w.toString() + ') * (0 ' + operator + ' 1)');
                    break;
                case 6: // W + X + Y = Z : Unknown W => (Z - Y) - X  || (Z + Y) + X
                    problem.equation.push('[solve]');
                    problem.equation.push(operator);
                    problem.equation.push(x);
                    problem.equation.push(operator);
                    problem.equation.push(y);
                    problem.equation.push('=');
                    problem.equation.push(z);
                    console.log('(' + z.toString() + (operator == '+' ? '-' : '+') + y.toString() + ')' + (operator == '+' ? '-' : '+') + x.toString());
                    problem.solution = eval('(' + z.toString() + (operator == '+' ? '-' : '+') + y.toString() + ')' + (operator == '+' ? '-' : '+') + x.toString());
                    break;
                default:
                    break;
            }
            return problem;
        },

        getRandomProblemType = function (){
            return Math.floor(Math.random() * 6) + 1;
        },
    
        checkProblem = function (){
            console.log(this);
            var result = false;
            
            if(solvedValue == problem.solution) {
                result = true;  
                problem.solution = null;                
            }
            return result;
        };
    
    
        return {getProblem: function(){ return problem; }, createProblem: createProblem, checkProblem: checkProblem};
}();