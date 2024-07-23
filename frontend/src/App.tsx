import { useState } from 'react'


import { useScraplet } from './Hooks/useScraplet'
import { Scraplet } from './Models/Scraplet'

import Grid from '@mui/material/Grid/Grid'
import Button from '@mui/material/Button/Button'
import createTheme from '@mui/material/styles/createTheme'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import CssBaseline from '@mui/material/CssBaseline/CssBaseline'
import ScrapboxAppBar from './Components/AppBar'
import ScrapletCard from './Components/ScrapletCard'

function App() {
  // basic list of scraplets and a form to add a scraplet
  const { scraplets, addScraplet, loading, error } = useScraplet()
  const [name, setName] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)

  const handleAddScraplet = () => {
    addScraplet({ name, content })
    setName('')
    setContent('')
  }

  const theme = createTheme({
    palette: {
      mode: isDarkTheme ? "dark" : "light",
      primary: {
        main: "#ffd900",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrapboxAppBar />
      <div className="App">
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
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {scraplets.map((scraplet: Scraplet) => (
            <ScrapletCard scraplet={scraplet} />
          ))}
        </Grid>
      </div>
    </ThemeProvider>
  )


}

export default App
