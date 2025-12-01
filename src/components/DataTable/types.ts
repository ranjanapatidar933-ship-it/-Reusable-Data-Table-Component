
import React from "react";

export type SortDirection = "asc" | "desc";

export type Column<T extends object> = {
  [K in keyof T]: {
    key: K;
    label: string;
    render?: (value: T[K], row: T) => React.ReactNode;
    sortable?: boolean;
    width?: string;
  };
}[keyof T];

export interface BaseColumn<T extends object, K extends keyof T> {
  key: K;
  label: string;
  render?: (value: T[K], row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export type SimpleColumn<T extends object> = {
    [K in keyof T]: BaseColumn<T, K>;
}[keyof T];

export interface SortConfig<T extends object> {
  key: keyof T;
  direction: SortDirection;
}

export interface DataTableProps<T extends object> {
  data: T[];
  columns: SimpleColumn<T>[];
  onRowSelect?: (row: T) => void;
  defaultSort?: SortConfig<T>;
  searchable?: boolean;
  className?: string;
  selectedRowId?: string | number;
  getRowId?: (row: T) => string | number;
}