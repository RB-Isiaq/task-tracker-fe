import { Routes as AppRoutes, Route, Outlet } from "react-router-dom";
import Home from "./pages/home";
import UserPage from "./pages/dashboard";
import CreateTask from "./pages/dashboard/create-task";
import UpdateTask from "./pages/dashboard/update-task/[taskId]";
import TaskDetail from "./pages/dashboard/[taskId]";
import ProtectedRoute from "./components/ProtectedRoute";

const Routes = () => {
  return (
    <AppRoutes>
      <Route path="/" element={<Home />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route index={true} element={<UserPage />} />
        <Route path="create" element={<CreateTask />} />
        <Route path="update/:id" element={<UpdateTask />} />
        <Route path=":id" element={<TaskDetail />} />
      </Route>
    </AppRoutes>
  );
};

export default Routes;
