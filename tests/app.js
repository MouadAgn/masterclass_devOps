const fs = require('fs');
const path = require('path');

// Fonction pour ajouter une date JPO au fichier CSV
function addJPODate(date) {
    // Vérifier que la date n'est pas vide
    if (!date) {
        throw new Error('Date cannot be empty');
    }

    // Vérifier le format de la date (assumons un format YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        throw new Error('Invalid date format, expected YYYY-MM-DD');
    }

    // Vérifier que la date est future
    const inputDate = new Date(date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Comparaison à la date sans l'heure

    if (inputDate <= currentDate) {
        throw new Error('Date must be a future date');
    }

    // Ajouter la date au fichier CSV
    const data = `JPO Date,${date}\n`;
    fs.appendFileSync(path.join(__dirname, 'jpo_dates.csv'), data);
}

// Fonction pour ajouter des données au fichier CSV
function addDataToCSV(nom, prenom, telephone, email) {
    // Vérifier que les inputs ne sont pas vides
    if (!nom || !prenom || !telephone || !email) {
        throw new Error('Inputs cannot be empty');
    }

    // Vérifier les caractères spéciaux pour nom, prénom et téléphone
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialCharRegex.test(nom)) {
        throw new Error('Name cannot contain special characters');
    }
    if (specialCharRegex.test(prenom)) {
        throw new Error('First name cannot contain special characters');
    }
    if (specialCharRegex.test(telephone)) {
        throw new Error('Phone number cannot contain special characters');
    }

    // Vérifier le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }

    // Ajouter les données au fichier CSV
    const data = `${nom},${prenom},${telephone},${email}\n`;
    fs.appendFileSync(path.join(__dirname, 'data.csv'), data);
}

// Exporter les fonctions pour les tests unitaires
module.exports = { addJPODate, addDataToCSV };

// Code pour gérer la soumission du formulaire d'inscription
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const telephone = document.getElementById('telephone').value;
        const email = document.getElementById('email').value;

        // Ajout des données au fichier CSV
        try {
            addDataToCSV(nom, prenom, telephone, email);
            alert('Données ajoutées avec succès au fichier CSV');
        } catch (error) {
            alert(error.message);
        }
    });
    
    const jpoForm = document.getElementById('jpoForm');
    jpoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const jpoDate = document.getElementById('jpoDate').value;

        // Ajout de la date JPO au fichier CSV
        try {
            addJPODate(jpoDate);
            alert('Date JPO ajoutée avec succès au fichier CSV');
        } catch (error) {
            alert(error.message);
        }
    });
});
