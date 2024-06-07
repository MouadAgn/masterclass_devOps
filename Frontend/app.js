document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la soumission du formulaire
    document.getElementById('registrationForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const telephone = document.getElementById('telephone').value;
        const email = document.getElementById('email').value;
        const formation = document.getElementById('formation').value;
        const accepte = document.getElementById('accepte').checked;

        const options1 = Array.from(document.querySelectorAll('input[name="options1[]"]:checked')).map(el => el.value);
        const options2 = Array.from(document.querySelectorAll('input[name="options2[]"]:checked')).map(el => el.value);

        if (accepte) {
            try {
                const newData = {
                    nom,
                    prenom,
                    telephone,
                    email,
                    formation,
                    options1,
                    options2
                };

                const response = await fetch('http://localhost:8077/saveData.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newData)
                });

                const responseData = await response.json();

                document.getElementById('registrationForm').reset();
                alert('Données enregistrées avec succès');
            } catch (error) {
                console.error('Erreur lors de la soumission des données:', error);
                alert('Erreur lors de la soumission des données');
            }
        } else {
            alert('Veuillez accepter la conservation et l\'utilisation de vos données.');
        }
    });

    // Affichage de la liste des fichiers CSV
    fetch('http://localhost:8077/listFiles.php')
    .then(response => response.json())
    .then(files => {
        const fileList = document.getElementById('file-list');
        files.forEach(file => {
            console.log(file);
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = "#";
            a.textContent = file;
            a.addEventListener('click', function(e) {
                e.preventDefault();
                fetch('http://localhost:8077/viewFile.php?file=' + file)
                    .then(response => response.text())
                    .then(content => {
                        const dataArray = content.split('\n').map(row => row.split(','));
                        const table = document.createElement('table');
                        const thead = document.createElement('thead');
                        const tbody = document.createElement('tbody');

                        // Création de l'en-tête du tableau
                        const headers = dataArray.shift();
                        const headerRow = document.createElement('tr');
                        headers.forEach(header => {
                            const th = document.createElement('th');
                            th.textContent = header;
                            headerRow.appendChild(th);
                        });
                        thead.appendChild(headerRow);
                        table.appendChild(thead);

                        // Remplissage du corps du tableau
                        dataArray.forEach(rowData => {
                            const row = document.createElement('tr');
                            rowData.forEach(cellData => {
                                const cell = document.createElement('td');
                                cell.textContent = cellData;
                                row.appendChild(cell);
                            });
                            tbody.appendChild(row);
                        });
                        table.appendChild(tbody);

                        table.classList.add('styled-table'); // Ajout de la classe CSS
                        document.getElementById('file-content').innerHTML = '';
                        document.getElementById('file-content').appendChild(table);
                    });
            });
            li.appendChild(a);
            fileList.appendChild(li);
        });
    })
    .catch(error => console.error('Erreur lors de la récupération des fichiers:', error));

});
