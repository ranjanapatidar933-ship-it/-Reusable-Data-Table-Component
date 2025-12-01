
import React, { useEffect, useMemo, useState, useCallback } from "react";
import styles from "./DataTable.module.css";
import type { DataTableProps, SortConfig } from "./types";

function DataTable<T extends object>({
    data,
    columns,
    onRowSelect,
    defaultSort,
    searchable = true,
    className = "",
    selectedRowId,
    getRowId
}: DataTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortConfig, setSortConfig] = useState<SortConfig<T> | undefined>(
        defaultSort
    );
    const [selectedRow, setSelectedRow] = useState<T | undefined>(undefined);
    console.log(data, "datadatadatadata")

    const safeGetRowId = useCallback((row: T): string | number => {
        if (getRowId) {
            return getRowId(row);
        }

        const rowObj = row as Record<string, unknown>;
        if (rowObj.id !== undefined) {
            return String(rowObj.id);
        }
        if (rowObj.key !== undefined) {
            return String(rowObj.key);
        }

        const index = data.indexOf(row);
        return index;
    }, [getRowId, data]);

    const filteredData = useMemo(() => {
        if (!searchTerm.trim()) return data;

        const term = searchTerm.toLowerCase();

        return data.filter((row) =>
            columns.some((column) => {
                const rawValue = row[column.key];

                if (rawValue === undefined || rawValue === null) return false;

                const valueStr = String(rawValue).toLowerCase();
                return valueStr.includes(term);
            })
        );
    }, [data, searchTerm, columns]);

    const sortedData = useMemo(() => {
        if (!sortConfig) return filteredData;

        const { key, direction } = sortConfig;

        return [...filteredData].sort((a, b) => {
            const aValue = a[key];
            const bValue = b[key];

            if (aValue === bValue) return 0;
            if (aValue == null) return direction === "asc" ? -1 : 1;
            if (bValue == null) return direction === "asc" ? 1 : -1;

            if (typeof aValue === "number" && typeof bValue === "number") {
                return direction === "asc" ? aValue - bValue : bValue - aValue;
            }

            const aStr = String(aValue);
            const bStr = String(bValue);

            return direction === "asc"
                ? aStr.localeCompare(bStr)
                : bStr.localeCompare(aStr);
        });
    }, [filteredData, sortConfig]);

    const handleSort = (key: keyof T) => {
        setSortConfig((current) => {
            if (!current || current.key !== key) {
                return { key, direction: "asc" };
            }

            return {
                key,
                direction: current.direction === "asc" ? "desc" : "asc",
            };
        });
    };

    const handleRowClick = (row: T) => {
        const rowId = safeGetRowId(row);
        const currentRowId = selectedRow ? safeGetRowId(selectedRow) : undefined;

        const newSelection = currentRowId === rowId ? undefined : row;
        setSelectedRow(newSelection);

        if (onRowSelect && newSelection !== undefined) {
            onRowSelect(newSelection);
        }

    };
    const highlightText = useCallback((text: string): React.ReactNode => {
        if (!searchTerm.trim()) return text;

        const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedTerm})`, "gi");

        return text.split(regex).map((part, index) =>
            part.toLowerCase() === searchTerm.toLowerCase() ? (
                <span key={index} className={styles.highlight}>
                    {part}
                </span>
            ) : (
                part
            )
        );
    }, [searchTerm, styles.highlight]);

    useEffect(() => {
        if (selectedRowId === undefined) {
            setSelectedRow(undefined);
        }
    }, [data, selectedRowId]);

    useEffect(() => {
        if (selectedRowId !== undefined) {
            const row = data.find((r) => safeGetRowId(r) === selectedRowId);
            setSelectedRow(row);
        }
    }, [selectedRowId, data, safeGetRowId]);

    const getSortIcon = (key: keyof T) => {
        if (!sortConfig || sortConfig.key !== key) return "↕";
        return sortConfig.direction === "asc" ? "↑" : "↓";
    };

    return (
        <div className={`${styles.tableContainer} ${className}`}>
            {searchable && (
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        value={searchTerm}
                        placeholder="Search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search table data"
                    />
                </div>
            )}

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead className={styles.tableHeader}>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={String(column.key)}
                                    className={`${styles.headerCell} ${column.sortable !== false ? styles.sortable : ""
                                        }`}
                                    style={{ width: column.width }}
                                    onClick={() => column.sortable !== false && handleSort(column.key)}
                                    aria-sort={
                                        sortConfig?.key === column.key
                                            ? sortConfig.direction === "asc"
                                                ? "ascending"
                                                : "descending"
                                            : "none"
                                    }
                                >
                                    <div className={styles.headerContent}>
                                        <span>{column.label}</span>
                                        {column.sortable !== false && (
                                            <span className={styles.sortIcon}>{getSortIcon(column.key)}</span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className={styles.tableBody}>
                        {sortedData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className={styles.emptyState}
                                >
                                    {searchTerm ? "No matching results" : "No data available"}
                                </td>
                            </tr>
                        ) : (
                            sortedData.map((row) => {
                                const rowId = safeGetRowId(row);
                                const isSelected = selectedRow ? safeGetRowId(selectedRow) === rowId : false;

                                return (
                                    <tr
                                        key={rowId}
                                        className={`${styles.tableRow} ${isSelected ? styles.selected : ""
                                            }`}
                                        onClick={() => handleRowClick(row)}
                                        aria-selected={isSelected}
                                    >
                                        {columns.map((column) => {
                                            const rawValue = row[column.key];
                                            let displayed: React.ReactNode;

                                            if (column.render) {
                                                displayed = column.render(rawValue, row);
                                            } else {
                                                const text = rawValue != null ? String(rawValue) : "";
                                                displayed = highlightText(text);
                                            }

                                            return (
                                                <td
                                                    key={String(column.key)}
                                                    className={styles.tableCell}
                                                >
                                                    {displayed}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DataTable;

