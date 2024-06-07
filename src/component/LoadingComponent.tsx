import { Spin } from "antd";

const LoadingComponent = ({ isLoading, children }: { isLoading: boolean, children: any }) => {
  return <Spin size="large" spinning={isLoading}>
    {children}
  </Spin>
}

export default LoadingComponent;
