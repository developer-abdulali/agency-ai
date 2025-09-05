import { useAuth } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";

import Auth from "./pages/Auth";
import Call from "./pages/Call";
import Home from "./pages/Home";

const App = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return (
    <Routes>
      <Route
        path="/"
        element={isSignedIn ? <Home /> : <Navigate to={"/auth"} replace />}
      />
      <Route
        path="/auth"
        element={!isSignedIn ? <Auth /> : <Navigate to={"/"} replace />}
      />

      <Route
        path="/call/:id"
        element={isSignedIn ? <Call /> : <Navigate to={"/auth"} replace />}
      />

      <Route
        path="*"
        element={
          isSignedIn ? (
            <Navigate to={"/"} replace />
          ) : (
            <Navigate to={"/auth"} replace />
          )
        }
      />
    </Routes>

    // <>
    //   <SignedIn>
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/auth" element={<Navigate to="/" replace />} />
    //     </Routes>
    //   </SignedIn>

    //   <SignedOut>
    //     <Routes>
    //       <Route path="/auth" element={<Auth />} />
    //       <Route path="*" element={<Navigate to="/auth" replace />} />
    //     </Routes>
    //   </SignedOut>
    // </>
  );
};

export default App;

// first version of routing:
// return (
//   <>
//     <SignedIn>
//       <SentryRoutes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/auth" element={<Navigate to={"/"} replace />} />
//       </SentryRoutes>
//     </SignedIn>

//     <SignedOut>
//       <SentryRoutes>
//         <Route path="/auth" element={<AuthPage />} />
//         <Route path="*" element={<Navigate to={"/auth"} replace />} />
//       </SentryRoutes>
//     </SignedOut>
//   </>
// );
