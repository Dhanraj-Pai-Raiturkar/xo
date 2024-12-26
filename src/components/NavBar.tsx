import ReplayIcon from '@mui/icons-material/Replay';
import {
  AppBar,
  IconButton,
  styled,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import useStore from '../store';
import { IStoreState } from '../interface';
import { pauseExecution } from '../Utils';

const Navbar = () => {
  const ToolbarStyled = styled(Toolbar)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }));
  const theme = useTheme();
  const resetScores = useStore((state: IStoreState) => state.resetScores);
  const resetMatrix = useStore((state: IStoreState) => state.resetMatrix);
  const setInProgress = useStore((state: IStoreState) => state.setInProgress);
  const handleReset = async () => {
    resetMatrix();
    resetScores();
    setInProgress(false);
    await pauseExecution(1000);
    setInProgress(true);
  };
  return (
    <AppBar position="static" sx={{ zIndex: theme.zIndex.appBar }}>
      <ToolbarStyled>
        <Typography
          color={theme.palette.warning.dark}
          variant="h6"
          component="h4"
          fontWeight={800}
        >
          XO
        </Typography>
        <IconButton>
          <ReplayIcon onClick={handleReset} color="warning" fontSize="medium" />
        </IconButton>
      </ToolbarStyled>
    </AppBar>
  );
};

export default Navbar;
