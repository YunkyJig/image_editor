const fileInput = document.getElementById('fileInput')
const canvas = document.getElementById('image')
const canvas2 = document.getElementById('image2')
const scale = document.getElementById('scale')
const color = document.getElementById('color')
const rotateBtn = document.getElementById('rotate')
const buddyCheckbox = document.getElementById('buddy')

let origHeight = 0
let origWidth = 0

fileInput.onchange = (e) => {
    const file = e.target.files[0]
    
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.src = url
    
    img.onload = () => {
        const ctx = canvas.getContext("2d")
        canvas.width = origWidth = img.naturalWidth
        canvas.height = origHeight = img.naturalHeight

        ctx.drawImage(img, 0, 0)
        scale.oninput = (e) => { changeScale(e.target.value, img.naturalWidth, img.naturalHeight, img) }
        rotateBtn.onclick = () => { rotateImage(img) }
    }
}

const ctx = canvas.getContext("2d")
const changeScale = (scale, width, height, img) => {
    if(scale > 0) {
        ctx.save()
        canvas.width = width * scale
        canvas.height = height * scale
        
        console.log('scale', scale, 'width', canvas.width, 'height', canvas.height)
        ctx.scale(scale, scale)
        // ctx.drawImage(img, 0, 0)
        rotateImage(img, true)
        // ctx.restore()
    }
}

let rotationAngle = 0;

// note: origHeight/Width can be replaced with ctx.width
const rotateImage = (img, fromScale=false) => {
    console.log('rotating')
    if(!fromScale) {
        rotationAngle += 90;
        // const ctx = canvas.getContext("2d")
        ctx.save()
        
        const tempHeight = canvas.height
        canvas.height = canvas.width
        canvas.width = tempHeight
    }
    // ctx.save()
    ctx.rotate(rotationAngle * Math.PI / 180);
    
    console.log('width', canvas.width, 'height', canvas.height)
    console.log('angle', rotationAngle)
    
    // order of the if/else if statements matter
    if(rotationAngle % 360 === 0) {
        console.log('360')
        rotationAngle = 0
        ctx.translate(0, 0)
    }
    else if(rotationAngle % 270 === 0) {
        console.log('270')
        fromScale ? ctx.translate(-origHeight, 0)
            : ctx.translate(-canvas.height, 0)
    }
    else if(rotationAngle % 180 === 0) {
        console.log('180')
        fromScale ? ctx.translate(-origWidth, -origHeight)
            : ctx.translate(-canvas.width, -canvas.height)
    }
    else if(rotationAngle % 90 === 0) {
        console.log('90', fromScale, 'canvaswidth', -canvas.width / 2)
        fromScale ? ctx.translate(0, -origWidth)
            : ctx.translate(0, -canvas.width)
    }
    ctx.drawImage(img, 0, 0);
    ctx.restore()
    // Reset the canvas transform
    // ctx.setTransform(1, 0, 0, 1, 0, 0);

}