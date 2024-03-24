const multer = require('multer');
const path = require('path');

module.exports = multer({ 
    storage: multer.diskStorage({
        destination: './upload/',
        filename: function(req, file, returnCallback) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            returnCallback(null, uniqueSuffix + path.extname(file.originalname));
        }
    })
});
