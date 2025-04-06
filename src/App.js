import './App.css';
import SnackbarComponent from './components/GlobalSnackbar';
import Layout from './Layout/Layout';




function App() {
  return (
    <div className="App">
      <div className="bg-background text-foreground">
        <SnackbarComponent/>
        <Layout/>
      </div>
    </div>
  );
}

export default App;
