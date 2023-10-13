const number_poule = 1
const number_player_poule = 4


var BestPlayer = document.getElementById('best-player');

BestPlayer.addEventListener('click', function() {
    afficherMeilleurs()
});

function ChangeName(input) {
    var valeurModifiee = input.value;

    var id_input = input.id.split('-')
    var id_output = id_input[0]+"-"+id_input[1]+"v"

    document.getElementById(id_output).innerHTML = valeurModifiee;
}

function ChangeScore(input) {
    var value = input.value;
    
    var poule = input.id.split('-')[0]
    var id_input = input.id.split('-')[1].split('vs');

    var id_output = poule+"-"+id_input[1]+"vs"+id_input[0];

    EditFinalScore(value, id_input[0], poule)

    if(input.value.split('/').length != 2){
        document.getElementById(input.id).value = "/";
    }else{
        var score = value.split('/')
        document.getElementById(id_output).value = score[1]+"/"+score[0];
        EditFinalScore(score[1]+"/"+score[0], id_input[1], poule)
    }
}

function EditFinalScore(score, line, poule) {
    var count_victory = 0
    var count_score = 0
    for(let i = 1; i <= 4; i++){
        var case_score = document.getElementById(poule+"-"+line+"vsp"+i)

        if(case_score && case_score.value && case_score.value != "/"){
            var score = case_score.value.split('/')
            if(parseInt(score[0]) > parseInt(score[1])){
                count_victory = count_victory+1
            }
            count_score = count_score+parseInt(score[0])
        }
    }
    document.getElementById(poule+"-"+line+"victory").value = count_victory
    document.getElementById(poule+"-"+line+"score").value = count_score
}

function afficherMeilleurs() {
    var winner = []
    for(let poule = 1; poule <= number_poule; poule++){
        // Récupérer le tableau
        var tableau = document.getElementById('pl'+poule+'-table');

        // Récupérer toutes les lignes du tableau
        var lignes = Array.from(tableau.getElementsByTagName('tr'));
        lignes.shift();

        lignes.sort(function (a, b) {
            var victoireA = parseInt(a.querySelector('.victoire').value, 10);
            var scoreA = parseInt(a.querySelector('.score').value, 10);
            var victoireB = parseInt(b.querySelector('.victoire').value, 10);
            var scoreB = parseInt(b.querySelector('.score').value, 10);

            if (victoireA !== victoireB) {
                return victoireB - victoireA;
            } else {
                return scoreB - scoreA;
            }
        });

        for (var i = 0; i < Math.min(2, lignes.length); i++) {
            var ligne = lignes[i];
            var id = ligne.querySelector('.victoire').id.replace("victory", "v");
            var victoire = ligne.querySelector('.victoire').value;
            var score = ligne.querySelector('.score').value;

            winner.push({
                score: score,
                victory: victoire,
                name: document.getElementById(id).innerHTML
            })

            console.log(winner)

            //DeleteTable()
        }
    }
}

function DeleteTable(){
    var pouleContainers = document.querySelectorAll('.poule-container');

    // Parcourir la liste des éléments et les supprimer un par un
    pouleContainers.forEach(function (pouleContainer) {
        pouleContainer.parentNode.removeChild(pouleContainer);
    });

    var bestPlayerButton = document.getElementById('best-player');

    // Vérifier si l'élément existe avant de le supprimer
    if (bestPlayerButton) {
        bestPlayerButton.parentNode.removeChild(bestPlayerButton);
    }
}