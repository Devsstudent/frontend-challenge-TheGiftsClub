import { AppBar, Box, Button, Toolbar } from "@mui/material";
import QrCodeIcon from '@mui/icons-material/QrCode';

// We can also use cutom toolbar styles.

export default function Header() {
  return (
    <Box>
      <AppBar position="static" className="rounded-lg shadow-md mb-4 bg-gray-200">
        <Toolbar className="flex-between">
          <div className="">
            <h3 className="text-blue-500"> The Gifts Club Campaign</h3>
          </div>
          <div className="flex gap-4 ml-auto">
            <Button  sx={{ textTransform: 'none' }} className="hover:cursor-pointer text-black bg-white rounded-lg">Mon Code Pin</Button>
            <Button className="hover:cursor-pointer bg-amber-500 text-white normal-case items-center rounded-lg"><div className="flex-between"><QrCodeIcon/> QR code</div></Button>
            <Button className="hover:cursor-pointer text-white bg-blue-600 hover:bg-blue-500 rounded-lg" type="submit">Sauvegarder</Button>
          </div>
        </Toolbar>
        {/*
            <Toolbar className="flex-between">
                <div> test</div>
            </Toolbar>*/}
      </AppBar>
    </Box>
  );
}
