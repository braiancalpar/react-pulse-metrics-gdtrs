import React from 'react';
import { useParams } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  return (
    <AuthLayout>
      <ResetPasswordForm token={token} />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
