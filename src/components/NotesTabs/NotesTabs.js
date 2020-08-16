import React from 'react';
import { Box, Tab, Tabs } from 'grommet';
import { Notes, Favorite } from 'grommet-icons';

const NotesTabs = () => {
  return (
    <Tabs flex>
      <Tab title="Notes" icon={<Notes />}>
        <Box fill pad="large" align="center" background="accent-1">
          <Attraction size="xlarge" />
        </Box>
      </Tab>
      <Tab title="Favorites" icon={<Favorite />}>
        <Box fill pad="large" align="center" background="accent-2">
          <TreeOption size="xlarge" />
        </Box>
      </Tab>
    </Tabs>
  );
};

export default NotesTabs;