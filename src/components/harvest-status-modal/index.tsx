import React, { memo, FC } from 'react';

import { compose } from 'redux';

import { Variant } from '@fellesdatakatalog/button';

import SC from './styled';

import { HarvestStatus } from '../../types';

interface ExternalProps {
  name?: string;
  harvestStatus?: Partial<HarvestStatus>;
  onDiscard: () => void;
}

interface Props extends ExternalProps {}

const HarvestStatusModal: FC<Props> = ({ name, harvestStatus, onDiscard }) => (
  <SC.HarvestStatusModal>
    <SC.Modal>
      <SC.ModalHeading>{name}</SC.ModalHeading>
      {harvestStatus?.statuses &&
        harvestStatus?.statuses.length > 0 &&
        harvestStatus?.statuses?.map(
          ({ harvestType, startTime, errorMessage }) => (
            <SC.HarvestStatus>
              {harvestType && <SC.Text>{`høstetype: ${harvestType}`}</SC.Text>}
              {startTime && (
                <SC.Text>{`høsteprosess startet: ${startTime}`}</SC.Text>
              )}
              {errorMessage && (
                <SC.Text>{`feilmelding: ${errorMessage}`}</SC.Text>
              )}
            </SC.HarvestStatus>
          )
        )}
      <SC.ModalActions>
        <SC.CancelButton variant={Variant.TERTIARY} onClick={onDiscard}>
          Lukk
        </SC.CancelButton>
      </SC.ModalActions>
    </SC.Modal>
  </SC.HarvestStatusModal>
);

export default compose<FC<Props>>(memo)(HarvestStatusModal);
