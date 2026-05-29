import React, { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

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
} from "@mui/material";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import GroupIcon from "@mui/icons-material/Group";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import {
  fetchUsers,
  createUser,
} from "../services/UserService";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 120,
  },

  {
    field: "name",
    headerName: "Name",
    flex: 1,
    minWidth: 180,
  },

  {
    field: "email",
    headerName: "Email",
    flex: 1,
    minWidth: 220,
  },

  {
    field: "role",
    headerName: "Role",
    width: 140,

    renderCell: (params) => {
      const role = params.value;

      return (
        <Chip
          label={role}
          size="small"
          color={
            role === "admin"
              ? "error"
              : role === "editor"
              ? "primary"
              : "success"
          }
          variant="outlined"
        />
      );
    },
  },

  {
    field: "status",
    headerName: "Status",
    width: 130,

    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        color={
          params.value === "Active"
            ? "success"
            : "default"
        }
      />
    ),
  },
];

function SummaryCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 4,

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="subtitle2"
              color="text.secondary"
            >
              {title}
            </Typography>

            <Typography
              variant="h5"
              fontWeight={700}
              mt={1}
            >
              {value}
            </Typography>
          </Box>

          <Avatar
            sx={{
              bgcolor: color,
              width: 52,
              height: 52,
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}

function UsersPage() {
  const [rows, setRows] = useState([]);

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contactNumber: "",
    email: "",
    role: "",
    username: "",
    password: "",
    address: "",
    image: null,
    imageUrl: "",
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);

    setForm({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      contactNumber: "",
      email: "",
      role: "",
      username: "",
      password: "",
      address: "",
      image: null,
      imageUrl: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file,
        imageUrl: URL.createObjectURL(file),
      }));
    }
  };

  const loadUsers = async () => {
    try {
      const res = await fetchUsers();

      console.log("API RESPONSE:", res.data);

      const users = Array.isArray(res.data)
        ? res.data
        : res.data.users || [];

      const formattedUsers = users.map((user) => ({
        id: user._id || Math.random(),

        name: `${user.firstName || ""} ${
          user.lastName || ""
        }`,

        email: user.email || "",

        role: user.type || "viewer",

        status: user.isActive
          ? "Active"
          : "Inactive",
      }));

      setRows(formattedUsers);
    } catch (error) {
      console.error(
        "LOAD USERS ERROR:",
        error
      );

      setRows([]);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        firstName: form.firstName,
        lastName: form.lastName,
        age: form.age,
        gender: form.gender,
        contactNumber: form.contactNumber,
        email: form.email,
        type: form.role,
        username: form.username,
        password: form.password,
        address: form.address,
        isActive: true,
      };

      console.log("SENDING:", newUser);

      const res = await createUser(newUser);

      console.log("CREATED:", res.data);

      await loadUsers();

      handleClose();
    } catch (error) {
      console.error(
        "CREATE USER ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to add user"
      );
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={800}
          >
            User Management
          </Typography>

          <Typography color="text.secondary">
            Manage accounts and permissions
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add User
        </Button>
      </Box>

      {/* MODAL */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Add User
        </DialogTitle>

        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Stack spacing={3}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="user-image-upload"
                  type="file"
                  onChange={handleImageChange}
                />

                <label htmlFor="user-image-upload">
                  <IconButton component="span">
                    <Avatar
                      src={form.imageUrl}
                      sx={{
                        width: 80,
                        height: 80,
                      }}
                    >
                      {!form.imageUrl && (
                        <PhotoCamera />
                      )}
                    </Avatar>
                  </IconButton>
                </label>
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
                    fullWidth
                    required
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
                    <MenuItem value="Male">
                      Male
                    </MenuItem>

                    <MenuItem value="Female">
                      Female
                    </MenuItem>
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
                    <MenuItem value="admin">
                      Admin
                    </MenuItem>

                    <MenuItem value="editor">
                      Editor
                    </MenuItem>

                    <MenuItem value="viewer">
                      Viewer
                    </MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Contact Number"
                    name="contactNumber"
                    value={form.contactNumber}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
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
                    type="password"
                    value={form.password}
                    onChange={handleChange}
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
                    multiline
                    minRows={2}
                    required
                  />
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* SUMMARY */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SummaryCard
            title="Total Users"
            value={rows.length}
            icon={<GroupIcon />}
            color="#06b6d4"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <SummaryCard
            title="Admins"
            value={
              rows.filter(
                (row) =>
                  row.role === "admin"
              ).length
            }
            icon={<AdminPanelSettingsIcon />}
            color="#ef4444"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <SummaryCard
            title="Active Users"
            value={
              rows.filter(
                (row) =>
                  row.status === "Active"
              ).length
            }
            icon={<PersonIcon />}
            color="#22c55e"
          />
        </Grid>
      </Grid>

      {/* TABLE */}
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 4,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
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

          <Button
            variant="outlined"
            startIcon={<EditIcon />}
          >
            Manage Roles
          </Button>
        </Stack>

        <Box
          sx={{
            height: 520,
            width: "100%",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default UsersPage;