export const Regex = {
    user: 
        {
            // test: "user1234",
            regex : /^[a-zA-Z0-9_]{3,20}$/,
            message: "El nombre de usuario debe tener entre 3 y 20 caracteres, y puede contener letras, números y guiones bajos."
        },
    email: 
        {
            // test: "brian@xihmai.com",
            regex : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Por favor agregue un correo electronico valido"
        },
    password: 
        {
            // test: "1234",
            // test: "000aaaBBB333*$",
            // regex : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/,
            // regex : /^.{1,}$/,
            regex : /^.{8,}$/,
            message: "La contraseña debe tener al menos 8 caracteres."
            // message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
        },
    phone: 
        {
            regex : /^\+?[1-9]\d{1,14}$/,
            message: ""
        },
}