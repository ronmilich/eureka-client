import { Box, Typography } from '@mui/material';
import { SlimIdea } from 'src/common/models';

interface SlimIdeasTableFinencialsCellProps {
  slimIdea: SlimIdea;
}

const formatCurrency = (value: number, currency: string): string =>
  new Intl.NumberFormat(navigator.language || 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const SlimIdeasTableFinencialsCell = ({ slimIdea }: SlimIdeasTableFinencialsCellProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', gap: 4 }}>
      {!slimIdea.financials ? (
        <Typography variant="body2">Not Defined</Typography>
      ) : (
        <>
          <Box>
            <Typography variant="body2" title="Yearly">
              {formatCurrency(slimIdea.financials.yearly, slimIdea.financials.currency)} (Yearly)
            </Typography>
            <Typography variant="body2" title="Monthly">
              {formatCurrency(slimIdea.financials.monthly, slimIdea.financials.currency)} (Monthly)
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" title="One Time">
              {formatCurrency(slimIdea.financials.oneTime, slimIdea.financials.currency)} (One Time)
            </Typography>
            <Typography variant="body2" title="Unknown">
              {formatCurrency(slimIdea.financials.unknown, slimIdea.financials.currency)} (Unknown)
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SlimIdeasTableFinencialsCell;
