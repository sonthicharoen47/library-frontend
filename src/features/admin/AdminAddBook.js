import React, { useState, useEffect } from "react";
import {
  getAllAuthor,
  getAllCategory,
  postAddBook,
  postAddAuthor,
  postAddCategory,
} from "./adminsSlice";
import { useDispatch, useSelector } from "react-redux";
//css
import {
  Container,
  Typography,
  TextField,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Switch,
} from "@material-ui/core";

import Fade from "@mui/material/Fade";
import FormControlLabel from "@mui/material/FormControlLabel";

import { postSnackbarAlert } from "../snackbarAlert/snackbarAlertsSlice";

const AdminAddBook = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.accounts);
  const { authorList, categoryList } = useSelector((state) => state.admins);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [checkAuthor, setCheckAuthor] = useState(false);
  const [checkCategory, setCheckCategory] = useState(false);
  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };

  const onDescriptionChanged = (e) => {
    setDescription(e.target.value);
  };

  const onAuthorChanged = (e) => {
    setAuthor(e.target.value);
  };

  const onAuthorNameChanged = (e) => {
    setAuthorName(e.target.value);
  };
  const onCheckAuthorChanged = () => {
    setCheckAuthor((prev) => !prev);
  };
  const onCategoryChanged = (e) => {
    setCategory(e.target.value);
  };
  const onCategoryNameChanged = (e) => {
    setCategoryName(e.target.value);
  };
  const onCheckCategoryChanged = () => {
    setCheckCategory((prev) => !prev);
  };
  const handleSubmit = () => {
    let body = {
      title: title,
      description: description,
      fk_author: author,
      fk_category: category,
    };
    dispatch(postAddBook({ body, token })).then((result) => {
      let text = "";
      let severity = "info";
      if (result.payload.message) {
        text = result.payload.message;
        severity = "success";
      }
      if (result.payload.err) {
        text = result.payload.err;
        severity = "error";
      }
      dispatch(postSnackbarAlert({ text, severity }));
    });
    setTitle("");
    setDescription("");
    setAuthor("");
    setCategory("");
  };

  const handleAddAuthor = () => {
    if (authorName !== "") {
      let body = {
        author_name: authorName,
      };
      dispatch(postAddAuthor({ body, token })).then((result) => {
        let text = "";
        let severity = "info";
        if (result.payload.message) {
          text = result.payload.message;
          severity = "success";
        }
        if (result.payload.err) {
          text = result.payload.err;
          severity = "error";
        }
        dispatch(postSnackbarAlert({ text, severity }));
      });
      dispatch(getAllAuthor({ token }));
      setAuthorName("");
    }
  };
  const handleAddCategory = () => {
    if (categoryName !== "") {
      let body = {
        category_name: categoryName,
      };
      dispatch(postAddCategory({ body, token })).then((result) => {
        let text = "";
        let severity = "info";
        if (result.payload.message) {
          text = result.payload.message;
          severity = "success";
        }
        if (result.payload.err) {
          text = result.payload.err;
          severity = "error";
        }
        dispatch(postSnackbarAlert({ text, severity }));
      });
      dispatch(getAllCategory({ token }));
      setCategoryName("");
    }
  };

  useEffect(() => {
    dispatch(getAllAuthor({ token }));
    dispatch(getAllCategory({ token }));
  });

  return (
    <Container>
      <Box
        sx={{
          bgcolor: "background.paper",
          m: 2,
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: 1,
          p: 2,
        }}
      >
        <Typography variant="h3" sx={{ m: 1 }} align="center">
          Add Book Form
        </Typography>
        <TextField
          required
          label="title"
          value={title}
          onChange={onTitleChanged}
          sx={{ m: 1 }}
        />
        <TextField
          fullWidth
          label="description"
          value={description}
          onChange={onDescriptionChanged}
          sx={{ m: 1 }}
        />

        <Box
          sx={{
            display: "flex",
            m: 1,
          }}
        >
          <FormControl sx={{ minWidth: 120, mr: 2 }} required>
            <InputLabel id="author-select-label">Author</InputLabel>
            <Select
              labelId="author-select-label"
              id="author-simple-select"
              value={author}
              label="Author"
              onChange={onAuthorChanged}
            >
              {authorList.length > 0
                ? authorList.map((items) => (
                    <MenuItem value={items.id_author} key={items.id_author}>
                      {items.author_name}
                    </MenuItem>
                  ))
                : ""}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch checked={checkAuthor} onChange={onCheckAuthorChanged} />
            }
            label="new Author"
          />
          <Fade in={checkAuthor}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="Author Name"
                onChange={onAuthorNameChanged}
                value={authorName}
              />
              <Button onClick={handleAddAuthor} sx={{ ml: 1 }}>
                Add Author
              </Button>
            </Box>
          </Fade>
        </Box>

        <Box sx={{ display: "flex", m: 1 }}>
          <FormControl sx={{ minWidth: 120, mr: 2 }} required>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-simple-select"
              value={category}
              label="Category"
              onChange={onCategoryChanged}
            >
              {categoryList.length > 0
                ? categoryList.map((items) => (
                    <MenuItem value={items.id_category} key={items.id_category}>
                      {items.category_name}
                    </MenuItem>
                  ))
                : ""}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={checkCategory}
                onChange={onCheckCategoryChanged}
              />
            }
            label="new Category"
          />
          <Fade in={checkCategory}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="Category Name"
                onChange={onCategoryNameChanged}
                value={categoryName}
              />
              <Button onClick={handleAddCategory} sx={{ ml: 1 }}>
                Add Category
              </Button>
            </Box>
          </Fade>
        </Box>
        <Box
          sx={{
            m: 1,
          }}
        >
          <Button onClick={handleSubmit} sx={{ width: "100%" }}>
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminAddBook;
