import React from 'react';

import StreamTabPanel from './StreamTabPanel/StreamTabPanel';
import { tabsContext } from '../../../context/TabsContext';

export default function ClassDetails() {
  const { value } = React.useContext(tabsContext);

  return (
    <>
      <StreamTabPanel value={value} index={0} />
    </>
  );
}
