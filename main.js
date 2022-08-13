let schedule_motorcycles = [...document.querySelectorAll(".schedule_range-btn")];
let carrousel = document.querySelector(".carrousel-div");
let arrows = [...document.querySelectorAll(".arrow-img")];
let motor_information = document.querySelector(".motor_information-div");

/* --- SLIDER --- */

let current = 0;

function toggle_schedule(number) {
    if(!(current == 0 && number < 0) && !(current == 2 && number > 0)) {
        current += number;

        carrousel.style.transform = `translateX(${current * -100}%)`;
    }
}

arrows.forEach((arrow) => arrow.addEventListener("click", function() {
    if(this === arrows[0]) {
        toggle_schedule(-1);
    } else if(this === arrows[1]){
        toggle_schedule(1);
    }
}))

/* MOTORCYCLES */

let map_of_motorcycles = new Map();

let schedule_selected;

class schedule_obj {
    constructor(id, hours_range) {
        this.id = id;
        this.all_motors = [];
        this.information = `
            <h3>Este es el horario de ${hours_range}</h3>

            <aside class="motors-aside">
                <button class="motor-btn" type="button" data-id=0>1</button>
                <button class="motor-btn" type="button" data-id=1>2</button>
                <button class="motor-btn" type="button" data-id=2>3</button>
                <button class="motor-btn" type="button" data-id=3>4</button>

                <button class="motor-btn" type="button" data-id=4>5</button>
                <button class="motor-btn" type="button" data-id=5>6</button>
                <button class="motor-btn" type="button" data-id=6>7</button>
                <button class="motor-btn" type="button" data-id=7>8</button>
            </aside>

            <div class="motor_information-div"></div>
        `;
    }

    get_html_code() {
        return this.information;
    }

    insert_motors(motor) {
        this.all_motors.push(motor);
    }

    return_motor(motor_num) {
        return this.all_motors[motor_num];
    }
}

class motorcycle {
    constructor(id, name, number_image) {
        this.id = id;
        this.source_name = name;
        this.available = true;
        this.number_image = number_image;
        this.information = `
            <figure>
                <img src="./images/moto_${this.number_image}.jpg" alt="Moto chula :)">
            </figure>
            <p>
                Nombre de la moto: ${this.source_name}<br>
                Disponible: ${this.available ? "Si" : "No"}
            </p>
            `
    }

    show_information() {
        motor_information.innerHTML = this.information;
    }
}

schedule_motorcycles.forEach((schedule) => {
    let num_of_schedules = map_of_motorcycles.size;
    let schedule_object = new schedule_obj(num_of_schedules, schedule.innerHTML);

    for(let source = 1; source < 9; source++) {
        let motor_id = (num_of_schedules * 8) + source;
        schedule_object.insert_motors(new motorcycle(motor_id, `motorcycle_${motor_id}`, 1));
    }

    map_of_motorcycles.set(num_of_schedules, schedule_object);
    schedule.setAttribute("data-id", map_of_motorcycles.size - 1);
});

schedule_motorcycles.forEach((schedule) => schedule.addEventListener("click", function() {
    schedule_selected = Number(this.getAttribute("data-id"));
    document.querySelector(".choose_motor-sec").innerHTML = map_of_motorcycles.get(schedule_selected).get_html_code();

    motor_information = document.querySelector(".motor_information-div");

    let motors = [...document.querySelectorAll(".motor-btn")];

    motors.forEach((motor) => motor.addEventListener("click", function() {
        let motor_id = this.getAttribute("data-id");
        map_of_motorcycles.get(schedule_selected).return_motor(motor_id).show_information();
    }))
    
}));
