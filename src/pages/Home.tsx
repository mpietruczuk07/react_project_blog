import { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import Posts from "../components/Posts";
import Search from "../components/Search";
import Category from "../components/Category";
import LatestPosts from "../components/LatestPosts";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  deletePost,
  filterPosts,
  findPosts,
  getAllPosts,
  getSomePosts,
} from "../services/api-service";

import { PostType } from "../types/PostType";
import { categories } from "../types/Constant";

const Home = () => {
  const [data, setData] = useState<PostType[]>([]);
  const [latestPost, setLatestPost] = useState<PostType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    loadPostsData();
  }, []);

  const loadPostsData = async () => {
    try {
      await Promise.all([
        await getAllPosts().then(
          (res) => {
            setData(res.data);
            const start = res.data.length - 4;
            const end = res.data.length;
            getSomePosts(start, end).then(
              (res) => {
                setLatestPost(res.data);
              },
              (err) => {
                toast.error("Something went wrong!");
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

  const handleEdit = async (id: number) => {
    navigate(`/edit-post/${id}`);
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (window.confirm("Are you sure you want to delete that post?")) {
      await deletePost(id).then(
        (res) => {
          toast.success("Post deleted successfully!");
          loadPostsData();
        },
        (err) => {
          toast.error("Error while deleting the post!");
        }
      );
    }
  };

  const excerpt = (str: string): string => {
    let len: number = str.length;
    if (len > 50) {
      str = str.substring(0, 50) + " ... ";
    }

    return str;
  };

  const onInputChange = (e: any) => {
    if (!e.target.value) {
      loadPostsData();
    }
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    await findPosts(searchValue).then(
      (res) => {
        setData(res.data);
      },
      (err) => {
        toast.error("Error while searching post!");
      }
    );
  };

  const handleCategory = async (category: string) => {
    await filterPosts(category).then(
      (res) => {
        setData(res.data);
      },
      (err) => {
        toast.error("Error while searching posts by category!");
      }
    );
  };

  return (
    <>
      <Search
        searchValue={searchValue}
        onInputChange={onInputChange}
        handleSearch={handleSearch}
      />
      <MDBRow>
        {data.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2" loading="lazy">
            No posts found
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow loading="lazy">
              {data &&
                data?.map((item) => {
                  return (
                    <Posts
                      key={item.id}
                      {...item}
                      excerpt={excerpt}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  );
                })}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
        <MDBCol size="3">
          <h4 className="text-start">Latest posts</h4>
          {latestPost &&
            latestPost?.map((item) => {
              return <LatestPosts key={item.id} {...item} />;
            })}
          <Category options={categories} handleCategory={handleCategory} />
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default Home;
