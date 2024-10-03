import * as linkedList from "./linked_list.js"

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const clamp = (val, mx, mn) => Math.max(mn, Math.min(mx, val))

const   r = (x) => clamp((-0.25*(x^2) + 1), 1, 0),
        g = (x) => clamp((-0.25*(x^2) + 0.5*x + 0.75), 1, 0),
        b = (x) => clamp((-0.25*(x^2) + 1*x), 1, 0)

const canvas = document.getElementById('game');
const ctx    = canvas.getContext('2d');

const fps = document.getElementById("fps")
const state = document.getElementById("state_text")

ctx.imageSmoothingEnabled = false

canvas.height = 400;
canvas.width = 400;

const size = 2

var lft = Date.now();
var deltaTime = 0;



/* -------------------------------------------------------------------------- */
/*                               Initialization                               */
/* -------------------------------------------------------------------------- */


const pixel = {
    size: {
        x: 20,
        y: 20
    }
}

var worm = {
    x: 0,
    y: 0,
    last_dir: 0
}

const map_init = {
    width: Math.round(canvas.width/pixel.size.x),
    height: Math.round(canvas.height/pixel.size.y)
}
const total_cross = Math.ceil(map_init.height/2)*Math.ceil(map_init.width/2)


const gen_per_frame = 1
const timemout_between_frames = 100


let cur_cross = 1
let total_blocked_paths = 0
let blocked_paths = [0,0,0,0]

let path_back = new linkedList.LinkedList()

canvas.height = map_init.height*pixel.size.y;
canvas.width = map_init.width*pixel.size.x;

var map = []
for(let i=0; i<map_init.width; i++) {
    map.push(new Array(map_init.height).fill(0));
}
map[0][0] = 1

window.requestAnimationFrame(update)



/* -------------------------------------------------------------------------- */
/*                                    Main                                    */
/* -------------------------------------------------------------------------- */

function gen() {
    let cur_dir = getRandomInt(4)
    let ny = worm.y, nx = worm.x

    if (total_blocked_paths == 4) {
        let head = path_back.removeHead()

        if (!head) {
            do {
                worm.x = getRandomInt(Math.floor(map_init.width/2))*2
                worm.y = getRandomInt(Math.floor(map_init.height/2))*2
            } while (map[worm.x][worm.y] == 0);
            
            total_blocked_paths = 0
            blocked_paths = [0,0,0,0]
    
            return
        }

        switch (head.data) {
            case 0:
                ny += 2
                break;
            case 1:
                nx += 2
                break;
            case 2:
                ny -= 2
                break;
            case 3:
                nx -= 2
                break;
            default:
                break;
        }

        total_blocked_paths = 0
        blocked_paths = [0,0,0,0]

        worm.x = nx
        worm.y = ny
    }
    if (blocked_paths[cur_dir] == 1) return

    switch (cur_dir) {
        case 0:
            ny += 2
            break;
        case 1:
            nx += 2
            break;
        case 2:
            ny -= 2
            break;
        case 3:
            nx -= 2
            break;
        default:
            break;
    }

    if (0 > nx || map_init.width <= nx) {
        total_blocked_paths += 1
        blocked_paths[cur_dir] = 1

        return
    } else if (0 > ny || map_init.height <= ny) {
        total_blocked_paths += 1
        blocked_paths[cur_dir] = 1
        
        return
    }

    if (map[nx][ny] != 0) {
        total_blocked_paths += 1
        blocked_paths[cur_dir] = 1
        
        return
    }

    map[nx][ny] = cur_cross+1

    path_back.appendNode(new linkedList.Node((cur_dir+2)%4))

    map[(worm.x+nx)/2][(worm.y+ny)/2] = cur_cross+1
    worm.x = nx
    worm.y = ny

    cur_cross += 1
    total_blocked_paths = 0
    blocked_paths = [0,0,0,0]
}


function update() {
    if (gen_per_frame == 1) {
        gen()
    } else {
        for (let index = 0; index < gen_per_frame; index++) {
            gen()
        }
    }


    /* ----------------------------- Next Frame Prep ---------------------------- */

    
    draw()
    
    if (total_cross == cur_cross) return
    
    if (timemout_between_frames > 0) {
        setTimeout(() => window.requestAnimationFrame(update), timemout_between_frames)
    } else {
        window.requestAnimationFrame(update)
    }
}



/* -------------------------------------------------------------------------- */
/*                                    Draw                                    */
/* -------------------------------------------------------------------------- */


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < map_init.width; x++) {
        for (let y = 0; y < map_init.height; y++) {
            if (x == worm.x && y == worm.y) {
                ctx.fillStyle = "violet"
            } else if (map[x][y] === 0) {
                continue
            } else {
                ctx.fillStyle = `rgb(${r(map[x][y]/total_cross*2)*255}, ${g(map[x][y]/total_cross*2)*255}, ${b(map[x][y]/total_cross*2)*255})`
            }
            
            ctx.fillRect(x*pixel.size.x, y*pixel.size.y, pixel.size.x, pixel.size.y)
        }
    }
}