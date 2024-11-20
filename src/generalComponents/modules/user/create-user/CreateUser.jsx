import React, {useEffect} from 'react';
import { modulesNames, subModulesNames } from '../../../../utils/constants/modulesNames';
import { useGeneralContext } from '../../../../context/GeneralContext';
import { calculateAge } from '../../../../utils/calculateAge';
import { Avatar, Box, Button, Card, CardContent, Skeleton, Stack, Typography, useMediaQuery } from '@mui/material';
import Chip from '@mui/material/Chip';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import CakeIcon from '@mui/icons-material/Cake';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import WorkIcon from '@mui/icons-material/Work';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import './styles.css';


export default function CreateUser() {
    const { setModuleName, user, setSubModuleName } = useGeneralContext(); 

    useEffect(() => {
        // Llamar solo una vez cuando el componente se monte
        setModuleName(modulesNames.USERS);
        setSubModuleName(subModulesNames.USERS.CREATE_USER)
    }, [setModuleName]);

    const [file, setFile] = React.useState(null);

    const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        setFile(selectedFile); // Guarda el archivo en el estado
    }
    };

    return(
        <section className='myaccount-main-container'>
            <form>

                <Card sx={{ width: 400, height: 400}}>

                    <input className='image-input' type="file" accept="image/*" onChange={handleFileChange} />
                    <label for="fileInput">
                        <i class="upload-icon">📁</i>
                        <span>Subir Foto</span>
                    </label>
                </Card>
            </form>

        </section>
    )
}