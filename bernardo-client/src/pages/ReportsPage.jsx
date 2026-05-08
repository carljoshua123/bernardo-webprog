import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  LinearProgress,
  Divider,
  Button,
} from '@mui/material';

import { BarChart } from '@mui/x-charts/BarChart';

import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DownloadIcon from '@mui/icons-material/Download';

function SummaryCard({ title, value, icon, color }) {
  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 4,
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 8,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle2" sx={{ color: '#000', opacity: 0.7 }}>
              {title}
            </Typography>

            <Typography variant="h5" fontWeight={700} mt={1} sx={{ color: '#000' }}>
              {value}
            </Typography>
          </Box>

          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}

function ReportsPage() {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Active Users',
        data: [120, 200, 150, 170, 210],
        backgroundColor: '#06b6d4',
      },
    ],
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f8fafc', minHeight: '100vh', color: '#000' }}>

      {/* HEADER */}
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ color: '#000' }}>
            Reports & Data Visualization
          </Typography>

          <Typography sx={{ color: '#000', opacity: 0.75 }}>
            Monitor analytics, user activity, and platform performance.
          </Typography>
        </Box>

        <Button variant="contained" startIcon={<DownloadIcon />}>
          Export Report
        </Button>
      </Box>

      {/* SUMMARY CARDS */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <SummaryCard
            title="Total Active Users"
            value="850"
            icon={<PeopleIcon />}
            color="#06b6d4"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <SummaryCard
            title="Monthly Growth"
            value="+18%"
            icon={<TrendingUpIcon />}
            color="#22c55e"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <SummaryCard
            title="Reports Generated"
            value="124"
            icon={<AssessmentIcon />}
            color="#6366f1"
          />
        </Grid>
      </Grid>

      {/* CHART */}
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mt: 5,
          borderRadius: 4,
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ color: '#000' }}>
          Monthly User Analytics
        </Typography>

        <Typography sx={{ mb: 3, color: '#000', opacity: 0.75 }}>
          Track the number of active users over the last five months.
        </Typography>

        <BarChart
          xAxis={[
            {
              scaleType: 'band',
              data: chartData.labels,
            },
          ]}
          series={[
            {
              data: chartData.datasets[0].data,
              label: chartData.datasets[0].label,
              color: chartData.datasets[0].backgroundColor,
            },
          ]}
          width={700}
          height={350}
        />
      </Paper>

      {/* ANALYTICS SECTION */}
      <Grid container spacing={4} sx={{ mt: 2 }}>

        {/* PERFORMANCE */}
        <Grid item xs={12} md={6}>
          <Card elevation={4} sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ color: '#000' }}>
                Performance Overview
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={3}>
                <Box>
                  <Typography sx={{ color: '#000', mb: 1 }}>
                    User Engagement
                  </Typography>
                  <LinearProgress variant="determinate" value={80} sx={{ height: 10, borderRadius: 5 }} />
                </Box>

                <Box>
                  <Typography sx={{ color: '#000', mb: 1 }}>
                    Customer Satisfaction
                  </Typography>
                  <LinearProgress variant="determinate" value={92} sx={{ height: 10, borderRadius: 5 }} />
                </Box>

                <Box>
                  <Typography sx={{ color: '#000', mb: 1 }}>
                    System Stability
                  </Typography>
                  <LinearProgress variant="determinate" value={97} sx={{ height: 10, borderRadius: 5 }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* INSIGHTS */}
        <Grid item xs={12} md={6}>
          <Card elevation={4} sx={{ borderRadius: 4, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ color: '#000' }}>
                Key Insights
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={3}>
                <Box>
                  <Typography fontWeight={600} sx={{ color: '#000' }}>
                    User Growth Increased
                  </Typography>
                  <Typography sx={{ color: '#000', opacity: 0.75 }}>
                    Active users increased significantly in May compared to previous months.
                  </Typography>
                </Box>

                <Box>
                  <Typography fontWeight={600} sx={{ color: '#000' }}>
                    Strong Platform Stability
                  </Typography>
                  <Typography sx={{ color: '#000', opacity: 0.75 }}>
                    System uptime remained above 97% throughout the month.
                  </Typography>
                </Box>

                <Box>
                  <Typography fontWeight={600} sx={{ color: '#000' }}>
                    Engagement Trend
                  </Typography>
                  <Typography sx={{ color: '#000', opacity: 0.75 }}>
                    More users are interacting with reports and analytics tools.
                  </Typography>
                </Box>
              </Stack>

              <Box
                sx={{
                  mt: 4,
                  p: 2,
                  borderRadius: 3,
                  bgcolor: '#eff6ff',
                }}
              >
                <Typography fontWeight={700} sx={{ color: '#000' }}>
                  Recommendation
                </Typography>

                <Typography sx={{ color: '#000', opacity: 0.75 }}>
                  Focus on improving mobile responsiveness and personalized analytics to increase engagement further.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReportsPage;