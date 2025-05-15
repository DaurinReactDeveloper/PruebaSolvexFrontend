import axios from "axios";
import authService from "../utils/token";
import { urlUser } from "./endpoints";
import {
  validateCredentialslogin,
  validateCredentialsRegister,
} from "../utils/validations";
import { userAddDto, userDeleteDto, userUpdateDto } from "../data/userDto";

export async function getUser(
  e,
  navigate,
  email,
  password,
  setMessageEmail,
  setMessagePassword,
  setError,
  setLoading,
  setMessageResult
) {
  e.preventDefault();

  const credentialsValid = validateCredentialslogin(
    email,
    password,
    setMessageEmail,
    setMessagePassword
  );

  if (!credentialsValid) {
    return;
  }

  setLoading(true);
  setError("");
  setMessageResult("");

  localStorage.removeItem("token");
  localStorage.removeItem("token_expiry");

  try {
    const request = await axios.get(`${urlUser}/GetUser/${email}/${password}`);

    if (request.data.data.success) {
      const token = request.data.token;
      const userData = request.data.data.data;
      authService.saveToken(token, userData);

      setMessageResult(request.data.data.message);
      setTimeout(() => {
        setLoading(false);
        navigate("/");
        window.location.reload();
      }, 1100);
    } else {
      setError(request.data.message || "Error al iniciar sesión.");
      setTimeout(() => {
        setError("");
      }, 1100);
      setLoading(false);
    }
  } catch (error) {
    setError(error?.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => {
      setError("");
    }, 1100);
    setLoading(false);
  }
}

export async function getUsers(setUser, setError, setLoading) {
  const token = authService.getToken();

  if (!token) {
    setError("Debe Registrarse o Iniciar Sesion.");
    return;
  }

  setLoading(true);

  try {
    const request = await axios.get(`${urlUser}/GetUsers/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.data.success) {
      setUser(request.data.data);
      setLoading(false);
    } else {
      setError(request.data.message || "Error al obtener los usuarios.");
      setTimeout(() => {
        setError("");
      }, 1100);
      setLoading(false);
    }
  } catch (error) {
    setError(error?.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => {
      setError("");
    }, 1100);
    setLoading(false);
  }
}

export async function saveUser(
  idUser,
  name,
  email,
  role,
  password,
  setMessageEmail,
  setMessagePassword,
  setMessageName,
  setMessageRole,
  setError,
  setLoading,
  setMessageResult
) {
  const token = authService.getToken();

  if (!token) {
    setError("Debe Registrarse o Iniciar Sesion.");
    return;
  }

  const credentialsValidLogin = validateCredentialslogin(
    email,
    password,
    setMessageEmail,
    setMessagePassword
  );

  const credentialsValidRegister = validateCredentialsRegister(
    name,
    role,
    setMessageName,
    setMessageRole
  );

  if (!credentialsValidLogin || !credentialsValidRegister) {
    return;
  }

  setLoading(true);
  setError("");
  setMessageResult("");

  const dto = userAddDto(idUser, name, email, password, role);

  try {
    const request = await axios.post(`${urlUser}/Save/`, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.data.success) {
      setMessageResult(request.data.message);

      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } else {
      setError(request.data.message || "Error al registrar el usuario.");
      setTimeout(() => {
        setError("");
      }, 1100);
      setLoading(false);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => {
      setError("");
    }, 1100);
    setLoading(false);
  }
}

export async function updateUser(
  id,
  name,
  email,
  role,
  password,
  idUser,
  setMessageEmail,
  setMessageRole,
  setMessagePassword,
  setMessageName,
  setError,
  setLoading,
  setMessageResult
) {
  const token = authService.getToken();

  if (!token) {
    setError("Debe Registrarse o Iniciar Sesion.");
    return;
  }

  const credentialsValidLogin = validateCredentialslogin(
    email,
    password,
    setMessageEmail,
    setMessagePassword
  );

  const credentialsValidRegister = validateCredentialsRegister(
    name,
    role,
    setMessageName,
    setMessageRole
  );

  if (!credentialsValidLogin || !credentialsValidRegister) {
    return;
  }

  setLoading(true);
  setError("");
  setMessageResult("");

  const dto = userUpdateDto(id, name, email, password, role, idUser);

  try {
    const request = await axios.put(`${urlUser}/Update/`, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.data.success) {
      setMessageResult(request.data.message);

      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } else {
      setError(request.data.message || "Error al actualizar el usuario.");
      setTimeout(() => {
        setError("");
      }, 1100);
      setLoading(false);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => {
      setError("");
    }, 1100);
    setLoading(false);
  }
}

export async function deleteUser(
  id,
  idUser,
  setLoading,
  setError,
  setMessageResult
) {
  const token = authService.getToken();

  setLoading(true);
  setError("");
  setMessageResult("");

  const dto = userDeleteDto(id, idUser);

  try {
    const request = await axios.delete(`${urlUser}/Delete/`, {
      headers: { Authorization: `Bearer ${token}` },
      data: dto,
    });

    if (request.data.success) {
      setMessageResult(request.data.message);

      setTimeout(() => {
        setMessageResult("");
        window.location.reload();
      }, 1100);

      setLoading(false);
    } else {
      setError(request.data.message || "Error al eliminar el usuario.");
      setTimeout(() => {
        setError("");
      }, 1100);
      setLoading(false);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error al eliminar el usuario.");
    setTimeout(() => {
      setError("");
    }, 1100);
    setLoading(false);
  }
}
