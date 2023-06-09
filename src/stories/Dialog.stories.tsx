import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../components/Button/Button";
import { Dialog } from "../components/Dialog/Dialog";
import useTheme from "../hooks/useMode";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Primary: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const mode = useTheme();

    const cancel = () => {
      alert("Cancel");
      setOpen(false);
    };
    const confirm = () => {
      alert("Confirm");
      setOpen(false);
    };

    return (
      <>
        <Button size="medium" onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog
          open={open}
          title='Hello'
          content="Dialog Content"
          cancelText="Cancel"
          confirmText="Confirm"
          size="large"
          cancel={cancel}
          confirm={confirm}
          footerLayout="right"
          footerSize="medium"
          hideCancel={true}
        />
      </>
    );
  }
};
