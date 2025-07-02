export default async function sendImage(file,token) {
    if (!file) return;

    const formData = new FormData();
    console.log("Archivo seleccionado:", file.current.files[0]);
    const fileUpload = file.current.files[0];
    formData.append("file", fileUpload);

    const res = await fetch("http://localhost:8080/expedient/image", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData,
    });

    if(!res.ok) {
        alert(await res.text());
        return;
    }

    // console.log("Response status:", res.status);

    const text = await res.text();
    return text;
}