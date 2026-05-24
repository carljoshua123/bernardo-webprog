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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  IconButton,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

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

const initialRows = [
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


import React, { useState } from 'react';

function UsersPage() {
  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    role: '',
    username: '',
    password: '',
    address: '',
    image: null,
    imageUrl: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({ fullName: '', username: '', email: '', role: '', status: '', image: null, imageUrl: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file, imageUrl: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Compose full name for display
    const name = `${form.firstName} ${form.lastName}`;
    // Compose email (optional, can be blank or generated)
    const email = form.username ? `${form.username}@email.com` : '';
    // Add new user to table
    setRows(prev => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        name,
        email,
        role: form.role,
        status: 'Active',
        age: form.age,
        gender: form.gender,
        username: form.username,
        address: form.address,
        // You can add more fields as needed
      }
    ]);
    handleClose();
  };

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

        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
          Add User
        </Button>
      </Box>

      {/* Add User Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, textAlign: 'center', letterSpacing: 1 }}>Add User</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mb: 2 }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="user-image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="user-image-upload">
                  <IconButton component="span" sx={{ mb: 1 }}>
                    <Avatar
                      src={form.imageUrl}
                      sx={{ width: 80, height: 80, bgcolor: '#e0e7ef', border: '2px solid #1976d2' }}
                    >
                      {!form.imageUrl && <PhotoCamera fontSize="large" />}
                    </Avatar>
                  </IconButton>
                </label>
                <Typography variant="caption" color="text.secondary">Upload Photo</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Age"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    select
                    label="Gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    fullWidth
                    required
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    select
                    label="Role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    fullWidth
                    required
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Editor">Editor</MenuItem>
                    <MenuItem value="Viewer">Viewer</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    type="password"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    fullWidth
                    required
                    multiline
                    minRows={2}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} variant="outlined" color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>

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
            getRowId={(row) => row.id}
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