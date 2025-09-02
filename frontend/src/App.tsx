import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostListPage from './features/posts/pages/PostListPage/PostListPage';
import PostDetailPage from './features/posts/pages/PostDetailPage/PostDetailPage';
import PostCreatePage from './features/posts/pages/PostCreatePage/PostCreatePage';
import PostEditPage from './features/posts/pages/PostEditPage/PostEditPage';
import NotFoundPage from './features/posts/pages/NotFoundPage/NotFoundPage';
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
