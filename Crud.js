var data = [];
var edit = -1;

// AJOUTER ou MODIFIER
function ajouter() {
  var valeur = document.getElementById("champ").value;

  if (valeur == "") {
    alert("Champ vide");
    return;
  }

  if (edit == -1) {
    data.push({
      id: data.length + 1,
      nom: valeur
    });
  } else {
    data[edit].nom = valeur;
    edit = -1;
  }

  document.getElementById("champ").value = "";
  afficher();
}

// AFFICHER
function afficher() {
  var table = document.getElementById("table");
  table.innerHTML = "";

  for (var i = 0; i < data.length; i++) {
    table.innerHTML +=
      "<tr>" +
      "<td>" + data[i].id + "</td>" +
      "<td>" + data[i].nom + "</td>" +
      "<td>" +
      "<button onclick='modifier(" + i + ")'>Modifier</button> " +
      "<button onclick='supprimer(" + i + ")'>Supprimer</button>" +
      "</td>" +
      "</tr>";
  }
}

// MODIFIER
function modifier(i) {
  document.getElementById("champ").value = data[i].nom;
  edit = i;
}

// SUPPRIMER
function supprimer(i) {
  if (confirm("Supprimer ?")) {
    data.splice(i, 1);
    afficher();
  }
}
