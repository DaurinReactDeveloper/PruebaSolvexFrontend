// User

export function validateCredentialslogin(
  email,
  password,
  setMessageEmail,
  setMessagePassword
) {
  let valido = true;

  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(email)) {
    setMessageEmail("El correo electrónico no tiene un formato válido.");
    valido = false;
    setTimeout(() => {
      setMessageEmail("");
    }, 1100);
  } else {
    setMessageEmail("");
  }

  let tieneLetra = false;
  let tieneNumero = false;

  for (let char of password) {
    if (/[a-zA-Z]/.test(char)) tieneLetra = true;
    if (/[0-9]/.test(char)) tieneNumero = true;
  }

  if (!(tieneLetra && tieneNumero)) {
    setMessagePassword("La contraseña debe contener letras y números.");
    valido = false;
    setTimeout(() => {
      setMessagePassword("");
    }, 1100);
  } else {
    setMessagePassword("");
  }

  return valido;
}

export function validateCredentialsRegister(
  name,
  role,
  setMessageName,
  setMessageRole
) {
  let valido = true;

  if (!name || name.trim() === "") {
    setMessageName("El nombre es obligatorio.");
    valido = false;
    setTimeout(() => {
      setMessageName("");
    }, 1000);
  } else {
    setMessageName("");
  }

  const rolesPermitidos = ["User", "Seller", "Admin"];

  if (!role || !rolesPermitidos.includes(role)) {
    setMessageRole("Debe seleccionar un rol válido: User, Seller o Admin.");
    valido = false;
    setTimeout(() => {
      setMessageRole("");
    }, 1100);
  } else {
    setMessageRole("");
  }

  return valido;
}

// Products
export function validateProductFields(
  name,
  description,
  color,
  price,
  setMessageName,
  setMessageDescription,
  setMessageColor,
  setMessagePrice
) {
  let valido = true;

  if (!name || name.trim().length <= 8 || name.trim().length >= 49) {
    setMessageName("El nombre debe tener entre 9 y 48 caracteres.");
    valido = false;
    setTimeout(() => {
      setMessageName("");
    }, 1100);
  } else {
    setMessageName("");
  }

  if (
    !description ||
    description.trim().length <= 19 ||
    description.trim().length >= 150
  ) {
    setMessageDescription(
      "La descripción debe tener entre 20 y 149 caracteres."
    );
    valido = false;
    setTimeout(() => {
      setMessageDescription("");
    }, 1100);
  } else {
    setMessageDescription("");
  }

  if (!color || color.trim() === "") {
    setMessageColor("El color del producto es obligatorio.");
    valido = false;
    setTimeout(() => {
      setMessageColor("");
    }, 1100);
  } else {
    setMessageColor("");
  }

  if (!price || isNaN(price) || parseFloat(price) <= 0) {
    setMessagePrice("El precio debe ser un número mayor que cero.");
    valido = false;
    setTimeout(() => {
      setMessagePrice("");
    }, 1100);
  } else {
    setMessagePrice("");
  }

  return valido;
}
