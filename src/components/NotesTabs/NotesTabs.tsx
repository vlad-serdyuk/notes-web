import React, { FC } from 'react';
import { Box, Tab, Tabs } from 'grommet';

interface NotesTabsProps {
  notes: Array<any>;
  favorites: Array<any>;
  privates: Array<any>;
}

export const NotesTabs: FC<NotesTabsProps> = ({ notes, favorites, privates }) => {
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
      {privates && <Tab title="Privates" fill="horizontal">
          <Box margin={{ vertical: 'small' }}>
            {privates}
          </Box>
        </Tab>
      }
    </Tabs>
  );
};
