const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');

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
app.use(express.static('public'));

// Ruta para manejar la carga de archivos
app.post('/upload', upload.single('file'), (req, res) => {
    const fileName = req.file.filename;
    const downloadUrl = `/uploads/${fileName}`;

    // Redirigir a la URL del archivo cargado
    res.redirect(downloadUrl);
});

// Ruta para servir archivos subidos
app.get('/uploads/:file', async (req, res) => {
    const file = req.params.file;
    const filePath = path.join(__dirname, 'uploads', file);

    try {
        // Verificar si el archivo existe
        await fs.access(filePath);

        // Si el archivo existe, servirlo
        res.sendFile(filePath);
    } catch (error) {
        // Si el archivo no existe, enviar una respuesta 404
        res.status(404).send('Archivo no encontrado');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
