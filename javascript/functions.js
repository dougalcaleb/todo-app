// VERSION 1.0.3
console.log("Using Javascript Basic Functions v1.0.3");

function obj_length(obj) {
    let length = 0;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            length++;
        }
    }
    return length;
}

function arr_last(arr) {
    return arr[arr.length-1];
}

function arr_rotate(arr, dir) {
    if (dir === 0) {        // left
        arr.push(arr[0]);
        arr.shift();
        return arr;
    } else if (dir === 1) { // right
        arr.unshift(last(arr));
        arr.pop();
        return arr;
    } else {
        return "INVALID DIRECTION";
    }
}

function rand_hex_color() {
    let finalColor = "#",
    colors = [],
    rand = 0;

    for (let a = 0; a < 6; a++) {
        rand = Math.floor(Math.random()*16);
        switch(rand) {
            case 0:
                colors.push("0");
                break;
            case 1:
                colors.push("1");
                break;
            case 2:
                colors.push("2");
                break;
            case 3:
                colors.push("3");
                break;
            case 4:
                colors.push("4");
                break;
            case 5:
                colors.push("5");
                break;
            case 6:
                colors.push("6");
                break;
            case 7:
                colors.push("7");
                break;
            case 8:
                colors.push("8");
                break;
            case 9:
                colors.push("9");
                break;
            case 10:
                colors.push("a");
                break;
            case 11:
                colors.push("b");
                break;
            case 12:
                colors.push("c");
                break;
            case 13:
                colors.push("d");
                break;
            case 14:
                colors.push("e");
                break;
            case 15:
                colors.push("f");
                break;
        }
    }

    for (let b in colors) {
        finalColor += colors[b];
    }

    return finalColor;
}