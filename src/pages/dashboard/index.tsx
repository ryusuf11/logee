import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import type { SchemaOf } from 'yup';
import { useForm, Controller } from 'react-hook-form';
import InputField from '@/components/uikit/InputField';
import { useLogin } from '@/modules/login/loginHook';
import React, { ReactElement } from 'react';
import Layout from '@/components/Layout';

type FormData = {
  email: string;
  password: string;
};

const validationSchema: SchemaOf<FormData> = y.object({
  email: y.string().email().required(),
  password: y.string().required(),
});

export default function Dashboard() {
  const { trigger, handleSubmit, formState, reset, control, register } =
    useForm<FormData>({
      defaultValues: {
        email: '',
        password: '',
      },
      resolver: yupResolver(validationSchema),
    });
  const [errMessage, setErrMessage] = React.useState('');

  const { mutate: loginUser } = useLogin({
    onSuccess: () => {
      setErrMessage('');
    },
    onError: (err) => {
      setErrMessage(err.message || 'Terjadi kesalahan.');
    },
  });

  const doLogin = (e: FormData) => {
    loginUser(e);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit((e) => {
          doLogin(e);
        })}
      >
        <Controller
          control={control}
          defaultValue=""
          name="email"
          render={({ field: { onChange } }) => (
            <InputField
              type="email"
              label="Email"
              onChange={onChange}
              errorMessage={formState.errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          defaultValue=""
          name="password"
          render={({ field: { onChange } }) => (
            <InputField
              type="password"
              label="Kata Sandi"
              onChange={onChange}
              errorMessage={formState.errors.password?.message}
            />
          )}
        />
        {errMessage && <div style={{ color: 'red' }}>{errMessage}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
