import React, {useEffect} from 'react';
import { useGeneralContext } from '../../../../context/GeneralContext';
import { Avatar, Button, Card, CardContent, Skeleton, Stack, Typography, useMediaQuery } from '@mui/material';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import './styles.css';


export default function MyAccount() {
    const { setModuleName, user, getUser } = useGeneralContext();

    // useEffect(() => {
    //     getUser();
    //  }, [])   

    useEffect(() => {
        // Llamar solo una vez cuando el componente se monte
        setModuleName('My Account');
    }, [setModuleName]);


    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

    return(
        <>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          {/* <HighlightedCard /> */}
        </Grid>
        <Card>
           <CardContent sx={{ width: 1, height: 900, display: 'flex' }}>
            <div className='cards-container'>
                <div className='images-container'>
                    <div className='background-img'></div>
                    <div className='main-profile-foto'>
                        { user ? (
                            <Avatar alt="Travis Howard" src={user.foto}  sx={{ width: 150, height: 150 }}/>
                        ) : (
                            <Skeleton variant='circular' width={150} height={150} />
                        )}
                    </div>
                </div>
                <Typography variant="h4" component="p">{user && `${user.nombre} ${user.apellido}`}</Typography>
                <Typography component="h4" variant="subtitle1" gutterBottom>{user && user.usuario}</Typography>
                    <Stack sx={{ justifyContent: 'space-between' }}>
                        <Stack
                            direction="row"
                            sx={{
                            alignContent: { xs: 'center', sm: 'flex-start' },
                            alignItems: 'center',
                            gap: 1,
                            }}
                        >
                            <Typography variant="h5" component="p">
                            13,277
                            </Typography>
                            <Chip size="small" color="success" label="+35%" />
                        </Stack>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Sessions per day for the last 30 days
                    </Typography>
                    </Stack>
            </div>
           </CardContent>
        </Card>
        
        

        </>
    )
}