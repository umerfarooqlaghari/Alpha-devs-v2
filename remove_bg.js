const { Jimp } = require('jimp');
const path = require('path');

async function removeBackground() {
    const inputPath = path.resolve('frontend/public/2.png');
    const outputPath = path.resolve('frontend/public/favicon.png');

    console.log(`Processing: ${inputPath}`);

    try {
        const image = await Jimp.read(inputPath);

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
            const r = image.bitmap.data[idx + 0];
            const g = image.bitmap.data[idx + 1];
            const b = image.bitmap.data[idx + 2];

            // If pixel is black (or very close to it), make it transparent
            if (r < 40 && g < 40 && b < 40) {
                image.bitmap.data[idx + 3] = 0;
            }
        });

        await image.write(outputPath);
        console.log(`Success: saved to ${outputPath}`);
    } catch (err) {
        console.error('Error:', err);
    }
}

removeBackground();
