import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostListPage from './features/posts/pages/PostListPage';
import PostDetailPage from './features/posts/pages/PostDetailPage';
import PostCreatePage from './features/posts/pages/PostCreatePage';
import PostEditPage from './features/posts/pages/PostEditPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<PostListPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/create" element={<PostCreatePage />} />
          <Route path="/post/:id/edit" element={<PostEditPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
