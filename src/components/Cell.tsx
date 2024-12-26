import { Box, Paper, Typography, useTheme } from '@mui/material';
import { IStoreState, TMatrixValues } from '../interface';
import useStore from '../store';

export type TCellProps = {
  row: number;
  column: number;
  value: TMatrixValues;
  clickHandler: (params: TCellProps) => void;
  winCell: boolean | undefined;
};

const Cell: React.FC<TCellProps> = ({
  row,
  column,
  value,
  clickHandler,
  winCell,
}) => {
  const cellSizeConfig = {
    xs: '100px',
    sm: '100px',
    md: '200px',
    lg: '200px',
    xl: '350px',
  };
  const theme = useTheme();
  const getCpuIdentifier = useStore(
    (state: IStoreState) => state.getCpuIdentifier
  );
  const getPlayerIdentifier = useStore(
    (state: IStoreState) => state.getPlayerIdentifier
  );
  const getBoxShadow = () => {
    if (winCell) {
      return `0px 4px 10px ${
        getPlayerIdentifier() === value ? 'green' : 'red'
      }`;
    }
  };
  return (
    <Box
      border={(theme) => `2px solid ${theme.palette.secondary.main}`}
      borderRadius={1}
      width={cellSizeConfig}
      height={cellSizeConfig}
      onClick={() => clickHandler({ row, column, value } as TCellProps)}
      sx={{
        ':hover': { cursor: 'pointer' },
      }}
    >
      <Paper
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: winCell ? getBoxShadow() : 'default',
        }}
        elevation={5}
      >
        <Typography
          color={
            value === 'X'
              ? theme.palette.warning.light
              : theme.palette.primary.dark
          }
          variant="h5"
          fontSize={{
            xs: '4rem',
            sm: '4rem',
            md: '6rem',
            lg: '6rem',
            xl: '6rem',
          }}
        >
          {value}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Cell;
