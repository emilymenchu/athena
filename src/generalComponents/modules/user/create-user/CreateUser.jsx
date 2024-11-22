import React, { useEffect, useState } from 'react';
import { useGeneralContext } from '../../../../context/GeneralContext';
import { Box, Button, Card, CircularProgress, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, Typography } from '@mui/material';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { useSaveUserContext } from '../../../../context/User/saveUserContext';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { getSucursales } from '../../../../service/sucursalService';
import './styles.css';

export default function SaveUser({ user }) {
    const { setModuleName, setSubModuleName } = useGeneralContext(); 

    const [sucursales, setSucursales] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSucursales()
            .then(response => {
                console.log(response)
                setSucursales(response);
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const currentDate = dayjs();

    const { inputError, errorMessage, file, handleFileChange, setClearedDate, clearedDate, validatePassword } = useSaveUserContext();

    const [newUser, setNewUser] = useState(user ? user : {
        id: null,
        usuario: '',
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        genero: '',
        numeroTelefono: '',
        rol: '',
        sucId: '',
        contrasena: '',
        foto: null,
        email: ''
    });

    if (loading) {
        return (
            <CircularProgress />
        )
    }

    return(
        <section className='create-account-main-container'>
            <form className='create-user-form'>

                <Card sx={{ width: 350, height: 350}} className='photo-card'>
                    <section className='file-upload-container'>
                        <div className='file-upload'>
                            <input id='imageInput' type='file' accept='image/*' onChange={(e) => handleFileChange(e) } />
                            <label 
                            className='input-label' 
                            htmlFor='imageInput'
                            style={{
                                backgroundImage: file ? `url(${file})` : "none",
                              }}
                            >
                                {!file && (
                                    <>                                    
                                        <i className='upload-icon'><CameraEnhanceIcon /></i>
                                        <Typography>Subir Foto</Typography>
                                    </>
                                )}
                            </label>
                        </div>
                                <Typography sx={{ textAlign: 'center', width: '50%', color: 'var(--light-gray-text-color)'}}  variant="caption" gutterBottom >Se permiten solamente archivos de imágenes</Typography>
                    </section>

                </Card>

                <Card sx={{ width: 500, height: 850, display: 'flex', justifyContent:'center'}}>

                    <Box
                        sx={{  m: 1, width: '100%',  display:'flex', flexDirection: 'column', justifyContent: 'space-around',  }}
                        // noValidate
                        // autoComplete="off"
                        >

                        <FormLabel sx={{ fontSize: 'medium' }}>Información de usuario</FormLabel>


                        <div className='name-input-container'>
                            <FormControl sx={{width: '190px'}}>
                                <TextField
                                error={inputError.usuario} 
                                helperText={errorMessage.usuario}
                                id='user'
                                type='text'
                                name='usuario' 
                                label='Usuario'
                                autoComplete='username'                          
                                fullWidth 
                                required={user? true : false}
                                color={inputError.usuario ? 'error' : 'none'}
                                value={newUser.usuario}
                                onChange={(e) =>
                                    setNewUser((prevUser) => ({
                                        ...prevUser,
                                        usuario: e.target.value
                                    }))}
                                variant='filled' />
                            </FormControl>
                            <FormControl sx={{width: '190px'}}>
                                <TextField
                                error={inputError.contrasena} 
                                helperText={errorMessage.contrasena}
                                id='password'
                                type={user ? "text" : "password"}
                                name='contrasena' 
                                label='Contraseña'
                                autoComplete='new-password'                          
                                fullWidth 
                                required={user? true : false}
                                color={inputError.contrasena ? 'error' : 'none'}
                                value={newUser.contrasena}
                                onChange={(e) =>
                                    setNewUser((prevUser) => ({
                                        ...prevUser,
                                        contrasena: e.target.value
                                    }))}
                                variant='filled' />
                            </FormControl>
                        </div>

                            <FormLabel>Nombre Completo</FormLabel>
                            <div className='name-input-container'>
                                <FormControl sx={{width: '190px'}}>
                                    <TextField
                                    error={inputError.name} 
                                    helperText={errorMessage.name}
                                    id='name'
                                    type='text'
                                    name='nombre' 
                                    label='Nombre'
                                    autoComplete='given-name'                          
                                    fullWidth 
                                    required={user? true : false}
                                    color={inputError.name? 'error' : 'none'}
                                    variant='filled' />
                                </FormControl>

                                <FormControl sx={{width: '190px'}}>
                                    <TextField
                                    error={inputError.name} 
                                    helperText={errorMessage['name']}
                                    id='lastName'
                                    type='text'
                                    name='apellido' 
                                    label='Apellido'
                                    autoComplete='family-name'                          
                                    fullWidth 
                                    required={user? true : false}
                                    color={inputError.name ? 'error' : 'none'}
                                    variant='filled' />
                                </FormControl>       
                            </div>


                        <FormLabel>Fecha de Nacimiento</FormLabel>
                        <div className='name-input-container'>
                            <FormControl sx={{width: '190px'}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker  
                                            maxDate={currentDate}
                                            slotProps={{
                                                field: { clearable: true, onClear: () => setClearedDate(true) },
                                            }}
                                            />
                                </LocalizationProvider>
                            </FormControl>
                        </div>

                        <FormLabel id="demo-radio-buttons-group-label" color='none'>Género</FormLabel>
                        <div className='name-input-container'>
                            <FormControl >
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="genero"
                                >
                                    <FormControlLabel value="F" control={<Radio />} label="Femenino" />
                                    <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                                    <FormControlLabel value="O" control={<Radio />} label="Otro" />
                                </RadioGroup>
                            </FormControl>
                        </div>


                        <FormLabel>Información de Contacto</FormLabel>
                        <div className='name-input-container'>
                            <FormControl sx={{width: '190px'}}>
                                <TextField
                                    error={inputError.numeroTelefono} 
                                    helperText={errorMessage.numeroTelefono}
                                    id='telefono'
                                    type='tel'
                                    name='numeroTelefono' 
                                    label='Número Telefónico'
                                    autoComplete='tel'                          
                                    fullWidth 
                                    required={user? true : false}
                                    color={inputError.numeroTelefono ? 'error' : 'none'}
                                    variant='filled'
                                    value={newUser.numeroTelefono} 
                                    onChange={(e) =>
                                        setNewUser((prevUser) => ({
                                            ...prevUser,
                                            numeroTelefono: e.target.value
                                        }))}
                                    />
                            </FormControl>
                            <FormControl sx={{width: '190px'}}>
                                <TextField
                                    error={inputError.email} 
                                    helperText={errorMessage.email}
                                    id='email'
                                    type='text'
                                    name='email' 
                                    label='Correo Electrónico'
                                    autoComplete='email'                          
                                    fullWidth 
                                    required={user? true : false}
                                    color={inputError.email ? 'error' : 'none'}
                                    variant='filled'
                                    value={newUser.email} 
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
                                            email: e.target.value
                                        })}
                                    />
                            </FormControl>
                        </div>
                            

                        <FormLabel>Información Empresarial</FormLabel>

                        <div className='name-input-container'>
                            <FormControl variant="filled" sx={{width: '190px'}}>
                                <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="rol"
                                    label="SELLER"
                                    value={newUser?.rol}
                                    onChange={(e) => 
                                        setNewUser({
                                            ...newUser,
                                            rol: e.target.value
                                        })
                                    }
                                >
                                    <MenuItem value='ADMIN'>Administrador</MenuItem>
                                    <MenuItem value='SELLER'>Vendedor</MenuItem>
                                    <MenuItem value='OTHER'>Otro</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" sx={{width: '190px'}}>
                                <InputLabel id="demo-simple-select-label">Sucursal</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id='Sucursal'
                                    label="Sucursal"
                                    value={newUser?.sucId} 
                                    onChange={(e) => 
                                        setNewUser({
                                            ...newUser,
                                            sucId: e.target.value
                                        })
                                    }
                                >
                                    {
                                        sucursales?.map((sucursal, index) => 
                                            <MenuItem key={index} value={sucursal.id}>{sucursal.nombre}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>

                        </div>
                        
                        <Stack direction="row" spacing={5} sx={{justifyContent:'flex-start', marginTop: 'var(--gap-medium)'}}>
                            {!user && (
                                <Button variant="outlined" startIcon={<DeleteIcon />}>
                                    Limpiar Formulario
                                </Button>
                            )}
                            <Button variant="contained" endIcon={<SendIcon />}>
                                Crear Usuario
                            </Button>
                        </Stack>

                    </Box>


                </Card>
            </form>

        </section>
    )
}