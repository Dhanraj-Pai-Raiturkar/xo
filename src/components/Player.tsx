import { Box, Grid2, keyframes, Typography, useTheme } from '@mui/material';
import { IStoreState, TMatrixValues } from '../interface';
import useStore from '../store';

export type TPlayerProps = {
  name: string;
  score: number;
  identifier: TMatrixValues;
};

const zoomInOut = keyframes`
0% {
  transform: scale(1);
}
50% {
  transform: scale(2); /* Zoom in */
}
100% {
  transform: scale(1); /* Back to original size */
}
`;
const Player: React.FC<TPlayerProps> = ({ name, score, identifier }) => {
  const inProgress = useStore((state: IStoreState) => state.inProgress);
  const theme = useTheme();
  return (
    <Grid2
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      p={{ xs: 1, sm: 1, md: 2, lg: 8, xl: 8 }}
    >
      <Box>
        <Typography variant="h5">
          {name.toUpperCase() + ': '}
          <Typography
            sx={{
              animation: inProgress ? `${zoomInOut} 1s ease-in-out` : 'none',
            }}
            display="inline-block"
            variant="h5"
          >
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
