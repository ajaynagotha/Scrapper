
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("runit").addEventListener('click',runScript);
    document.getElementById("grunit").addEventListener('click',grunScript);
    document.getElementById("urunit").addEventListener('click',urunScript);
});

function runScript() {
    chrome.runtime.sendMessage({message: "run script"}, function(response) {
      });
}
function grunScript() {
    chrome.runtime.sendMessage({message: "grun script"}, function(response) {
      });
}
function urunScript() {
    chrome.runtime.sendMessage({message: "urun script"}, function(response) {
      });
}