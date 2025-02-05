import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import api from 'src/common/api';
import { AuthStateActions } from 'src/common/store';
import { tss } from 'tss-react/mui';

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    reset: resetForm,
    formState,
    getValues,
  } = useForm<LoginForm>({ defaultValues: { email: '', password: '' } });
  const { classes: c } = useStyles();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [message, setMessage] = useState('Welcome to Eureka please login');
  const navigate = useNavigate();

  const { mutate: formAction, isPending } = useMutation({
    mutationFn: (data: LoginForm) => {
      if (forgotPassword) {
        return api.auth.forgotPassword(data.email, data.password);
      } else {
        return api.auth.login(data.email, data.password);
      }
    },
    onSuccess: (user) => {
      AuthStateActions.setUser(user);
      navigate('/main-dashboard/problems');
    },
  });

  const onToggleFormState = (forgot: boolean) => {
    setForgotPassword(forgot);
    setMessage(
      forgot ? 'Please enter your email to reset your password' : 'Welcome to Eureka please login'
    );
    resetForm({ email: '', password: '' });
  };

  const onSubmit = () => {
    formAction(getValues());
  };

  return (
    <Box className={c.login_page}>
      <Box className={c.login_form}>
        <Typography variant="h1">Eureka</Typography>

        <Typography>{message}</Typography>

        <TextField
          {...register('email', { required: true })}
          label="Email"
          variant="outlined"
          fullWidth
          className={c.textfield}
        />

        <TextField
          {...register('password', { required: true })}
          label={forgotPassword ? 'New password' : 'Password'}
          type="password"
          variant="outlined"
          fullWidth
          className={c.textfield}
        />

        <Button
          onClick={onSubmit}
          variant="outlined"
          className={c.login_btn}
          size="large"
          disabled={!formState.isValid}
        >
          {isPending ? <CircularProgress size={18}/> : forgotPassword ? 'Create new password' : 'Login'}
        </Button>

        <Typography
          variant="caption"
          className={c.forgot_password}
          onClick={() => onToggleFormState(!forgotPassword)}
        >
          {forgotPassword ? 'Back to login' : 'Forgot your password?'}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;

const useStyles = tss.create(({ theme }) => ({
  login_page: {
    height: '100vh',
    justifyItems: 'center',
    alignContent: 'center',
  },
  login_form: {
    maxWidth: 500,
    justifyItems: 'center',
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius * 2,
  },
  textfield: {
    marginTop: theme.spacing(2),
  },
  login_btn: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  forgot_password: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
}));
