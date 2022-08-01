import {
  Fab,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DownloadIcon from "@mui/icons-material/Download";
import { Box, Container } from "@mui/system";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getFavorites,
  setFavorites,
  delFavMyPhotos,
  currentFav,
} from "../redux/feature/postSlices";
import { useDispatch, useSelector } from "react-redux";

const MyPhotos = ({ setOpen }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.posts);
  const [handleFilter, setHandleFilter] = useState("");
  const [orderParam, setOrderParam] = useState("likes");

  useEffect(() => {
    dispatch(getFavorites());
  }, []);

  useEffect(() => {
    if (handleFilter === "") {
      dispatch(getFavorites());
    }
    const arrFil = favorites.filter((fav) => {
      return fav.description?.includes(handleFilter);
    });
    if (arrFil !== []) {
      arrFil.sort((a, b) => {
        return a[orderParam] - b[orderParam];
      });
    }
    dispatch(setFavorites(arrFil));
  }, [orderParam, handleFilter]);

  // useEffect(() => {
  //   // dispatch(getFavorites());
  //   const arrFil = favorites;
  //   arrFil.sort((a, b) => {
  //     return a[orderParam] - b[orderParam];
  //   });
  //   dispatch(setFavorites(arrFil));
  // }, [orderParam]);

  return (
    <>
      <div className="header">
        <Link to="/">
          <Fab variant="extended">
            <SearchIcon sx={{ mr: 1 }} />
            <span className="bottom-fav">Search</span>
          </Fab>
        </Link>
        <Input
          placeholder="Description"
          onChange={(e) => setHandleFilter(e.target.value)}
        />
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-select-small"></InputLabel>
            <Select
              defaultValue={"likes"}
              inputProps={{
                name: "filter",
                id: "uncontrolled-native",
              }}
              onChange={(e) => setOrderParam(e.target.value)}
            >
              <MenuItem value={"impDate"}>Import Date</MenuItem>
              <MenuItem value={"width"}>Width</MenuItem>
              <MenuItem value={"height"}>Height</MenuItem>
              <MenuItem value={"likes"}>Likes</MenuItem>
            </Select>
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
                  <ImageListItem
                    key={id}
                    onClick={() => {
                      dispatch(currentFav(index));
                      setOpen(true);
                    }}
                  >
                    <img src={thumb} alt={likes} />
                    <ImageListItemBar
                      sx={{
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, " +
                          "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.7) 100%)",
                      }}
                      title={name}
                      subtitle={
                        (description && description) ||
                        (description === null && "not descrption")
                      }
                      actionIcon={
                        <>
                          <IconButton
                            sx={{ color: "white" }}
                            // onClick={}
                          >
                            <DownloadIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              dispatch(delFavMyPhotos(id));
                            }}
                          >
                            <FavoriteIcon sx={{ color: "red" }} />
                          </IconButton>
                        </>
                      }
                      //position="below"
                      author={description}
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
