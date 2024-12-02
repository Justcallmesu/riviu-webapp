import { getMe } from "@/auth/Auth";
import { useMaterialTailwindController } from "@/context";
import routes from "@/routes";
import { GetUser, removeUser } from "@/utils/LocalStorage";
import { Configurator, DashboardNavbar, Sidenav } from "@/widgets/layout";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const navigate = useNavigate();

  useEffect(() => {
    if (GetUser()) {
      getMe().catch(() => {
        removeUser();
        window.location.reload();
      });
    }
  }, []);
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
        brandName="Riviu"
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />

        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => {
                return <Route exact path={path} element={element} />;
              })
          )}
        </Routes>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
