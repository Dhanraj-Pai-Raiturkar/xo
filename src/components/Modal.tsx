import { Box, styled } from '@mui/material';
import { createPortal } from 'react-dom';

export type TModalProps = {
  children?: React.ReactNode;
};

const ModalStyled = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Modal: React.FC<TModalProps> = ({ children }) => {
  return createPortal(
    <ModalStyled>{children}</ModalStyled>,
    document.getElementById('modal-root')!
  );
};

export default Modal;
