"use strict";
exports.__esModule = true;
exports.Localisation = void 0;
var resources_1 = require("./resources");
var globalContext = {};
var localeStrings = {};
// ## Fonction *getQueryParams*
// Cette fonction retourne un objet contenant les paramètres passés
// à l'URL de la page.
function getQueryParams() {
    var query = document.location.search;
    var queryParams = {};
    var regex = new RegExp("([^?=&]+)(=([^&]*))?", "g");
    query.replace(regex, function (match, p1, p2, p3) {
        queryParams[p1] = p3;
        return "";
    });
    return queryParams;
}
// # Classe *Localisation*
// Cette classe comprend les méthodes nécessaires pour
// charger et traiter la régionalisation.
var Localisation = /** @class */ (function () {
    function Localisation() {
    }
    // ## Méthode statique *init*
    // La méthode d'initialisation prend en paramètre un tableau
    // associatif décrivant les différents fichiers de localisation.
    // On détermine le fichier de locales à utiliser selon la langue
    // du navigateur ou un paramètre passé dans l'URL.
    Localisation.init = function (locales) {
        var queryParams = getQueryParams();
        var language = queryParams.locale || navigator.language;
        language = language.substring(0, 2);
        if (!locales[language]) {
            language = Object.keys(locales)[0];
        }
        var content = resources_1.Resources.load(locales[language]);
        localeStrings = JSON.parse(content);
    };
    // ## Fonction statique *get*
    // Cette fonction retourne la chaîne correspondante à la clé demandée.
    // Si cette chaîne comprend des champs substitués, ceux-ci sont remplacés.
    Localisation.get = function (key, queryContext) {
        if (queryContext === void 0) { queryContext = {}; }
        for (var k in globalContext) {
            if (!globalContext.hasOwnProperty(k)) {
                continue;
            }
            if (queryContext[k]) {
                continue;
            }
            queryContext[k] = globalContext[k];
        }
        if (!localeStrings[key]) {
            console.error("Failed to find locale for " + key);
            return key;
        }
        // ***TODO***: Implémenter la substitution de clés
        console.log("queryContext: ", queryContext);
        return localeStrings[key];
    };
    // ## Méthode statique *setContext*
    // Cette méthode assigne une valeur au contexte
    // global qui sera substituée par défaut.
    Localisation.setContext = function (key, val) {
        globalContext[key] = val;
    };
    // ## Méthode statique *getContext*
    // Cette méthode obtient une valeur du contexte global.
    Localisation.getContext = function (key) {
        return globalContext[key];
    };
    return Localisation;
}());
exports.Localisation = Localisation;
