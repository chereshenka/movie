import { Alert } from "antd";

const ErrorIndicator = () => (
  <Alert
    description="Can't find anything with your request, try another one"
    message="Request Failed"
    type="error"
    showIcon
  />
);

export default ErrorIndicator;
