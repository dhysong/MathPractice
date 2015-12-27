function app(){}

app.prototype = function(){
    
    var generator = null,
        
        problem = {},

        changeView = function (view){
            if(problem && problem.solution) problem.solution = null;

            $('#questionType').html(view);
            $('#result').html('');
            $('.nav li').removeClass('active');
            $('.' + view).addClass('active');
            $('.view').hide();
            $('#mathContainer').show();
            $('.navbar-toggle').click();

            switch(view.toLowerCase()) {
                case 'addition':
                    problem.operator = '+';
                    break;
                case 'subtraction':
                    problem.operator = '-';
                    break;
                default:
                    break;
            }

            while (problem == null || problem.solution == null || problem.solution < 1){
                problem = generator.createProblem(problem.operator);
            }
            console.log(problem.solution);
            renderProblem(problem);
        },

        renderProblem = function (problem){
            var $solveFor = $('<input/>').attr({ type: 'text', id: 'solvefor', name: 'solvefor', type: 'number'}),
                i,
                $part;

            $('#problem, #result').html('');
            for(i = 0; i < problem.equation.length; i++){
                $part = problem.equation[i] == '[solve]' ? $solveFor : problem.equation[i];
                $('#problem').append($part);
            }
            $('#solvefor').focus();
        },
        
        checkSolution = function(){
            var solvedValue = $('#solvefor').val();
            console.log(solvedValue);
            var isCorrect = problem.checkProblem(solvedValue);
            if(isCorrect){
                $('#result').html('You got it right!');  
                setTimeout(function() { 
                    while (problem == null || problem.solution == null || problem.solution < 1){
                        problem = generator.createProblem(problem.operator);
                    }
                    console.log(problem);
                    console.log(problem.solution);
                    renderProblem(problem);
                }
                , 1000);
            }
            else{
                $('#result').html('Hang on sloopy. Let\'s try that again.'); 
            }
        },

        init = function() {        
            generator = new mathProblemGenerator();
            problem = generator.getProblem();
            
            $('.nav li').click(function(){ 
                changeView($(this).data('view'));
            });
            
            $('#checkProblem').click(checkSolution);
        };
    
    return {init: init, changeView: changeView}
}();
