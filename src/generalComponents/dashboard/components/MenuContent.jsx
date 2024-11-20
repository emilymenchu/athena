import * as React from 'react';
import { modulesNames, subModulesNames } from '../../../utils/constants/modulesNames';
import { useGeneralContext } from '../../../context/GeneralContext';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../utils/constants/routes';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import InventoryIcon from '@mui/icons-material/Inventory';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './styles/MenuContent.css'

const userSubModules = [
  { text: subModulesNames.USERS.USERS, icon: <FormatListBulletedIcon />, path: routes.USER.USERS},
  { text: subModulesNames.USERS.CREATE_USER, icon: <AddIcon />, path: routes.USER.CREATE_USER},
  { text: subModulesNames.USERS.MODIFY_USER, icon: <AutoFixHighIcon />, path: routes.USER.MODIFY_USER},
];

const mainListItems = [
  { text: modulesNames.HOME, icon: <HomeRoundedIcon />, path: '/home' },
  { text: modulesNames.ANALYTICS, icon: <AnalyticsRoundedIcon /> },
  { text: modulesNames.PRODUCTS, icon: <ShoppingCartIcon /> },
  { text: modulesNames.ORDERS, icon: <ShoppingBasketIcon /> },
  { text: modulesNames.CLIENTS, icon: <PeopleRoundedIcon /> },
  { text: modulesNames.USERS, icon: <SupervisedUserCircleIcon />, subModules: userSubModules },
  { text: modulesNames.STOCK, icon: <InventoryIcon /> },
  { text: modulesNames.TASKS, icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  const { moduleName, subModuleName } = useGeneralContext();

  const [ openModules, setOpenModules ] = React.useState({});

  const navigate = useNavigate();

  const handleModuleClick = (item) => {
      if (item.subModules) {
        setOpenModules((prevState) => ({
          ...prevState,
          [item.text]: !prevState[item.text],
        }))
      } else {
        console.log(`Navigating to ${item.text}`);
      }
  };

  const handleSubModuleClick = (path) => {
    navigate(path);
  }

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={moduleName === item.text} onClick={() => handleModuleClick(item)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {item.subModules && (
                openModules[item.text] ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />
              )}
            </ListItemButton>
            {item.subModules && openModules[item.text] && (
              <section className='submodules-container'>
                {item.subModules.map((subItem, subIndex) => 
                    <ListItemButton key={subIndex} selected={subModuleName === subItem.text} onClick={() => handleSubModuleClick(subItem.path)}>
                      <ListItemIcon>{subItem.icon}</ListItemIcon>
                      <ListItemText primary={subItem.text} />
                    </ListItemButton>
                )}
              </section>
            )}
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
