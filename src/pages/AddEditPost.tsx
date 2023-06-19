import { useEffect, useState } from "react";
import { MDBValidation, MDBInput, MDBBtn, MDBTextArea } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { addPost, getPost, putPost } from "../services/api-service";
import { categories, authors } from "../types/Constant";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

const initialState = {
  title: "",
  author: "",
  category: "",
  date: "",
  imageUrl:
    "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
  content: "",
};

const AddPost = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [titleErrMsg, setTitleErrMsg] = useState<string>();
  const [categoryErrMsg, setCategoryErrMsg] = useState<string>();
  const [authorErrMsg, setAuthorErrMsg] = useState<string>();
  const [dateErrMsg, setDateErrMsg] = useState<string>();
  const [imageErrMsg, setImageErrMsg] = useState<string>();
  const [contentErrMsg, setContentErrMsg] = useState<string>();
  const [editMode, setEditMode] = useState<boolean>();
  const { title, author, category, date, imageUrl, content } = formValue;
  const { id } = useParams();
  const user = useAppSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      getSinglePost(id);
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const getSinglePost = async (id: string) => {
    try {
      await Promise.all([
        await getPost(parseInt(id)).then(
          (res) => {
            setFormValue(res.data);
          },
          (err) => {
            toast.error("Error when fetching chosen post data!");
          }
        ),
      ]);
    } catch {}
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title) {
      setTitleErrMsg("Enter the title!");
    }

    if (!category) {
      setCategoryErrMsg("Select the category!");
    }

    if (!author) {
      setAuthorErrMsg("Select the author!");
    }

    if (!date) {
      setDateErrMsg("Select the date!");
    }

    if (!imageUrl) {
      setDateErrMsg("Enter the image url!");
    }

    if (!content) {
      setContentErrMsg("Enter the content!");
    }

    if (title && author && category && new Date() && content && imageUrl) {
      const postData = { ...formValue };
      if (!editMode) {
        try {
          await Promise.all([
            await addPost(postData).then(
              (res) => {
                toast.success("Post added successfully!");
              },
              (err) => {
                toast.error("Error while adding the post!");
              }
            ),
          ]);
        } catch {}
      } else {
        try {
          await Promise.all([
            await putPost(parseInt(id!), formValue).then(
              (res) => {
                toast.success("Post updated successfully!");
              },
              (err) => {
                toast.error("Error while updating the post!");
              }
            ),
          ]);
        } catch {}
      }
      setFormValue({
        title: "",
        author: "",
        category: "",
        date: "",
        imageUrl:
          "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
        content: "",
      });
      navigate("/");
    }
  };

  const onTitleChange = (e: any) => {
    setTitleErrMsg("");
    setFormValue({ ...formValue, title: e.target.value });
  };

  const onAuthorChange = (e: any) => {
    setAuthorErrMsg("");
    setFormValue({ ...formValue, author: e.target.value });
  };
  const onCategoryChange = (e: any) => {
    setCategoryErrMsg("");
    setFormValue({ ...formValue, category: e.target.value });
  };
  const onDateChange = (e: any) => {
    setDateErrMsg("");
    setFormValue({ ...formValue, date: e.target.value });
  };

  const onImageUrlChange = (e: any) => {
    setImageErrMsg("");
    setFormValue({ ...formValue, imageUrl: e.target.value });
  };

  const onContentChange = (e: any) => {
    setContentErrMsg("");
    setFormValue({ ...formValue, content: e.target.value });
  };

  const clearValues = (e: any) => {
    setFormValue({
      title: "",
      author: "",
      category: "",
      date: "",
      imageUrl:
        "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
      content: "",
    });
    navigate("/");
  };

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "50px", paddingBottom: "15vh" }}
      noValidate
      onSubmit={handleSubmit}>
      <h2 className="fs-2 fw-bold" style={{ marginBottom: "30px" }}>
        {editMode ? "Update" : "Add post"}
      </h2>
      {user?.id && user?.role === "admin" ? (
        <div
          style={{
            margin: "auto",
            display: "flex",
            width: "600px",

            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
          }}>
          <MDBInput
            style={{ width: "600px" }}
            value={title}
            name="title"
            type="text"
            onChange={onTitleChange}
            required
            label="Title"
          />
          {titleErrMsg && <div className="authorErrorMsg">{titleErrMsg}</div>}
          <select
            style={{ width: "600px" }}
            className="authors-dropdown"
            value={author}
            name="author"
            onChange={onAuthorChange}
            required>
            <option>Select author</option>
            {authors.map((author, index) => (
              <option value={author} key={index}>
                {author}
              </option>
            ))}
          </select>
          {authorErrMsg && <div className="authorErrorMsg">{authorErrMsg}</div>}
          <select
            style={{ width: "600px" }}
            className="categories-dropdown"
            name="category"
            onChange={onCategoryChange}
            value={category}
            required>
            <option>Select category</option>
            {categories.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </select>
          {categoryErrMsg && (
            <div className="categoryErrorMsg">{categoryErrMsg}</div>
          )}
          <MDBInput
            style={{ width: "600px" }}
            value={date}
            name="date"
            type="date"
            onChange={onDateChange}
            required
            label="Date of publication"
          />
          {dateErrMsg && <div className="authorErrorMsg">{dateErrMsg}</div>}
          <MDBInput
            style={{ width: "600px" }}
            value={imageUrl}
            name="image-url"
            type="text"
            onChange={onImageUrlChange}
            required
            label="Image url"
          />
          <MDBTextArea
            style={{ width: "600px", minHeight: "350px" }}
            value={content}
            name="content"
            onChange={onContentChange}
            required
            label="Content"
          />
          {contentErrMsg && (
            <div className="authorErrorMsg">{contentErrMsg}</div>
          )}
          <span>
            <MDBBtn
              style={{ margin: "10px", width: "120px" }}
              type="submit"
              color="primary">
              {editMode ? "Update" : "Add post"}
            </MDBBtn>
            <MDBBtn
              style={{ margin: "10px", width: "120px" }}
              type="submit"
              color="danger"
              onClick={clearValues}>
              Cancel
            </MDBBtn>
          </span>
        </div>
      ) : (
        <p>You do not have the permission!</p>
      )}
    </MDBValidation>
  );
};

export default AddPost;
