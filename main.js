document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    try {
        const response = await fetch('/uploads', {
            method: 'POST',
            body: formData,
        });

        // Si la respuesta es una redirección, actualizar la página con la nueva URL
        if (response.redirected) {
            window.location.href = response.url;
        } else {
            console.error('Error al subir el archivo:', response.statusText);
        }
    } catch (error) {
        console.error('Error al subir el archivo:', error);
    }
});
