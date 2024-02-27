import {
  Stack,
  Card,
  CardMedia,
  Typography,
  Grid,
  Pagination,
  styled,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import CharacterDetailsModal from "./CharacterDetailsModal";

const HoverableCard = styled(Card)({
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const Characters = () => {
  const [currPage, setCurrPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?page=${currPage}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    console.log(data);
  }, [currPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredCharacters = data?.results?.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (event, value) => {
    setCurrPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCardClick = (character) => {
    // console.log("##--- Clicked");
    setSelectedCharacter(character);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Stack gap={5} ml={5}>
      <Stack
        sx={{
          p: 2,
          boxShadow: 3,
          borderRadius: 5,
          position: "relative",
        }}
        gap={2}
      >
        <Typography
          variant="h3"
          sx={{ color: "white", display: "flex", justifyContent: "center" }}
        >
          Star Wars characters
        </Typography>

        <Stack>
          <TextField
            id="search"
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              width: "300px", // Adjust the width as needed
              top: "10px",
              right: "10px",
              zIndex: "9999", // Ensure it's above other elements
              color: "white", // Text color
              bgcolor: "rgba(0, 0, 0, 0)",
              "& .MuiInputLabel-root": {
                color: "white", // Label color
              },
              "& .MuiFilledInput-underline:before": {
                borderBottom: "none", // Remove underline
              },
            }}
          />
        </Stack>

        <Grid container spacing={1}>
          {filteredCharacters.map(
            (
              character,
              i // Use filteredCharacters instead of data?.results
            ) => (
              <Grid item xs={12} md={6} lg={3} xl={3} key={i}>
                <HoverableCard
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleCardClick(character)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://picsum.photos/200/300?random=${i}`}
                    alt="Random Image"
                  />
                  <Typography
                    sx={{ display: "flex", justifyContent: "center" }}
                    variant="h6"
                  >
                    {character?.name}
                  </Typography>
                </HoverableCard>
              </Grid>
            )
          )}
        </Grid>

        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Pagination
            count={data?.count && Math.ceil(data?.count / 10)}
            page={currPage}
            color="primary"
            onChange={handlePageChange}
            sx={{
              p: 4,
              "& .MuiPaginationItem-root": {
                color: "white",
              },
            }}
          />
        </Stack>
      </Stack>
      <CharacterDetailsModal
        open={openModal}
        onClose={handleCloseModal}
        character={selectedCharacter}
      />
    </Stack>
  );
};

export default Characters;
