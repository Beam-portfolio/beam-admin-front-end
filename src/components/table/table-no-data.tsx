import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

type Props = {
  notFound: boolean;
};

export default function TableNoData({ notFound }: Props) {
  return (
    <TableRow>
      {notFound ? (
        <TableCell colSpan={12}>
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="h6">No Data Found</Typography>
          </Box>
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  const aValue = a[orderBy];
  const bValue = b[orderBy];

  if (aValue === null || aValue === undefined) {
    return 1;
  }
  if (bValue === null || bValue === undefined) {
    return -1;
  }

  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
