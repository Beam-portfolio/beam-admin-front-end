import { Dispatch, SetStateAction } from 'react';

export type TableProps = {
  dense: boolean;
  page: number;
  rowsPerPage: number;
  order: 'asc' | 'desc';
  orderBy: string;
  //
  selected: string[];
  onSelectRow: (id: string) => void;
  onSelectAllRows: (checked: boolean, newSelecteds: string[]) => void;
  //
  onSort: (id: string) => void;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onResetPage: () => void;
  onUpdatePageDeleteRow: (totalRowsInPage: number) => void;
  onUpdatePageDeleteRows: ({
    totalRows,
    totalRowsInPage,
    totalRowsFiltered,
  }: {
    totalRows: number;
    totalRowsInPage: number;
    totalRowsFiltered: number;
  }) => void;
  setDense: Dispatch<SetStateAction<boolean>>;
  setOrder: Dispatch<SetStateAction<'asc' | 'desc'>>;
  setOrderBy: Dispatch<SetStateAction<string>>;
  setSelected: Dispatch<SetStateAction<string[]>>;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
};
