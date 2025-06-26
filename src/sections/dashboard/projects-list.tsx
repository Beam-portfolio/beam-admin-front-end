// @mui
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// types

import { ProjectCard } from './cards/project-card';
import { Grid, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  projects: any[];
};

export default function ProjectsList({ projects }: Props) {
  return (
    <Grid
      container
      spacing={2}
      sx={{ mt: 0, borderRadius: 2, p: 2 }}
      alignItems="stretch"
    >
      {projects && projects.length > 0 ? (
        projects.map((project) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={project.id}
            style={{ display: "flex" }}
          >
            <ProjectCard project={project} />
          </Grid>
        ))
      ) : (<Typography>No projects found</Typography>)
}
    </Grid>
  );
}
