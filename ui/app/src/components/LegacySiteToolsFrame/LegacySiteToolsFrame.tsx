/*
 * Copyright (C) 2007-2020 Crafter Software Corporation. All Rights Reserved.
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

import React, { IframeHTMLAttributes } from 'react';
import { useEnv } from '../../utils/hooks';

interface LegacySiteToolsFrameProps {
  tool?: string;
  workAreaOnly?: boolean;
  iframeProps?: IframeHTMLAttributes<any>;
}

function LegacySiteToolsFrame(props: LegacySiteToolsFrameProps) {
  const { tool, workAreaOnly = true, iframeProps } = props;
  const authoringUrl = useEnv().authoringBase;
  const iframeSrc = `${authoringUrl}/site-config${[workAreaOnly && '?mode=embedded', tool && `#tool/${tool}`].filter(
    Boolean
  )}`;
  return <iframe title="Site Tools" src={iframeSrc} {...iframeProps} />;
}

export default LegacySiteToolsFrame;
