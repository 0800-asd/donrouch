const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de multer para gestionar la carga de archivos
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para manejar la carga de archivos
app.post('/upload', upload.single('file'), (req, res) => {
    const fileName = req.file.filename;
    const downloadUrl = `${req.protocol}://${req.get('host')}/upload/${fileName}`;

    // Redirigir a la URL del archivo cargado
    res.redirect(downloadUrl);
});

// Ruta para servir archivos subidos
app.use('/upload', express.static('uploads'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
