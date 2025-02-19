import * as React from 'react';
import Image from 'next/image';
import { Grid, Typography, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';
import { useUser } from '@local/features/accounts';

const useStyles = makeStyles((theme) => ({
    header: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            alignItems: 'center',
        },
    },
    subtitle: {
        textAlign: 'right',
        color: '#272C6C',
        [theme.breakpoints.down('lg')]: {
            textAlign: 'center',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
        },
    },
    button: {
        marginTop: theme.spacing(2),
        minWidth: 300,
        alignSelf: 'flex-start',
        fontSize: 24,
        [theme.breakpoints.down('lg')]: {
            alignSelf: 'center',
        },
        [theme.breakpoints.down('sm')]: {
            minWidth: 0,
            width: '100%',
            fontSize: 20,
        },
    },
}));

export function CallToAction() {
    const classes = useStyles();
    const router = useRouter();
    const [user] = useUser();

    return (
        <>
            <Grid item xs={12} md={6} className={classes.header}>
                <Image
                    data-test-id='landing-prytanum-logo'
                    alt='Prytaneum Logo'
                    src='/static/prytaneum_logo2.svg'
                    width={3483}
                    height={665}
                    objectFit='contain'
                />
                <Typography variant='h5' className={classes.subtitle}>
                    A crucial tool for a better democracy.
                </Typography>
                {user ? (
                    <Button
                        variant='contained'
                        color='secondary'
                        className={classes.button}
                        onClick={() => router.push('/app/home')}
                    >
                        Go to Dashboard
                    </Button>
                ) : (
                    <Button
                        data-test-id='large-register-button'
                        variant='contained'
                        color='secondary'
                        className={classes.button}
                        onClick={() => router.push('/register')}
                    >
                        Register
                    </Button>
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                <Image
                    alt='Prytaneum Landing Graphic'
                    src='/static/prytaneum_landing_graphic.svg'
                    width={3292}
                    height={2097}
                    objectFit='contain'
                />
            </Grid>
        </>
    );
}
