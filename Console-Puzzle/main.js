function createNumber() {
    var nums = new Array();
    var moves = new Array("w", "a", "s", "d");
    for (let i = 1; i < 9; i++) {
        nums[i - 1] = i;
    }
    nums.push(0);

    for (let i = 0; i < 500; ++i) {
        var index = parseInt(4 * Math.random());
        // console.log(moves[index]);
        if (testMove(nums, moves[index])) {
            moveNumber(nums, moves[index]);
        }
    }
    return nums;
}

function findZero(nums) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) return i;
    }
}

function printNumber(nums) {
    zero = findZero(nums);
    for (let i = 0; i < 3; i++) {
        var row = new Array();
        for (let j = 0; j < 3; j++) {
            var index = i * 3 + j;
            if (index === zero)
                row[j] = " ";
            else row[j] = String(nums[index]);
        }
        console.log(row);
    }
}

function testMove(nums, direction) {
    zero = findZero(nums);
    switch (direction) {
        case 'w':
            if (zero > 5)
                return false;
            else return true;
        case 's':
            if (zero < 3)
                return false;
            else return true;
        case 'a':
            if ((zero + 1) % 3 == 0)
                return false;
            else return true;
        case 'd':
            if (zero % 3 == 0)
                return false;
            else return true;
        case 'f':
            return true;
        default:
            return false;
    }
}

function moveNumber(nums, direction) {
    zero = findZero(nums);
    switch (direction) {
        case 'w':
            [nums[zero], nums[zero + 3]] = [nums[zero + 3], nums[zero]]; //up
            return;
        case 's':
            [nums[zero], nums[zero - 3]] = [nums[zero - 3], nums[zero]]; //down
            return;
        case 'a':
            [nums[zero], nums[zero + 1]] = [nums[zero + 1], nums[zero]]; //left
            return;
        case 'd':
            [nums[zero], nums[zero - 1]] = [nums[zero - 1], nums[zero]]; //right
            return;
    }
}

function testWin(nums) {
    for (let i = 0; i < nums.length -1; i++) {
        if (nums[i] != i + 1) {
            return false;
        }
    }
    return true;
}

function main() {
    var nums = createNumber();
    var direction;
    printNumber(nums);

    document.addEventListener("keydown", function (event) {
        key = event.keyCode;
        // console.log(key);
        switch (key) {
            case 38:
            case 87:
                direction = 'w';
                break;
            case 40:
            case 83:
                direction = 's';
                break;
            case 37:
            case 65:
                direction = 'a';
                break;
            case 39:
            case 68:
                direction = 'd';
                break;
            case 82:
                this.location.reload();
                break;
            case 123:
                direction = "f";
                break;
            default:
                direction = 'error';
                break;
        }
        console.log(direction);
        if (testMove(nums, direction)) {
            moveNumber(nums, direction);
            printNumber(nums);
        }
        else {
            var error = document.getElementById("error");
            error.style.display = "inline";
            setTimeout(() => {error.style.display = "none"}, 1000);
        }
        if (testWin(nums)) {
            alert("Congratulation!");
            this.location.reload();
        }
    })
}