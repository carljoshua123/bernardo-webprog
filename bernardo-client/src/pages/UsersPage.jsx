import { DataGrid } from '@mui/x-data-grid';

import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  Avatar,
  Stack,
  Chip,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';

import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },

  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 180,
  },

  {
    field: 'email',
    headerName: 'Email',
    flex: 1.2,
    minWidth: 220,
  },

  {
    field: 'role',
    headerName: 'Role',
    width: 140,
    renderCell: (params) => {
      const role = params.value;

      return (
        <Chip
          label={role}
          size="small"
          color={
            role === 'Admin'
              ? 'error'
              : role === 'Editor'
              ? 'primary'
              : 'success'
          }
          variant="outlined"
        />
      );
    },
  },

  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        color={params.value === 'Active' ? 'success' : 'default'}
      />
    ),
  },
];

const rows = [
  { id: 1, name: 'Alice Johnson', email: 'alice@email.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@email.com', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Charlie Lee', email: 'charlie@email.com', role: 'Editor', status: 'Active' },
  { id: 4, name: 'Dana White', email: 'dana@email.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Ethan Brown', email: 'ethan@email.com', role: 'User', status: 'Inactive' },
];

function SummaryCard({ title, value, icon, color }) {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 4,
        transition: '0.25s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>

            <Typography variant="h5" fontWeight={700} mt={1}>
              {value}
            </Typography>
          </Box>

          <Avatar sx={{ bgcolor: color, width: 52, height: 52 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}

function UsersPage() {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: '#f4f6f8',
        minHeight: '100vh',
        color: '#000',
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800} sx={{ color: '#000' }}>
            User Management
          </Typography>

          <Typography sx={{ color: '#000', opacity: 0.75 }}>
            Manage accounts, roles, and permissions
          </Typography>
        </Box>

        <Button variant="contained" startIcon={<AddIcon />}>
          Add User
        </Button>
      </Box>

      {/* SUMMARY CARDS */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SummaryCard
            title="Total Users"
            value="1,245"
            icon={<GroupIcon />}
            color="#06b6d4"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <SummaryCard
            title="Administrators"
            value="18"
            icon={<AdminPanelSettingsIcon />}
            color="#ef4444"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <SummaryCard
            title="Active Users"
            value="1,102"
            icon={<PersonIcon />}
            color="#22c55e"
          />
        </Grid>
      </Grid>

      {/* SEARCH + TABLE */}
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 4,
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', md: 'center' }}
          mb={3}
        >
          <TextField
            placeholder="Search users..."
            fullWidth
            sx={{ maxWidth: 420 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button variant="outlined" startIcon={<EditIcon />}>
            Manage Roles
          </Button>
        </Stack>

        <Box sx={{ height: 520, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            paginationModel={{ pageSize: 5, page: 0 }}
            pageSizeOptions={[5, 10]}
            sx={{
              border: 0,
              borderRadius: 3,
              bgcolor: '#fff',

              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f1f5f9',
                fontWeight: 700,
              },

              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 700,
              },

              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f8fafc',
              },
            }}
          />
        </Box>
      </Paper>

      {/* INSIGHTS */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 4,
          bgcolor: '#e0f2fe',
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ color: '#000' }}>
          User Insights
        </Typography>

        <Typography sx={{ color: '#000', opacity: 0.75, mt: 1 }}>
          Active users are increasing monthly. Monitor inactive accounts to improve system efficiency
          and security.
        </Typography>
      </Box>
    </Box>
  );
}

export default UsersPage;