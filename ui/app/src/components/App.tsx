/*
 * Copyright (C) 2007-2019 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
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
import CrafterCMSNextBridge from './CrafterCMSNextBridge';

const AsyncVideoPlayer = React.lazy(() => import('./AsyncVideoPlayer'));

function App() {
  return (
    <CrafterCMSNextBridge>
      <AsyncVideoPlayer nonPlayableMessage={'The video is not ready to be played.'}/>
    </CrafterCMSNextBridge>
  );
}

export default App;