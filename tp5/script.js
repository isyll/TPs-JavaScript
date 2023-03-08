window.onload = (async function() {
    'use strict';

    let state = ['start', 'running', 'ended']
    // Représente les noms de classe qui sont attribués
    // au bouton pour indiquer comment doit réagir le bouton
    // lorsqu'on clique dessus.
    let currentQuestion = 0;
    let questions = await (await fetch('./questions.json')).json().questions;

    alert(questions[0]);

    let score = {
        correct: 0,
        incorrect: 0
    };

    let qTtitle = document.querySelector('.question--title');
    let qOptions = document.querySelector('.question--options');
    let nextButton = document.querySelector('.next-button');

    nextButton.addEventListener('click', function() {
        if (nextButton.classList.contains(state[0]))
        {
            insertQuestion(questions[0]);
            nextButton.classList.remove(state[0]);
            nextButton.classList.add(state[1]);
        }
        else if (nextButton.classList.contains(state[1]))
        {
            if (questions.length > currentQuestion)
            // Lorsque nous sommes à la dernière question
            // et que le bouton est cliqué
            {
                nextButton.classList.remove(state[1]);
                nextButton.classList.add(state[2]);

                showScore();

                nextButton.textContent = "Recommencer";
            }
            else
            {
                gameProgress();
            }
        }
        else
        // Le jeu doit recommencer
        {
        }
    }); 

    qTtitle.textContent = "Bienvenue dans le jeu de Quizz, Voulez vous démarrer maintenent ?";
    nextButton.textContent = "Démarrer";

    nextButton.classList.add(state[0]);

    function insertQuestion(question)
    {
        let optLabels = ["abcdefghijklmnopqrstuvw"], i = 0;

        qTtitle.textContent = question.title;
        while (question[optLabels[i]] !== undefined)
        // Les labels de doivent etre dans l'ordre alphabetique
        // car dans le cas contraire dès qu'un label est inexistant
        // la boucle s'arrete sans regarder les labels suivants.
        {
            let p = document.createElement('p');
            let answer = document.createElement('input');
            let label = document.createElement('label');

            p.classList.add('option');

            answer.type = 'radio';
            answer.name = 'answer';
            answer.value = optLabels[i];
            answer.setAttribute('id', 'answer' + optLabels[i]);

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
        qOptions.textContent = "Bonnes réponses : " + score.correct + "<br/>"
        + "Mauvaises réponses : " + score.incorrect;
    }

    function gameProgress()
    {
        let answer = document.getElementsByName("answer").forEach(
            function(answer) {
                if (answer.checked)
                    return answer.value;
        });

        if (answer === questions[currentQuestion].correct)
            score.correct ++;
        else
            score.incorrect ++;

        (questions[currentQuestion]);
        currentQuestion ++;
    }
})();
