import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BUIComponentSize, BUITheme } from "../../types/component";
import CloseIcon from "../../assets/icons/close.svg";
import { Button } from "../Button/Button";
import { dialogVariants, footerStyles, iconStyles, textStyles } from "./styles";
import useTheme from "../../provider/useTheme";
import { ButtonSize } from "../Button/types";

interface DialogProps {
  title: null | string | React.ReactNode;
  size: BUIComponentSize;
  content: string | React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  footer?: null | React.ReactNode;
  cancel?: () => void;
  confirm?: () => void;
  open: boolean;
  theme?: BUITheme;
  footerLayout?: "right" | "left" | "center";
  footerSize?: ButtonSize;
  hideCancel?: Boolean;
  hideConfirm?: Boolean;
  hideIcon?: Boolean;
}

export const Dialog: FC<DialogProps> = (props) => {
  const {
    size,
    title,
    content,
    cancelText = "",
    confirmText = "",
    footer,
    cancel,
    confirm,
    theme: mode,
    footerLayout,
    footerSize = "small",
    hideCancel = false,
    hideConfirm = false,
    hideIcon = false,
    open
  } = props;
  const { theme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const getTheme = () => {
    return mode ? mode : theme;
  };

  const handleCancel = () => {
    if (cancel) {
      cancel();
    }
  };

  const handleConfirm = () => {
    if (confirm) {
      confirm();
    }
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return isOpen
    ? ReactDOM.createPortal(
        <div className="bu-fixed bu-bottom-0 bu-left-0 bu-right-0 bu-top-0 bu-z-[9999] bu-bg-black/[.6]">
          <div className={dialogVariants({ size, theme: getTheme() })}>
            {!hideIcon && (
              <CloseIcon
                className={`bu-absolute bu-right-[20px] bu-h-[24px] bu-w-[24px] bu-cursor-pointer ${iconStyles({
                  theme: getTheme()
                })}`}
                onClick={handleCancel}
              />
            )}

            <div className={textStyles({ theme: getTheme() })}>
              {title !== null && (
                <div className="bu-mb-[23px] bu-text-[16px] bu-font-medium bu-leading-[26px] bu-tracking-[-0.2px]">
                  {title}
                </div>
              )}

              <div className="bu-mb-[48px] bu-text-[14px] bu-font-normal bu-leading-[20px] bu-tracking-[-0.2px]">
                {content}
              </div>
            </div>
            {footer !== null && (
              <>
                {footer ? (
                  <>{footer}</>
                ) : (
                  <div className={footerStyles({ footerLayout })}>
                    {!hideConfirm && (
                      <Button
                        size={footerSize}
                        variant="primary"
                        theme={getTheme()}
                        onClick={handleConfirm}>
                        {confirmText}
                      </Button>
                    )}

                    {!hideCancel && (
                      <Button
                        className="bu-ml-[16px]"
                        size={footerSize}
                        variant="ghost"
                        theme={getTheme()}
                        onClick={handleCancel}>
                        {cancelText}
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>,
        document.body
      )
    : null;
};
