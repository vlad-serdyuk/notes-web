import React from 'react';
import { Box, Tab, Tabs } from 'grommet';
import { Notes, Favorite } from 'grommet-icons';

const NotesTabs = ({ notes, favorites }) => {
  return (
    <Tabs flex justify="around">
      <Tab title="Notes" icon={<Notes />} plain>
        <Box margin={{ vertical: 'small' }}>
           {notes}
        </Box>
      </Tab>
      <Tab title="Favorites" icon={<Favorite />} plain>
        <Box margin={{ vertical: 'small' }}>
          {favorites}
        </Box>
      </Tab>
    </Tabs>
  );
};

export default NotesTabs;