import { Grid2, useTheme } from '@mui/material';
import Player from './Player';
import Board from './Board';
import AddPlayerForm from './AddPlayerForm';
import useStore from '../store';

const ContentContainer = () => {
  const theme = useTheme();
  const gameMode = useStore((state) => state.gameMode);
  const players = useStore((state) => state.players);
  const gameScreen = () => (
    <>
      <Grid2>
        <Player
          name={players?.[0]?.name ?? 'player1'}
          score={players?.[0]?.score ?? 0}
          identifier={players?.[0]?.identifier ?? 'X'}
        />
      </Grid2>
      <Grid2>
        <Board />
      </Grid2>
      <Grid2>
        <Player
          name={players?.[1]?.name ?? 'player2'}
          score={players?.[1]?.score ?? 0}
          identifier={players?.[1]?.identifier ?? 'O'}
        />
      </Grid2>
    </>
  );
  return (
    <Grid2
      width="100%"
      sx={{ height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)` }}
      container
      display="flex"
      alignItems="center"
      alignContent={'center'}
      justifyContent={'space-evenly'}
      flexDirection={{
        xs: 'column',
        sm: 'column',
        md: 'column',
        lg: 'row',
        xl: 'row',
      }}
    >
      {gameScreen()}
      {!gameMode && <AddPlayerForm />}
    </Grid2>
  );
};

export default ContentContainer;
