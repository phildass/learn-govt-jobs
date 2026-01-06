import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box, Button, Grid, Card, CardContent, Chip } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Layout from '../src/components/Layout';
import DisclaimerBanner from '../src/components/DisclaimerBanner';

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Learn Govt Jobs - Government Job Notifications & Exam Preparation</title>
        <meta name="description" content="Get real-time government job notifications with AI-powered insights" />
      </Head>

      <DisclaimerBanner />

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Your Gateway to Government Jobs
          </Typography>
          <Typography variant="h5" gutterBottom>
            Real-time notifications • AI-powered insights • Comprehensive preparation
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              sx={{ mr: 2 }}
              onClick={() => router.push('/register')}
            >
              Get Started Free
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ color: 'white', borderColor: 'white' }}
              onClick={() => router.push('/jobs')}
            >
              Browse Jobs
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Why Choose Learn Govt Jobs?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
              <NotificationsActiveIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Real-time Alerts
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get notified within 1 hour of new job postings from official portals
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
              <WorkIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  AI-Powered Matching
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get personalized job recommendations based on your qualifications
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
              <SchoolIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Exam Preparation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Syllabus planning, study tasks, and current affairs tracking
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
              <TrendingUpIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Application Tracking
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage all your applications and documents in one place
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Sectors Covered */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Jobs from All Major Sectors
          </Typography>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            {['Railways', 'Banking', 'Defense', 'SSC', 'UPSC', 'PSU', 'State Govt', 'Teaching'].map((sector) => (
              <Chip
                key={sector}
                label={sector}
                color="primary"
                sx={{ m: 1, fontSize: '1rem', py: 3 }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Ready to Start Your Journey?
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Join thousands of job seekers who trust Learn Govt Jobs
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="primary"
          sx={{ mt: 4 }}
          onClick={() => router.push('/register')}
        >
          Subscribe Now - ₹999/year
        </Button>
      </Container>
    </Layout>
  );
}
