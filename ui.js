function getLocalStorage(key, placeholder) {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, placeholder)

        return placeholder
    }

    return localStorage.getItem(key)
}



/* -------------------------------------------------------------------------- */
/*                                  Bootstrap                                 */
/* -------------------------------------------------------------------------- */


const myModal = document.getElementById('settings_modal')
const myInput = document.getElementById('settings_open')

myModal.addEventListener('shown.bs.modal', () => {
    myInput.focus()
})



/* -------------------------------------------------------------------------- */
/*                              Settings Recovery                             */
/* -------------------------------------------------------------------------- */


const settings = {
    canvas_x: {id: "canvas_input_width", placeholder: 800},
    canvas_y: {id: "canvas_input_height", placeholder: 800},
    pixel_x: {id: "pixel_input_width", placeholder: 10},
    pixel_y: {id: "pixel_input_height", placeholder: 10},
    random_cross_div: {id: "rand_cross_div_input", placeholder: 8},
    color_type: {id: "color_type_input", placeholder: "rgb"},
    gen_per_frame: {id: "genperframe_input", placeholder: 50},
    timeout: {id: "timeout_input", placeholder: 0}
}


for (let key in settings) {
    document.getElementById(settings[key].id).value = getLocalStorage(key, settings[key].placeholder)
}

document.getElementById('random_spawn_input').checked = +getLocalStorage("random_spawn", 0) == 0 ? false : true



/* -------------------------------------------------------------------------- */
/*                                Settings Save                               */
/* -------------------------------------------------------------------------- */


document.getElementById('button_save_settings').addEventListener("click", () => {
    for (let key in settings) {
        localStorage.setItem(key, document.getElementById(settings[key].id).value)
    }

    localStorage.setItem("random_spawn", document.getElementById('random_spawn_input').checked ? 1 : 0)
})