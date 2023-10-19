<script lang=ts>
	import { browser } from "$app/environment";

    let startLabel: any
    let canvas: any
    let context: any
    let points = 0

    const BLOCK_SIZE = 20
    const BLOCK_WIDTH = 14
    const BLOCK_HEIGHT = 30

    const EVENTS = {
        LEFT:  'ArrowLeft',
        RIGHT: 'ArrowRight',
        DOWN:  'ArrowDown',
        UP:    'ArrowUp'
    }

    let board = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]

    const PIECES = [
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

    let piece = {
        position: {x:7, y:0},
        shape: [
            [1,1,1,1]
        ]
    }
    
    
    function start() {
        if(!browser) return
        
        canvas.width = BLOCK_SIZE * BLOCK_WIDTH
        canvas.height = BLOCK_SIZE * BLOCK_HEIGHT
        context = canvas.getContext('2d')
        context.scale(BLOCK_SIZE, BLOCK_SIZE)

        document.addEventListener('keydown', event =>{
            const currentX = piece.position.x
            const currentY = piece.position.y

            if (event.key === EVENTS.LEFT) piece.position.x--
            if (event.key === EVENTS.RIGHT) piece.position.x++
            if (event.key === EVENTS.DOWN) piece.position.y++

            if (event.key === EVENTS.UP) rotatePiece()

            if (checkCollision()){
                piece.position.x = currentX
                piece.position.y = currentY
                if(event.key === 'ArrowDown'){
                    freezPiece()
                    removeRows()
                }
            }
            draw()
        })

        startLabel.style = 'display: none'
        // startLabel.remove()
        canvas.focus()

        update()
    }

    let dropCounter = 0
    let lastTime = 0


    function rotatePiece (){
        
        // [
        //     [0,1,0],
        //     [1,1,1]
        // ],
        // rotate
        // [
        //     [1,0],
        //     [1,1],
        //     [1,0]
        // ],
                
        let rotated:any[] = []
        for (let i = 0; i < piece.shape[0].length; i++){
            const row=[]
            for (let j = piece.shape.length-1; j >= 0; j--){
                row.push(piece.shape[j][i])
            }
            rotated.push(row)
        }

        const previous = piece.shape
        piece.shape = rotated
        console.log('rotate', piece.shape, previous)
        if(checkCollision()){
            piece.shape = previous
        }

    }



    function update(time = 0){
        const deltaTime = time - lastTime
        lastTime = time
        dropCounter += deltaTime

        if(dropCounter > 1000){
            piece.position.y++
            dropCounter = 0

            if (checkCollision()){
                piece.position.y--
                freezPiece()
                removeRows()
            }
            draw()
        }

        // draw()
        window.requestAnimationFrame(update)
    }


    function checkCollision() {
        return piece.shape.find((row,y)=>{
            return row.find((value,x)=>{
                return (
                    value != 0 &&
                    board[y + piece.position.y]?.[x + piece.position.x] != 0
                )
            })
        })
    }

    function draw() {
        if (!canvas ||
            !canvas.width){
                console.log('canvas null', canvas)
            }
        console.log('draw')
        context.fillStyle = "#000"
        context.fillRect(0,0, canvas.width, canvas.height)

        board.forEach((row, y)=>{
            row.forEach((value, x)=> {
                if(value === 1){
                    context.fillStyle='yellow'
                    context.fillRect(x,y,1,1)
                }
            })
        })

        piece.shape.forEach((row, y)=>{
            row.forEach((value, x)=> {
                if(value){
                    context.fillStyle='red'
                    context.fillRect(x+piece.position.x,y+piece.position.y,1,1)
                }
            })
        })
    }

    function freezPiece () {
        piece.shape.forEach((row, y)=>{
            row.forEach((value, x)=> {
                if(value===1){
                    board[y +piece.position.y][x+piece.position.x] = 1
                }
            })
        })

        piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]
        piece.position.x = 6
        piece.position.y = 0

        if (checkCollision()){
            alert('game over')
            board.forEach((row)=> row.fill(0))
            points = 0
        }

    }

    function removeRows () {
        const rowsToRemove:number[] = []

        board.forEach((row, y)=>{
            if (row.every(value => value===1)){
                rowsToRemove.push(y)
            }
        })

        rowsToRemove.forEach((y) => {
            board.splice(y,1)
            const newRow = Array(BLOCK_WIDTH).fill(0)
            board.unshift(newRow)
            points += 10
        })
    }

</script>

<section bind:this={startLabel} on:click={start}>
    Start
</section>
<canvas bind:this="{canvas}" contextmenu="2d">
</canvas>
<span>Points: {points}</span>
