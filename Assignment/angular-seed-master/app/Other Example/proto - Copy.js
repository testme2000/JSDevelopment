function Car(color, steering) {
    this.color = color;
    this.steering = steering;
}

Car.prototype.year = 2017;

var car = new Car('red','right');

console.log(car.color);
console.log(car.year);
console.log(car.hasOwnProperty('year'));
console.log(car.hasOwnProperty('color'));
                               
Car.prototype.data = {};
                               
car.data.engine = 'front';
console.log(car.data.engine);
console.log(car.hasOwnProperty('data'));
console.log(Car.prototype.hasOwnProperty('data'));
console.log(Car.hasOwnProperty('data'));
console.log("--------------------------------------------------------------------------------");
console.log("Constructing another object");

var cadi = {
    color: 'tan',
    year: 1965,
    model: 'GM Cadilac',
    convertible: false,
    total_seat: 5,
    current_milage: 12892
};

console.log(cadi.model);
cadi.owner = 'Jamesudin Maneger';
console.log(cadi);
delete cadi.owner;
console.log(cadi);
console.log(Car.hasOwnProperty('data'));
console.log("--------------------------------------------------------------------------------");
console.log("Constructing another object second part");
var ford = Object.create(car);
console.log(ford);
console.log(Object.getPrototypeOf(ford));