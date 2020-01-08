//setting variables
let timer = questions.length * 15;
let startButton = document.querySelector("#start-quiz");
let currentQuestion = 0;
let correctAnswer = 0;
let incorrectAnswer = 0;
let score = 0;
let myInterval = 0;

//starting the quiz, setting the timer
startButton.addEventListener("click", function(){
    event.preventDefault();
    showQuestions();
    let myInterval = setInterval(function(){
        
        // decrement the timer 
        timer--;
        // show the timer on the DOM
        if (timer > 0) 
        document.querySelector("#timer").textContent = "Time: " + timer + " seconds remaining";
        // verify if timer < 0 , if yes finish
        if (timer <= 0){
            clearInterval(myInterval);
            //show result form
            results()
        }
    }, 1000);
})

//show the questions for the quiz
function showQuestions(){
    document.querySelector("#starting-quiz").innerHTML = "";
    let current = questions[currentQuestion];
    document.querySelector("#question").innerHTML = current.title;
    document.querySelector("#response").innerHTML = "";
    document.querySelector("#correct").innerHTML = "";
    for(var i = 0; i < current.choices.length; i ++){
        let choice = document.createElement("button")
        choice.innerHTML = current.choices[i];
        choice.setAttribute("class", "choice");
        choice.setAttribute("value", i);
        choice.onclick = verify;
        document.querySelector("#response").appendChild(choice);
    }
}

//verify if the answer is correct
function verify(){
    console.log(this.value, questions[currentQuestion].answer)
    if(questions[currentQuestion].answer === parseInt(this.value)){
        // correct
        correctAnswer++
        score = score + 10
        let audio = new Audio("assets/correct.mp3");
        audio.play();
    }else{
        //incorrect
        incorrectAnswer++
        timer = timer - 15
        let audio = new Audio("assets/incorrect.mp3");
        audio.play();
    }
    console.log(correctAnswer, incorrectAnswer);

// verify if currentQuestion was the last then finish or if not increment currentQuestion and show the next

        currentQuestion++
        if(currentQuestion === questions.length){
            
            //show Results, the end
            score = score + timer
            timer = 0
        }
        else{
            showQuestions()
        }
}
//show results page
function results(){
    //show final score//
    document.querySelector("h3").innerHTML = "Final Score";
    document.querySelector("#quiz-area").innerHTML = score;
    //create button for Submit HighScore//
    let highscore = document.createElement("button");
    document.body.appendChild(highscore);
    //create button for restart quiz//
    let restartQuiz = document.createElement("button");
    document.body.appendChild(restartQuiz);
    restartQuiz.id="restart";
    restartQuiz.innerHTML = "Restart Quiz";
    //for restart button click//
    restartQuiz.addEventListener("click", function(){
        location.reload();
    })
    
    //highscore set//clear highscore//
    highscore.id="choice"
    highscore.innerHTML = "Submit Score";
    highscore.addEventListener("click", function(){
        event.preventDefault();
        playerName = prompt("What is your name?");
         window.localStorage.setItem(playerName, score);
         console.log(playerName, score)
         window.localStorage.getItem(playerName, score);
         document.querySelector("#highscore-list").innerHTML = playerName + " - " + score;
         document.querySelector("h3").innerHTML = "";
         document.querySelector("#quiz-area").innerHTML = "";
         if(document.getElementById("clear-score")){
            //element exists, scores already cleared
         }else{
            // clear localStorage scores and HTML scores
        let clearScore = document.createElement("button");
        document.body.appendChild(clearScore);
        clearScore.id="clear-score";
        clearScore.innerHTML = "Clear Scores";
        clearScore.addEventListener("click", function(){
            window.localStorage.clear();
            document.querySelector("#highscore-list").innerHTML = "";
        })}    
    })
}


