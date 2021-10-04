import React, { useState, useEffect } from "react";
import {
  getAllAuthor,
  getAllCategory,
  postAddBook,
  postAddAuthor,
  postAddCategory,
} from "./adminsSlice";
import { useDispatch, useSelector } from "react-redux";
import { postSnackbarAlert } from "../snackbarAlert/snackbarAlertsSlice";

//css
import {
  Typography,
  TextField,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Modal,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { green, pink } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[600]),
  backgroundColor: green[600],
  "&:hover": {
    backgroundColor: green[700],
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[600]),
  backgroundColor: pink[600],
  "&:hover": {
    backgroundColor: pink[700],
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

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

  const handleAddAuthor = async () => {
    if (authorName !== "") {
      let body = {
        author_name: authorName,
      };
      await dispatch(postAddAuthor({ body, token })).then((result) => {
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
        setCheckAuthor(false);
      });
      await dispatch(getAllAuthor({ token }));
      setAuthorName("");
    }
  };
  const handleAddCategory = async () => {
    if (categoryName !== "") {
      let body = {
        category_name: categoryName,
      };
      await dispatch(postAddCategory({ body, token })).then((result) => {
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
        setCheckCategory(false);
      });
      await dispatch(getAllCategory({ token }));
      setCategoryName("");
    }
  };

  useEffect(() => {
    dispatch(getAllAuthor({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(getAllCategory({ token }));
  }, [dispatch, token]);

  return (
    <React.Fragment>
      <Typography
        variant="h2"
        sx={{
          fontStyle: "italic",
          fontFamily: "fantasy",
          letterSpacing: 3,
          color: "#fb8c00",
          fontWeight: "medium",
          mt: 2,
          flexGrow: 1,
          mx: 10,
          mb: 1,
        }}
      >
        Add Book Form
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            m: 1,
            overflow: "hidden",
            borderRadius: "12px",
            boxShadow: 1,
            p: 1,
            width: "70%",
          }}
        >
          <TextField
            fullWidth
            required
            label="Title"
            value={title}
            onChange={onTitleChanged}
            sx={{ width: "80%", px: 1, my: 1 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={onDescriptionChanged}
            sx={{ px: 1 }}
          />

          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              m: 1,
            }}
          >
            <FormControl sx={{ mr: 2, width: "50%", minWidth: 120 }} required>
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
            <AddButton onClick={onCheckAuthorChanged} sx={{ px: 2 }}>
              Add New Author
            </AddButton>
            <Modal
              open={checkAuthor}
              onClose={() => setCheckAuthor(false)}
              aria-labelledby="author-modal-title"
            >
              <Box
                sx={{
                  ...style,
                  width: 400,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h2 id="author-modal-title">New Author</h2>
                <TextField
                  label="Author Name"
                  onChange={onAuthorNameChanged}
                  value={authorName}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <AddButton
                    onClick={handleAddAuthor}
                    sx={{
                      mt: 1,
                      width: "30%",
                    }}
                  >
                    Add
                  </AddButton>
                </Box>
              </Box>
            </Modal>
          </Box>

          <Box sx={{ display: "flex", m: 1, flexGrow: 1 }}>
            <FormControl sx={{ minWidth: 120, mr: 2, width: "50%" }} required>
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
                      <MenuItem
                        value={items.id_category}
                        key={items.id_category}
                      >
                        {items.category_name}
                      </MenuItem>
                    ))
                  : ""}
              </Select>
            </FormControl>
            <AddButton onClick={onCheckCategoryChanged} sx={{ px: 2 }}>
              Add New Category
            </AddButton>
            <Modal
              open={checkCategory}
              onClose={() => setCheckCategory(false)}
              aria-labelledby="category-modal-title"
            >
              <Box
                sx={{
                  ...style,
                  width: 400,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h2 id="category-modal-title">New Category</h2>
                <TextField
                  label="Category Name"
                  onChange={onCategoryNameChanged}
                  value={categoryName}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <AddButton
                    onClick={handleAddCategory}
                    sx={{
                      mt: 1,
                      width: "30%",
                    }}
                  >
                    Add
                  </AddButton>
                </Box>
              </Box>
            </Modal>
          </Box>
          <Box
            sx={{
              m: 1,
            }}
          >
            <ColorButton onClick={handleSubmit} sx={{ width: "100%" }}>
              Submit
            </ColorButton>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default AdminAddBook;
