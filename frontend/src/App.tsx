import {Route, Routes, useNavigate} from "react-router-dom";
import { useHookstate } from '@hookstate/core';
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
    const {scraplets, openScraplet, loading, error, addScraplet, fetchScrapletById, deleteScrapletById} = useScraplet()
    const name = useHookstate<string>('');
    const content = useHookstate<string>('');
    const darkTheme = useHookstate<boolean>(false);

    const navigate = useNavigate();

    const handleAddScraplet = () => {
        addScraplet({name: name.get(), content: content.get()})
        name.set('')
        content.set('')
    }

    const handleDelete = async() => {
        const scraplet = openScraplet.get();
        if (scraplet && scraplet.id !== undefined) {
            await deleteScrapletById(scraplet.id)
                .then(() => {
                    navigate('/');
                    openScraplet.set(null);
                })
        }
    }

    const handleFetchScrapletById = (id: number) => {
        fetchScrapletById(id);
    }

    const theme = createTheme({
        palette: {
            mode: darkTheme.get() ? "dark" : "light",
            primary: {
                main: "#ffd900",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <ScrapboxAppBar isDarkTheme={darkTheme.get()} onToggle={() => darkTheme.set((prevState) => !prevState)} isLoading={loading.get()}/>
            <Snackbar open={!!error.get()} message={error.get()} anchorOrigin={{vertical: 'top', horizontal: 'center'}}/>
            <div className="App">
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name.get()}
                        onChange={(e) => name.set(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Content"
                        value={content.get()}
                        onChange={(e) => content.set(e.target.value)}
                    />
                    <Button onClick={handleAddScraplet}>Add Scraplet</Button>
                </div>
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                    {scraplets.get().map((scraplet: Scraplet) => (
                        <ScrapletCard scraplet={scraplet} key={scraplet.id}/>
                    ))}
                    <Routes>
                        <Route path="/note/:id" element={<ScrapletDialog handleDelete={handleDelete} handleOpenScrapletById={handleFetchScrapletById} scrapletState={openScraplet} error={error} loading={loading}/>}/>
                    </Routes>
                </Grid>
            </div>
        </ThemeProvider>
    )
}

export default App
