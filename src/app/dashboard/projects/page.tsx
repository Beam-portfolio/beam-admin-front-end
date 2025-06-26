import { RoleBasedGuard } from "@/auth/guard";
import ProjectsListView from "@/sections/projects/view/Projects-listview";

export const metadata = {
  title: "Dashboard: Products",
};

export default function ProductsListPage() {
  return (
    <RoleBasedGuard roles={["ADMIN"]}>
      <ProjectsListView />
    </RoleBasedGuard>
  );
}
