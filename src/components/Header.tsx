import { AppBar, Box, Modal, Toolbar, Typography } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import CustomButton from "./CustomButton";
import React, { useState } from "react";
import { useCampaignContext } from "../context/CampaignContext";
import { useFormContext } from "react-hook-form";
import type { CampaignFormData } from "../context/FormContext";

// We can also use cutom toolbar styles.
/*
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};*/

export default function Header() {
  const {pin} = useCampaignContext();
  const { handleSubmit } = useFormContext<CampaignFormData>();
  const [openCodePin, setOpenCodePin] = useState(false);
  const [openQrCode, setOpenQrCode] = useState(false);

  const onSubmit = (data: CampaignFormData) => {
    console.log("Form submitted from header:", data);
    // You can add additional logic here, like API calls
  };

  return (
    <Box>
      <Modal
        open={openCodePin}
        onClose={() => setOpenCodePin(false)}
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white border-2 border-black shadow-2xl p-4">
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Code pin : {pin === "" ? "Not set" : pin}
          </Typography>
        </div>
      </Modal>
      <Modal
        open={openQrCode}
        onClose={() => setOpenQrCode(false)}
        aria-describedby="modal-modal-description-qr"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white border-2 border-black shadow-2xl p-4">
          <Typography id="modal-modal-description-qr" sx={{ mt: 2 }}>
            QR Code
          </Typography>
        </div>
      </Modal>
      <AppBar
        position="static"
        className="rounded-lg shadow-md mb-4 bg-gray-200"
      >
        <Toolbar className="flex-between">
          <div className="">
            <h3 className="text-blue-500"> The Gifts Club Campaign</h3>
          </div>
          <div className="flex gap-4 ml-auto">
            <CustomButton
              variant="secondary"
              size="medium"
              onClick={() => setOpenCodePin(true)}
            >
              Mon Code Pin
            </CustomButton>
            <CustomButton
              variant="accent"
              size="medium"
              icon={<QrCodeIcon />}
              iconPosition="left"
               onClick={() => setOpenQrCode(true)}
            >
              QR Code
            </CustomButton>
            <CustomButton variant="primary" size="medium" onClick={handleSubmit(onSubmit)}>
              SAUVEGARDER
            </CustomButton>
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
