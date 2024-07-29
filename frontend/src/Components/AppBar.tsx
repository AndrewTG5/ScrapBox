import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {CircularProgress, FormControlLabel, Switch} from "@mui/material";

const ScrapboxAppBar = ({isDarkTheme, onToggle, isLoading}: { isDarkTheme: boolean, onToggle: () => void, isLoading: boolean }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Scrapbox
                    </Typography>
                    {isLoading && <CircularProgress color="inherit" style={{marginRight: "20px"}}/>}
                    <FormControlLabel control={<Switch checked={isDarkTheme} onChange={onToggle} />} label="Dark theme" />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default ScrapboxAppBar;