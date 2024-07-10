import React, { useMemo } from "react";

interface IModalState {
  initialState?: boolean,
  header?: React.ReactNode,
  footer?: React.ReactNode,
  onOk?: () => void,
  onCancel?: () => void,
  content: React.ReactNode,
  width?: number | string
}

export type ModalStateType = {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  header: React.ReactNode,
  footer: React.ReactNode,
  onOk: () => void,
  onCancel: () => void,
  content: React.ReactNode,
  width?: number | string
};

export function useModalState({ initialState = false, header = null, footer = null, onOk = () => { }, onCancel = () => { }, content = null, width }: IModalState) {
  const [isOpen, setIsOpen] = React.useState(initialState);

  const contentCopy = useMemo(() => {
    if (content) {
      return React.cloneElement(content as React.ReactElement, {
        afterOnFinish: () => {
          onOk && onOk();
          setIsOpen(false);
        },
        autoNavigate: false
      });
    }
  }, [content, onOk]);

  return {
    isOpen,
    setIsOpen,
    header,
    footer,
    onOk,
    onCancel,
    content: contentCopy,
    width
  };
}