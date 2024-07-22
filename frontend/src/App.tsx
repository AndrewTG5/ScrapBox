import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '@mui/material/Button/Button'

import { useScraplet } from './Hooks/useScraplet'
import { Scraplets } from './Models/Scraplet'

function App() {
  // basic list of scraplets and a form to add a scraplet
  const { scraplets, addScraplet, loading, error } = useScraplet()
  const [name, setName] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const handleAddScraplet = () => {
    addScraplet({ name, content })
    setName('')
    setContent('')
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={handleAddScraplet}>Add Scraplet</Button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <ul>
          {scraplets.map((scraplet: Scraplets) => (
            <li key={scraplet.id}>
              <h3>{scraplet.name}</h3>
              <p>{scraplet.content}</p>
            </li>
          ))}
        </ul>
      </header>
    </div>
  )


}

export default App
