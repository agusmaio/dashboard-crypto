import "App.scss";
import { BrowserRouter } from "react-router-dom";
import Routing from "components/Routing/Routing";
import { Provider } from "react-redux";
import store from "store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
