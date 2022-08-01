import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux/es/exports";

import { setDescription } from "../redux/feature/postSlices";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const BasicModal = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const { currentFav } = useSelector((state) => state.posts);

  const [newDescription, setNewDescription] = useState("");

  const handleClick = () => {
    if (newDescription !== "") dispatch(setDescription(newDescription));
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {currentFav.name}
            <Box>
              <img src={currentFav.thumb} alt={currentFav.likes} />
            </Box>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Input
              id="outlined-multiline-flexible"
              multiline
              maxRows={4}
              placeholder={currentFav.description}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <IconButton onClick={handleClick}>
              <SaveIcon />
            </IconButton>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
