import axios from "axios";
import authService from "../utils/token";
import { urlProduct } from "./endpoints";
import {
  productAddDto,
  productDeleteDto,
  productUpdateDto,
} from "../data/productDto";
import { validateProductFields } from "../utils/validations";
import { toBase64 } from "../utils/convertToBase64";

export async function getProducts(
  setProducts,
  setError,
  setMessageProducts,
  setLoading
) {
  const token = authService.getToken();

  if (!token) {
    setMessageProducts("Debe Registrarse o Iniciar Sesión.");
    return;
  }

  setLoading(true);

  try {
    const request = await axios.get(`${urlProduct}/GetProducts`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (request.data.success) {
      setProducts(request.data.data);
    } else {
      setMessageProducts(request.data.message);
      setTimeout(() => setMessageProducts(""), 1000);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => setError(""), 1000);
  } finally {
    setLoading(false);
  }
}

export async function searchProductsByName(
  name,
  setProducts,
  setError,
  setMessageProducts,
  setLoading
) {
  const token = authService.getToken();

  if (!token) {
    setMessageProducts("Debe Registrarse o Iniciar Sesión.");
    return;
  }

  setLoading(true);

  try {
    const response = await axios.get(`${urlProduct}/Search`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { name },
    });

    if (response.data.success) {
      setProducts(response.data.data);
    } else {
      setMessageProducts(response.data.message);
      setTimeout(() => setMessageProducts(""), 1000);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error en la búsqueda.");
    setTimeout(() => setError(""), 1000);
  } finally {
    setLoading(false);
  }
}

export async function saveProduct(
  name,
  description,
  imageUrl,
  color,
  price,
  idUser,
  setMessageName,
  setMessageDescription,
  setMessageColor,
  setMessagePrice,
  setError,
  setLoading,
  setMessageResult
) {
  const token = authService.getToken();

  if (!token) {
    setError("Debe Registrarse o Iniciar Sesión.");
    return;
  }

  const isValid = validateProductFields(
    name,
    description,
    color,
    price,
    setMessageName,
    setMessageDescription,
    setMessageColor,
    setMessagePrice
  );

  if (!isValid) return;

  setLoading(true);
  setError("");
  setMessageResult("");

  try {
    const imageBase64 = await toBase64(imageUrl);

    const dto = productAddDto(
      name,
      description,
      imageBase64,
      color,
      price,
      idUser
    );

    const request = await axios.post(`${urlProduct}/Save/`, dto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (request.data.success) {
      setMessageResult(request.data.message);
      setTimeout(() => window.location.reload(), 1100);
    } else {
      setError(request.data.message || "Error al guardar el producto.");
      setTimeout(() => setError(""), 1100);
      setLoading(false);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => setError(""), 1100);
    setLoading(false);
  }
}

export async function update(
  id,
  name,
  description,
  color,
  price,
  idUser,
  setMessageName,
  setMessageDescription,
  setMessageColor,
  setMessagePrice,
  setError,
  setLoading,
  setMessageResult
) {
  const token = authService.getToken();

  if (!token) {
    setError("Debe Registrarse o Iniciar Sesión.");
    return;
  }

  const isValid = validateProductFields(
    name,
    description,
    color,
    price,
    setMessageName,
    setMessageDescription,
    setMessageColor,
    setMessagePrice
  );

  if (!isValid) return;

  setLoading(true);
  setError("");
  setMessageResult("");

  const dto = productUpdateDto(id, name, description, color, price, idUser);

  try {
    const request = await axios.put(`${urlProduct}/Update/`, dto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (request.data.success) {
      setMessageResult(request.data.message);
      setTimeout(() => window.location.reload(), 1100);
    } else {
      setError(request.data.message || "Error al actualizar el producto.");
      setTimeout(() => setError(""), 1100);
      setLoading(false);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => setError(""), 1100);
    setLoading(false);
  }
}

export async function deleteProduct(
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

  const dto = productDeleteDto(id, idUser);

  try {
    const request = await axios.delete(`${urlProduct}/Delete/`, {
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
      setError(request.data.message || "Error al eliminar el producto.");
      setTimeout(() => {
        setError("");
      }, 1100);
      setLoading(false);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error al eliminar el producto.");
    setTimeout(() => {
      setError("");
    }, 1100);
    setLoading(false);
  }
}
