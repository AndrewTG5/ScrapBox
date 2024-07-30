import CardContent from '@mui/material/CardContent/CardContent';
import Typography from '@mui/material/Typography/Typography';
import Card from '@mui/material/Card/Card';
import Grid from '@mui/material/Grid/Grid';
import {Link} from "react-router-dom";

import { Scraplet } from '../Models/Scraplet';

export default function ScrapletCard({ scraplet }: { scraplet: Scraplet }) {
    return (
        <Grid item xs={2} sm={4} md={4}>
            <Link style={{ textDecoration: 'none' }} key={scraplet.id} to={`/note/${scraplet.id}`}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" style={{display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"}}>
                            {scraplet.name}
                        </Typography>
                        <Typography variant="body2" style={{display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden"}}>{scraplet.content}</Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid >
    );
}
