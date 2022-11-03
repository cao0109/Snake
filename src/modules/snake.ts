class Snake {

    head: HTMLElement;
    body: HTMLCollection;
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div')!;
        this.body = this.element.getElementsByTagName('div');
    }

    // Get X coordinate
    get X() {
        return this.head.offsetLeft;
    }

    // Get Y coordinate
    get Y() {
        return this.head.offsetTop;
    }

    // Set X coordinate
    set X(value) {
        // If the new value is equal to the old value, then return
        if (this.X === value) {
            return;
        }
        // If the value is greater than 290, then the snake is dead
        if (value > 290 || value < 0) {
            throw new Error('Snake is dead!');
        }
        if (this.body[1] && (this.body[1] as HTMLElement).offsetLeft === value) {
            if (value > this.X) {
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }
        this.moveBody();
        this.head.style.left = value + 'px';
        // If the snake hits the body, then the snake is dead
        this.checkHeadBody();
    }

    // Set Y coordinate
    set Y(value) {
        // If the new value is equal to the old value, then return
        if (this.Y === value) {
            return;
        }
        // If the value is greater than 290, then the snake is dead
        if (value > 290 || value < 0) {
            throw new Error('Snake is dead!');
        }

        if (this.body[1] && (this.body[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        // If the snake hits the body, then the snake is dead
        this.checkHeadBody();

    }

    // Add body
    addBody() {
        this.element.insertAdjacentHTML('beforeend', '<div></div>');
    }

    moveBody() {
        for (let i = this.body.length - 1; i > 0; i--) {
            // Get the X coordinate of the previous body
            let X = (this.body[i - 1] as HTMLElement).offsetLeft;
            // Get the Y coordinate of the previous body
            let Y = (this.body[i - 1] as HTMLElement).offsetTop;
            (this.body[i] as HTMLElement).style.left = X + 'px';
            (this.body[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    checkHeadBody() {
        for (let i = 1; i < this.body.length; i++) {
            let bd = this.body[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error('Snake hit the body!');
            }
        }
    }

}

export default Snake;
