import React, { ReactElement, useState } from 'react';
import Layout from '@/components/Layout';
import { useGetUserList, useUpdateUser } from '@/modules/user/userHook';
import Modal from '@/components/uikit/Modal';
import { User } from '@/modules/user/userEntity';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import type { SchemaOf } from 'yup';
import { useForm, Controller } from 'react-hook-form';
import InputField from '@/components/uikit/InputField';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';

const TPK_OPTIONS = [
  { value: 'port-npct1', label: 'NPCT1' },
  { value: 'port-koja', label: 'KOJA' },
  { value: 'port-nle', label: 'NLE' },
];
const STATUS_OPTIONS = [
  {
    value: true,
    label: 'Aktif',
  },
  {
    value: false,
    label: 'Belum Aktif',
  },
];

type FormData = {
  email: string;
  phone: string;
  isActive: boolean;
};

const validationSchema: SchemaOf<FormData> = y.object({
  email: y.string().email().required(),
  phone: y
    .string()
    .required('No telepon tidak boleh kosong')
    .matches(
      /^(?=\d{10,15}$)(08)\d+/,
      'Awalan harus dimulai dengan angka 08, lebih dari 10 karakter dan kurang dari 15 karakter',
    ),
  isActive: y.boolean().required(),
});

const HEADER = [
  'No',
  'Email PPJK',
  'No. HP PPJK',
  'Nama Akun PPJK',
  'Terdaftar',
  'TPK',
  'Akun PPJK',
  'Status',
  '',
];

type NotifState = { message: string; type: 'success' | 'error' } | null;
export default function AccountPage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    role: [] as string[],
    isActive: true,
  });
  const [editedData, setEditedData] = useState<User | null>(null);
  const { data, isPreviousData, refetch } = useGetUserList({
    page,
    ...filter,
  });
  const [notif, setNotif] = useState<NotifState>(null);

  const { handleSubmit, formState, control, setValue, reset } =
    useForm<FormData>({
      defaultValues: {
        email: '',
        phone: '',
        isActive: false,
      },
      resolver: yupResolver(validationSchema),
    });

  const { mutate: updateUser } = useUpdateUser({
    onSuccess() {
      setNotif({
        message: 'Data Berhasil di Update',
        type: 'success',
      });

      refetch();
    },
    onError() {
      setNotif({
        message: 'Data Gagal di Update',
        type: 'error',
      });
    },
    onSettled() {
      doClose();
    },
  });

  const doEdit = (user: User) => {
    setValue('email', user.email);
    setValue('phone', user.phone || '');
    setValue('isActive', user.isActive || false);

    setEditedData(user);
  };

  const doClose = () => {
    setEditedData(null);
    reset();
  };

  return (
    <div className="account">
      {notif && (
        <div
          className={`account__message ${
            notif.type === 'error'
              ? 'account__message--error'
              : 'account__message--success'
          }`}
        >
          {notif.message}
        </div>
      )}

      <div className="account__filter">
        <select
          className="selectField"
          name="tpk"
          onChange={(e) => {
            setFilter({
              ...filter,
              role: [e.target.value],
            });
          }}
        >
          <option value="">Pilih TPK</option>
          {TPK_OPTIONS.map((tpk) => (
            <option value={tpk.value} key={tpk.value}>
              {tpk.label}
            </option>
          ))}
        </select>

        <select
          className="selectField"
          name="status"
          onChange={(e) => {
            setFilter({
              ...filter,
              isActive: e.target.value !== 'false',
            });
          }}
        >
          <option value="">Pilih Status Akun</option>
          {STATUS_OPTIONS.map((status) => (
            <option value={`${status.value}`} key={`${status.value}`}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <table className="account__table">
          <thead>
            <tr>
              {HEADER.map((head, idx) => (
                <th key={idx}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.data.map((user, idx) => (
              <tr key={user.userId}>
                <td>{page > 1 ? page * 10 + idx + 1 : idx + 1}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.name}</td>
                <td>{dayjs(user.createdAt).format('DD MMM YYYY - HH:mm')}</td>
                <td>
                  {user.roles.length
                    ? TPK_OPTIONS.find((tpk) => tpk.value === user.roles[0])
                        ?.label
                    : '-'}
                </td>
                <td>{user.companyName}</td>
                <td>
                  <span
                    className={`badge ${
                      user.isActive ? 'badge--active' : 'badge--inactive'
                    }`}
                  >
                    {user.isActive ? 'Aktif' : 'Belum Aktif'}
                  </span>
                </td>
                <td>
                  <button
                    className="account__action"
                    onClick={() => doEdit(user)}
                  >
                    <FaRegEdit size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="account__pagination">
        <span>
          {page} - {data?.meta.totalPage} dari {data?.meta.totalData} Data
        </span>
        <button
          className="btn"
          disabled={isPreviousData || page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>
        <button
          className="btn"
          disabled={
            isPreviousData || (data ? page >= data?.meta.totalPage : false)
          }
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      <Modal isOpen={!!editedData} onClose={doClose} title="Ubah Akun">
        {editedData && (
          <div className="account__form">
            <div className="account__contact">
              <div className="account__contact__container">
                <div>
                  <AiOutlineUser size={36} />
                </div>
                <div className="account__contact__name">
                  <div>{editedData.name}</div>
                  <div>{editedData.companyName}</div>
                </div>
                <div>
                  <span
                    className={`badge ${
                      editedData.isActive ? 'badge--active' : 'badge--inactive'
                    }`}
                  >
                    {editedData.isActive ? 'Aktif' : 'Belum Aktif'}
                  </span>
                </div>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                }}
              >
                Terdaftar : {dayjs(editedData.createdAt).format('DD MMM YYYY')}
              </div>
            </div>

            <form
              onSubmit={handleSubmit((e) => {
                updateUser({
                  userId: editedData.userId,
                  isActive: e.isActive,
                  phone: e.phone,
                });
              })}
            >
              <Controller
                control={control}
                name="isActive"
                render={({ field: { onChange, value } }) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      margin: '1rem 0',
                    }}
                  >
                    <div>Status Akun</div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        onChange={onChange}
                        defaultChecked={value}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                )}
              />
              <Controller
                control={control}
                defaultValue=""
                name="email"
                render={({ field: { onChange, value } }) => (
                  <InputField
                    type="email"
                    label="Email PPJK"
                    value={value}
                    onChange={onChange}
                    errorMessage={formState.errors.email?.message}
                    disabled
                  />
                )}
              />
              <Controller
                control={control}
                defaultValue=""
                name="phone"
                render={({ field: { onChange, value } }) => (
                  <InputField
                    label="No. HP PPJK"
                    onChange={onChange}
                    value={value}
                    errorMessage={formState.errors.phone?.message}
                  />
                )}
              />
              <div className="account__footer">
                <button className="btn btn-primary btn--lg" type="submit">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}

AccountPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
