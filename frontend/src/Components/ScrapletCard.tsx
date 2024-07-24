import CardContent from '@mui/material/CardContent/CardContent';
import Typography from '@mui/material/Typography/Typography';
import Card from '@mui/material/Card/Card';
import Grid from '@mui/material/Grid/Grid';
import {Link} from "react-router-dom";

import { Scraplet } from '../Models/Scraplet';

export default function ScrapletCard({ scraplet }: { scraplet: Scraplet }) {
    return (
        <Grid item xs={2} sm={4} md={4}>
            <Link key={scraplet.id} to={`/note/${scraplet.id}`}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {scraplet.name}
                        </Typography>
                        <Typography variant="body2">{scraplet.content}</Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid >
    );
}
