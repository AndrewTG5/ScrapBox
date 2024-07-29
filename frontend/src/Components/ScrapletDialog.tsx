import {useNavigate, useParams} from "react-router-dom";
import {Dialog, DialogContent, DialogActions} from "@mui/material";
import Button from "@mui/material/Button/Button";
import {Stack, TextField} from "@mui/material";
import {useEffect} from "react";
import {State} from "@hookstate/core";
import {Scraplet} from '../Models/Scraplet'

const ScrapletDialog = ({scrapletState, handleDelete, handleOpenScrapletById, error, loading}: {
    scrapletState: State<Scraplet|null>,
    handleDelete: () => void,
    handleOpenScrapletById: (id: number) => void,
    error: State<string>,
    loading: State<boolean>,
}) => {
    const openScraplet = scrapletState.get();
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        if (id && !loading.get() && (!openScraplet || openScraplet.id !== parseInt(id))) {
            handleOpenScrapletById(parseInt(id));
        }
    }, [handleOpenScrapletById, id, openScraplet, loading]);

    if (!openScraplet && error.get() && !loading.get()) {
        navigate('/');
    }

    const _onClose = () => {
        scrapletState.set(null);
        navigate("/");
    }

    return (
        <Dialog open={true} onClose={_onClose} fullWidth>
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
