import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => router.push('/')}
          >
            Learn Govt Jobs
          </Typography>
          <Button color="inherit" onClick={() => router.push('/jobs')}>
            Jobs
          </Button>
          <Button color="inherit" onClick={() => router.push('/current-affairs')}>
            Current Affairs
          </Button>
          <Button color="inherit" onClick={() => router.push('/login')}>
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => router.push('/register')}
            sx={{ ml: 2 }}
          >
            Register
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            {process.env.NEXT_PUBLIC_DISCLAIMER || 
              'This is a private educational platform and is NOT affiliated with any government organization.'}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            © {new Date().getFullYear()} Learn Govt Jobs. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
