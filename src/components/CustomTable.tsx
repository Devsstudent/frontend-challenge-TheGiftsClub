import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';

// Type definitions
export interface TableColumn {
  key: string;
  name: string;
  minWidth?: number;
}

export interface TableRowData {
  [key: string]: string | number | boolean | null | undefined;
}

export interface EditingCell {
  rowIndex: number;
  columnKey: string;
}

export interface CustomizableTableProps {
  columns: TableColumn[];
  data: TableRowData[];
  minRows?: number;
  enableDragDrop?: boolean;
  onCellEdit?: (rowIndex: number, columnKey: string, newValue: string) => void;
  onAddRow?: () => void;
  onFillRow?: (rowIndex: number) => void;
  tableTitle?: string;
}

const CustomizableTable: React.FC<CustomizableTableProps> = ({
  columns = [],
  data = [],
  minRows = 5,
  enableDragDrop = false,
  onCellEdit,
  onAddRow,
  onFillRow,
  tableTitle = "Customizable Table"
}) => {
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  // Ensure we have at least minRows
  const tableData = useMemo((): TableRowData[] => {
    const dataWithMinRows = [...data];
    
    // Fill up to minimum rows with empty objects
    while (dataWithMinRows.length < minRows) {
      const emptyRow: TableRowData = {};
      columns.forEach(col => {
        emptyRow[col.key] = '';
      });
      dataWithMinRows.push(emptyRow);
    }
    
    return dataWithMinRows;
  }, [data, minRows, columns]);

  // Check if a row is empty
  const isRowEmpty = (rowData: TableRowData): boolean => {
    return columns.every(col => !rowData[col.key] || rowData[col.key] === '');
  };

  // Check if a specific cell is empty
  const isCellEmpty = (rowData: TableRowData, columnKey: string): boolean => {
    return !rowData[columnKey] || rowData[columnKey] === '';
  };

  const handleCellClick = (rowIndex: number, columnKey: string, currentValue: string | number | boolean | null | undefined): void => {
    setEditingCell({ rowIndex, columnKey });
    setEditValue(String(currentValue || ''));
  };

  const handleCellSave = (): void => {
    if (editingCell && onCellEdit) {
      onCellEdit(editingCell.rowIndex, editingCell.columnKey, editValue);
    }
    setEditingCell(null);
    setEditValue('');
  };

  const handleCellCancel = (): void => {
    setEditingCell(null);
    setEditValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleCellSave();
    } else if (e.key === 'Escape') {
      handleCellCancel();
    }
  };

  const handleFillRow = (rowIndex: number): void => {
    if (onFillRow) {
      onFillRow(rowIndex);
    }
  };

  const handleAddRow = (): void => {
    if (onAddRow) {
      onAddRow();
    }
  };

  const renderCell = (rowData: TableRowData, column: TableColumn, rowIndex: number): React.ReactNode => {
    const cellValue = rowData[column.key] || '';
    const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.columnKey === column.key;
    const isEmpty = isCellEmpty(rowData, column.key);

    if (isEditing) {
      return (
        <input
          type="text"
          value={editValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
          onBlur={handleCellSave}
          onKeyDown={handleKeyPress}
          autoFocus
          style={{
            width: '100%',
            border: '1px solid #1976d2',
            borderRadius: '4px',
            padding: '8px',
            fontSize: '14px'
          }}
        />
      );
    }

    return (
      <Box
        onClick={() => handleCellClick(rowIndex, column.key, cellValue)}
        sx={{
          minHeight: '40px',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          },
          backgroundColor: isEmpty ? 'rgba(255, 152, 0, 0.1)' : 'transparent'
        }}
      >
        {isEmpty ? (
          <Typography variant="body2" color="textSecondary" fontStyle="italic">
            Click to edit
          </Typography>
        ) : (
          <Typography variant="body2">
            {String(cellValue)}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {tableTitle}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="textSecondary">
            Columns: {columns.length} | Rows: {tableData.length} | Min Rows: {minRows}
          </Typography>
          {enableDragDrop && (
            <Typography variant="body2" color="primary">
              Drag & Drop: Enabled (Not implemented yet)
            </Typography>
          )}
        </Box>
      </Box>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 60 }}>Actions</TableCell>
              {columns.map((column) => (
                <TableCell 
                  key={column.key}
                  sx={{ 
                    fontWeight: 'bold',
                    backgroundColor: '#f5f5f5',
                    minWidth: column.minWidth || 120
                  }}
                >
                  {column.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, rowIndex) => {
              const isEmpty = isRowEmpty(row);
              
              return (
                <TableRow 
                  key={rowIndex}
                  sx={{ 
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                    backgroundColor: isEmpty ? 'rgba(255, 152, 0, 0.05)' : 'inherit'
                  }}
                >
                  <TableCell>
                    {isEmpty ? (
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => handleFillRow(rowIndex)}
                        sx={{ minWidth: 'auto', fontSize: '0.75rem' }}
                      >
                        Fill
                      </Button>
                    ) : (
                      <IconButton size="small" disabled>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.key} sx={{ padding: 0 }}>
                      {renderCell(row, column, rowIndex)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', textAlign: 'right' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddRow}
          disabled={!onAddRow}
        >
          Add Row
        </Button>
      </Box>
    </Paper>
  );
};

export default CustomizableTable;