import { useState } from "react";

import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupIcon from "@mui/icons-material/Group";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import ReportIcon from "@mui/icons-material/Report";

import ReportsPage from "./ReportsPage";
import UsersPage from "./UsersPage";

/* ================= DASHBOARD HOME ================= */
function DashboardHome() {
  return (
    <Box>
      {/* HEADER */}
      <Typography variant="h4" fontWeight={800}>
        Dashboard Overview
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Monitor system performance, user activity, and analytics in real time.
      </Typography>

      {/* STATS CARDS */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              p: 1,
              transition: "0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              },
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: "#2563eb" }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    1,240
                  </Typography>
                  <Typography color="text.secondary" fontSize={14}>
                    Total Users
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              p: 1,
              transition: "0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              },
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: "#16a34a" }}>
                  <TrendingUpIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    87%
                  </Typography>
                  <Typography color="text.secondary" fontSize={14}>
                    Growth Rate
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              p: 1,
              transition: "0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              },
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: "#dc2626" }}>
                  <ReportIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    32
                  </Typography>
                  <Typography color="text.secondary" fontSize={14}>
                    Pending Reports
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ACTIVITY SECTION */}
      <Box mt={4}>
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid #e5e7eb",
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight={700} mb={2}>
              System Activity
            </Typography>

            <Stack spacing={1}>
              <Typography color="text.secondary">
                • New user registrations increased by 12% this week
              </Typography>
              <Typography color="text.secondary">
                • 5 reports resolved in the last 24 hours
              </Typography>
              <Typography color="text.secondary">
                • All servers running optimally with 99.9% uptime
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

/* ================= MAIN DASHBOARD PAGE ================= */
export default function DashboardPage() {
  const [view, setView] = useState("dashboard");

  const renderView = () => {
    switch (view) {
      case "reports":
        return <ReportsPage />;
      case "users":
        return <UsersPage />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#f8fafc" }}>
      {/* SIDEBAR */}
      <Box
        sx={{
          width: 240,
          minHeight: "100vh",
          bgcolor: "#0f172a",
          color: "white",
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight={800} mb={3}>
          Admin Panel
        </Typography>

        <Button
          fullWidth
          startIcon={<DashboardIcon />}
          onClick={() => setView("dashboard")}
          sx={{
            color: "white",
            justifyContent: "flex-start",
            mb: 1,
            bgcolor: view === "dashboard" ? "#1e293b" : "transparent",
            borderRadius: 2,
          }}
        >
          Dashboard
        </Button>

        <Button
          fullWidth
          startIcon={<AssessmentIcon />}
          onClick={() => setView("reports")}
          sx={{
            color: "white",
            justifyContent: "flex-start",
            mb: 1,
            bgcolor: view === "reports" ? "#1e293b" : "transparent",
            borderRadius: 2,
          }}
        >
          Reports
        </Button>

        <Button
          fullWidth
          startIcon={<GroupIcon />}
          onClick={() => setView("users")}
          sx={{
            color: "white",
            justifyContent: "flex-start",
            borderRadius: 2,
            bgcolor: view === "users" ? "#1e293b" : "transparent",
          }}
        >
          Users
        </Button>
      </Box>

      {/* MAIN CONTENT */}
      <Box sx={{ flex: 1, p: 4 }}>{renderView()}</Box>
    </Box>
  );
}