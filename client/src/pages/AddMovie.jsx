import React, { useState, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, MenuItem, Select, InputLabel, FormControl, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';

const localStorageHandler = {
  getMovies: () => {
    try {
      return JSON.parse(localStorage.getItem('movies')) || [];
    } catch (error) {
      console.error("Error parsing movies from localStorage:", error);
      return [];
    }
  },
  saveMovies: (movies) => {
    try {
      localStorage.setItem('movies', JSON.stringify(movies));
    } catch (error) {
      console.error("Error saving movies to localStorage:", error);
    }
  },
};

const AddMovie = ({ movieIdToEdit }) => {
  const { register, handleSubmit, setValue, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      poster: '',
      title: '',
      genre: '',
      duration: '',
      releaseYear: '',
      rating: '',
      summary: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [submittedMovie, setSubmittedMovie] = useState(null);
  const [isEditingSubmitted, setIsEditingSubmitted] = useState(false);

  const genres = useMemo(() => ['Comedy', 'Drama', 'Horror', 'Action', 'Romance', 'Sci-Fi'], []);
  const years = useMemo(() => ['2024', '2023', '2022', '2021', '2020'], []);

  useEffect(() => {
    if (movieIdToEdit !== undefined) {
      const movies = localStorageHandler.getMovies();
      const movieToEdit = movies[movieIdToEdit];
      if (movieToEdit) {
        Object.keys(movieToEdit).forEach((key) => setValue(key, movieToEdit[key]));
      } else {
        toast.error("Movie not found for editing.");
      }
    }
  }, [movieIdToEdit, setValue]);

  const onSubmit = (data) => {
    setLoading(true);
    const movies = localStorageHandler.getMovies();

    if (movieIdToEdit !== undefined) {
      if (movies[movieIdToEdit]) {
        movies[movieIdToEdit] = data;
        toast.success("Movie updated successfully!");
      } else {
        toast.error("Unable to update movie. Movie not found.");
      }
    } else {
      movies.push(data);
      toast.success("Movie added successfully!");
    }

    localStorageHandler.saveMovies(movies);
    setLoading(false);
    setSubmittedMovie(data);
    setIsEditingSubmitted(false);
    reset();
  };

  const handleEditSubmitted = () => {
    if (submittedMovie) {
      Object.keys(submittedMovie).forEach((key) => setValue(key, submittedMovie[key]));
      setIsEditingSubmitted(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        {movieIdToEdit !== undefined ? 'Edit Movie' : 'Add Movie'}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Movie Poster (Image URL)"
          {...register('poster', {
            required: 'Poster URL is required',
            validate: (value) => value.startsWith('http') || 'URL must start with http',
          })}
          error={!!errors.poster}
          helperText={errors.poster?.message}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Movie Title"
          {...register('title', {
            required: 'Title is required',
            minLength: { value: 2, message: 'Title must be at least 2 characters long' },
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
          margin="normal"
        />

        <FormControl fullWidth margin="normal" error={!!errors.genre}>
          <InputLabel>Genre</InputLabel>
          <Controller
            name="genre"
            control={control}
            rules={{ required: 'Genre is required' }}
            render={({ field }) => (
              <Select {...field}>
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Typography variant="caption" color="error">
            {errors.genre?.message}
          </Typography>
        </FormControl>

        <TextField
          fullWidth
          label="Duration (minutes)"
          type="number"
          {...register('duration', {
            required: 'Duration is required',
            validate: (value) => value > 60 || 'Duration must be greater than 60 minutes',
          })}
          error={!!errors.duration}
          helperText={errors.duration?.message}
          margin="normal"
        />

        <FormControl fullWidth margin="normal" error={!!errors.releaseYear}>
          <InputLabel>Release Year</InputLabel>
          <Controller
            name="releaseYear"
            control={control}
            rules={{ required: 'Release year is required' }}
            render={({ field }) => (
              <Select {...field}>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Typography variant="caption" color="error">
            {errors.releaseYear?.message}
          </Typography>
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.rating}>
          <InputLabel>Rating</InputLabel>
          <Controller
            name="rating"
            control={control}
            rules={{ required: 'Rating is required' }}
            render={({ field }) => (
              <Select {...field}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <MenuItem key={rating} value={rating}>
                    {rating}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Typography variant="caption" color="error">
            {errors.rating?.message}
          </Typography>
        </FormControl>

        <TextField
          fullWidth
          label="Movie Summary"
          multiline
          rows={4}
          {...register('summary', {
            required: 'Summary is required',
            minLength: { value: 10, message: 'Summary must be at least 10 characters long' },
          })}
          error={!!errors.summary}
          helperText={errors.summary?.message}
          margin="normal"
        />

        <LoadingButton type="submit" variant="contained" fullWidth loading={loading}>
          {movieIdToEdit !== undefined || isEditingSubmitted ? 'Update Movie' : 'Add Movie'}
        </LoadingButton>
      </form>

      {submittedMovie && !isEditingSubmitted && (
        <Box sx={{ marginTop: 4, backgroundColor: '#e3f2fd', padding: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Movie Details
          </Typography>
          <Typography>Title: {submittedMovie.title}</Typography>
          <Typography>Genre: {submittedMovie.genre}</Typography>
          <Typography>Duration: {submittedMovie.duration} minutes</Typography>
          <Typography>Release Year: {submittedMovie.releaseYear}</Typography>
          <Typography>Rating: {submittedMovie.rating}</Typography>
          <Typography>Summary: {submittedMovie.summary}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditSubmitted}
            sx={{ marginTop: 2 }}
          >
            Change Information
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddMovie;
