function mergeFiles() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    let mergedProject = {};

    const onFileRead = (e, i) => {
        const project = JSON.parse(e.target.result);
        if (i === 0) {
            mergedProject = project;
        } else {
            mergedProject.tests = mergedProject.tests.concat(project.tests);
            mergedProject.suites = mergedProject.suites.concat(project.suites);
        }

        if (i === files.length - 1) {
            // Quando todos os arquivos foram lidos, criamos o arquivo e o link para download
            const mergedProjectJson = JSON.stringify(mergedProject, null, 2);
            const blob = new Blob([mergedProjectJson], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            // Cria um link de download programaticamente
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = 'mesclagemside.side';
            document.body.appendChild(downloadLink);
            
            // Aciona o download
            downloadLink.click();
            
            // Remove o link de download do DOM após o download
            document.body.removeChild(downloadLink);
            
            // Libera a memória utilizada pelo objeto URL
            URL.revokeObjectURL(url);
        }
    };

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            onFileRead(e, i);
        };

        reader.readAsText(file);
    }
}
