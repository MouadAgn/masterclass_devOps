const fs = require('fs');
const path = require('path');

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

module.exports = { addDataToCSV };
