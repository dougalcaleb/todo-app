var activeGroup = "Group Title";

function noteEdits() {
    for(var a = 0; a < document.querySelectorAll(".group-menu-edit").length; a++) {
        document.querySelectorAll(".group-menu-edit")[a].addEventListener("click", function() {
            this.parentNode.parentNode.children[0].setAttribute("contenteditable", "true");
            this.parentNode.parentNode.children[0].focus();
            
            var range = document.createRange();
            range.selectNodeContents(this.parentNode.parentNode.children[0]);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);            

            this.parentNode.parentNode.children[0].addEventListener("keydown", function(event) {
                if (event.keyCode === 13) {
                    this.parentNode.children[0].blur();
                }
            });

            this.parentNode.parentNode.children[0].addEventListener("blur", function() {
                if (this.innerHTML === "") {
                    this.innerHTML = "Group Title";
                }
                this.setAttribute("contenteditable", "false");
            });
        });
    }

    for (var b = 0; b < document.querySelectorAll(".group").length; b++) {
        document.querySelectorAll(".group")[b].addEventListener("click", function() {
            this.classList.toggle("group-active");
            this.classList.toggle("group-inactive");
        });
    }
}



noteEdits();