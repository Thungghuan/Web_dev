var position = {
    1: {
        top: "0px",
        left: "0px",
    },
    2: {
        top: "0px",
        left: "150px",
    },
    3: {
        top: "0px",
        left: "300px",
    },
    4: {
        top: "150px",
        left: "0px",
    },
    5: {
        top: "150px",
        left: "150px",
    },
    6: {
        top: "150px",
        left: "300px",
    },
    7: {
        top: "300px",
        left: "0px",
    },
    8: {
        top: "300px",
        left: "150px",
    },
    9: {
        top: "300px",
        left: "300px",
    }
}

function init() {
    var nums = shuffle();

    // console.log(nums);

    for (let i = 1; i <= 9; i++) {
        blockid = "block" + String(i);
        var n = findNumber(nums, i);
        document.getElementById(blockid).style.top = position[n].top;
        document.getElementById(blockid).style.left = position[n].left;
        // document.getElementById(blockid).style.top = position[i].top;
        // document.getElementById(blockid).style.left = position[i].left;
    }
}

function move(id) {
    var block = document.getElementById(id);
    var empty = document.getElementById('block9');

    // console.log(block);
    // console.log(empty);

    var blockPosition = findPosition(id);
    var emptyPosition = findPosition('block9');

    // console.log(blockPosition);
    // console.log(emptyPosition);

    if (testMove(blockPosition, emptyPosition)) {
        [block.style.top, empty.style.top] = [empty.style.top, block.style.top];
        [block.style.left, empty.style.left] = [empty.style.left, block.style.left]
    }
    if (testWin()) {
        setTimeout(() => {
            alert("Congratulations!");
            location.reload();
        }, 50);
    }
}

function findPosition(id) {
    var block = document.getElementById(id);
    for (let i = 1; i <= 9; i++) {
        if (block.style.left === position[i].left && block.style.top === position[i].top) {
            return i;
        }
    }
}

function testMove(block, empty) {
    switch (empty) {
        case 1:
            if (block == 2 || block == 4) return true;
            else return false;
        case 2:
            if (block == 1 || block == 3 || block == 5) return true;
            else return false;
        case 3:
            if (block == 2 || block == 6) return true;
            else return false;
        case 4:
            if (block == 1 || block == 5 || block == 7) return true;
            else return false;
        case 5:
            if (block == 2 || block == 4 || block == 6 || block == 8) return true;
            else return false;
        case 6:
            if (block == 3 || block == 5 || block == 9) return true;
            else return false;
        case 7:
            if (block == 4 || block == 8) return true;
            else return false;
        case 8:
            if (block == 5 || block == 7 || block == 9) return true;
            else return false;
        case 9:
            if (block == 6 || block == 8) return true;
            else return false;
    }
}

function shuffle() {
    var nums = new Array();
    for (let i = 1; i <= 9; i++) {
        nums[i - 1] = i;
    }
    console.log(nums);
    for (let j = 1; j <= 500; j++) {
        var nine = findNumber(nums, 9);
        var change = findNumber(nums, parseInt(8 * Math.random()) + 1);

        // console.log(nine);
        // console.log(change);
        // console.log("\n");

        if (testMove(change, nine)) {
            [nums[nine - 1], nums[change - 1]] = [nums[change - 1], nums[nine - 1]];
        } else continue;
    }
    return nums;
}

function findNumber(nums, n) {
    for (i = 0; i <= 8; i++) {
        if (nums[i] === n) {
            return i + 1;
        }
    }
}

function testWin() {
    for (let i = 1; i <= 9; i++) {
        blockid = "block" + String(i);
        block = document.getElementById(blockid);
        if (block.style.top != position[i].top || block.style.left != position[i].left) {
            return false;
        }
    }
    return true;
}