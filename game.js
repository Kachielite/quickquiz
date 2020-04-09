const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = []

let questions = [{
        question: "What is the capital of Kwara State?",
        choice1: "Ilorin",
        choice2: "Lokoja",
        choice3: "Minna",
        choice4: "Offa",
        answer: 1
    },
    {
        question: "Who of these has NOT been a Senate President??",
        choice1: "Iyorchia Ayu",
        choice2: "Joseph Wayas",
        choice3: "Arthur Nzeribe",
        choice4: " Adolphus Wabara",
        answer: 3
    },
    {
        question: "Who was the captain of the Super Eagles when Nigeria won the African cup of Nations in Tunisia 1994?",
        choice1: "Stephen Keshi",
        choice2: "JayJay Okocha",
        choice3: "Nwankwo Kanu",
        choice4: "Rashidi yekini",
        answer: 1
    },
    {
        question: "Who discovered the source of the River Niger?",
        choice1: "The brothers Johnson",
        choice2: "Lehmann Brothers",
        choice3: "Lander Brothers",
        choice4: "Wright Brothers",
        answer: 3
    },
    {
        question: "Who was the first civilian Governor of Plateau State?",
        choice1: "Paul Unongo",
        choice2: "Tartari Ali",
        choice3: "Solomon Lar",
        choice4: "Jolly Nyame",
        answer: 3
    },
    {
        question: "Who is popularly referred to as 'Maradona' in Nigeria?",
        choice1: "Nwankwo Kanu",
        choice2: "Ibrahim Babangida",
        choice3: "Amatare Oki",
        choice4: "Sani Abacha",
        answer: 2
    },
    {
        question: "Who was the president of 'Kalakuta Republic'?",
        choice1: "Tai Solarin",
        choice2: "Uche Onwubuya",
        choice3: "Gani Fawehinmi",
        choice4: "Fela Anikulapo-Kuti",
        answer: 4
    },
    {
        question: "Which of these is NOT a bridge across the Lagos Lagoon?",
        choice1: "Carter Bridge",
        choice2: "Ikeja Bridge",
        choice3: "Third Mainland Bridge",
        choice4: "Eko Bridge",
        answer: 2
    },
    {
        question: "Where is Abubakar Tafawa Balewa University?",
        choice1: "Lagos",
        choice2: "Yola",
        choice3: "Abuja",
        choice4: "Bauchi",
        answer: 4
    },
    {
        question: "Which of these is not a confraternity in Nigerian Universities?",
        choice1: "Leopards",
        choice2: "Buccaneers",
        choice3: "Pyrates",
        choice4: "Neo Black Movement",
        answer: 1
    },
    {
        question: "Which of these languages is spoken in Delta state?",
        choice1: "Birom",
        choice2: "Nupe",
        choice3: "Fulani",
        choice4: "Isoko",
        answer: 4
    },
    {
        question: "What make of car is popularly known as 'Halla'?",
        choice1: "Honda Accord",
        choice2: "Lexus Jeep",
        choice3: "Peugeot 406",
        choice4: "Mercedes S class",
        answer: 1
    },
    {
        question: "What do the terms '010' 'zero one zero', '101' ,'one zero one' refer to?",
        choice1: "Dress codes",
        choice2: "Lottery Games",
        choice3: "Number of meals a day",
        choice4: "Military Marching style",
        answer: 3
    },
    {
        question: "Who sang the song 'Send Down the Rain'?",
        choice1: "The Rain God",
        choice2: "Pastor Adeboye",
        choice3: "Ras Kimono",
        choice4: "Majek Fashek",
        answer: 4
    },
    {
        question: "What state is President Olusegun Obasanjo from?",
        choice1: "Ogun",
        choice2: "He is not Nigerian",
        choice3: "Niger",
        choice4: "Edo",
        answer: 1
    },
    {
        question: "Who was the presidential candidate of the All Progressives Grand Alliance or APGA in the April 2003 general election?",
        choice1: "Alex Ekwueme",
        choice2: "Emeka Odumegwu-Ojukwu",
        choice3: "Toto Repairer",
        choice4: "Muhammadu Buhari",
        answer: 2
    },
    {
        question: "Which of these is a suburb of Lagos?",
        choice1: "Independence Layout",
        choice2: "Victoria Garden City",
        choice3: "Ikpoba Slope",
        choice4: "Asokoro District",
        answer: 2
    },
    {
        question: "Who is the Obi of Onitsha?",
        choice1: "Obi Obiora Obidigbo",
        choice2: "Obi Onitsha Ado",
        choice3: "Obi Nnaemeka Achebe",
        choice4: "Oba Okunnade Sijuade",
        answer: 3
    },
    {
        question: "This guy is a popular '419' chairman?",
        choice1: "Afilaka Fileje",
        choice2: "Tunde Debasco",
        choice3: "Fred Ajudua",
        choice4: "Aigboje Igbafe",
        answer: 3
    },
    {
        question: "A typical seadog name would sound something like this?",
        choice1: "Eiye LekeLeke",
        choice2: "Alora Virgin the Harlot",
        choice3: "Ahoy Area Mutiny",
        choice4: "Aye Baze Bagada",
        answer: 3
    }
];

// CONSTANTS
const CORRECT_BONUS = 5;
const MAX_QUESTIONS = 20;

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];

    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");

}

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(function(choice) {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];

    });


    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(function(choice) {
    choice.addEventListener("click", function(event) {
        console.log(event.target);
        if (!acceptingAnswers) return;


        acceptingAnswers = false;
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        var classToApply = "correct";

        if (selectedAnswer == currentQuestion.answer) {
            classToApply = "correct";
        } else { classToApply = "incorrect" }

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
        }, 1000);




        getNewQuestion();
    });
});

function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}


startGame();