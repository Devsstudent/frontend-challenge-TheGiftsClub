import { Box } from "@mui/material";
import { useCampaignContext } from "../context/CampaignContext";
import Header from "../components/Header";
import SectionHeader from "../components/SectionHeader";
import {Plus } from "lucide-react";
import ActionTable from "../components/ActionTable";
import AlertPin from "../components/AltertPin";
import GameSelection from "../components/GameSelection";

function CampaignForm() {
  /*
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    {defaultValues: {
      firstName: 'John',
      lastName: '',
      age: '',
    }}
  );

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register('firstName')} placeholder='First Name' />
      <input {...register('lastName', { required: true })} placeholder='Last Name' />
      {errors.lastName && <p>Last name is required.</p>}
      <input {...register('age', { pattern: /\d+/ })} placeholder='Age' />
      {errors.age && <p>Please enter number for age.</p>}
      <input type="submit" />
    </form>
  );
}*/

  const { value } = useCampaignContext();
  console.log("Campaign Context Value:", value);

  return (
    <Box>
      <Header />
      <AlertPin />
      {/*
      <div className="gap-2 grid-cols-1 grid mt-4">
        <input {...register("label")} placeholder="Campaign Label" />
        <input {...register("created_by")} placeholder="Created By" />
        <input {...register("placeId")} placeholder="Place ID" />
        <Button variant="contained" className="hover:bg-blue-600 rounded-lg">
          Submit
        </Button>*/}
      <div >
        <SectionHeader
          title="ORGANISEZ VOS ACTIONS"
          hideArrow={true}
          width="medium"
          description="Définissez l'ordre et les action à réaliser par vos clients pour maximiser l'engagement."
          actionButton={{
            label: "Ajouter une action",
            onClick: () => console.log("Add action"),
            icon: <Plus className="w-4 h-4" />,
            variant: "primary",
          }}
        >
          <ActionTable />
          {/*
          Alert Material Design */}
        </SectionHeader>
        <SectionHeader
          title="CHOIX DU JEUX"
          description="Sélectionnez parmi 4 jeux interactifs pour engager vos utlisateurs et créer une expérience unique."
          >
            <GameSelection />
          </SectionHeader>
      </div>
    </Box>
  );
}

export default CampaignForm;
