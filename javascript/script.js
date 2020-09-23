function noteEdits() {
    for(var a = 0; a < document.querySelectorAll(".group-edit").length; a++) {
        document.querySelectorAll(".group-edit")[a].addEventListener("click", function() {
            document.querySelectorAll(".group-edit")[a].parentNode.firstElementChild.setAttribute("contenteditable", "true");
            document.querySelectorAll(".group-edit")[a].parentNode.firstElementChild.focus();
        });
    }
}

noteEdits();