import {useState} from 'react'
import {Route, Routes} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme'
import Button from '@mui/material/Button/Button'
import Grid from '@mui/material/Grid/Grid'

import {useScraplet} from './Hooks/useScraplet'
import {Scraplet} from './Models/Scraplet'
import ScrapboxAppBar from './Components/AppBar'
import ScrapletCard from './Components/ScrapletCard'
import ScrapletDialog from "./Components/ScrapletDialog.tsx";
import {Snackbar} from "@mui/material";

function App() {
    const {scraplets, addScraplet, loading, error} = useScraplet()
    const [name, setName] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

    const handleAddScraplet = () => {
        addScraplet({name, content})
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
            <CssBaseline/>
            <ScrapboxAppBar isDarkTheme={isDarkTheme} onToggle={() => setIsDarkTheme((prevState) => !prevState)}
                            isLoading={loading}/>
            <Snackbar
                open={error !== null}
                message={error}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            />
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
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                    {scraplets.map((scraplet: Scraplet) => (
                        <ScrapletCard scraplet={scraplet} key={scraplet.id}/>
                    ))}
                    <Routes>
                        <Route path="/note/:id" element={<ScrapletDialog/>}/>
                    </Routes>
                </Grid>
            </div>
        </ThemeProvider>
    )
}

export default App
