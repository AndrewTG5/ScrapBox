import * as React from 'react';

import { Scraplet } from '../Models/Scraplet'

import Card from '@mui/material/Card/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import CardActions from '@mui/material/CardActions/CardActions'
import Typography from '@mui/material/Typography/Typography'
import Button from '@mui/material/Button/Button';
import Grid from '@mui/material/Grid/Grid';

export default function ScrapletCard({ scraplet }: { scraplet: Scraplet }) {

    return (
        <Grid item xs={2} sm={4} md={4}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {scraplet.name}
                    </Typography>
                    <Typography variant="body2">{scraplet.content}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Delete</Button>
                </CardActions>
            </Card>
        </Grid >
    );
}