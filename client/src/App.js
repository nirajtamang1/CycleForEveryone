import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contacts";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./Routes/Private";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./Routes/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import ProductDetails from "./pages/ProductDetails";
import { Categories } from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import Updateuser from "./pages/Admin/Updateuser";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ResetPassword from "./pages/Auth/ResetPassword";
import OrderInfo from "./pages/Admin/OrderInfo";

function App() {
  return (
    // div fragment
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          {/* <Route path="admin/user/:id" element={<update />} /> */}

          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users/:id" element={<Updateuser />} />
          <Route path="admin/order" element={<OrderInfo />} />
        </Route>
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route
          path="/api/v1/auth/reset_password/:id/:token"
          element={<ResetPassword />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
