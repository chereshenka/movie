import { Alert } from "antd";

const ErrorIndicator = () => (
  <Alert
    message="Error"
    description="Something went wrong, try later."
    type="error"
    showIcon
  />
);

export default ErrorIndicator;
