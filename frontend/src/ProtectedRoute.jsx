import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './Features/userSlice';
import PropTypes from "prop-types";

const ProtectedRoute = ({ element }) => {
    const user = useSelector(selectUser);

  return user === null ? <Navigate to="/login" /> : element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
