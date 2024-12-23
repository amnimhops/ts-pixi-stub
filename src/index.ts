import * as PIXI from "pixi.js"
import cat from "./assets/resources/nyan.png"
// La inicialización de la aplicación es asíncrona, por lo que
// hemos de ejecutar el código en un contexto apropiado
( async () => {
    // Creamos la aplicación
    const app:PIXI.Application = new PIXI.Application({
        background:'black'
    })
    // Inicializamos la aplicación
    await app.init()
    // Añadimos el canvas al DOM
    document.body.appendChild(app.canvas)

    // Cargamos la textura del gatete
    const texture = await PIXI.Assets.load<PIXI.Texture>(cat)

    // Creamos un nuevo sprite para el gatete y lo añadimos al contenedor
    const [width,height] = [app.canvas.width, app.canvas.height]
    const sprite = new PIXI.Sprite(texture)
    sprite.position.set(width/2, height/2)
    
    // Añadimos el gato al contenedor de la aplicación
    app.stage.addChild(sprite)

    // El gato se moverá en el eje Y siguiendo una función
    // sinusoidal.
    const MAX_Y = 100
    let angle = 0

    app.ticker.add( ()=>{
        angle = angle + 0.01
        if(angle > Math.PI * 2) angle = 0

        const w = (width - texture.width) / 2
        const h = (height - texture.height) / 2
        const delta = MAX_Y * Math.sin(angle)

        sprite.position.set(w,h + delta)
    })
})();