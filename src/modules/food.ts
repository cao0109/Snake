//food
class Food {
    element: HTMLElement;

    constructor() {
        // Get the existing element
        this.element = document.getElementById('food')!;
    }

    // Get X coordinate
    get X() {
        return this.element.offsetLeft;
    }

    // Get Y coordinate
    get Y() {
        return this.element.offsetTop;
    }

    change() {
        let left = Math.round(Math.random() * 29) * 10;
        let top = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}

export default Food;
