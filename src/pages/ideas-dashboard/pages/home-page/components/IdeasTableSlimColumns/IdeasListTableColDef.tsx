import { GridColDef } from '@mui/x-data-grid';
import { SlimIdea } from 'src/common/models';
import SlimIdeasTableOverviewCell from './SlimIdeasTableOverviewCell';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import SlimIdeasTableDetailsCell from './SlimIdeasTableDetailsCell';
import SlimIdeasTableFeasibilityCell from './SlimIdeasTableFeasibilityCell';
import SlimIdeasTableFinencialsCell from './SlimIdeasTableFinencialsCell';
import SlimIdeasTableRiskProfileCell from './SlimIdeasTableRiskProfileCell';
import SlimIdeasTableActionsCell from './SlimIdeasTableActionsCell';

export const ideasListTableColDef: GridColDef<SlimIdea>[] = [
  {
    field: 'Overview',
    headerName: 'Overview',
    disableColumnMenu: true,
    sortable: false,
    flex: 1.1,
    renderCell: ({ row }) => <SlimIdeasTableOverviewCell slimIdea={row} />,
  },
  {
    field: 'metadata.createdAt',
    disableColumnMenu: true,
    headerName: 'Created At',
    flex: 0.5,
    renderCell: ({ row }) => (
      <Box sx={{ alignContent: 'center', height: '100%' }}>
        <Typography variant="body2">
          {dayjs(row.metadata.createdAt).format('YYYY-MM-DD')}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'details.serviceType',
    headerName: 'Details',
    sortable: false,
    disableColumnMenu: true,
    flex: 0.7,
    renderCell: ({ row }) => <SlimIdeasTableDetailsCell slimIdea={row} />,
  },
  {
    field: 'feasibility',
    headerName: 'Feasibility',
    disableColumnMenu: true,
    sortable: false,
    flex: 0.7,
    renderCell: ({ row }) => <SlimIdeasTableFeasibilityCell slimIdea={row} />,
  },
  {
    field: 'financials',
    headerName: 'Expenses',
    disableColumnMenu: true,
    flex: 1,
    renderCell: ({ row }) => <SlimIdeasTableFinencialsCell slimIdea={row} />,
  },
  {
    field: 'riskProfile',
    headerName: 'Risk Profile',
    disableColumnMenu: true,
    flex: 0.5,
    renderCell: ({ row }) => <SlimIdeasTableRiskProfileCell slimIdea={row} />,
  },
  {
    field: 'metadata.score',
    headerName: 'Score',
    disableColumnMenu: true,
    flex: 0.4,
    renderCell: ({ row }) => <SlimIdeasTableActionsCell slimIdea={row} />,
  },
];
