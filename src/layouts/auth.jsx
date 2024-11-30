import routes from "@/routes";
import { GetUser } from "@/utils/LocalStorage";
import { Footer, Navbar } from "@/widgets/layout";
import {
  ArrowRightOnRectangleIcon,
  ChartPieIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

export function Auth() {
  const navigate = useNavigate();

  const navbarRoutes = [
    {
      name: "Home",
      path: "/dashboard/home",
      icon: ChartPieIcon,
    },
    {
      name: "sign up",
      path: "/auth/sign-up",
      icon: UserPlusIcon,
    },
    {
      name: "sign in",
      path: "/auth/sign-in",
      icon: ArrowRightOnRectangleIcon,
    },
  ];

  useEffect(() => {
    if (!!GetUser()) {
      navigate("/dashboard/home", { replace: true });
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      <div className="container relative z-40 mx-auto p-4">
        <Navbar routes={navbarRoutes} />
      </div>
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes>
      <div className="container absolute bottom-8 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <Footer />
      </div>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
