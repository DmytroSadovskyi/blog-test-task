import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage/PostListPage';
import PostDetailPage from './pages/PostDetailPage/PostDetailPage';
import PostCreatePage from './pages/PostCreatePage/PostCreatePage';
import PostEditPage from './pages/PostEditPage/PostEditPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<PostListPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/create" element={<PostCreatePage />} />
          <Route path="/post/:id/edit" element={<PostEditPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
