import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { IAddPlayerForm, IPlayer, IStoreState } from '../interface';
import Modal from './Modal';
import useStore from '../store';

const AddPlayerForm = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IAddPlayerForm>({
    defaultValues: { name: '', identifier: 'X' },
    mode: 'onChange',
  });

  const addPlayer = useStore((state: IStoreState) => state.addPlayers);
  const setGameMode = useStore((state: IStoreState) => state.setGameMode);
  const setInProgress = useStore((state: IStoreState) => state.setInProgress);
  const onSubmit = (data: IAddPlayerForm) => {
    console.log(data);
    const player: IPlayer = { ...data, score: 0 };
    const cpuPlayer: IPlayer = {
      name: 'CPU',
      score: 0,
      identifier: data.identifier === 'X' ? 'O' : 'X',
    };
    addPlayer(player);
    addPlayer(cpuPlayer);
    setGameMode('single');
    setInProgress(true);
    reset();
  };
  const theme = useTheme();
  return (
    <Modal>
      <Grid2
        container
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          sx={{
            width: { xs: '90%', sm: '70%', md: '50%', lg: '30%', xl: '40%' },
          }}
        >
          <CardContent>
            <form id="add_player_form" onSubmit={handleSubmit(onSubmit)}>
              <Grid2
                container
                width={'100%'}
                display="flex"
                flexDirection="column"
                rowSpacing={2}
                p={2}
              >
                <Typography
                  color={theme.palette.warning.dark}
                  textAlign="center"
                  variant="h5"
                  fontWeight={500}
                >
                  Add Player
                </Typography>
                <Grid2>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        autoFocus
                        {...field}
                        sx={{ color: theme.palette.warning.dark }}
                        size="small"
                        placeholder="Name"
                        variant="standard"
                        slotProps={{
                          htmlInput: { style: { textAlign: 'center' } },
                        }}
                        fullWidth
                        {...register('name', {
                          required: 'Name is required',
                          minLength: {
                            value: 2,
                            message: 'min 2 characters long',
                          },
                          maxLength: {
                            value: 7,
                            message: 'max 7 characters long',
                          },
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message: 'Name can only contain letters',
                          },
                          // onChange: (e) => {
                          //   field.onChange(e.target.value.toUpperCase());
                          // },
                        })}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ''}
                      />
                    )}
                  />
                </Grid2>
                <Grid2>
                  <Controller
                    name="identifier"
                    control={control}
                    rules={{ required: 'Symbol is required' }}
                    render={({ field }) => (
                      <FormControl
                        sx={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <FormLabel component="legend">Choose Symbol</FormLabel>
                        <RadioGroup {...field} row>
                          <FormControlLabel
                            value="X"
                            control={
                              <Radio
                                sx={{
                                  '&, &.Mui-checked': {
                                    color: theme.palette.warning.dark,
                                  },
                                }}
                              />
                            }
                            label={
                              <Typography
                                variant="h1"
                                color={
                                  field.value === 'X'
                                    ? theme.palette.warning.dark
                                    : theme.palette.primary.main
                                }
                                fontWeight={500}
                              >
                                X
                              </Typography>
                            }
                          />
                          <FormControlLabel
                            value="O"
                            control={
                              <Radio
                                sx={{
                                  '&, &.Mui-checked': {
                                    color: theme.palette.warning.dark,
                                  },
                                }}
                              />
                            }
                            label={
                              <Typography
                                variant="h1"
                                color={
                                  field.value === 'O'
                                    ? theme.palette.warning.dark
                                    : theme.palette.primary.main
                                }
                                fontWeight={500}
                              >
                                O
                              </Typography>
                            }
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                  />
                </Grid2>
                <Grid2>
                  <Button
                    fullWidth
                    disabled={!isValid}
                    type="submit"
                    variant="contained"
                    color="warning"
                  >
                    Start
                  </Button>
                </Grid2>
              </Grid2>
            </form>
          </CardContent>
        </Card>
      </Grid2>
    </Modal>
  );
};

export default AddPlayerForm;
