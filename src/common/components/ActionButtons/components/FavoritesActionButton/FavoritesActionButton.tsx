import React, { FC, memo, MouseEvent, useMemo, useRef, useState } from 'react';
import { Box, Drop, Text } from 'grommet';
import { IconButton } from 'common/components/IconButton';

import { FavoriteIcon } from './FavoritesActionButton.styled';

interface FavoritesActionButtonProps {
  isFavoriteByMe: boolean;
  favoriteCount: number;
  favoritesList: Array<string>;
  toggleFavorite: (e: MouseEvent) => void;
}

const FavoritesActionButtonComponent: FC<FavoritesActionButtonProps> = ({ isFavoriteByMe, favoriteCount, favoritesList, toggleFavorite }) => {
  const favoritesRef = useRef<HTMLElement>();
  const [isTooltipOpen, setTooltipOpen] = useState<boolean>(false);

  const isFavoritesTooltipShow = useMemo(() => {
    return isTooltipOpen && !!favoriteCount && !!favoritesRef.current;
  }, [favoriteCount, isTooltipOpen, favoritesRef]);

  return (
    <Box direction="row" align="center">
      <IconButton
        plain
        ref={favoritesRef}
        icon={<FavoriteIcon selected={isFavoriteByMe} />}
        onClick={toggleFavorite}
        onMouseOver={() => setTooltipOpen(true)}
        onMouseOut={() => setTooltipOpen(false)}
      />
      {(favoriteCount > 0) && <Text size="small" color={isFavoriteByMe ? 'brand' : null}>{favoriteCount}</Text>}

      {isFavoritesTooltipShow
        && <Drop align={{ left: 'right' }} target={favoritesRef.current} plain>
          <Box
            margin="xsmall"
            pad="small"
            background="dark-3"
            round={{ size: 'xsmall' }}
          >
            {favoritesList.map((favorite) => <span key={favorite}>{favorite}</span>)}
          </Box>
        </Drop>
      }
  </Box>
  );
}

export const FavoritesActionButton = memo(FavoritesActionButtonComponent);
