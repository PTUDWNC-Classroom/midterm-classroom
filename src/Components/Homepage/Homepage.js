import React, { useState } from 'react';
import MenuAppBar from '../MenuAppBar/MenuAppBar';
import Container from '@mui/material/Container';

import ClassList from '../Class/ClassList';

export default function Homepage() {
  const [newClassId, setNewClassId] = useState('');

  return (<>
    <MenuAppBar handleRender={setNewClassId} />
    <Container maxWidth={false}>
      <ClassList newClassId={newClassId} />
    </Container>
  </>)
}