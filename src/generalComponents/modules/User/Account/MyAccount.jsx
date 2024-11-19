import React, {useEffect} from 'react';
import { useGeneralContext } from '../../../../context/GeneralContext';
import { calculateAge } from '../../../../utils/calculateAge';
import { Avatar, Box, Button, Card, CardContent, Skeleton, Stack, Typography, useMediaQuery } from '@mui/material';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import CakeIcon from '@mui/icons-material/Cake';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import WorkIcon from '@mui/icons-material/Work';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import { useTheme } from '@mui/material/styles';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import './styles.css';


export default function MyAccount() {
    const { setModuleName, user, getUser } = useGeneralContext();

    useEffect(() => {
        getUser();
     }, [])   

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

  const infoItems = (user) => [
    { icon: <EmailIcon></EmailIcon>, info: user.email  },
    { icon: <CallIcon></CallIcon>, info: user.numeroTelefono },
    { icon: <CakeIcon></CakeIcon>, info: `Fecha de nacimiento: ${user.fechaNacimiento}` },
    { icon: <InsertEmoticonIcon></InsertEmoticonIcon>, info: `Edad: ${calculateAge(user.fechaNacimiento)}` },
    { icon:  user.genero === 'M' ? (<MaleIcon></MaleIcon>): user.genero === 'F' ? (<FemaleIcon></FemaleIcon>) : (<SentimentSatisfiedIcon></SentimentSatisfiedIcon>), info: `Género: ${user.genero === 'M' ? 'Masculino': user.genero === 'F' ? 'Femenino' : 'Indefinido'}` },
    { icon: <WorkIcon></WorkIcon>, info: `Rol: ${user.rol}` }
  ]

  const infoComponents = (user) => {
    if (user) {
        let items = infoItems(user);
        return (
            <>
                <Typography variant="h6" component="p">Datos Personales</Typography>
                <Box component='section'>
                    <ul>
                        {items.map((item, index) => {

                           return (<li key={index} className='info-list-item'>
                                {item.icon}
                                <p>{item.info}</p>
                            </li>)
                        })}
                    </ul>

                </Box>
            </>
        )
    }
  };

  const infoSkeleton = () => {
    return (
      <Box sx={{ width: '100%', height:'100%' }}>
        <Skeleton variant='text' width={200} height={40} />
        <Box sx={{  }}>
          {Array(7).fill(0).map((_, index) => (
            <Skeleton sx={{ margin:1 }} key={index} variant='text'  height={35} />
          ))}
        </Box>
      </Box>
    );
  };

    return(
        <section className='myaccount-main-container'>
            <Card >
                <CardContent sx={{ width: 1, height: 400, display: 'flex' }}>
                    <div className='images-container'>
                        {user ? (
                            <div className='background-img'></div>
                        ) : (
                            <Skeleton variant='rectangular' sx={{ borderRadius:1 }} height={'100%'} />
                        )}
                        <div className='main-profile-foto'>
                            { user ? (
                                <Avatar alt={user.nombre} src={user.foto}  sx={{ width: '100%', height: '100%' }}/>
                            ) : (
                                <Skeleton variant='circular' width={150} height={150} />
                            )}
                        </div>
                        <section className='user-info-container'>
                            {user ? (
                                <>
                                    <Typography variant="h5" component="p">{user && `${user.nombre} ${user.apellido}`}</Typography>
                                    <Typography component="h4" variant="subtitle2" gutterBottom>{user && user.usuario}</Typography>
                                </>

                            ) : (
                                <>
                                    <Skeleton variant='text' width={300} height={30} />
                                    <Skeleton variant='text' width={200} height={20} />
                                </>
                            )}
                            
                        </section>
                    </div>
                </CardContent>
            </Card>
            <div className='cards-container'>
                    <div className='card-info-container'>
                        <Card sx={{ width: '100%', height: '100%', padding:4}}>
                            {user ? infoComponents(user) : infoSkeleton()}
                        </Card>
                    </div> 
                    <div className='sells-card-container'>                        
                        <Card sx={{ width: '100%', height: '100%'}}>
                            <Typography variant="h6" component="p">Ventas Recientes</Typography>

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
                                        <Chip size="small" color="success" label={user ? user.bloqueado : 'ji'} />
                                    </Stack>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Sessions per day for the last 30 days
                                </Typography>
                                </Stack>
                        </Card>
                    </div>      
            </div>
        
        

        </section>
    )
}