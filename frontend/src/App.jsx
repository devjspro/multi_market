import Home from "./pages/Home";
import Login from "./pages/Login";
import {Routes,Route} from 'react-router-dom'
import Dashboard from "./pages/vendor/Dashboard";
import AddProduct from "./pages/vendor/AddProduct";
import ProtectedRoute from "./routes/Protected";
import { VendorRoute } from "./routes/Protected";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import MyProducts from "./pages/vendor/MyProducts";
import ProductDetail from "./pages/ProductDetail";
import OrdersPage from "./pages/OrdersPage";
import VendorOrdersPage from "./pages/VendorOrdersPage";

import EditProduct from "./pages/vendor/EditProduct";
function App() {
  return <div>
    <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/vendor"
          element={
            <ProtectedRoute>
              <VendorRoute>
                <Dashboard />
           </VendorRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/add-product"
          element={
            <ProtectedRoute>
              <VendorRoute>
                <AddProduct />
              </VendorRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/edit-product/:id"
          element={
            <ProtectedRoute>
              <VendorRoute>
                <EditProduct />
              </VendorRoute>
            </ProtectedRoute>
          }
        />
        <Route path="/vendor/products" element={<ProtectedRoute><VendorRoute><MyProducts /></VendorRoute></ProtectedRoute>} />
          <Route
  path="/orders"
  element={<OrdersPage />}
/>
        <Route
  path="/products/:id"
  element={<ProductDetail />}
/>

<Route
  path="/cart"
  element={<Cart />} />

  <Route

  path="/vendor/orders"

  element={<VendorOrdersPage />}
/>
        
      </Routes>
  </div>
}

export default App;