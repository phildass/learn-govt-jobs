import { Alert, AlertTitle } from '@mui/material';

export default function DisclaimerBanner() {
  return (
    <Alert severity="info" sx={{ borderRadius: 0 }}>
      <AlertTitle>Disclaimer</AlertTitle>
      {process.env.NEXT_PUBLIC_DISCLAIMER || 
        'This is a private educational platform and is NOT affiliated with any government organization.'}
    </Alert>
  );
}
