import React, { useState, useEffect } from "react";
import {
  getAllAuthor,
  getAllCategory,
  postAddBook,
  updateAdminStatus,
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
  Snackbar,
  Switch,
} from "@material-ui/core";

import Fade from "@mui/material/Fade";
import FormControlLabel from "@mui/material/FormControlLabel";

import MuiAlert from "@material-ui/core/Alert";
import Slide from "@material-ui/core/Slide";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AdminAddBook = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.accounts);
  const { authorList, categoryList, status } = useSelector(
    (state) => state.admins
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    text: "",
    severity: "",
  });
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
      if (result.payload.message) {
        setAlert({
          open: true,
          text: result.payload.message,
          severity: "success",
        });
      } else if (result.payload.err) {
        setAlert({
          open: true,
          text: result.payload.err,
          severity: "error",
        });
      }
    });
    setTitle("");
    setDescription("");
    setAuthor("");
    setCategory("");
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false });
  };

  const handleAddAuthor = () => {
    if (authorName !== "") {
      let body = {
        author_name: authorName,
      };
      dispatch(postAddAuthor({ body, token })).then((result) => {
        if (result.payload.message) {
          setAlert({
            open: true,
            text: result.payload.message,
            severity: "success",
          });
        } else if (result.payload.err) {
          setAlert({
            open: true,
            text: result.payload.err,
            severity: "error",
          });
        }
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
        if (result.payload.message) {
          setAlert({
            open: true,
            text: result.payload.message,
            severity: "success",
          });
        } else if (result.payload.err) {
          setAlert({
            open: true,
            text: result.payload.err,
            severity: "error",
          });
        }
      });
      dispatch(getAllCategory({ token }));
      setCategoryName("");
    }
  };

  useEffect(() => {
    dispatch(getAllAuthor({ token }));
    dispatch(getAllCategory({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(updateAdminStatus("idle"));
  }, [dispatch, status]);

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
        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={handleClose}
          TransitionComponent={Slide}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert
            onClose={handleClose}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.text}
          </Alert>
        </Snackbar>
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
