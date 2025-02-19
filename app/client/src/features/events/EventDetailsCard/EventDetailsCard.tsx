import * as React from 'react';
import { Grid, Typography, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { graphql, useFragment } from 'react-relay';
import { formatDate } from '@local/utils/format';

import { EventDetailsCardFragment$key } from '@local/__generated__/EventDetailsCardFragment.graphql';

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(1),
        fontWeight: 700,
    },
    description: {
        marginBottom: theme.spacing(1),
    },
    divider: {
        background: 'black',
    },
}));

export const EVENT_DETAILS_CARD_FRAGMENT = graphql`
    fragment EventDetailsCardFragment on Event {
        id
        title
        description
        startDateTime
        endDateTime
    }
`;

interface Props {
    fragmentRef: EventDetailsCardFragment$key;
}

export function EventDetailsCard({ fragmentRef }: Props) {
    const { title, description, startDateTime, endDateTime } = useFragment(EVENT_DETAILS_CARD_FRAGMENT, fragmentRef);
    const classes = useStyles();

    const startTime = React.useMemo(() => formatDate(startDateTime ? new Date(startDateTime) : new Date(), 'h:mmaa'), [startDateTime]);
    const endTime = React.useMemo(() => formatDate(endDateTime ? new Date(endDateTime) : new Date(), 'h:mmaa'), [endDateTime]);
    
    return (
        <Grid container direction='column'>
            <Typography variant='h5' className={classes.title}>
                {title}
            </Typography>
            <Typography color='textSecondary' variant='body1' className={classes.description}>
                {startTime} - {endTime} • {description}
            </Typography>
            <Divider className={classes.divider} />
        </Grid>
    );
}
