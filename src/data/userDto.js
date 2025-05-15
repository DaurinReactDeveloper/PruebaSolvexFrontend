export const userAddDto = (idUser, Name, Email, PasswordHash, role) => {
  const dateCurrent = new Date().toISOString();
  return {
    Id: 0,
    Name,
    Email,
    PasswordHash,
    Role: role,
    changeDate: dateCurrent,
    ChangeUser: idUser,
  };
};

export const userUpdateDto = (id, Name, Email, PasswordHash, role, idUser) => {
  return {
    Id: id,
    Name,
    Email,
    PasswordHash,
    Role: role,
    ChangeUser: idUser,
  };
};

export const userDeleteDto = (id, idUser) => {
  const dateCurrent = new Date().toISOString();
  return {
    Id: id,
    Name: "",
    Email: "",
    PasswordHash: "",
    Role: "",
    CreationDate: dateCurrent,
    ChangeUser: idUser,
  };
};
