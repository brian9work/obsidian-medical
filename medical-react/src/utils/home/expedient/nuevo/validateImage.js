export default function validateImage(file) {
    if (!file) {
        console.warn("Por favor, selecciona una imagen.");
        return false;
    }
    if (!file.type.startsWith("image/")) {
        console.warn("El archivo seleccionado no es una imagen válida.");
        return false;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB
        console.warn("El archivo seleccionado es demasiado grande. Por favor, selecciona una imagen de menos de 5MB.");
        return false;
    }
    return true;
}