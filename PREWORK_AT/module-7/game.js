$(document).ready(function() {

const MouseSpeed = {'slow': 1, 'fast':2};

const Level = {    'easy': {MouseSpeed:MouseSpeed[slow]},    'hard': {MouseSpeed:MouseSpeed[fast]}};

class Game {
    constructor(lives = 3, level = Level[easy], holes = 10) {
        this.lives = lives;
        this.score=0;
        this.level = level;
        this.holes = holes;
        this.threads = Array(holes).fill(null);
    }

    start() {
                var gameClock = setTimeout(() => {
                    var mouse = new Mouse();
                    var hole;
                    do {
                        hole = Math.random() * 10 | 0;
                    } while (this.threads[hole] !== null);
                    mouse.setHole(hole);
                    threads[hole] = setTimeout(() => {
                        if (mouse.location < 20) {
                            mouse.move();                            
                        } else {
                            clearInterval(this.threads[hole]);
                            this.threads[hole]= null;
                        }
                    }, 1000);
                    if (lives <= 0) {
                        clearInterval(gameClock);
                    }
                }, 1000);
    }
}

var game = new Game();
var cat = new Cat();
game.start();

class Cat {
    constructor() {
        this.location = Game.holes / 2 | 0;
    }

    move(toLeft) {
        this.location = toLeft? Math.max(0, this.location - 1) : Math.min(this.location + 1, Game.holes - 1);
    }
    
    shoot() {
        var bullet = new Bullet(this.location);
        bullet.setLocation(0);
        var bullet = new bullet(this.location);
        bullet.fire();
    }
};

class Bullet() {
    construcor(gun) {
        this.gun = gun;
        this.location = 0;
    }
    move() {
        if (this.location < 30) {
            this.location++;            
        }
    }
}

class Mouse {
    constructor() {
        this.location = 0;
    }

    move() {
        this.location++;
    }

    setHole(hole) {
        this.hole = hole;
    }
}

function moveMouse(mouse) {
    if (mouse.location >= 30) {
        clearInterval(threads[mouse.hole]);
        mouse = null;
    } else {
        mouse.move();
    }
}

function dropMouse() {
    if (lives > 0) {
    } else{
        clearInterval(gameInterval);
    }
}
}