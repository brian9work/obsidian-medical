export const Regex = {
    user:
    {
        // test: "user1234",
        regex: /^[a-zA-Z0-9_]{3,20}$/,
        message: "El nombre de usuario debe tener entre 3 y 20 caracteres, y puede contener letras, números y guiones bajos."
    },
    email:
    {
        // test: "brian@xihmai.com",
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Por favor agregue un correo electronico valido"
    },
    password:
    {
        // test: "1234",
        // test: "000aaaBBB333*$",
        // regex : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/,
        // regex : /^.{1,}$/,
        regex: /^.{8,}$/,
        message: "La contraseña debe tener al menos 8 caracteres."
        // message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
    },
    phone:
    {
        regex: /^\+?[1-9]\d{1,14}$/,
        message: ""
    },
    expedient: {
        name: {
            regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/,
            message: "El nombre del paciente debe tener entre 3 y 50 caracteres y solo puede contener letras y espacios."
        },
        lastname: {
            regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/,
            message: "El apellido del paciente debe tener entre 3 y 50 caracteres y solo puede contener letras y espacios."
        },
        historial:
        {
            regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s,.'-]{3,255}$/,
            message: "Los antecedentes deben tener entre 3 y 255 caracteres y pueden contener letras, números, espacios y algunos caracteres especiales."
        },
        age: {
            regex: /^(1[89]|[2-9]\d|1\d{2}|200)$/,
            message: "La edad debe ser un número entre 18 y 200."
        },
        birthdate: {
            regex: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
            message: "La fecha de nacimiento debe estar en el formato DD-MM-AAAA."
        },
        gender: {
            regex: /^(masculino|femenino|otro)$/,
            message: "El género debe ser 'Masculino', 'Femenino' u 'Otro'."
        }
    }
}