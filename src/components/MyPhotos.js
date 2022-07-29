import {
  Fab,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Input,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Container } from "@mui/system";

import { useEffect } from "react";
import { getFavorite, deleteFavorite } from "../redux/feature/postSlices";
import { useDispatch, useSelector } from "react-redux";

const handleChange = (event) => {
  //dispatch(fetchPosts(event.target.value));
};

const MyPhotos = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getFavorite());
  }, []);

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
                      subtitle={name}
                      actionIcon={
                        <IconButton
                          sx={{ color: "white" }}
                          onClick={() => {
                            dispatch(deleteFavorite(index));
                          }}
                        >
                          {rest?.fav ? (
                            <FavoriteIcon sx={{ color: "red" }} />
                          ) : (
                            <FavoriteIcon />
                          )}
                        </IconButton>
                      }
                    ></ImageListItemBar>
                  </ImageListItem>
                );
              }
            )}
          {favorites.length == 0 && <h1>Not Found</h1>}
        </ImageList>
      </Container>
    </>
  );
};

export default MyPhotos;
