document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.innerHTML = `<p>URL de descarga: <a href="${data.downloadUrl}" target="_blank">${data.downloadUrl}</a></p>`;
    } catch (error) {
        console.error('Error al subir el archivo:', error);
    }
});
