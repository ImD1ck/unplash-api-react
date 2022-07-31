import {
  Fab,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Input,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SaveIcon from "@mui/icons-material/Save";

import { Box, Container } from "@mui/system";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getFavorite, delFavMyPhotos } from "../redux/feature/postSlices";
import { useDispatch, useSelector } from "react-redux";

const handleChange = (event) => {
  //dispatch(event.target.value);
};

const handleFil = (event) => {
  //dispatch(event.target.value);
};

const MyPhotos = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.posts);

  const downloadImg = () => {};

  useEffect(() => {
    dispatch(getFavorite());
  }, []);

  // useEffect(() => {
  //   const arrToOrder = favorites.filter((favorites) =>
  //     favorites.likes.includes("likes")
  //   );
  //   console.log(arrToOrder);
  //   // arrToOrder.sort((a, b) => {
  //   //   if (a[orderBy] > b[orderBy]) {
  //   //     return 1;
  //   //   } else if (a[orderBy] > b[orderBy]) {
  //   //     return -1;
  //   //   }
  //   //   return 0;
  //   // });
  // }, []);

  return (
    <>
      <div className="header">
        <Link to="/">
          <Fab variant="extended">
            <SearchIcon sx={{ mr: 1 }} />
            <span className="bottom-fav">Search</span>
          </Fab>
        </Link>
        <Input placeholder="Description" onChange={handleChange} />
        <Box>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Filter
            </InputLabel>
            <NativeSelect
              defaultValue={30}
              inputProps={{
                name: "filter",
                id: "uncontrolled-native",
              }}
            >
              <option value={10}>Import Date</option>
              <option value={20}>Width</option>
              <option value={30}>Height</option>
              <option value={40}>Likes</option>
            </NativeSelect>
          </FormControl>
        </Box>
      </div>

      <Container maxWidth="md">
        <ImageList variant="masonry" cols={3} gap={8}>
          {favorites.length > 0 &&
            favorites.map(
              (
                {
                  id,
                  name,
                  description,
                  width,
                  height,
                  likes,
                  full,
                  thumb,
                  ...rest
                },
                index
              ) => {
                return (
                  <ImageListItem key={id}>
                    <img src={thumb} alt={description} />
                    <ImageListItemBar
                      sx={{
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, " +
                          "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.7) 100%)",
                      }}
                      subtitle={<SaveIcon onClick={downloadImg(id)} />}
                      title={name}
                      actionIcon={
                        <IconButton
                          sx={{ color: "white" }}
                          onClick={() => {
                            dispatch(delFavMyPhotos(id));
                          }}
                        >
                          <FavoriteIcon sx={{ color: "red" }} />
                        </IconButton>
                      }
                    ></ImageListItemBar>
                  </ImageListItem>
                );
              }
            )}
          {favorites.length === 0 && <h1>Not Found</h1>}
        </ImageList>
      </Container>
    </>
  );
};

export default MyPhotos;
