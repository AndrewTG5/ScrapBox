import {useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import Button from "@mui/material/Button/Button";
import {Stack, TextField} from "@mui/material";

import { useScraplet } from '../Hooks/useScraplet'

const ScrapletDialog = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const { openScraplet, fetchScraplets, fetchScrapletById, deleteScrapletById, loading, error } = useScraplet();

    useEffect(() => {
        if (id && (!openScraplet || openScraplet?.id !== parseInt(id))) {
            fetchScrapletById(parseInt(id));
        }
    }, [fetchScrapletById, id, openScraplet]);

    const handleDelete = async() => {
        if (openScraplet && openScraplet.id !== undefined) {
            await deleteScrapletById(openScraplet.id)
                .then(() => {
                    fetchScraplets();
                    navigate('/');
                })
        }
    }

    if (!openScraplet && error && !loading) {
        navigate('/');
        return null;
    }

    return (
        <Dialog open={true} onClose={() => navigate('/')} fullWidth>
            {openScraplet && ( // don't render if we are waiting for loading
                <>
                    <DialogContent>
                        <Stack direction="column" spacing={2}>
                            <TextField
                                id="title"
                                placeholder="Title"
                                defaultValue={openScraplet.name}
                                variant="standard"
                            />
                            <TextField
                                id="content"
                                placeholder="Content"
                                multiline
                                rows={32}
                                defaultValue={openScraplet.content}
                                variant="standard"
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button size="small" onClick={handleDelete}>Delete</Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
}

export default ScrapletDialog;
