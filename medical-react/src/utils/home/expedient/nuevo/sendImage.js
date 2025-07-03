export default async function sendImage(file,token) {
    if (!file) return;

    const formData = new FormData();
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

    const text = await res.text();
    return text;
}