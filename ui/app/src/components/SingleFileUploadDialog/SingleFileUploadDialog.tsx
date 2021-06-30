/*
 * Copyright (C) 2007-2021 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { SingleFileUploadDialogUI } from './SingleFileUploadDialogUI';
import { FormattedMessage } from 'react-intl';

export interface SingleFileUploadDialogProps extends DialogProps {
  open: boolean;
  type: string;
  onClose(): void;
  onClosed?(): void;
}

export default function SingleFileUploadDialog(props: SingleFileUploadDialogProps) {
  const { open, type, onClose, onClosed, ...rest } = props;

  return (
    <Dialog open={open} onClose={onClose} {...rest} fullWidth maxWidth="md">
      <SingleFileUploadDialogUI
        title={
          type === 'image' ? (
            <FormattedMessage id="uploadFileDialog.uploadBrowse" defaultMessage="Upload an image" />
          ) : (
            <FormattedMessage id="uploadFileDialog.uploadBrowse" defaultMessage="Upload an file" />
          )
        }
        onClose={onClose}
        onClosed={onClosed}
      />
    </Dialog>
  );
}
