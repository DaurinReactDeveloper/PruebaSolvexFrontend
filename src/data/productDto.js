export const productDeleteDto = (id, idUser) => {
  const dateCurrent = new Date().toISOString();
  return {
    Id: id,
    Name: "",
    Description: "",
    ImageUrl: "",
    Color: "",
    price: 0,
    CreationDate: dateCurrent,
    ChangeUser: idUser,
  };
};

export const productAddDto = (
  name,
  description,
  imageBase64,
  color,
  price,
  idUser
) => {
  const dateCurrent = new Date().toISOString();
  const convertPriceToDecimal = parseFloat(price);
  return {
    Id: 0,
    Name: name,
    Description: description,
    ImageUrl: imageBase64,
    Color: color,
    price: convertPriceToDecimal,
    changeDate: dateCurrent,
    ChangeUser: idUser,
  };
};

export const productUpdateDto = (
  id,
  name,
  description,
  color,
  price,
  idUser
) => {
  const dateCurrent = new Date().toISOString();
  const convertPriceToDecimal = parseFloat(price);
  return {
    Id: id,
    Name: name,
    Description: description,
    ImageUrl: "",
    Color: color,
    price: convertPriceToDecimal,
    changeDate: dateCurrent,
    ChangeUser: idUser,
  };
};
