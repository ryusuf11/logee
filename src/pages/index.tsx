import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import type { SchemaOf } from 'yup';
import { useForm, Controller } from 'react-hook-form';
import InputField from '@/components/uikit/InputField';
import { useLogin } from '@/modules/login/loginHook';
import React from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useStoreUser } from '@/modules/user/userProvider';

type FormData = {
  email: string;
  password: string;
};

const validationSchema: SchemaOf<FormData> = y.object({
  email: y.string().email().required(),
  password: y.string().required(),
});

export default function Home() {
  const { handleSubmit, formState, control } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });
  const [errMessage, setErrMessage] = React.useState('');
  const router = useRouter();
  const userStore = useStoreUser();

  const { mutate: loginUser } = useLogin({
    onSuccess: ({ data }) => {
      const { accessToken, ...userData } = data;

      setErrMessage('');
      setCookie('token', accessToken);

      userStore.setUserData(userData);

      router.push('/dashboard');
    },
    onError: (err) => {
      setErrMessage(err.message || 'Terjadi kesalahan.');
    },
  });

  const doLogin = (e: FormData) => {
    loginUser(e);
  };

  return (
    <div className="loginPage">
      <h3 className="loginPage__title">Selamat Datang di</h3>
      <h4 className="loginPage__subtitle">Logee Order.</h4>
      <p className="loginPage__caption">
        Solusi untuk mengoptimalkan segala kebutuhan logistik perusahaan di
        seluruh Indonesia
      </p>
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
        {errMessage && (
          <div className="textField__errorMessage">{errMessage}</div>
        )}
        <button className="loginPage__submit" type="submit">
          Masuk
        </button>
      </form>
    </div>
  );
}
