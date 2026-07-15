import { Routes, Route } from "react-router-dom";

import Home from "../pages/customer/Home.jsx";
import Products from "../pages/customer/Products.jsx";
import ProductDetails from "../pages/customer/ProductDetails.jsx";
import Cart from "../pages/customer/Cart.jsx";
import Checkout from "../pages/customer/Checkout.jsx";
import Login from "../pages/customer/Login.jsx";
import Profile from "../pages/customer/Profile.jsx";
import MyOrders from "../pages/customer/MyOrders.jsx";
import NotFound from "../pages/customer/NotFound.jsx";
import Register from "../pages/customer/Register.jsx";
import PaymentPage from "../pages/customer/PaymentPage.jsx";
import OrderDetails from "../pages/customer/OrderDetails.jsx";
import AdminOrderDetails from "../pages/admin/OrderDetails.jsx";


import Dashboard from "../pages/admin/Dashboard.jsx";
import AdminProducts from "../pages/admin/Products.jsx";
import AdminOrders from "../pages/admin/Orders.jsx";
import Users from "../pages/admin/Users.jsx";
import UserDetails from"../pages/admin/UserDetails.jsx"

import AdminLayout from "../layouts/AdminLayout.jsx";
import MainLayout from "../layouts/MainLayout.jsx";


import PrivateRoute from "./PrivateRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";  

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
  path="/cart"
  element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  }
/>
      <Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>

        <Route
  path="/payment/:orderId"
  element={
    <ProtectedRoute>
      <PaymentPage />
    </ProtectedRoute>
  }
/>

       <Route
  path="/orders"
  element={
    <ProtectedRoute>
      <MyOrders />
    </ProtectedRoute>
  }
/>
   <Route
  path="/orders/:orderId"
  element={
    <ProtectedRoute>
      <OrderDetails />
    </ProtectedRoute>
  }
/>
        <Route path="/login" element={<Login />} />
      <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

        <Route path="/register" element={<Register />} />
      </Route>

      <Route
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />

        <Route
  path="/admin/orders/:id"
  element={
    <AdminRoute>
      <AdminOrderDetails />
    </AdminRoute>
  }
/>

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />

        <Route
  path="/admin/users/:id"
  element={<UserDetails />}
/>
        
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
