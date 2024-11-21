import React, {useEffect, useState} from 'react';
import { modulesNames, subModulesNames } from '../../../../utils/constants/modulesNames';
import { useGeneralContext } from '../../../../context/GeneralContext';
import { Alert, Box, Card, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import TextField from '@mui/material/TextField';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import dayjs from 'dayjs';
import './styles.css';
import { DatePicker } from '@mui/x-date-pickers';
import { useSaveUserContext } from '../../../../context/User/saveUserContext';


export default function SaveUser({ user }) {
    const { setModuleName, setSubModuleName } = useGeneralContext(); 

    const currentDate = dayjs();

    const { inputError, errorMessage, file, handleFileChange, setClearedDate, clearedDate } = useSaveUserContext();

    const [newUser, setNewUser] = useState(user ? user : {
        id: null,
        usuario: '',
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        genero: '',
        numeroTelefono: '',
        rol: '',
        sucId: null,
        contrasena: '',
        foto: null,
        email: ''
    });


    return(
        <section className='create-account-main-container'>
            <form className='create-user-form'>

                <Card sx={{ width: 350, height: 350}}>
                    <section className='file-upload-container'>
                        <div className='file-upload'>
                            <input id='imageInput' type='file' accept='image/*' onChange={() => handleFileChange(e) } />
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

                <Card sx={{ width: 750, height: 750}}>

                    <Box
                        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                        >

                        <FormControl>
                            <TextField
                            error={inputError.user} 
                            helperText={errorMessage.user}
                            id='user'
                            type='text'
                            name='usuario' 
                            label='Usuario'
                            autoComplete='username'                          
                            fullWidth 
                            required={user? true : false}
                            color={inputError.user ? 'error' : 'none'}
                            value={newUser.usuario}
                            onChange={(e) =>
                                setNewUser((prevUser) => ({
                                    ...prevUser,
                                    usuario: e.target.value
                                }))}
                            variant='filled' />
                        </FormControl>

                        <FormControl>
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

                        <FormControl>
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
                            color={inputError['name']? 'error' : 'none'}
                            variant='filled' />
                        </FormControl>

                        <FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                    <DatePicker  
                                        maxDate={currentDate}
                                        slotProps={{
                                            field: { clearable: true, onClear: () => setClearedDate(true) },
                                        }}
                                          />
                            </LocalizationProvider>
                        </FormControl>

                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label" color='none'>Género</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="genero"
                            >
                                <FormControlLabel value="F" control={<Radio />} label="Femenino" />
                                <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                                <FormControlLabel value="O" control={<Radio />} label="Otro" />
                            </RadioGroup>
                        </FormControl>
                    </Box>


                </Card>
            </form>

        </section>
    )
}