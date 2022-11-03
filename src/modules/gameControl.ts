import Food from "./food";
import ScorePanel from "./scorePanel";
import Snake from "./snake";

class GameControl {

    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    isLive: boolean = true;

    direction: string = 'ArrowRight';

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
    }

    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run();
    }

    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key;
    }

    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch (this.direction) {
            case 'Up':
            case 'ArrowUp':
                Y -= 10;
                break;
            case 'Down':
            case 'ArrowDown':
                Y += 10;
                break;
            case 'Left':
            case 'ArrowLeft':
                X -= 10;
                break;
            case 'Right':
            case 'ArrowRight':
                X += 10;
                break;
            default:
        }

        this.checkEat(X, Y);

        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e:any) {
            alert(e.message + ' Game Over!');
            this.isLive = false;
        }

        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
        }
    }

}

export default GameControl;
