import { Card, CardContent, Typography, Chip, Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { format } from 'date-fns';

export default function JobCard({ job }) {
  const router = useRouter();

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'info';
      case 'ongoing': return 'success';
      case 'closed': return 'error';
      case 'result_declared': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Card sx={{ '&:hover': { boxShadow: 6 }, cursor: 'pointer' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Typography variant="h6" component="h2">
            {job.title}
          </Typography>
          <Chip
            label={job.status}
            color={getStatusColor(job.status)}
            size="small"
          />
        </Box>

        <Typography color="text.secondary" gutterBottom>
          {job.organization}
        </Typography>

        <Box sx={{ mt: 2 }}>
          {job.sector && <Chip label={job.sector} size="small" sx={{ mr: 1 }} />}
          {job.state && <Chip label={job.state} size="small" sx={{ mr: 1 }} />}
          {job.qualification && <Chip label={job.qualification} size="small" />}
        </Box>

        {job.applicationEndDate && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Last Date: {format(new Date(job.applicationEndDate), 'dd MMM yyyy')}
          </Typography>
        )}

        {job.totalPosts && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Total Posts: {job.totalPosts}
          </Typography>
        )}

        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => router.push(`/jobs/${job.id}`)}
          >
            View Details
          </Button>
          <Button
            variant="outlined"
            size="small"
          >
            Bookmark
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
