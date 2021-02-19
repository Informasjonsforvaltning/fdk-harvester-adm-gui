import React, { memo, FC } from 'react';

import { compose } from 'redux';

import Button, { Variant } from '@fellesdatakatalog/button';

import SC from './styled';

interface Props {
  title: string;
  text: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDialog: FC<Props> = ({ title, text, onCancel, onConfirm }) => (
  <SC.ConfirmDialog>
    <SC.Modal>
      <SC.ModalHeading>{title}</SC.ModalHeading>
      <SC.Text>{text}</SC.Text>
      <SC.ModalActions>
        <Button variant={Variant.PRIMARY} onClick={onConfirm}>
          Bekreft
        </Button>
        <SC.CancelButton variant={Variant.TERTIARY} onClick={onCancel}>
          Avbryt
        </SC.CancelButton>
      </SC.ModalActions>
    </SC.Modal>
  </SC.ConfirmDialog>
);

export default compose<FC<Props>>(memo)(ConfirmDialog);
