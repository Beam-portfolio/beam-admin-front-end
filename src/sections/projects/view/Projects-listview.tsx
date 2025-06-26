"use client";

// @mui
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
// components
import { useSettingsContext } from "src/components/settings";
import { LoadingButton } from "@mui/lab";
import {
  InputAdornment,
  CircularProgress,
  Stack,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Iconify from "src/components/iconify";
import { useCallback, useState, useEffect, useMemo } from "react";
import { paths } from "src/routes/paths";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { useSnackbar } from "notistack";
import { useAuthContext } from "@/auth/hooks";
import Grid from "@mui/material/Grid";
import { ProjectCard } from "../ProjectsCard";
import { fetchProjects, fetchTypes } from "@/redux/slices/projectsSlice";
// ----------------------------------------------------------------------

export default function ProjectsListView() {
  const [currentProject, setCurrentProject] = useState<any[]>([]);
  const [currentTypes, setCurrentTypes] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sorting, setSorting] = useState<string>("newest");
  const settings = useSettingsContext();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const projectsState = useAppSelector((state) => state.projects);
  const projects = useMemo(
    () => projectsState?.projects || [],
    [projectsState?.projects],
  );
  const types = useMemo(() => projectsState?.types || [], [projectsState?.types]);
  const loading = projectsState?.loading || false;
  const { user } = useAuthContext();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState({
    query: "",
    results: [],
  });

  console.log(types);


  useEffect(() => {
    if (!user) {
      return;
    }
    dispatch(fetchProjects());
    dispatch(fetchTypes());
  }, [dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (projects.length > 0) {
      setCurrentProject(projects);
    }
    if (types.length > 0) {
      setCurrentTypes(types);
    }
  }, [projects, types]);

  const handleSearch = useCallback(
    (value: string) => {
      if (!value) {
        setCurrentProject(projects);
        return;
      }

      const filtered = projects.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.description?.toLowerCase().includes(value.toLowerCase()),
      );

      setCurrentProject(filtered);
    },
    [projects],
  );

  const handleCreateProject = () => {
    router.push(paths.dashboard.projects.create);
  };

  const handleFilter = useCallback(() => {
    let filtered = [...projects];

    // Search by query
    if (search.query) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(search.query.toLowerCase()) ||
          item.description?.toLowerCase().includes(search.query.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedType !== "all") {
      filtered = filtered.filter((item: any) => item?.type?.id == selectedType);
    }

    // Sorting
    switch (sorting) {
      case "newest":
        filtered.sort((a, b) => {
          const dateA = a.toDate ? new Date(a.toDate).getTime() : 0;
          const dateB = b.toDate ? new Date(b.toDate).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.toDate).getTime() -
            new Date(b.toDate).getTime(),
        );
        break;
      case "asc":
        filtered.sort((a, b) => a.Price - b.Price);
        break;
      case "desc":
        filtered.sort((a, b) => b.Price - a.Price);
        break;
      default:
        break;
    }

    setCurrentProject(filtered);
  }, [projects, search.query, selectedType, sorting]);

  useEffect(() => {
    handleFilter();
  }, [search.query, selectedType, sorting, projects, handleFilter]);

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Container
        maxWidth={settings.themeStretch ? false : "xl"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Box>
          <Typography variant="h4"> Projects </Typography>
          <Typography variant="caption">
            {" "}
            Manage your project catalog{" "}
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <LoadingButton
            color="inherit"
            size="small"
            type="submit"
            sx={{ p: 1.5 }}
            variant="contained"
            startIcon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.16667 14.6667C7.16667 14.8877 7.25446 15.0996 7.41074 15.2559C7.56702 15.4122 7.77899 15.5 8 15.5C8.22101 15.5 8.43297 15.4122 8.58926 15.2559C8.74554 15.0996 8.83333 14.8877 8.83333 14.6667V8.83333H14.6667C14.8877 8.83333 15.0996 8.74554 15.2559 8.58926C15.4122 8.43297 15.5 8.22101 15.5 8C15.5 7.77899 15.4122 7.56702 15.2559 7.41074C15.0996 7.25446 14.8877 7.16667 14.6667 7.16667H8.83333V1.33333C8.83333 1.11232 8.74554 0.900358 8.58926 0.744078C8.43297 0.587797 8.22101 0.5 8 0.5C7.77899 0.5 7.56702 0.587797 7.41074 0.744078C7.25446 0.900358 7.16667 1.11232 7.16667 1.33333V7.16667H1.33333C1.11232 7.16667 0.900358 7.25446 0.744078 7.41074C0.587797 7.56702 0.5 7.77899 0.5 8C0.5 8.22101 0.587797 8.43297 0.744078 8.58926C0.900358 8.74554 1.11232 8.83333 1.33333 8.83333H7.16667V14.6667Z"
                  fill="white"
                />
              </svg>
            }
            onClick={handleCreateProject}
          >
            Add new Project
          </LoadingButton>
        </Stack>
      </Container>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={1}
        sx={{ p: 2 }}
      >
        <OutlinedInput
          placeholder="Search..."
          value={search.query}
          size="small"
          onChange={(event) =>
            setSearch({ ...search, query: event.target.value })
          }
          sx={{ width: 0.6 }}
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
        <Stack direction="row" spacing={1} sx={{ width: 0.4 }}>
          <FormControl fullWidth>
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              size="small"
              sx={{
                minWidth: 100,
              }}
            >
              <MenuItem value={"all"}>All Types</MenuItem>
              {currentTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Select
              value={sorting}
              onChange={(e) => setSorting(e.target.value)}
              size="small"
              sx={{
                minWidth: 100,
              }}
            >
              <MenuItem value={"newest"}>Sort by: Newest</MenuItem>
              <MenuItem value={"oldest"}>Sort by: Oldest</MenuItem>
              <MenuItem value={"asc"}>Sort by: Price: Low to High</MenuItem>
              <MenuItem value={"desc"}>Sort by: Price: High to Low</MenuItem>
              <MenuItem value={""}>1-3</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          sx={{ mt: 0, borderRadius: 2, p: 2 }}
          alignItems="stretch"
        >
          {Array.isArray(currentProject) && currentProject.length > 0 ? (
            currentProject.map((project: any) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={project.id}
                style={{ display: "flex" }}
              >
                <ProjectCard
                  project={project}
                // style={{ flexGrow: 1, height: "100%" }}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{ py: 5, textAlign: "center", width: "100%" }}
              >
                No Projects found
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
}
