window.onload = (function() {
    'use strict';

    let state = ['start', 'running', 'ended'];
    let currentQuestion = 0;
    let score = {correct: 0, incorrect: 0};

    let qTtitle = document.querySelector('.question--title');
    let qOptions = document.querySelector('.question--options');
    let nextButton = document.querySelector('.next-button');

    fetch('./questions.json')
    .then(response => response.json())
    .then(response => {
        let questions = response.questions;

        setInterval(() => {
            if (nextButton.classList.contains(state[1]))
            {
                let res = document.getElementsByName('answer');
                let checked;
                for (let op of res)
                    if (op.checked)
                        checked = op;

                if ( ! checked)
                    nextButton.disabled = true;
                else nextButton.disabled = false;
            }
        }, 10);

        nextButton.addEventListener('click', function() {
            if (nextButton.classList.contains(state[0]))
            {
                insertQuestion(questions[0]);
                nextButton.classList.remove(state[0]);
                nextButton.classList.add(state[1]);

                nextButton.textContent = "Suivant";
            }
            else if (nextButton.classList.contains(state[1]))
            {
                gameProgress();
                if (currentQuestion >= questions.length)
                {
                    nextButton.classList.remove(state[1]);
                    nextButton.classList.add(state[2]);
    
                    showScore();
                    nextButton.textContent = "Recommencer";
                }
            }
            else
            {
                nextButton.classList.remove(state[2]);
                nextButton.classList.add(state[1]);

                currentQuestion = 0;
                insertQuestion(questions[currentQuestion]);
                nextButton.textContent = "Suivant";

                score.correct = 0;
                score.incorrect = 0;
            }
        }); 
    
        qTtitle.textContent = "Bienvenue dans le jeu de Quizz, Voulez vous démarrer maintenent ?";
        nextButton.textContent = "Démarrer";
    
        nextButton.classList.toggle(state[0]);
    
        function insertQuestion(question)
        {
            let optLabels = "abcdefghijklmnopqrstuvw", i = 0;
    
            qTtitle.textContent = question.title;

            if (qOptions.lastElementChild)
                while (qOptions.lastElementChild)
                    qOptions.removeChild(qOptions.lastElementChild);

            qOptions.innerHTML = '';

            while (question[optLabels[i]])
            {
                let p = document.createElement('p');
                let answer = document.createElement('input');
                let label = document.createElement('label');

                p.classList.add('option');

                answer.type = 'radio';
                answer.name = 'answer';
                answer.value = optLabels[i];
                answer.setAttribute('id', 'answer' + optLabels[i]);

                label.textContent = question[optLabels[i]];
                label.setAttribute('for', 'answer' + optLabels[i]);
    
                p.appendChild(answer);
                p.appendChild(label);
    
                qOptions.appendChild(p);
    
                i ++;
            }
        }
    
        function showScore()
        {
            qTtitle.textContent = "Votre score est de "
            + Math.floor(score.correct / questions.length * 100) + '%';
            qOptions.innerHTML = "Bonnes réponses : " + score.correct
            + "<br>" + "Mauvaises réponses : " + score.incorrect;
        }
    
        function gameProgress()
        {
            let answer;
            for (let a of document.getElementsByName("answer"))
                if (a.checked)
                {
                    answer = a.value;
                    break;
                }

            if (!answer)
            {
                alert("Vous n'avez choisi aucune réponse!");
                return;
            }

            if (answer === questions[currentQuestion].correct)
                score.correct ++;
            else
                score.incorrect ++;

            currentQuestion ++;
            
            if (currentQuestion < questions.length)
                insertQuestion(questions[currentQuestion]);
        }
    });
})();
