class Angel extends GrassEater {
    constructor(x, y) {
        super(x, y);
        this.energy = 60;
        this.directions = [];
    }

    chooseCell(character, food1, food2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == food1 || matrix[y][x] == food2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        var found = this.chooseCell(0);
        var newCell = random(found);

        if (newCell && this.energy >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
            angelArr.push(new Angel(newX, newY));
            this.energy = 5;
        }
    }

    move() {
        var found = this.chooseCell(0);
        var newCell = random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
        this.energy--;

        if (this.energy < 0) {
            this.die();
        }
    }

    eat() {
        var found = this.chooseCell(3, 5);
        var newCell = random(found);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;     
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.energy++;
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            for (var i in monsterArr) {
                if (newX == monsterArr[i].x && newY == monsterArr[i].y) {
                    monsterArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 15) {
                this.mul();
            }
        }
        else {
            this.move();
        }
    }

    die() {
        for (var i in angelArr) {
            if (this.x == angelArr[i].x && this.y == angelArr[i].y) {
                angelArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}


