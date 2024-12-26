import { Box, Grid2, Typography, useTheme } from '@mui/material';
import { TMatrixValues } from '../interface';

export type TPlayerProps = {
  name: string;
  score: number;
  identifier: TMatrixValues;
};

const Player: React.FC<TPlayerProps> = ({ name, score, identifier }) => {
  const theme = useTheme();
  return (
    <Grid2
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      p={{ xs: 2, sm: 2, md: 2, lg: 8, xl: 8 }}
    >
      <Box>
        <Typography variant="h5">
          {name.toUpperCase() + ': '}
          <Typography display="inline-block" variant="h5">
            {score}
          </Typography>
        </Typography>
      </Box>
      <Typography
        color={
          identifier === 'X'
            ? theme.palette.warning.light
            : theme.palette.primary.main
        }
        variant="h1"
        component="h1"
        fontWeight={400}
        fontSize={{
          xs: '3rem',
          sm: '8rem',
          md: '12rem',
          lg: '12rem',
          xl: '12rem',
        }}
      >
        {identifier}
      </Typography>
    </Grid2>
  );
};

export default Player;
