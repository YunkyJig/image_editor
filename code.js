const fileInput = document.getElementById('fileInput')
const canvas = document.getElementById('image')
const scale = document.getElementById('scale')
const color = document.getElementById('color')
const rotateBtn = document.getElementById('rotate')
const buddyCheckbox = document.getElementById('buddy')

fileInput.onchange = (e) => {
    const file = e.target.files[0]
    
    const url = URL.createObjectURL(file)
    const img = new Image()
    console.log(url)
    img.src = url
    
    img.onload = () => {
        console.log(img.height, img.width)
        const ctx = canvas.getContext("2d")
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        // ctx.scale(2, 2)
        // ctx.drawImage(img, 0, 0, canvas.width * 2, canvas.height * 2, 0, 0, canvas.width * 2, canvas.height * 2)
        ctx.drawImage(img, 0, 0)
        // ctx.drawImage(img, 0, 0, 600, 600)
        // ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
        scale.oninput = (e) => { changeScale(e.target.value, img.naturalWidth, img.naturalHeight, img) }
        rotateBtn.onclick = () => { rotateImage(img) }
    }
}

const changeScale = (scale, width, height, img) => {
    if(scale > 0) {
        const ctx = canvas.getContext("2d")
        canvas.width = width * scale
        canvas.height = height * scale
        
        ctx.scale(scale, scale)
        ctx.drawImage(img, 0, 0)
    }
}

const changeQuality = () => {

}
let rotationAngle = 0;

const rotateImage = (img) => {
    console.log('rotating')
    rotationAngle += 90;
    const ctx = canvas.getContext("2d")

    ctx.rotate(rotationAngle * Math.PI / 180);

    console.log('angle', rotationAngle)
    // order of the if/else if statements matter
    if(rotationAngle % 360 === 0) {
        console.log('360')
        rotationAngle = 0
        ctx.translate(0, 0)
    }
    else if(rotationAngle % 270 === 0) {
        console.log('270')
        ctx.translate(-canvas.height, 0)
    }
    else if(rotationAngle % 180 === 0) {
        console.log('180')
        ctx.translate(-canvas.height, -canvas.width)
    }
    else if(rotationAngle % 90 === 0) {
        console.log('90')
        ctx.translate(0, -canvas.width)
    }
    // ctx.translate(-canvas.height, 0); // works for 270
    // // ctx.translate(0, -canvas.width) // works for 90
    // ctx.translate(-canvas.height, -canvas.width) // works for 90
    ctx.drawImage(img, 0, 0);
  
    // Reset the canvas transform
    ctx.setTransform(1, 0, 0, 1, 0, 0);

}
