import Navbar from './components/Navbar';
import AppRoutes from './Routes';
import Footer from './components/Footer';
import './styles/main.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
