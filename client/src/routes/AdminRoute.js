// Referance from: https://chatgpt.com/share/693dcbc6-add0-8008-bf76-50f05659fc0d
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.role === 'admin'
    ? children
    : <Navigate to="/login" />;
}
