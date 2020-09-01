import React from 'react';
import { Box, Tab, Tabs } from 'grommet';

const NotesTabs = ({ notes, favorites }) => {
  return (
    <Tabs flex>
      <Tab title="Notes" fill="horizontal">
        <Box margin={{ vertical: 'small' }}>
           {notes}
        </Box>
      </Tab>
      <Tab title="Favorites" fill="horizontal">
        <Box margin={{ vertical: 'small' }}>
          {favorites}
        </Box>
      </Tab>
    </Tabs>
  );
};

export default NotesTabs;