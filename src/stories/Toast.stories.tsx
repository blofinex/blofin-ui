import { Meta } from "@storybook/react";
import { Button } from "../components/Button";
import { Toast, useToast } from "../components/Toast/Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast
};

export default meta;

export const Primary = {
  render: () => {
    const { methods, context } = useToast();

    const info = () => {
      methods.info("Info!!!!!!!!!");
    };

    const warning = () => {
      methods.warning("我是短发舒服撒开了饭就睡啦开发!!!!!!!!!");
    };
    const success = () => {
      methods.success("Success!!!!!!!!!");
    };
    const danger = () => {
      methods.danger("Danger!!!!!!!!!");
    };

    return (
      <div style={{ display: "flex", gap: "10px" }}>
        {context}
        {context}
        <Button size="medium" onClick={info}>
          Info
        </Button>
        <Button size="medium" onClick={warning}>
          Warning
        </Button>
        <Button size="medium" onClick={success}>
          Success
        </Button>
        <Button size="medium" onClick={danger}>
          Danger
        </Button>
      </div>
    );
  }
};
