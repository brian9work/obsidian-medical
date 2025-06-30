export default function changeImage (e,fileRef){
    const tmpFile = e.target.files[0];
    console.log("Archivo seleccionado:", tmpFile);
    if (!tmpFile) {
        alert("Por favor, selecciona una imagen.");
        fileRef.current.value = null;
        return;
    }
    if (!tmpFile.type.startsWith("image/")) {
        alert("El archivo seleccionado no es una imagen válida.");
        fileRef.current.value = null;
        return;
    }
    if (tmpFile.size > 5 * 1024 * 1024) {
        alert("El archivo seleccionado es demasiado grande. Por favor, selecciona una imagen de menos de 5MB.");
        fileRef.current.value = null;
        return;
    }
}