'use client';
import Image from 'next/image';
import styles from './page.module.css';
import {
  Tabs,
  Tab,
  Autocomplete,
  TextField,
  Button,
  Box,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Chip,
} from '@mui/material';
import { useState } from 'react';

const tabContents = {
  main: 'main',
  salada: 'salada',
  soup: 'soup',
} as const;

export type TabContentsType = (typeof tabContents)[keyof typeof tabContents];

export default function Home() {
  const [currentTab, setCurrentTab] = useState<TabContentsType>('main');
  const [isIngredientDrawer, setIngredientDrawer] = useState<boolean>(false);
  const [ingredientList, setIngredientList] = useState<string[]>([]);

  const handleClickIngredientChipDeleteButton = (ingredientName: string) => {
    const newIngredientList = [...ingredientList].filter(
      (data) => data !== ingredientName
    );
    setIngredientList(newIngredientList);
  };

  const handleClickDrawerIngredientItem = (ingredientName: string) => {
    const newIngredientList = [...ingredientList];
    const index = newIngredientList.indexOf(ingredientName);
    if (index === -1) {
      // 食材が選択されていない時
      newIngredientList.push(ingredientName);
    } else {
      newIngredientList.splice(index, 1);
    }
    setIngredientList(newIngredientList);
  };

  return (
    <Box>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 100,
          background: 'white',
        }}
      >
        <Tabs
          value={currentTab}
          variant="fullWidth"
          onChange={(e, newValue) => setCurrentTab(newValue)}
        >
          <Tab label="メイン" value={tabContents.main} />
          <Tab label="サラダ" value={tabContents.salada} />
          <Tab label="汁物" value={tabContents.soup} />
        </Tabs>
        <Box
          display="flex"
          alignItems="center"
          boxShadow="0 0 10px #ddd"
          width="100%"
          height={40}
        >
          <Button
            sx={{ width: '30%' }}
            onClick={() => setIngredientDrawer(true)}
          >
            {'食材を選ぶ>'}
          </Button>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              width: '70%',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {ingredientList.map((data) => {
              return (
                <Chip
                  key={data}
                  label={data}
                  variant="outlined"
                  onDelete={() => handleClickIngredientChipDeleteButton(data)}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
      <Box mt={11}>
        <Box display="flex" flexWrap="wrap">
          {Array.from(new Array(50)).map((_, i) => {
            return (
              <Card
                key={i}
                sx={{ width: '45%', borderRadius: '10px', mt: 1, mx: 1 }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://m.media-amazon.com/images/I/61aPrDz6DIL._AC_UL320_.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography fontSize="12px">生姜焼き</Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography> */}
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>
      </Box>
      <Drawer
        anchor="bottom"
        open={isIngredientDrawer}
        onClose={() => setIngredientDrawer(false)}
      >
        <List>
          {['牛肉', '豚肉', 'きゅうり', 'キャベツ'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                defaultValue={text}
                onClick={(e) =>
                  e.currentTarget.textContent !== null &&
                  handleClickDrawerIngredientItem(e.currentTarget.textContent)
                }
              >
                <Checkbox
                  edge="start"
                  checked={ingredientList.includes(text)}
                  disableRipple
                  value={text}
                />
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
