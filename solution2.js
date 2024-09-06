// Variable pour stocker l'état de la MasterKey (activée par défaut)
let isMasterKeyActive = true;

// Fonction pour initialiser la page avec la MasterKey activée
function initializePage() {
    updateMasterKeyStatus(); // Affiche l'état de la MasterKey au chargement de la page
}

// Fonction pour afficher la modale de la MasterKey seulement lors de l'activation
function openMasterKeyModal() {
    document.getElementById('masterkeyModal').style.display = 'block'; // Ouvre la modale pour saisir la MasterKey
}

// Fonction pour fermer la modale de la MasterKey
function closeMasterKeyModal() {
    document.getElementById('masterkeyModal').style.display = 'none'; // Ferme la modale
}

// Fonction pour valider la MasterKey saisie par l'utilisateur
function validateMasterkey() {
    var input = document.getElementById('masterkeyInput').value;

    if (input === 'Thomyris') { // Validation de la MasterKey correcte
        toggleMasterkey(true); // Active la MasterKey
        closeMasterKeyModal(); // Ferme la modale après validation
    } else {
        alert('MasterKey incorrecte'); // Message d'erreur si la MasterKey est incorrecte
    }
}

// Fonction pour activer ou désactiver la MasterKey
function toggleMasterkey(isActivation) {
    if (isActivation === true) {
        isMasterKeyActive = true; // Active la MasterKey après validation
    } else {
        isMasterKeyActive = false; // Désactive directement la MasterKey
    }
    updateMasterKeyStatus();
}

// Fonction pour mettre à jour le texte du bouton et masquer/afficher les mots de passe protégés
function updateMasterKeyStatus() {
    var masterkeyStatusBtn = document.getElementById('masterkeyStatusBtn');
    
    if (isMasterKeyActive) {
        masterkeyStatusBtn.textContent = 'MasterKey activée sur votre profil'; // Changement du texte du bouton
        showProtectedPasswords(); // Affiche les mots de passe protégés
    } else {
        masterkeyStatusBtn.textContent = 'MasterKey désactivée sur votre profil'; // Changement du texte du bouton
        hideProtectedPasswords(); // Masque les mots de passe protégés
    }
}

// Gestion du clic sur le bouton MasterKey
function handleMasterKeyClick() {
    if (isMasterKeyActive) {
        // Si la MasterKey est activée, on la désactive directement sans saisir la clé
        toggleMasterkey(false);
    } else {
        // Si la MasterKey est désactivée, on demande de saisir la clé pour l'activer
        openMasterKeyModal();
    }
}

// Fonction pour afficher la modale d'ajout de mot de passe avec le message d'encodage
function openAddPasswordModal() {
    document.getElementById('addPasswordModal').style.display = 'block'; // Affiche la modale pour ajouter un mot de passe
    var secureMessage = document.getElementById('secureMessage');

    if (isMasterKeyActive) {
        secureMessage.textContent = 'Le mot de passe sera encodé avec une master key sécurisée.'; // Message pour un mot de passe sécurisé
    } else {
        secureMessage.textContent = 'Le mot de passe sera enregistré sans clé sécurisée.'; // Message pour un mot de passe non sécurisé
    }
}

// Fonction pour fermer la modale d'ajout de mot de passe
function closeAddPasswordModal() {
    document.getElementById('addPasswordModal').style.display = 'none'; // Ferme la modale d'ajout de mot de passe
}

// Fonction pour valider et enregistrer le mot de passe
function validatePassword() {
    var passwordName = document.getElementById('passwordName').value;
    var passwordLogin = document.getElementById('passwordLogin').value;
    var passwordValue = document.getElementById('passwordValue').value;

    if (passwordName && passwordLogin && passwordValue) { // Vérifie que tous les champs sont remplis
        alert("Mot de passe enregistré avec succès !");
        addPasswordToTable(passwordName, passwordLogin, passwordValue); // Ajoute le mot de passe au tableau
        closeAddPasswordModal(); // Ferme la modale après validation
    } else {
        alert("Veuillez remplir tous les champs."); // Affiche un message d'erreur si des champs sont vides
    }
}

// Fonction pour ajouter le mot de passe dans le tableau de mots de passe
function addPasswordToTable(name, login, password) {
    var table = document.getElementById('passwordTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    var nameCell = newRow.insertCell(0); // Colonne du nom
    var loginCell = newRow.insertCell(1); // Colonne de l'identifiant
    var passwordCell = newRow.insertCell(2); // Colonne du mot de passe
    var secureCell = newRow.insertCell(3); // Colonne de la sécurité

    nameCell.textContent = name;
    loginCell.textContent = login;

    if (isMasterKeyActive) {
        passwordCell.textContent = '*******'; // Masque le mot de passe si sécurisé
        var lockIcon = document.createElement('img');
        lockIcon.src = 'asset/lock-icon.png'; // Lien vers l'icône de verrouillage
        lockIcon.alt = 'Protégé'; // Texte alternatif de l'icône
        lockIcon.classList.add('lock-icon'); // Ajoute la classe CSS pour la taille de l'icône
        secureCell.appendChild(lockIcon); // Ajoute l'icône dans la cellule
        passwordCell.classList.add('protected-password'); // Ajoute une classe pour les mots de passe protégés
    } else {
        passwordCell.textContent = password; // Affiche le mot de passe si non sécurisé
        secureCell.textContent = "Non protégé"; // Indique que le mot de passe n'est pas protégé
    }
}

// Fonction pour masquer les mots de passe protégés si la MasterKey est désactivée
function hideProtectedPasswords() {
    var protectedPasswords = document.querySelectorAll('.protected-password');
    protectedPasswords.forEach(function(passwordCell) {
        passwordCell.textContent = '*******'; // Masque les mots de passe protégés
    });
}

// Fonction pour afficher les mots de passe protégés si la MasterKey est activée
function showProtectedPasswords() {
    var protectedPasswords = document.querySelectorAll('.protected-password');
    protectedPasswords.forEach(function(passwordCell) {
        passwordCell.textContent = '*******'; // Rétablit la protection visuelle
    });
}

// Ajout d'événement à l'ouverture de la page
window.onload = function () {
    initializePage(); // Initialise la page et active la MasterKey par défaut
    document.getElementById('masterkeyStatusBtn').addEventListener('click', handleMasterKeyClick); // Ajoute un événement de clic au bouton de la MasterKey
}

// Fonction pour afficher le toast
function showToast(message) {
    var toast = document.createElement('div');
    toast.className = 'toast show';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(function () {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(function () {
            document.body.removeChild(toast);
        }, 500);
    }, 3000);
}

// Fonction pour ouvrir la modale de la MasterKey
function openMasterKeyModal() {
    document.getElementById('masterkeyModal').style.display = 'block'; // Ouvre la modale pour saisir la MasterKey
}

// Fonction pour fermer la modale de la MasterKey
function closeMasterKeyModal() {
    document.getElementById('masterkeyModal').style.display = 'none'; // Ferme la modale
}

// Fonction pour valider la MasterKey saisie par l'utilisateur
function validateMasterkey() {
    var input = document.getElementById('masterkeyInput').value;

    if (input === 'Thomyris') { // Validation de la MasterKey correcte
        toggleMasterkey(true); // Active la MasterKey
        closeMasterKeyModal(); // Ferme la modale après validation
    } else {
        showToast('MasterKey incorrecte'); // Affiche un toast en cas d'erreur
    }
}

// Fonction pour activer ou désactiver la MasterKey
function toggleMasterkey(isActivation) {
    if (isActivation === true) {
        isMasterKeyActive = true; // Active la MasterKey après validation
    } else {
        isMasterKeyActive = false; // Désactive directement la MasterKey
    }
    updateMasterKeyStatus();
}

// Fonction pour mettre à jour le texte du bouton et masquer/afficher les mots de passe protégés
function updateMasterKeyStatus() {
    var masterkeyStatusBtn = document.getElementById('masterkeyStatusBtn');
    
    if (isMasterKeyActive) {
        masterkeyStatusBtn.textContent = 'MasterKey activée sur votre profil'; // Changement du texte du bouton
        showProtectedPasswords(); // Affiche les mots de passe protégés
    } else {
        masterkeyStatusBtn.textContent = 'MasterKey désactivée sur votre profil'; // Changement du texte du bouton
        hideProtectedPasswords(); // Masque les mots de passe protégés
    }
}

// Gestion du clic sur le bouton MasterKey
function handleMasterKeyClick() {
    if (isMasterKeyActive) {
        // Si la MasterKey est activée, on la désactive directement sans saisir la clé
        toggleMasterkey(false);
    } else {
        // Si la MasterKey est désactivée, on demande de saisir la clé pour l'activer
        openMasterKeyModal();
    }
}

// Fonction pour afficher la modale d'ajout de mot de passe avec le message d'encodage
function openAddPasswordModal() {
    document.getElementById('addPasswordModal').style.display = 'block'; // Affiche la modale pour ajouter un mot de passe
    var secureMessage = document.getElementById('secureMessage');

    if (isMasterKeyActive) {
        secureMessage.textContent = 'Le mot de passe sera encodé avec une master key sécurisée.'; // Message pour un mot de passe sécurisé
    } else {
        secureMessage.textContent = 'Le mot de passe sera enregistré sans clé sécurisée.'; // Message pour un mot de passe non sécurisé
    }
}

// Fonction pour fermer la modale d'ajout de mot de passe
function closeAddPasswordModal() {
    document.getElementById('addPasswordModal').style.display = 'none'; // Ferme la modale d'ajout de mot de passe
}

// Fonction pour valider et enregistrer le mot de passe
function validatePassword() {
    var passwordName = document.getElementById('passwordName').value;
    var passwordLogin = document.getElementById('passwordLogin').value;
    var passwordValue = document.getElementById('passwordValue').value;

    if (passwordName && passwordLogin && passwordValue) { // Vérifie que tous les champs sont remplis
        showToast("Mot de passe enregistré avec succès !"); // Affiche un toast pour confirmer l'enregistrement
        addPasswordToTable(passwordName, passwordLogin, passwordValue); // Ajoute le mot de passe au tableau
        closeAddPasswordModal(); // Ferme la modale après validation
    } else {
        showToast("Veuillez remplir tous les champs."); // Affiche un toast si des champs sont vides
    }
}

// Fonction pour ajouter le mot de passe dans le tableau de mots de passe
function addPasswordToTable(name, login, password) {
    var table = document.getElementById('passwordTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    var nameCell = newRow.insertCell(0); // Colonne du nom
    var loginCell = newRow.insertCell(1); // Colonne de l'identifiant
    var passwordCell = newRow.insertCell(2); // Colonne du mot de passe
    var secureCell = newRow.insertCell(3); // Colonne de la sécurité

    nameCell.textContent = name;
    loginCell.textContent = login;

    if (isMasterKeyActive) {
        passwordCell.textContent = '*******'; // Masque le mot de passe si sécurisé
        var lockIcon = document.createElement('img');
        lockIcon.src = 'asset/lock-icon.png'; // Lien vers l'icône de verrouillage
        lockIcon.alt = 'Protégé'; // Texte alternatif de l'icône
        lockIcon.classList.add('lock-icon'); // Ajoute la classe CSS pour la taille de l'icône
        secureCell.appendChild(lockIcon); // Ajoute l'icône dans la cellule
        passwordCell.classList.add('protected-password'); // Ajoute une classe pour les mots de passe protégés
    } else {
        passwordCell.textContent = password; // Affiche le mot de passe si non sécurisé
        secureCell.textContent = "Non protégé"; // Indique que le mot de passe n'est pas protégé
    }
}

// Fonction pour masquer les mots de passe protégés si la MasterKey est désactivée
function hideProtectedPasswords() {
    var protectedPasswords = document.querySelectorAll('.protected-password');
    protectedPasswords.forEach(function(passwordCell) {
        passwordCell.textContent = '*******'; // Masque les mots de passe protégés
    });
}

// Fonction pour afficher les mots de passe protégés si la MasterKey est activée
function showProtectedPasswords() {
    var protectedPasswords = document.querySelectorAll('.protected-password');
    protectedPasswords.forEach(function(passwordCell) {
        passwordCell.textContent = '*******'; // Rétablit la protection visuelle
    });
}

// Ajout d'événement à l'ouverture de la page
window.onload = function () {
    initializePage(); // Initialise la page et active la MasterKey par défaut
    document.getElementById('masterkeyStatusBtn').addEventListener('click', handleMasterKeyClick); // Ajoute un événement de clic au bouton de la MasterKey
}
