import ManageProducts from "./ManageProducts";

export const SellerSections = [
  {
    id: "manageProducts",
    label: "GESTIONAR PRODUCTOS",
    component: <ManageProducts seller={true} />,
  },
];
