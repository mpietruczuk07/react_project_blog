import React from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface PostsTypes {
  title: string;
  author: string;
  category: string;
  date: string;
  imageUrl: string;
  content: string;
  id?: number;
  excerpt: any;
  handleEdit: any;
  handleDelete: any;
}

const Posts = ({
  title,
  author,
  category,
  date,
  imageUrl,
  content,
  excerpt,
  handleEdit,
  handleDelete,
  id,
}: PostsTypes) => {
  const user = useAppSelector((state) => state.user.userData);
  return (
    <MDBCol size="4">
      <MDBCard className="h-100 mt-2" style={{ maxWidth: "22rem" }}>
        <MDBCardImage
          src={imageUrl}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <MDBCardBody>
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>
            {excerpt(content)}
            <Link to={`/post/${id}`}> Read more</Link>
          </MDBCardText>
          <p> Category: {category}</p>
          <p> Author: {author}</p>
          <span>
            {user?.id && user?.role === "admin" ? (
              <MDBBtn
                className="mt-1"
                tag="a"
                color="none"
                onClick={() => handleDelete(id)}>
                <MDBIcon
                  fas
                  icon="trash"
                  style={{ color: "#dd4b39" }}
                  size="lg"></MDBIcon>
              </MDBBtn>
            ) : null}
            {user?.id && user?.role === "admin" ? (
              <MDBBtn
                className="mt-1"
                tag="a"
                color="none"
                onClick={() => handleEdit(id)}>
                <MDBIcon
                  fas
                  icon="edit"
                  style={{ color: "#55acee", marginLeft: "10px" }}
                  size="lg"></MDBIcon>
              </MDBBtn>
            ) : null}
          </span>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default Posts;
