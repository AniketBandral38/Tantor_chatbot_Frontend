import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Home from './pages/home'
import ChatbotComponent from './components/chatbotcomponent'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <Header />
        <main className=""> 
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <ChatbotComponent />
      </div>
    </BrowserRouter>
  )
}

export default App