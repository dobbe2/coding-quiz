//setting variables
let timer = questions.length * 15;
let startButton = document.querySelector("#start-quiz");
let currentQuestion = 0;
let correctAnswer = 0;
let incorrectAnswer = 0;

//starting the quiz
startButton.addEventListener("click", function(){
    event.preventDefault();
    showQuestions()
    let interval = setInterval(function(){
        // decrement the timer 
        timer--
        // show the timer on the DOM
        document.querySelector("#timer").textContent = timer
        // verify if timer < 0 then if yes finish
        if (timer <= 0){
            clearInterval(timer)
            //show result form
            results()
        }
        
    }, 1000);
    
})

function showQuestions(){
    document.querySelector("#starting-quiz").innerHTML = "";
    let current = questions[currentQuestion]
    document.querySelector("#question").innerHTML = current.title
    document.querySelector("#response").innerHTML = ""
    for(var i = 0; i < current.choices.length; i ++){
        let choice = document.createElement("button")
        choice.innerHTML = current.choices[i]
        choice.setAttribute("class", "choice")
        choice.setAttribute("value", i)
        choice.onclick = verify
        document.querySelector("#response").appendChild(choice)
    }

}
function verify(){
    console.log(this.value, questions[currentQuestion].answer)
    if(questions[currentQuestion].answer === parseInt(this.value)){
        // correct
        correctAnswer++
    }else{
        //incorrect
        incorrectAnswer++
        timer = timer - 15
    }
    console.log(correctAnswer, incorrectAnswer);
        currentQuestion++
        if(currentQuestion === questions.length){
            //show Results, the end
            results ()
        }else{
            showQuestions()
        }
    
    // verify if currentquestion was the last then finish or if not increment currentquestion and go to show the next
}

function results(){
    document.querySelector("#quiz-area").innerHTML = ""
    document.querySelector("#timer").innerHTML = ""
    document.querySelector("h3").innerHTML = "Final Score"
}
//show results