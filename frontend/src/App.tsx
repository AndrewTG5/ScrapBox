import React from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import { useHookstate } from '@hookstate/core';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme'

import Grid from '@mui/material/Grid/Grid'
import {useScraplet} from './Hooks/useScraplet'
import {Scraplet} from './Models/Scraplet'
import ScrapboxAppBar from './Components/AppBar'
import ScrapletCard from './Components/ScrapletCard'
import ScrapletDialog from "./Components/ScrapletDialog.tsx";
import {Snackbar} from "@mui/material";

function App() {
    const {scraplets, openScraplet, loading, error, addScraplet, fetchScrapletById, putScraplet, deleteScrapletById} = useScraplet()
    const darkTheme = useHookstate<boolean>(false);
    const navigate = useNavigate();

    const handleAddScraplet = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        addScraplet({name: "New Note"}).then((id: number) => {
            if (id !== -1) {
                navigate(`/note/${id}`);
            }
        });
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

    const handleUpdate = (scraplet: Scraplet) => {
        putScraplet(scraplet);
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
        <ThemeProvider theme={theme} >
            <CssBaseline/>
            <Snackbar open={!!error.get()} message={error.get()} anchorOrigin={{vertical: 'top', horizontal: 'center'}}/>
            <div style={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
                <div    >
                    <ScrapboxAppBar isDarkTheme={darkTheme.get()} onToggle={() => darkTheme.set((prevState) => !prevState)} isLoading={loading.get()}/>
                </div>
                <div className="App" onClick={handleAddScraplet} style={{flexGrow: "1", padding: "2%"}}>
                    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}} onClick={(event) => event.stopPropagation()}>
                        {scraplets.get().map((scraplet: Scraplet) => (
                            <ScrapletCard scraplet={scraplet} key={scraplet.id}/>
                        ))}
                        <Routes>
                            <Route path="/note/:id" element={<ScrapletDialog handleDelete={handleDelete} handleOpenScrapletById={handleFetchScrapletById} handleUpdate={handleUpdate} scrapletState={openScraplet} error={error} loading={loading}/>}/>
                        </Routes>
                    </Grid>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default App
