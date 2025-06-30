package com.obsidian.medical.constant;

public class RegexConstants {
    // === URL-IMAGE ===
    public static final String URL_IMAGE_REGEX = "^.+\\.(png|jpe?g|gif|bmp|webp)$";
    public static final String URL_IMAGE_MESSAGE = "El archivo debe tener una extensión válida: .png, .jpg, .jpeg, .gif, .bmp o .webp";

    // === USER ===
    public static final String USER_REGEX = "^[a-zA-Z0-9_]{3,20}$";
    public static final String USER_MESSAGE = "El nombre de usuario debe tener entre 3 y 20 caracteres, y puede contener letras, números y guiones bajos.";

    // === EMAIL ===
    public static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    public static final String EMAIL_MESSAGE = "Por favor agregue un correo electrónico válido.";

    // === PASSWORD ===
    public static final String PASSWORD_REGEX = "^.{8,}$";
    public static final String PASSWORD_MESSAGE = "La contraseña debe tener al menos 8 caracteres.";

    // === PHONE ===
    public static final String PHONE_REGEX = "^\\+?[1-9]\\d{1,14}$";
    public static final String PHONE_MESSAGE = "Ingrese un número telefónico válido (puede incluir prefijo internacional).";

    // === NAME ===
    public static final String NAME_REGEX = "^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]{3,50}$";
    public static final String NAME_MESSAGE = "El nombre debe tener entre 3 y 50 caracteres y solo puede contener letras y espacios.";

    // === LASTNAME ===
    public static final String LASTNAME_REGEX = "^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]{3,50}$";
    public static final String LASTNAME_MESSAGE = "El apellido debe tener entre 3 y 50 caracteres y solo puede contener letras y espacios.";

    // === HISTORIAL ===
    public static final String HISTORIAL_REGEX = "^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\\s,.'-]{3,255}$";
    public static final String HISTORIAL_MESSAGE = "Los antecedentes deben tener entre 3 y 255 caracteres y pueden contener letras, números, espacios y algunos caracteres especiales.";

    // === AGE ===
    public static final String AGE_REGEX = "^(1[89]|[2-9]\\d|1\\d{2}|200)$";
    public static final String AGE_MESSAGE = "La edad debe ser un número entre 18 y 200.";

    // === BIRTHDATE ===
    public static final String BIRTHDATE_REGEX = "^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\\d{2}$";
    public static final String BIRTHDATE_MESSAGE = "La fecha de nacimiento debe estar en el formato YYYY-MM-DD.";

    // === GENDER ===
    public static final String GENDER_REGEX = "^(masculino|femenino|otro)$";
    public static final String GENDER_MESSAGE = "El género debe ser 'masculino', 'femenino' u 'otro'.";
}


