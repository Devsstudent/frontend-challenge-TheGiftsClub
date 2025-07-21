import { Container } from "@mui/material";

import CampaignForm from "./campaign/page";
import { CampaignContextProvider } from "./campaignContext";

function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <CampaignContextProvider>
        <CampaignForm />
      </CampaignContextProvider>
    </Container>
  );
}

export default App;
