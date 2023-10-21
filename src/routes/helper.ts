
export const BLOCK_SIZE = 20
export const BLOCK_WIDTH = 14
export const BLOCK_HEIGHT = 30


export function getBoard(){

    let board:any[] = []

    // let row = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    // let row = Array(BLOCK_WIDTH).fill(0)
    for(let i=0; i<30; i++){
        let row = Array(BLOCK_WIDTH).fill(0)
        board.push(row)
    }
 
    return board

}

export const EVENTS = {
    LEFT:  'ArrowLeft',
    RIGHT: 'ArrowRight',
    DOWN:  'ArrowDown',
    UP:    'ArrowUp'
}

export const PIECES = [
    [
        [1,1],
        [1,1]
    ],
    [
        [1,1,1,1]
    ],
    [
        [1,0],
        [1,1],
        [0,1]
    ],
    [
        [0,1],
        [1,1],
        [1,0]
    ],
    [
        [0,1,0],
        [1,1,1]
    ],

    [
        [1,0,0],
        [1,1,1]
    ],
    [
        [0,0,1],
        [1,1,1]
    ]
]
