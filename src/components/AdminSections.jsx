import ManageProducts from "./ManageProducts";
import ShowUser from "./ShowUser";

export const AdminSections = [
  {
    id: "showUser",
    label: "USUARIOS",
    component: <ShowUser />,
  },
  {
    id: "manageProducts",
    label: "PRODUCTOS",
    component: <ManageProducts seller={false} />,
  },
];
