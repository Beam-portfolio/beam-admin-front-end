// @mui
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
import { IOrderItem } from 'src/types/order';
// components
import Label from 'src/components/label';
import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  row: IOrderItem;
  selected: boolean;
  onViewRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function OrderTableRow({
  row,
  selected,
  onViewRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { customer, id, status } = row;

  // const confirm = useBoolean();

  const collapse = useBoolean();

  const popover = usePopover();

  const renderPrimary = (
    <TableRow sx={{ maxWidth: 1000 }} hover selected={selected}>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={customer.name} src={customer.name} sx={{ mr: 2 }} />

        <ListItemText
          primary={customer.name}
          secondary={customer.email}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (status === 'completed' && 'success') ||
            (status === 'pending' && 'warning') ||
            (status === 'cancelled' && 'error') ||
            'default'
          }
        >
          {status}
        </Label>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.50006 14.1259L14.6634 7.96259C13.6264 7.52966 12.6847 6.89711 11.8917 6.10093C11.0952 5.30777 10.4623 4.36574 10.0292 3.32843L3.86589 9.49176C3.38506 9.97259 3.14422 10.2134 2.93756 10.4784C2.69348 10.7912 2.48419 11.1295 2.31339 11.4876C2.16922 11.7909 2.06172 12.1143 1.84672 12.7593L0.711723 16.1618C0.659485 16.3175 0.651734 16.4848 0.689343 16.6448C0.726952 16.8047 0.808429 16.951 0.924616 17.0672C1.0408 17.1834 1.18709 17.2649 1.34705 17.3025C1.507 17.3401 1.67427 17.3323 1.83006 17.2801L5.23256 16.1451C5.87839 15.9301 6.20089 15.8226 6.50422 15.6784C6.86256 15.5076 7.20089 15.2984 7.51339 15.0543C7.77839 14.8476 8.01922 14.6068 8.50006 14.1259ZM16.3734 6.25259C16.9879 5.63806 17.3332 4.80458 17.3332 3.93551C17.3332 3.06643 16.9879 2.23296 16.3734 1.61843C15.7589 1.0039 14.9254 0.658659 14.0563 0.658659C13.1872 0.658659 12.3538 1.0039 11.7392 1.61843L11.0001 2.35759L11.0317 2.45009C11.396 3.49236 11.9921 4.43835 12.7751 5.21676C13.5767 6.02318 14.5559 6.63102 15.6342 6.99176L16.3734 6.25259Z"
              fill="#637381"
            />
          </svg>
        </IconButton>

        <IconButton
          color={collapse.value ? 'inherit' : 'default'}
          onClick={collapse.onToggle}
          sx={{
            ...(collapse.value && {
              bgcolor: 'action.hover',
            }),
          }}
        >
          <svg
            width="13"
            height="19"
            viewBox="0 0 13 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.791687 0.833336C0.957447 0.833336 1.11642 0.899184 1.23363 1.01639C1.35084 1.1336 1.41669 1.29258 1.41669 1.45834V3L2.85002 2.71334C4.22565 2.4381 5.65164 2.56897 6.95419 3.09L7.12419 3.1575C8.42494 3.67796 9.85661 3.77535 11.2159 3.43584C11.3633 3.39899 11.5171 3.39622 11.6658 3.42774C11.8144 3.45926 11.9539 3.52424 12.0737 3.61775C12.1935 3.71125 12.2904 3.83082 12.357 3.96738C12.4237 4.10394 12.4583 4.25388 12.4584 4.40584V10.545C12.4584 11.0817 12.0925 11.55 11.5717 11.68L11.3934 11.7242C9.91879 12.093 8.36551 11.9877 6.95419 11.4233C5.6519 10.9024 4.22621 10.7715 2.85085 11.0467L1.41669 11.3333V18.125C1.41669 18.2908 1.35084 18.4497 1.23363 18.5669C1.11642 18.6842 0.957447 18.75 0.791687 18.75C0.625927 18.75 0.466955 18.6842 0.349745 18.5669C0.232535 18.4497 0.166687 18.2908 0.166687 18.125V1.45834C0.166687 1.29258 0.232535 1.1336 0.349745 1.01639C0.466955 0.899184 0.625927 0.833336 0.791687 0.833336Z"
              fill="#637381"
            />
          </svg>
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
}
