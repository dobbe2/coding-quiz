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
        document.querySelector("#timer").textContent = "Time: " + timer + " seconds remaining"
        // verify if timer < 0 then if yes finish
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
    let current = questions[currentQuestion]
    document.querySelector("#question").innerHTML = current.title
    document.querySelector("#response").innerHTML = ""
    document.querySelector("#correct").innerHTML = ""
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
        score = score + 10
        // debugger
        // let timeout = setTimeout(function(){
        //    document.querySelector("#correct").innerHTML = "Correct!"

        // }, 100);
        
        
    }else{
        //incorrect
        incorrectAnswer++
        timer = timer - 15
    }
    console.log(correctAnswer, incorrectAnswer);

// verify if currentquestion was the last then finish or if not increment currentquestion and go to show the next

        currentQuestion++
        if(currentQuestion === questions.length){
            
            //show Results, the end
            score = score + timer
            timer = 0
            // results ()
            // clearInterval(myInterval)
        }
        else{
            showQuestions()
        }
}

function results(){
    document.querySelector("h3").innerHTML = "Final Score";
    document.querySelector("#quiz-area").innerHTML = score;
    let highscore = document.createElement("button");
    document.body.appendChild(highscore);
    highscore.class="choice"
    highscore.innerHTML = "Submit High Score";
    // document.querySelector("#highscore").textContent = score;
    highscore.addEventListener("click", function(){
        playerInitials = prompt("What is your initials?");
         
         window.localStorage.setItem(playerInitials, score);
         console.log(playerInitials, score)
    })

    // playerInitials = prompt("What is your initials?");
   
}
//show results
//save score into local storage
function saveScore(){
    window.localStorage.setItem(playerInitials, score);
    console.log(playerInitials, score)
}

