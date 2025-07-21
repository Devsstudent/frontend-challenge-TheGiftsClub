import { Box, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import Header from "../sections/header";
import { useCampaignContext } from "../campaignContext";

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
  const methods = useForm({
    defaultValues: {
      id: "",
      profile: "BASIC",
      configuration: {
        actions: [],
        colors: {
          primary: "#000000",
          secondary: "#FFFFFF",
        },
        disabled: false,
        game_type: "WHEEL",
        gifts: [],
        retrievalConditions: [],
        logo_uri: "",
      },
      created_at: new Date().toISOString(),
      created_by: "",
      enabled: false,
      label: "",
      placeId: "",
      updated_at: new Date().toISOString(),
      updated_by: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit((data) => console.log(data))}
      >
          <Header />
          <div className="gap-2 grid-cols-4 grid mt-4">
          {/* Form fields will go here */}
          <input {...methods.register("label")} placeholder="Campaign Label" />
          <input {...methods.register("created_by")} placeholder="Created By" />
          <input {...methods.register("placeId")} placeholder="Place ID" />
          <Button variant="contained" className="hover:bg-blue-600 rounded-lg">
            Submit
          </Button>
        </div>
      </Box>
    </FormProvider>
  );
}

export default CampaignForm;
