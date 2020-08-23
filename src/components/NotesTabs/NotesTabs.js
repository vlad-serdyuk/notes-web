import React from 'react';
import { Box, Tab, Tabs } from 'grommet';

const NotesTabs = ({ notes, favorites }) => {
  return (
    <Tabs flex justify="around">
      <Tab title="Notes">
        <Box margin={{ vertical: 'small' }}>
           {notes}
        </Box>
      </Tab>
      <Tab title="Favorites">
        <Box margin={{ vertical: 'small' }}>
          {favorites}
        </Box>
      </Tab>
    </Tabs>
  );
};

export default NotesTabs;