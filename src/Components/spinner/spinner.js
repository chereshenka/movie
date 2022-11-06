import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Spinner = () => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 150
      }}
      spin
    />
  );
  return <Spin indicator={antIcon} />;
};

export default Spinner;
