import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import Input from "@mui/material/Input";
import { Container } from "@mui/system";
import "../style/Search.css";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  createFavorite,
  deleteFavorite,
  fetchPosts,
  getFavorites,
} from "../redux/feature/postSlices";

const Search = () => {
  const dispatch = useDispatch();
  const { posts, favorites } = useSelector((state) => state.posts);

  const save = (fotoObj, index) => {
    dispatch(createFavorite({ fotoObj, index }));
    return;
  };

  const handleChange = (event) => {
    dispatch(fetchPosts(event.target.value));
  };

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(getFavorites());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      <div className="header">
        <Link to="/myPhotos">
          <Fab variant="extended">
            <FavoriteIcon sx={{ mr: 1 }} />
            <span className="bottom-fav">favorites</span>
          </Fab>
        </Link>
        <Input placeholder="Search" onChange={handleChange} />
      </div>

      <Container maxWidth="md">
        <ImageList variant="masonry" cols={3} gap={8}>
          {posts.length > 0 &&
            posts.map(
              (
                {
                  id,
                  user: { name },
                  description,
                  width,
                  height,
                  likes,
                  urls: { full, thumb },
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
                            if (rest?.fav === true) {
                              dispatch(deleteFavorite(index));
                              return;
                            }
                            save(
                              {
                                name,
                                id,
                                description,
                                width,
                                height,
                                likes,
                                full,
                                thumb,
                                ...rest,
                              },
                              index
                            );
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
          {posts.length === 0 && <h1>Not Found</h1>}
        </ImageList>
      </Container>
    </>
  );
};

export default Search;
