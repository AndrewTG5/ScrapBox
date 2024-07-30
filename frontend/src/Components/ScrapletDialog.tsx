import {useNavigate, useParams} from "react-router-dom";
import {Dialog, DialogContent, DialogActions} from "@mui/material";
import Button from "@mui/material/Button/Button";
import {Stack, TextField} from "@mui/material";
import {useEffect} from "react";
import {State, useHookstate} from "@hookstate/core";
import {Scraplet} from '../Models/Scraplet'
import Typography from "@mui/material/Typography";

const ScrapletDialog = ({scrapletState, handleDelete, handleOpenScrapletById, handleUpdate, error, loading}: {
    scrapletState: State<Scraplet|null>,
    handleDelete: () => void,
    handleOpenScrapletById: (id: number) => void,
    handleUpdate: (scraplet: Scraplet) => void,
    error: State<string>,
    loading: State<boolean>,
}) => {
    const openScraplet: Scraplet|null = scrapletState.get();
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const name = useHookstate<string>("");
    const content = useHookstate<string>("");

    useEffect(() => {
        if (id && !loading.get() && !error.get() && (!openScraplet || openScraplet?.id !== parseInt(id))) {
            handleOpenScrapletById(parseInt(id));
        }
    }, [handleOpenScrapletById, id, openScraplet, loading, error]);

    useEffect(() => {
        if (openScraplet) {
            name.set(openScraplet.name || "");
            content.set(openScraplet.content || "");
        }
    }, [openScraplet]); // only update if openScraplet changes

    if (!openScraplet && error.get() && !loading.get()) {
        navigate('/');
    }

    const _onClose = () => {
        if (openScraplet) {
            handleUpdate({id: openScraplet.id, name: name.get(), content: content.get(), created: openScraplet.created, modified: openScraplet.modified});
        }
        scrapletState.set(null);
        navigate("/");
    }

    return (
        <Dialog open={true} onClose={_onClose} fullWidth>
            {!loading.get() && openScraplet && ( // don't render if we are waiting for loading
                <>
                    <DialogContent>
                        <Stack direction="column" spacing={2}>
                            <TextField
                                id="title"
                                placeholder="Title"
                                value={name.get()}
                                onChange={(e) => name.set(e.target.value)}
                                variant="standard"
                            />
                            <TextField
                                id="content"
                                placeholder="Content"
                                multiline
                                rows={32}
                                value={content.get()}
                                onChange={(e) => content.set(e.target.value)}
                                variant="standard"
                            />
                            <Typography variant={"overline"}>
                                Last Modified: {new Date(openScraplet.modified).toLocaleString()}
                            </Typography>
                            <Typography variant={"overline"}>
                                Created: {new Date(openScraplet.created).toLocaleString()}
                            </Typography>
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
