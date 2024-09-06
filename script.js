// Fonction pour rediriger vers la page solution1.html
function loadSolution1() {
    window.location.href = 'solution1.html';
}

// Fonction pour rediriger vers la page solution2.html
function loadSolution2() {
    window.location.href = 'solution2.html';
}

// Fonction pour afficher la page de feedback
// Supprimez cette fonction si vous ne souhaitez pas utiliser de feedback
function loadFeedbackForm() {
    window.location.href = 'feedback.html'; // Ou retirer cette ligne si non nécessaire
}

// Fonction pour afficher/masquer la masterkey dans Solution 1 et Solution 2
function toggleMasterkey() {
    var passwordElements = document.querySelectorAll('.masked');
    var isMasterkeyActive = document.getElementById('masterkeyStatus').style.display === 'block';
    if (isMasterkeyActive) {
        document.getElementById('statusText').textContent = 'MasterKey désactivée';
        passwordElements.forEach(el => el.classList.add('masked'));
    } else {
        document.getElementById('statusText').textContent = 'MasterKey activée';
        passwordElements.forEach(el => el.classList.remove('masked'));
    }
    document.getElementById('masterkeyStatus').style.display = isMasterkeyActive ? 'none' : 'block';
}

// Fonction pour valider la MasterKey
function validateMasterkey() {
    var input = document.getElementById('masterkeyInput').value;
    if (input === 'Thomyris' || input === 'Xefi') {
        toggleMasterkey();
        document.getElementById('masterkeyModal').style.display = 'none';
    } else {
        alert('MasterKey incorrecte');
    }
}

// Fonction pour revenir à la page d'accueil depuis Solution 1 et Solution 2
function goBack() {
    window.location.href = 'index.html';
}
