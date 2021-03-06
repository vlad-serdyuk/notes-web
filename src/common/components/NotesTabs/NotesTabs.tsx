import React, { FC, useState } from 'react';
import { Box, Tab, Tabs } from 'grommet';

interface NotesTabsProps {
  notes: JSX.Element;
  favorites: JSX.Element;
  privates: JSX.Element;
  comments: JSX.Element;
  onTabClick: (tab: TabsOptions) => void;
}

export enum TabsOptions {
  Notes,
  Favorites,
  Privates,
  Comments,
}

export const NotesTabs: FC<NotesTabsProps> = ({ notes, favorites, privates, comments, onTabClick }) => {
  const [index, setIndex] = useState<TabsOptions>(TabsOptions.Notes);

  const onActive = (nextIndex: TabsOptions) => {
    onTabClick(nextIndex);
    setIndex(nextIndex);
  }

  return (
    <Tabs flex activeIndex={index} onActive={onActive}>
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
      <Tab title="Comments" fill="horizontal">
        <Box margin={{ vertical: 'small' }}>
          {comments}
        </Box>
      </Tab>
    </Tabs>
  );
};
