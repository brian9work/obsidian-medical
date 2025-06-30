export default validateInput = () => {
    const fields = [
        { value: name, rule: Regex.expedient.name, label: "Nombre" },
        { value: lastnamep, rule: Regex.expedient.lastname, label: "Apellido paterno" },
        { value: lastnamem, rule: Regex.expedient.lastname, label: "Apellido materno" },
        { value: birthdate, rule: Regex.expedient.birthdate, label: "Fecha de nacimiento" },
        { value: gender, rule: Regex.expedient.gender, label: "Genero" },
        { value: historial, rule: Regex.expedient.historial, label: "Historial" },
    ];

    for (const field of fields) {
        if (!field.rule.regex.test(field.value)) {
            alert(`${field.label}: ${field.rule.message}`);
            return false;
        }
    }

    return true;
};