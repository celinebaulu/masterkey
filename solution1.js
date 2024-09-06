// Fonction pour rediriger vers la page d'accueil
function goBack() {
    window.location.href = 'index.html';
}

// Fonction pour afficher un message toast
function showToast(message) {
    var toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000); // Toast affiché pendant 3 secondes
}

// Fonction pour valider la MasterKey
function validateMasterkey() {
    var input = document.getElementById('masterkeyInput').value;
    if (input === 'Thomyris' || input === 'Xefi') {
        showToast('Master key correcte');
        document.getElementById('masterkeyModal').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } else {
        showToast('Master key incorrecte');
    }
}

// Fonction pour quitter le coffre et retirer la clé
function quitVault() {
    document.getElementById('content').style.display = 'none';
    document.getElementById('masterkeyModal').style.display = 'flex'; // Remet la modale en place
    showToast('Coffre fermé');
}

// Fonction pour ajouter un mot de passe
function addPassword() {
    var name = document.getElementById('passwordName').value;
    var login = document.getElementById('passwordLogin').value;
    var password = document.getElementById('passwordValue').value;

    if (name && login && password) {
        var table = document.getElementById('passwordTable').getElementsByTagName('tbody')[0];
        var newRow = table.insertRow();
        newRow.insertCell(0).textContent = name;
        newRow.insertCell(1).textContent = login;
        newRow.insertCell(2).textContent = '*******'; // Mot de passe masqué par défaut

        closeAddPasswordModal(); // Ferme la modale après ajout
        showToast('Mot de passe ajouté');
    } else {
        showToast('Veuillez remplir tous les champs');
    }
}

// Fonction pour ajouter un dossier
function addFolder() {
    var name = document.getElementById('folderName').value;

    if (name) {
        var table = document.getElementById('passwordTable').getElementsByTagName('tbody')[0];
        var newRow = table.insertRow();
        newRow.insertCell(0).textContent = name;
        newRow.insertCell(1).textContent = ''; // Colonne Login vide
        newRow.insertCell(2).textContent = ''; // Colonne Password vide

        closeAddFolderModal(); // Ferme la modale après ajout
        showToast('Dossier ajouté');
    } else {
        showToast('Veuillez remplir le champ de nom du dossier');
    }
}

// Fonction pour afficher la modale de la MasterKey au chargement
function showMasterkeyModal() {
    document.getElementById('masterkeyModal').style.display = 'flex';
    document.getElementById('content').style.display = 'none'; // Masquer le contenu du coffre au début
}

// Fonction pour afficher la modale d'ajout de mot de passe
function openAddPasswordModal() {
    document.getElementById('addPasswordModal').style.display = 'flex';
}

// Fonction pour fermer la modale d'ajout de mot de passe
function closeAddPasswordModal() {
    document.getElementById('addPasswordModal').style.display = 'none';
}

// Fonction pour afficher la modale d'ajout de dossier
function openAddFolderModal() {
    document.getElementById('addFolderModal').style.display = 'flex';
}

// Fonction pour fermer la modale d'ajout de dossier
function closeAddFolderModal() {
    document.getElementById('addFolderModal').style.display = 'none';
}

// Initialiser la page avec la modale de MasterKey
window.onload = function() {
    showMasterkeyModal();
};
