import AdminProductList from "../features/admin/AdminproductList";
import Navbar from "../features/navbar/Navbar";

function AdminHome() {
  return (
    <Navbar>
      <AdminProductList></AdminProductList>
    </Navbar>
  );
}

export default AdminHome;