document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    try {
        const response = await fetch('/uploads', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            // La carga fue exitosa
            const downloadLink = document.getElementById('downloadLink');
            const fileName = await response.text();
            const downloadUrl = `/uploads/${fileName}`;
            downloadLink.innerHTML = `<p>URL de descarga: <a href="${downloadUrl}" target="_blank">${downloadUrl}</a></p>`;
        } else {
            console.error('Error al subir el archivo:', response.statusText);
        }
    } catch (error) {
        console.error('Error al subir el archivo:', error);
    }
});
