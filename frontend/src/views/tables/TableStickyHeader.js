// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

const columns = [
  { id: 'name', label: 'PBReference ID', minWidth: 100, align: 'center' },
  { id: 'code', label: 'policy holder', minWidth: 100, align: 'center' },
  {
    id: 'population',
    label: 'policy no',
    minWidth: 100,
    align: 'center',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'size',
    label: 'Registration no',
    minWidth: 150,
    align: 'center',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'density',
    label: 'city',
    minWidth: 70,
    align: 'center',
    format: value => value.toFixed(2)
  },
  {
    id: 'density',
    label: 'state',
    minWidth: 70,
    align: 'center',
    format: value => value.toFixed(2)
  },
  {
    id: 'density',
    label: 'Assigned Garage',
    minWidth: 120,
    align: 'center',
    format: value => value.toFixed(2)
  },
  {
    id: 'density',
    label: 'case age (Days)',
    minWidth: 100,
    align: 'center',
    format: value => value.toFixed(2)
  },
  {
    id: 'density',
    label: 'case age (insurer)',
    minWidth: 70,
    align: 'center',
    format: value => value.toFixed(2)
  },
  {
    id: 'density',
    label: 'Officer',
    minWidth: 100,
    align: 'center',
    format: value => value.toFixed(2)
  },
  {
    id: 'density',
    label: 'Request type',
    minWidth: 130,
    align: 'center',
    format: value => value.toFixed(2)
  },
  {
    id: 'density',
    label: 'insurer claimid',
    minWidth: 150,
    align: 'center',
    format: value => value.toFixed(2)
  }
]
function createData(name, code, population, size, abcd) {
  const density = population / size

  return { name, code, population, size, density, abcd }
}

const rows = [
  createData(
    'India',
    'IN',
    <span>
      <a href='#' className='' style={{ textDecoration: 'none' }}>
        abcd
      </a>
    </span>,
    1324171354
  ),
  createData(
    'India',
    'IN',
    <span>
      <a href='#' className='' style={{ textDecoration: 'none' }}>
        abcd
      </a>
    </span>,
    1324171354
  ),
  createData(
    'India',
    'IN',
    <span>
      <a href='#' className='' style={{ textDecoration: 'none' }}>
        abcd
      </a>
    </span>,
    1324171354
  ),
  createData(
    'India',
    'IN',
    <span>
      <a href='#' className='' style={{ textDecoration: 'none' }}>
        abcd
      </a>
    </span>,
    1324171354
  ),
  createData(
    'India',
    'IN',
    <span>
      <a href='#' className='' style={{ textDecoration: 'none' }}>
        abcd
      </a>
    </span>,
    1324171354
  ),
  createData(
    'India',
    'IN',
    <span>
      <a href='#' className='' style={{ textDecoration: 'none' }}>
        abcd
      </a>
    </span>,
    1324171354
  ),
  createData(
    'India',
    'IN',
    <span>
      <a href='#' className='' style={{ textDecoration: 'none' }}>
        abcd
      </a>
    </span>,
    1324171354
  ),
  createData(
    'India',
    'IN',
    <span>
      <a href='#' className='' style={{ textDecoration: 'none' }}>
        abcd
      </a>
    </span>,
    1324171354
  ),
  createData(
    'India',
    'IN',
    <span>
      <a href='#' className='' style={{ textDecoration: 'none' }}>
        abcd
      </a>
    </span>,
    1324171354
  )
]

const TableStickyHeader = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableStickyHeader
