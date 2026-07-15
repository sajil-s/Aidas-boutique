import AppRoutes from "./routes/AppRoutes.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";

function App(){

  return(
    <div>
      <ScrollToTop/>
      <AppRoutes/>
    </div>
  )
};

export default App;