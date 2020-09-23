function noteEdits() {
    for(var a = 0; a < document.querySelectorAll(".group-edit").length; a++) {
        document.querySelectorAll(".group-edit")[a].addEventListener("click", function() {
            this.parentNode.children[0].setAttribute("contenteditable", "true");
            this.parentNode.children[0].focus();
            
            var range = document.createRange();
            range.selectNodeContents(this.parentNode.children[0]);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            
            this.style.visibility = "hidden";

            this.parentNode.children[0].addEventListener("keydown", function(event) {
                if (event.keyCode === 13) {
                    this.parentNode.children[0].blur();
                }
            });

            this.parentNode.children[0].addEventListener("blur", function() {
                if (this.innerHTML === "") {
                    this.innerHTML = "Group Title";
                }
                this.setAttribute("contenteditable", "false");
                this.parentNode.children[1].style.visibility = "visible";
            });
        });
    }
}

noteEdits();