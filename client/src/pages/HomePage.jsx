import React, { useState, useEffect } from 'react';
import HeroSlide from '../components/common/HeroSlide';
import tmdbConfigs from '../api/configs/tmdb.configs';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import uiConfigs from '../configs/ui.configs';
import Container from '../components/common/Container';
import MediaSlide from '../components/common/MediaSlide';

const HomePage = () => {
  const [localMovies, setLocalMovies] = useState([]);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    setLocalMovies(movies);
  }, []);

  return (
    <>
      <HeroSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />

      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container header="Popular Movies">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </Container>

        <Container header="Popular Series">
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </Container>

        <Container header="Top Rated Movies">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </Container>

        <Container header="Top Rated Series">
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </Container>

        {localMovies.length > 0 && (
          <Container header="Your Movies">
            <Box display="flex" flexWrap="wrap" gap={3}>
              {localMovies.map((movie, index) => (
                <Card key={index} sx={{ width: 250 }}>
                  <CardMedia component="img" image={movie.poster} alt={movie.title} sx={{ height: 350 }} />
                  <CardContent>
                    <Typography variant="h6">{movie.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {movie.genre} | {movie.duration} mins | {movie.releaseYear}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Rating: {movie.rating}
                    </Typography>
                    <Typography variant="body2">{movie.summary}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
};

export default HomePage;
