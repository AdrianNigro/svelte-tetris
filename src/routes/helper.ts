

export function getBoard(){

    let board:any[] = []

    let row = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    for(let i=0; i<30; i++){
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
