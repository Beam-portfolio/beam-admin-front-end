"use client";

import { ConfirmDialog } from '@/components/custom-dialog';
import Iconify from '@/components/iconify';
import { useBoolean } from '@/hooks/use-boolean';
import { useAppDispatch } from '@/redux/hooks';
import { fetchProjects } from '@/redux/slices/projectsSlice';
import { paths } from '@/routes/paths';
import axiosInstance from '@/utils/axios';
import {
  Card,
  CardMedia,
  Box,
  Typography,
  Stack,
  Chip,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';

interface ProjectCardProps {
  project: {
    id(id: any): string | undefined;
    title: string;
    stack: string;
    subtitle: string;
    type?: any;
    testimonial?: string;
    img?: string;
    status: string;
    description: string;
    fromDate: string;
    toDate?: string;
  };
}

const formatDate = (date: string | Date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const {
    id,
    title,
    stack,
    subtitle,
    type,
    testimonial,
    img,
    status,
    description,
    fromDate,
    toDate,
  } = project;
  const dispatch = useAppDispatch()
  const confirm = useBoolean()

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/projects/${id}`)
      dispatch(fetchProjects())
      enqueueSnackbar("Project deleted successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to delete project", { variant: "error" });
    }
  }

  const truncatedDescription =
    description.length > 90
      ? description.substring(0, 90) + "..."
      : description;

  return (
    <Card
      sx={{
        minWidth: 260,
        background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
        borderRadius: 2,
        boxShadow: 6,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        color: "common.white",
        position: "relative",
        border: "3px dashed #2563eb",
      }}
    >
    <IconButton
      size="small"
      color="error"
      sx={{ mt: 1, bgcolor: "rgb(216 101 101 / 20%)", position: "absolute", top: 10, right: 10 }}
      onClick={confirm.onTrue}
    >
      <Iconify icon="material-symbols:delete-rounded" width="24" height="24" />
    </IconButton>
      {img && (
        <Box>
          <CardMedia
            component="img"
            image={img}
            alt={title}
            sx={{
              width: "100%",
              height: 228,
              objectFit: "cover",
              borderRadius: 2,
              mb: 1,
              boxShadow: 2,
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          p: 2,
        }}
      >
        <Typography variant="h6" noWrap fontWeight="bold">
          {title}
        </Typography>

        <Typography variant="caption" color="#c7d2fe" sx={{ mt: -0.5 }}>
          {subtitle}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
          {stack && (
            <Chip
              label={stack}
              size="small"
              sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
            />
          )}
          {type && (
            <Chip
              label={type.name}
              size="small"
              sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
            />
          )}
        </Stack>

        <Typography variant="body2" color="#c7d2fe" sx={{ flexGrow: 1, mt: 1 }}>
          {truncatedDescription}
        </Typography>

        {testimonial && (
          <Box
            sx={{
              mt: 2,
              p: 1,
              bgcolor: "rgba(255,255,255,0.1)",
              borderRadius: 1,
              fontStyle: "italic",
              fontSize: 12,
            }}
          >
            <q>{testimonial}</q>
          </Box>
        )}

        {/* Dates and Status */}
        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 2 }} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ fontSize: 10 }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="caption">{formatDate(fromDate)}</Typography>
            <Typography variant="caption">-</Typography>
            <Typography variant="caption">
              {formatDate(toDate || fromDate)}
            </Typography>
          </Box>
          <Chip
            label={status}
            size="small"
            sx={{
              bgcolor: status === "completed" ? "success.main" : "warning.main",
              color: "white",
              fontWeight: 700,
              fontSize: 10,
              height: 20,
            }}
          />
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ fontSize: 10 }}>
          <Button
            fullWidth
            size="small"
            color="inherit"
            variant="outlined"
            sx={{ mt: 1 }}
          >
            View Details
          </Button>
          <Button
            fullWidth
            size="small"
            color="inherit"
            variant="outlined"
            sx={{ mt: 1 }}
            component={Link}
            href={paths.dashboard.projects.edit(`${project.id}`)}
          >
            Edit
          </Button>
        </Stack>
      </Box>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete Product"
        content="Are you sure you want to delete this product?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              confirmDelete();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </Card>
  );
};
