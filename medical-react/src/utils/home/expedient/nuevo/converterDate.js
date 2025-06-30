export default function converterDate(fecha) {
    const [año, mes, dia] = fecha.split("-");
    return `${dia}-${mes}-${año}`;
}