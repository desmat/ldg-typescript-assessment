import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddFakerApiData from './pages/AddFakerApiData';
import './styles.css';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => console.error("An error occured", error), //toast.error(`An error occured: ${error}`)
  })
});

export default function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/fakerapi/add" element={<AddFakerApiData />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </QueryClientProvider>
    </div>
  );
}
