const cars = [  // array of objects
    { model: 'bentley', price: 8000 },
    { model: 'bmw', price: 6000 },
    { model: 'lada', price: 500 },
]

// using Array.forEach() method (unknown implementation)
cars.forEach(car => car.model) // -> [ 'bentley', 'bmw', 'lada' ] 
cars.forEach(car => car.price) // -> [ 8000, 6000, 500 ] 
cars.forEach(car => car.model + ' price is: ' + car.price) // -> [ 'bentley price is: 8000', 'bmw price is: 6000', 'lada price is: 500']

// same as 7-10 lines, but using functions saved to const:
const getCarModel = car => car.model
const getCarPrice = car => car.price
const getCarDescription = car => car.model + ' price is: ' + car.price
cars.forEach(getCarModel)
cars.forEach(getCarPrice)
cars.forEach(getCarDescription)

// .forEach() method mutates original Array!


// making our own forEach implementation:
function forEach(arr, fn) {
    let index
    let arrElement
    for (index = 0; i < arr.length; i++) {
        arrElement = arr[i]
        fn(arrElement) // call our fn with each array element sequencially
    }
}

forEach(cars, car => car.model)
forEach(cars, car => car.price)
forEach(car => car.model + ' price is: ' + car.price)


// now our example with dom event handling:
const animatedElementsNodeList = document.querySelectorAll('.element-with-transition')  // -> NodeList of Node elements with class .element-with-transition
const animatedElementsArray = Array.from(animatedElementsNodeList)  // -> Array of same Node elements
animatedElementsArray.forEach(element => element.addEventListener('transitionend', removeTransition))  // calling inner function on each Array element

function removeTransition(e) {
    const keyCode = e.keyCode  // each keyboard button has unique numbered-index
    const pressedElement = document.querySelector(`audio[data-key=${keyCode}]`)  // search our pressed element with this unique key
    const playingClassName = 'playing'  // saving our css class for animation to constant
    pressedElement.classList.remove(playingClassName)  // removing our css class from list of pressed element classes
}