import { Container } from "@mui/material";

import CampaignForm from "./campaign/page";
import { CampaignContextProvider } from "./context/CampaignContext";
import { FormMethodsProvider } from "./context/FormContext";

function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <CampaignContextProvider>
        <FormMethodsProvider>
          <CampaignForm />
        </FormMethodsProvider>
      </CampaignContextProvider>
    </Container>
  );
}

export default App;
