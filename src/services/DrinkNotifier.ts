import { Observer } from "./Observer";

class DrinkNotifier {
    private observers: Observer[] = [];
    private latestDrink:any[] = [];

    attach(observer: Observer) {
        this.observers.push(observer);
    }
    detach(observer: Observer) {
        this.observers = this.observers.filter(o => o !== observer);
    }
    notify(data: any) {
        this.latestDrink.push(data);
        this.observers.forEach(observer => observer.update(data));
    }

    getLatestDrink() {
        return this.latestDrink;
    }
}

export default new DrinkNotifier(); // SINGLETON