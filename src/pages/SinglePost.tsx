import { useState, useEffect } from "react";
import {
  MDBIcon,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardText,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getPost, getRelatedPosts } from "../services/api-service";
import { PostType } from "../types/PostType";

const SinglePost = () => {
  const [post, setPost] = useState<PostType>();
  const [relatedPost, setRelatedPost] = useState<PostType[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const getSinglePost = async () => {
      try {
        await Promise.all([
          await getPost(parseInt(id!)).then(
            (res) => {
              setPost(res.data);
              getRelatedPosts(res.data.category).then(
                (res) => {
                  setRelatedPost(res.data);
                },
                (err) => {
                  toast.error("Something went wrong with related posts!");
                }
              );
            },
            (err) => {
              toast.error("Something went wrong!");
            }
          ),
        ]);
      } catch {}
    };
    getSinglePost();
  }, [id]);

  const excerpt = (str: string) => {
    let len: number = str.length;
    if (len > 60) {
      str = str.substring(0, 60) + " ... ";
    }

    return str;
  };

  return (
    <MDBContainer style={{ marginTop: "16px" }}>
      <Link to="/">
        <strong style={{ float: "left", color: "black" }} className="mt-3">
          Go back
        </strong>
      </Link>
      <MDBTypography
        tag="h2"
        className="text-muted mt-2"
        style={{ display: "inline-block" }}>
        {post && post.title}
      </MDBTypography>
      <img
        src={post && post.imageUrl}
        className="img-fluid rounded"
        alt={post && post.title}
        style={{ width: "90%", maxHeight: "600px" }}
      />
      <div style={{ marginTop: "20px" }}>
        <div style={{ height: "43px", background: "#f6f6f6" }}>
          <MDBIcon
            style={{ float: "left" }}
            className="mt-3 p-1"
            far
            icon="calendar-alt"
            size="lg"
          />
          <strong
            style={{ float: "left", marginTop: "12px", marginLeft: "2px" }}>
            Date posted: {post && post.date}
          </strong>
          <p
            style={{
              display: "inline",
              marginLeft: "850px",
              marginTop: "7px",
            }}>
            Author: {post && post.author}
          </p>
          <br />
          <p
            style={{
              display: "inline",
              marginLeft: "850px",
              marginTop: "7px",
            }}>
            Category: {post && post.category}
          </p>
        </div>
        <MDBTypography className="lead md-0 pt-5">
          {post && post.content}
        </MDBTypography>
      </div>
      {relatedPost && relatedPost.length > 0 && (
        <>
          {relatedPost.length > 1 && (
            <h1 style={{ marginTop: "50px" }}>Related posts</h1>
          )}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {relatedPost
              .filter((item: PostType) => item.id !== id)
              .map((item: PostType) => (
                <MDBCol key={item.id}>
                  <MDBCard>
                    <Link to={`/post/${item.id}`}>
                      <MDBCardImage
                        src={item.imageUrl}
                        alt={item.title}
                        position="top"
                      />
                    </Link>
                    <MDBCardBody>
                      <MDBCardTitle>{item.title}</MDBCardTitle>
                      <MDBCardText>{excerpt(item.content)}</MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
        </>
      )}
    </MDBContainer>
  );
};

export default SinglePost;
