import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import ArticleHard from './pages/ArticleHard'
import ArticleMetered from './pages/ArticleMetered'
import Leseprobe from './pages/Leseprobe'
import Abo from './pages/Abo'
import Konto from './pages/Konto'
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="artikel/hard" element={<ArticleHard />} />
        <Route path="artikel/metered" element={<ArticleMetered />} />
        <Route path="leseprobe" element={<Leseprobe />} />
        <Route path="abo" element={<Abo />} />
        <Route path="konto" element={<Konto />} />
        <Route path="*" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
