var activeGroup = null;
var nextFree = 0;
var editing = false;

document.querySelector(".new-general").addEventListener("click", newGroup);
document.addEventListener("keydown", keydn);

function keydn(event) {
	switch(event.keyCode) {
		case 78:
            if (!editing) {
                newGroup();
            }
            break;
        case 69: // nice
            if (!editing) {
                editing = true;
                var e = new CustomEvent("click", { "detail": "true1" });
                document.querySelector(".g"+activeGroup).children[1].children[1].dispatchEvent(e);
            }
            break;
	}
}

function newGroup() {
    var ng = document.createElement("DIV");
    ng.classList.add("g"+nextFree, "group", "group-active");
    document.querySelector(".sidebar").appendChild(ng);
    ng.innerHTML = "<p contenteditable='false' spellcheck='false' class='group-title'>Group Title</p><div class='group-menu'><svg viewBox='0 0 24 24' class='group-menu-delete'><path fill='currentColor' d='M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z' /></svg><svg viewBox='0 0 24 24' class='group-menu-edit'><path fill='currentColor' d='M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z' /></svg><svg viewBox='0 0 24 24' class='group-menu-select'><path fill='currentColor' d='M22,16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H20A2,2 0 0,1 22,4V16M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16M13,14L20,7L18.59,5.59L13,11.17L9.91,8.09L8.5,9.5L13,14Z' /></svg></div><div class='group-notes'>    <div class='note n1'>New Note</div>    </div>";

    if (activeGroup !== null) {
        document.querySelector(".g"+activeGroup).classList.remove("group-active");
        document.querySelector(".g"+activeGroup).classList.add("group-inactive");
    }
    activeGroup = (nextFree/1);
    nextFree++;
    noteEdits();
    editing = true;
    var e = new CustomEvent("click", { "detail": "true2" }, false);
    document.querySelector(".g"+activeGroup).children[1].children[1].dispatchEvent(e);
}


function noteEdits() {
    // group title edit via "e" press (event sent in keydn), via edit btn click, or via new group btn
    for(var a = 0; a < document.querySelectorAll(".group-menu-edit").length; a++) {
        document.querySelectorAll(".group-menu-edit")[a].addEventListener("click", function(event) {
            
            // if using e, wait for stack clear so e is not counted as an input
            if (event.detail === "true1" || event.detail === "true2") {
                setTimeout(waitForStackClear = () => {
                    this.parentNode.parentNode.children[0].setAttribute("contenteditable", "true");
                    this.parentNode.parentNode.children[0].focus();
                }, 0);
            } else {
                this.parentNode.parentNode.children[0].setAttribute("contenteditable", "true");
                this.parentNode.parentNode.children[0].focus();
            }

            // create a selection range for the group title text
            var range = document.createRange();
            range.selectNodeContents(this.parentNode.parentNode.children[0]);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            // when enter
            this.parentNode.parentNode.children[0].addEventListener("keydown", function(e) {
                console.log("big boy "+editing);
                if (e.keyCode === 13) {
                    this.blur();
                    this.removeEventListener("keydown", null);
                }
            });

            this.parentNode.parentNode.children[0].addEventListener("blur", function() {
                if (this.innerHTML === "") {
                    this.innerHTML = "Group Title";
                }
                this.setAttribute("contenteditable", "false");
                if (event.detail === 1) {
                    editing = false;
                }
            });
        });
    }

    // group title edit via double click
    for(var b = 0; b < document.querySelectorAll(".group").length; b++) {
        document.querySelectorAll(".group-title")[b].addEventListener("dblclick", function() {

            editing = true;

            this.setAttribute("contenteditable", "true");
            this.focus();

            var range = document.createRange();
            range.selectNodeContents(this);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            this.addEventListener("keydown", function(event) {
                if (event.keyCode === 13) {
                    this.blur();
                }
            }, {once: true});

            this.addEventListener("blur", function() {
                if (this.innerHTML === "") {
                    this.innerHTML = "Group Title";
                }
                this.setAttribute("contenteditable", "false");
                editing = false;
            });
        });
    }

    // active group switching
    for (var c = 0; c < document.querySelectorAll(".group").length; c++) {
        document.querySelectorAll(".group")[c].addEventListener("click", function() {
            if (document.querySelectorAll(".group-active").length > 0) {
                document.querySelector(".group-active").classList.toggle("group-inactive");
                document.querySelector(".group-active").classList.toggle("group-active");
            }
            activeGroup = this.classList[0].split("")[1];
            this.classList.toggle("group-active");
            this.classList.toggle("group-inactive");
        });
    }

    for (var d = 0; d < document.querySelectorAll(".note").length; d++) {
        document.querySelectorAll(".note")[d].addEventListener("dblclick", function() {

            editing = true;
                
            this.setAttribute("contenteditable", "true");
            this.focus();

            var range = document.createRange();
            range.selectNodeContents(this);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            this.addEventListener("keydown", function(e) {
                console.log("lil boy "+editing);
                if (e.keyCode === 13) {
                    this.blur();
                    this.removeEventListener("keydown", null);
                }
            });

            this.addEventListener("blur", function() {
                if (this.innerHTML === "") {
                    this.innerHTML = "New Note";
                }
                this.setAttribute("contenteditable", "false");
                editing = false;
            });
        });
    }
}



noteEdits();