import { Grid2 } from '@mui/material';
import Navbar from './NavBar';
import ContentContainer from './ContentContainer';

const TicTacToe = () => {
  return (
    <Grid2
      width="100%"
      height="100%"
      container
      spacing={0}
      flexDirection="column"
      padding={0}
      margin={0}
      alignItems="center"
    >
      <Navbar />
      <ContentContainer />
    </Grid2>
  );
};

export default TicTacToe;
