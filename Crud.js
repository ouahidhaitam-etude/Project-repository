if (!localStorage.getItem('livres')) {
    localStorage.setItem('livres', JSON.stringify([{ id: 1, titre: "Le Petit Prince", auteur: "Saint-Exupéry" }]));
}
if (!localStorage.getItem('auteurs')) {
    localStorage.setItem('auteurs', JSON.stringify([{ id: 1, nom: "Hugo", pays: "France" }]));
}

// --- GESTION DES LIVRES ---
function renderLivres() {
    const livres = JSON.parse(localStorage.getItem('livres'));
    document.getElementById('main-content').innerHTML = `
        <div class="d-flex justify-content-between mb-4">
            <h2>Gestion des Livres</h2>
            <button class="btn btn-success" onclick="formulaireLivre()">+ Ajouter</button>
        </div>
        <table class="table bg-white shadow-sm rounded">
            <thead class="table-dark">
                <tr><th>Titre</th><th>Auteur</th><th>Action</th></tr>
            </thead>
            <tbody>
                ${livres.map((l, i) => `
                    <tr>
                        <td>${l.titre}</td>
                        <td>${l.auteur}</td>
                        <td><button class="btn btn-danger btn-sm" onclick="supprimer('livres', ${i}, renderLivres)">Supprimer</button></td>
                    </tr>`).join('')}
            </tbody>
        </table>`;
}

function formulaireLivre() {
    document.getElementById('main-content').innerHTML = `
        <h3>Nouveau Livre</h3>
        <div class="card p-4 shadow-sm col-md-6">
            <input type="text" id="t" class="form-control mb-2" placeholder="Titre">
            <input type="text" id="a" class="form-control mb-3" placeholder="Auteur">
            <button class="btn btn-primary" onclick="save('livres', {titre: t.value, auteur: a.value}, renderLivres)">Enregistrer</button>
        </div>`;
}

// --- GESTION DES AUTEURS ---
function renderAuteurs() {
    const auteurs = JSON.parse(localStorage.getItem('auteurs'));
    document.getElementById('main-content').innerHTML = `
        <div class="d-flex justify-content-between mb-4">
            <h2>Gestion des Auteurs</h2>
            <button class="btn btn-info text-white" onclick="formulaireAuteur()">+ Ajouter</button>
        </div>
        <table class="table bg-white shadow-sm rounded">
            <thead class="table-dark">
                <tr><th>Nom</th><th>Nationalité</th><th>Action</th></tr>
            </thead>
            <tbody>
                ${auteurs.map((a, i) => `
                    <tr>
                        <td>${a.nom}</td>
                        <td>${a.pays}</td>
                        <td><button class="btn btn-danger btn-sm" onclick="supprimer('auteurs', ${i}, renderAuteurs)">Supprimer</button></td>
                    </tr>`).join('')}
            </tbody>
        </table>`;
}

function formulaireAuteur() {
    document.getElementById('main-content').innerHTML = `
        <h3>Nouvel Auteur</h3>
        <div class="card p-4 shadow-sm col-md-6">
            <input type="text" id="n" class="form-control mb-2" placeholder="Nom">
            <input type="text" id="p" class="form-control mb-3" placeholder="Pays">
            <button class="btn btn-primary" onclick="save('auteurs', {nom: n.value, pays: p.value}, renderAuteurs)">Enregistrer</button>
        </div>`;
}

// --- LOGIQUE COMMUNE ---
function save(key, obj, cb) {
    if (Object.values(obj).some(v => v === "")) return alert("Champs vides!");
    let data = JSON.parse(localStorage.getItem(key));
    data.push(obj);
    localStorage.setItem(key, JSON.stringify(data));
    cb();
}

function supprimer(key, i, cb) {
    if(confirm("Supprimer?")) {
        let data = JSON.parse(localStorage.getItem(key));
        data.splice(i, 1);
        localStorage.setItem(key, JSON.stringify(data));
        cb();
    }
}