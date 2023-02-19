import logo from "./logo.svg";
import "./App.css";
import { Header } from "./screens/Header/Header";
import Form from "./screens/Form/Form";
import Footer from "./screens/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Form />
      <Footer />
    </div>
  );
}

export default App;
