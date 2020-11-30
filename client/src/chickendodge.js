"use strict";
exports.__esModule = true;
exports.init = exports.preload = exports.start = void 0;
var localisation_1 = require("./localisation");
var main_1 = require("./main");
var resources_1 = require("./resources");
var locales = {
    en: "locales/en.json",
    fr: "locales/fr.json"
};
var startFn;
function start() {
    startFn();
}
exports.start = start;
function preload() {
    return resources_1.Resources.init("data/resources.json");
}
exports.preload = preload;
function init() {
    var equipe = resources_1.Resources.load("equipe.txt");
    console.log(equipe);
    if (equipe === "Coéquipiers") {
        alert("N'oubliez pas d'inscrire les membres de votre équipe dans le fichier client/data/equipe.txt!");
    }
    localisation_1.Localisation.init(locales);
    var localized = document.getElementsByClassName("localized");
    for (var _i = 0, localized_1 = localized; _i < localized_1.length; _i++) {
        var item = localized_1[_i];
        item.innerText = localisation_1.Localisation.get(item.innerText);
    }
    document.getElementById("body").style.display = "initial";
    startFn = function () {
        var alias1 = document.getElementById("player1_alias").value.trim();
        var alias2 = document.getElementById("player2_alias").value.trim();
        if (alias1.length === 0) {
            return alert(localisation_1.Localisation.get("EMPTY_ALIAS", { ID: "1" }));
        }
        if (alias2.length === 0) {
            return alert(localisation_1.Localisation.get("EMPTY_ALIAS", { ID: "2" }));
        }
        var config = {
            alias: [alias1, alias2],
            canvasId: "canvas",
            launchScene: "scenes/play.json"
        };
        localisation_1.Localisation.setContext("PLAYER_1", alias1);
        localisation_1.Localisation.setContext("PLAYER_2", alias2);
        document.getElementById("config").style.display = "none";
        document.getElementById("canvas").style.display = "block";
        return main_1.run(config);
    };
}
exports.init = init;
