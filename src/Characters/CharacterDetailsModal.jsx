import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material";

const CharacterDetailsModal = ({ open, onClose, character }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          bgcolor: "rgba(180, 186, 171, 0.9)", // Adjust transparency by changing the alpha value
          width: "60%",
          height: "60%",
          maxWidth: "none",
          borderRadius: 2,
        },
      }}
    >
      {character && (
        <>
          <Stack sx={{ bgcolor: "#828c73" }}>
            <DialogTitle
              sx={{ display: "flex", justifyContent: "center" }}
              variant="outlined"
              color={"black"}
            >
              {character?.name}
            </DialogTitle>
          </Stack>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography variant="body1">
              Height: {character?.height} m
            </Typography>
            <Typography variant="body1">Mass: {character?.mass} kg</Typography>
            <Typography variant="body1">
              Date Added: {character?.created.slice(0, 10)}
            </Typography>
            <Typography variant="body1">
              Films: {character?.films?.length}
            </Typography>
            <Typography variant="body1">
              Birth Year: {character?.birth_year}
            </Typography>
            {/* 
  <Typography variant="body1">Terrain: {character?.homeworld?.terrain}</Typography>
  <Typography variant="body1">Climate: {character?.homeworld?.climate}</Typography>
  <Typography variant="body1">
    Residents: {character?.homeworld?.residents?.length}
  </Typography> 
  */}
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" color="success" onClick={onClose}>
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default CharacterDetailsModal;
