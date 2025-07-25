import { useCampaignContext } from "../context/CampaignContext";
import { Alert, Box, Input, Modal } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CustomButton from "./CustomButton";
import { useState } from "react";
import { CircleWrapper } from "./DropdownAction";

export default function AlertPin() {
  const { pin, setPin } = useCampaignContext();
  const [ok, setOk] = useState(false);
  const [open, setOpen] = useState(false);
  const [tmpPin, setTmpPin] = useState(pin);

  return (
    <>
      {pin === "" && (
        <Box>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">
                Configurer le Code PIN
              </h2>

              <p className="mb-4">
                Pour sécuriser la récupération des cadeaux, veuillez configurer
                votre Code PIN.
              </p>
              <div className="flex justify-between gap-4">
                <Input
                  type="password"
                  placeholder="Entrez votre Code PIN"
                  fullWidth
                  onChange={(e) => {
                    setTmpPin(e.target.value);
                    // Logic to handle PIN input
                  }}
                />
                <CustomButton
                  variant="primary"
                  onClick={() => {
                    // Logic to configure the PIN
                    setPin(tmpPin);
                    setOpen(false);
                  }}
                >
                  Configurer
                </CustomButton>
              </div>
            </div>
          </Modal>
          <Alert
            severity="warning"
            icon={
              <CircleWrapper>
                <LockOutlinedIcon className="text-yellow-600" />
              </CircleWrapper>
            }
            className="!bg-yellow-50 !border-2 !border-yellow-300 !rounded-xl !text-yellow-900 !p-4"
            classes={{
              message: "!flex !justify-between !items-center !w-full !p-0",
              icon: "!mr-4 !p-0 !items-center",
            }}
          >
            <div className="flex justify-between items-center w-full">
              <div>
                <div className="font-semibold text-base mb-1 text-yellow-900">
                  Votre Code PIN n'est pas configuré
                </div>
                <div className="text-sm text-yellow-800 opacity-90">
                  Activez-le pour sécuriser la récupération des cadeaux par vos
                  clients.
                </div>
              </div>

              <CustomButton
                variant="yellow"
                size="small"
                onClick={() => setOpen(true)}
              >
                <span className="text-black uppercase font-medium">
                  Configurer le Code PIN
                </span>
              </CustomButton>
            </div>
          </Alert>
        </Box>
      )}
      {pin !== "" && !ok && (
        <Alert
          severity="info"
          icon={<InfoOutlinedIcon className="text-blue-600" />}
          className="!bg-blue-50 !border-2 !border-blue-300 !rounded-xl !text-blue-900 !p-4"
          classes={{
            message: "!flex !justify-between !items-center !w-full !p-0",
            icon: "!mr-4 !p-0 !items-center",
          }}
        >
          <div className="flex-1">
            <div className="font-semibold text-base mb-1 text-blue-900">
              Personnalisez vos couleurs pour renforcer votre image
            </div>
            <div className="text-sm text-blue-800 opacity-90">
              Les couleurs personnalisées renforcent l'image de votre
              établissement et augmentent l'engagement des joueurs. Créez une
              expérience unique qui reflète votre identité de marque.
            </div>
            <CustomButton
              variant="primary"
              size="small"
              onClick={() => setOk(true)}
              className="mt-2"
            >
              <span className="text-white uppercase font-medium">
                J'ai compris
              </span>
            </CustomButton>
          </div>
        </Alert>
      )}
    </>
  );
}
