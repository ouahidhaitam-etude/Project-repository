/* ===== INITIAL DATA ===== */
if (!localStorage.getItem('livres')) {
  localStorage.setItem('livres', JSON.stringify([
    { id: 1, titre: "Le Petit Prince", auteur: "Saint-Exupéry" }
  ]));
}

if (!localStorage.getItem('auteurs')) {
  localStorage.setItem('auteurs', JSON.stringify([
    { id: 1, nom: "Victor Hugo", pays: "France" }
  ]));
}

if (!localStorage.getItem('categories')) {
  localStorage.setItem('categories', JSON.stringify([
    { id: 1, nom: "Roman" }
  ]));
}

/* ===== LIVRES ===== */
function renderLivres() {
  const livres = JSON.parse(localStorage.getItem('livres'));

  document.getElementById('content').innerHTML = `
    <div class="section">
      <div style="display:flex;justify-content:space-between;">
        <h3>📘 Gestion des Livres</h3>
        <button onclick="formulaireLivre()">📘</button>
      </div>

      <ul class="list">
        ${livres.map((l, i) => `
          <li>
            <strong>${l.titre}</strong> — ${l.auteur}
            <button onclick="modifierLivre(${i})">✏️</button>
            <button onclick="supprimer('livres', ${i}, renderLivres)">❌</button>
            <button onclick="addFavorite('Livre', '${l.titre}')">⭐</button>
          </li>
        `).join("")}
      </ul>
    </div>
  `;

}

function formulaireLivre() {
  document.getElementById('content').innerHTML = `
    <div class="section">
      <h3>➕ Nouveau Livre</h3>

      <form onsubmit="saveLivre(event)">
        <input id="titre" placeholder="Titre du livre">
        <input id="auteur" placeholder="Auteur">
        <button>Enregistrer</button>
      </form>
    </div>
  `;
}

function saveLivre(e) {
  e.preventDefault();

  save('livres', {
    titre: titre.value,
    auteur: auteur.value
  }, renderLivres);
}

/* ===== AUTEURS ===== */
function renderAuteurs() {
  const auteurs = JSON.parse(localStorage.getItem('auteurs'));

  document.getElementById('content').innerHTML = `
    <div class="section">
      <div style="display:flex;justify-content:space-between;">
        <h3>✍️ Gestion des Auteurs</h3>
        <button onclick="formulaireAuteur()">📘</button>
      </div>

      <ul class="list">
        ${auteurs.map((a, i) => `
          <li>
            ${a.nom} (${a.pays})
            <button onclick="modifierAuteur(${i})">✏️</button>
            <button onclick="supprimer('auteurs', ${i}, renderAuteurs)">❌</button>
            <button onclick="addFavorite('Auteur', '${a.nom}')">⭐</button>
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}

function formulaireAuteur() {
  document.getElementById('content').innerHTML = `
    <div class="section">
      <h3>➕ Nouvel Auteur</h3>

      <form onsubmit="saveAuteur(event)">
        <input id="nom" placeholder="Nom">
        <input id="pays" placeholder="Pays">
        <button>Enregistrer</button>
      </form>
    </div>
  `;
}

function saveAuteur(e) {
  e.preventDefault();

  save('auteurs', {
    nom: nom.value,
    pays: pays.value
  }, renderAuteurs);
}

/* ===== CATEGORIES ===== */
function renderCategories() {
  const categories = JSON.parse(localStorage.getItem('categories'));

  document.getElementById('content').innerHTML = `
    <div class="section">
      <div style="display:flex;justify-content:space-between;">
        <h3>🗂 Catégories</h3>
        <button onclick="formulaireCategorie()">📘</button>
      </div>

      <ul class="list">
        ${categories.map((c, i) => `
          <li>
            ${c.nom}
            <button onclick="modifierCategorie(${i})">✏️</button>
            <button onclick="supprimer('categories', ${i}, renderCategories)">❌</button>
            <button onclick="addFavorite('Catégorie', '${c.nom}')">⭐</button>
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}

function formulaireCategorie() {
  document.getElementById('content').innerHTML = `
    <div class="section">
      <h3>➕ Nouvelle Catégorie</h3>

      <form onsubmit="saveCategorie(event)">
        <input id="cat" placeholder="Nom catégorie">
        <button>Enregistrer</button>
      </form>
    </div>
  `;
}


function saveCategorie(e) {
  e.preventDefault();

  save('categories', {
    nom: cat.value
  }, renderCategories);
}

/* ===== COMMON ===== */
function save(key, obj, cb) {
  if (Object.values(obj).some(v => v === "")) {
    alert("Champs vides !");
    return;
  }

  const data = JSON.parse(localStorage.getItem(key));
  data.push(obj);
  localStorage.setItem(key, JSON.stringify(data));
  cb();
}

function supprimer(key, i, cb) {
  if (confirm("Supprimer cet élément ?")) {
    const data = JSON.parse(localStorage.getItem(key));
    data.splice(i, 1);
    localStorage.setItem(key, JSON.stringify(data));
    cb();
  }
}

function modifierLivre(index) {
  const livres = JSON.parse(localStorage.getItem('livres'));
  const livre = livres[index];

  document.getElementById('content').innerHTML = `
    <div class="section">
      <h3>✏️ Modifier Livre</h3>

      <form onsubmit="updateLivre(event, ${index})">
        <input id="titre" value="${livre.titre}">
        <input id="auteur" value="${livre.auteur}">
        <button>Modifier</button>
      </form>
    </div>
  `;
}

function updateLivre(e, index) {
  e.preventDefault();

  if (titre.value === "" || auteur.value === "") {
    alert("Champs vides !");
    return;
  }

  const livres = JSON.parse(localStorage.getItem('livres'));

  livres[index] = {
    titre: titre.value,
    auteur: auteur.value
  };

  localStorage.setItem('livres', JSON.stringify(livres));
  renderLivres();
}
function modifierAuteur(index) {
  const auteurs = JSON.parse(localStorage.getItem('auteurs'));
  const auteur = auteurs[index];

  document.getElementById('content').innerHTML = `
    <div class="section">
      <h3>✏️ Modifier Auteur</h3>

      <form onsubmit="updateAuteur(event, ${index})">
        <input id="nom" value="${auteur.nom}">
        <input id="pays" value="${auteur.pays}">
        <button>Modifier</button>
      </form>
    </div>
  `;
}

function updateAuteur(e, index) {
  e.preventDefault();

  if (nom.value === "" || pays.value === "") {
    alert("Champs vides !");
    return;
  }

  const auteurs = JSON.parse(localStorage.getItem('auteurs'));

  auteurs[index] = {
    nom: nom.value,
    pays: pays.value
  };

  localStorage.setItem('auteurs', JSON.stringify(auteurs));
  renderAuteurs();
}

function modifierCategorie(index) {
  const categories = JSON.parse(localStorage.getItem('categories'));
  const categorie = categories[index];

  document.getElementById('content').innerHTML = `
    <div class="section">
      <h3>✏️ Modifier Catégorie</h3>

      <form onsubmit="updateCategorie(event, ${index})">
        <input id="cat" value="${categorie.nom}">
        <button>Modifier</button>
      </form>
    </div>
  `;
}

function updateCategorie(e, index) {
  e.preventDefault();

  if (cat.value === "") {
    alert("Champs vides !");
    return;
  }

  const categories = JSON.parse(localStorage.getItem('categories'));

  categories[index] = {
    nom: cat.value
  };

  localStorage.setItem('categories', JSON.stringify(categories));
  renderCategories();
}

/*Favorites try*/
if (!localStorage.getItem('favorites')) {
  localStorage.setItem('favorites', JSON.stringify([]));
}
function formulaireFavorite() {
  document.getElementById('content').innerHTML = `
    <div class="section">
      <h3>➕ Nouveau Favorite</h3>

      <form onsubmit="saveFavorite(event)">
        <input id="fav" placeholder="Nom du favori">
        <button>Enregistrer</button>
      </form>
    </div>
  `;
}



function renderFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites'));

  document.getElementById('content').innerHTML = `
    <div class="section">
      <div style="display:flex;justify-content:space-between;">
        <h3>⭐ Favorites</h3>
        <button onclick="formulaireFavorite()">⨁ Ajouter</button>
      </div>

      <ul class="list">
        ${favorites.map((f, i) => `
          <li>
            ${f.nom}
            <button onclick="modifierFavorite(${i})">✏️</button>
            <button onclick="supprimer('favorites', ${i}, renderFavorites)">❌</button>
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}


function modifierFavorite(index) {
  const favorites = JSON.parse(localStorage.getItem('favorites'));
  const favorite = favorites[index];

  document.getElementById('content').innerHTML = `
    <div class="section">
      <h3>✏️ Modifier Favorite</h3>

      <form onsubmit="updateFavorite(event, ${index})">
        <input id="fav" value="${favorite.nom}">
        <button>Modifier</button>
      </form>
    </div>
  `;
}

/*first try fav*/

if (!localStorage.getItem('favorites')) {
  localStorage.setItem('favorites', JSON.stringify([]));
}

/* ADD FAVORITE ⭐ */
function addFavorite(type, nom) {
  const favorites = JSON.parse(localStorage.getItem('favorites'));

  // anti duplicate
  if (favorites.some(f => f.type === type && f.nom === nom)) {
    alert("Déjà en favoris ⭐");
    return;
  }

  favorites.push({
    type: type,
    nom: nom
  });

  localStorage.setItem('favorites', JSON.stringify(favorites));
}

/* READ FAVORITES */
function renderFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites'));

  document.getElementById('content').innerHTML = `
    <div class="section">
      <div style="display:flex;justify-content:space-between;">
        <h3>⭐ Favorites</h3>
      </div>

      <ul class="list">
        ${favorites.length === 0 ? `
          <li>Aucun favori ⭐</li>
        ` : favorites.map((f, i) => `
          <li>
            ⭐ <strong>${f.nom}</strong>
            <small>(${f.type})</small>
            <button onclick="supprimer('favorites', ${i}, renderFavorites)">❌</button>
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}
