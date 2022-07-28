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

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFotosRequest, getSearchRequest } from "../api/unplash.api";
import { setFotos, favorite } from "../redux/feature/postSlices";

const Search = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  const save = (fav, index) => {
    let key = "fav" + (localStorage.length + 1);
    localStorage.setItem(key, JSON.stringify(fav));
    dispatch(favorite(index));
  };

  const handleChange = (event) => {
    getSearchRequest(event.target.value).then((res) =>
      dispatch(setFotos(res.data.results))
    );
  };

  useEffect(() => {
    getFotosRequest().then((res) => dispatch(setFotos(res.data)));
  }, []);

  return (
    <>
      <div className="header">
        <Fab variant="extended" href="myPhotos">
          <FavoriteIcon sx={{ mr: 1 }} />
          <span className="bottom-fav">favorites</span>
        </Fab>
        <Input placeholder="Search" onChange={handleChange} />
      </div>

      <Container maxWidth="md">
        <ImageList variant="masonry" cols={3} gap={8}>
          {posts.map(
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
                        onClick={() =>
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
                            },
                            index
                          )
                        }
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
        </ImageList>
      </Container>
    </>
  );
};

export default Search;
