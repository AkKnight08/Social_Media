import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import Breadcrumb from "../components/Breadcrumb";
import { Link } from "react-router-dom";
import OtherProfile from "./OtherProfile";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../app/sphereReducer";
const Home = () => {
  const [formData, setFormData] = useState({
    content: "",
  });
  const [commentFormData, setCommentFormData] = useState({});
  const [posts, setPosts] = useState([]);
  const [p_Id, setp_Id] = useState(0);
  const user=useSelector(userSelector);
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    homePosts();
  }, []);

  useEffect(() => {
    console.log(userList);
  }, [userList]);

  const homePosts = async () => {
    try {
      const response = await fetch("http://localhost:8000/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      let postsData = responseData.posts;
      postsData = postsData.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      setPosts(postsData);

      const initialCommentState = {};
      postsData.forEach((post) => {
        initialCommentState[post._id] = {
          content: "",
        };
      });
      setCommentFormData(initialCommentState);
      setUserList(responseData.all_users);
    } catch (err) {
      console.log("Error in receiving Posts", err);
    }
  };

  const handleProfile = async () => {};
  const handleDelCom = async (e, cId) => {
    try {
      e.preventDefault();
      const response = await fetch(
        `http://localhost:8000/comments/destroy/${cId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      homePosts();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelPos = async (e, pId) => {
    try {
      e.preventDefault();
      const response = await fetch(
        `http://localhost:8000/posts/destroy/${pId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      homePosts();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/posts/create/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setFormData({
        content: "",
      });
      homePosts();
    } catch (err) {
      console.log("Error in Creating Post");
    }
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/comments/create/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...commentFormData[postId],
          post: postId,
        }),
      });
      setCommentFormData({
        ...commentFormData,
        [postId]: {
          content: "",
        },
      });
      homePosts();
    } catch (err) {
      console.log("Error in Creating Comment", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDate = (postDate) => {
    const date = postDate.split("T")[0];
    return date;
  };

  const handleTime = (postTime) => {
    const time = postTime.split("T")[1].split(".")[0];
    return time;
  };

  const handleCommentChange = (postId, e) => {
    setCommentFormData({
      ...commentFormData,
      [postId]: {
        ...commentFormData[postId],
        content: e.target.value,
      },
    });
  };

  const handleComment = (e, postId) => {
    e.preventDefault();
    setp_Id(postId);
    setCommentFormData({
      ...commentFormData,
      [postId]: {
        ...commentFormData[postId],
        content: e.target.value,
      },
    });
  };
  const handleOtherProfile = (e, userId) => {
    e.preventDefault();
    navigate(`/other-profile/${userId}`);
  };
  return (
    <>
      <Meta title={"Home"} />
      <Breadcrumb title={"Home"} />
      <div className="post-wrapper home-wrapper-2 py-4">
        <div className="container-xxl">
          <div className="row d-flex justify-content-center gap-10">
            {localStorage.getItem("user") ? (
              <div className="col-5 d-flex flex-column gap-30">
                <div className="post-card bg-white card-wrapper text-center gap-10">
                  <h4>Post Here</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Type Here..."
                        id="floatingTextarea2"
                        name="content"
                        value={formData.content}
                        style={{ height: "100px" }}
                        onChange={handleChange}
                      ></textarea>
                      <label htmlFor="floatingTextarea2">Posts Here...</label>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                      <input className="button" type="submit" value="Post" />
                    </div>
                  </form>
                </div>
                <div className="users-list bg-white card-wrapper text-center gap-10 py-4">
                  <div>
                    <h4>Find Users</h4>
                  </div>
                  {userList.map((u, index) => (
                    <div
                      key={index}
                      className="d-flex gap-15 justify-content-center"
                    >
                      <Link onClick={(e) => handleOtherProfile(e, u._id)}>
                        {u.name}
                      </Link>
                      <p>{u.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="col-6">
              <div className="users-posts card-wrapper text-center">
                <div>
                  <h4>Posts</h4>
                </div>
                {posts.map((post) => (
                  <div key={post._id} className="post-item">
                    <div className="d-flex gap-10">
                      <p className="mb-0">
                        {post.user.name}, {handleTime(post.createdAt)},{" "}
                        {handleDate(post.createdAt)}
                      </p>
                      <p>{post.content}</p>
                      <p className="d-flex gap-10">
                        <Link
                          to="#"
                          onClick={(e) => handleComment(e, post._id)}
                          className="text-dark"
                        >
                          Comment
                        </Link>
                        {user&&user._id===post.user?<Link
                          className="text-dark"
                          onClick={(e) => handleDelPos(e, post._id)}
                        >
                          Delete Post
                        </Link>:''}
                      </p>
                    </div>
                    {localStorage.getItem("user") ? (
                      p_Id === post._id ? (
                        <div className="comments-post d-flex justify-content-end">
                          <form
                            onSubmit={(e) => handleCommentSubmit(e, post._id)}
                          >
                            <div className="form-floating">
                              <textarea
                                className="form-control"
                                placeholder="Type Here..."
                                id={`commentTextarea-${post._id}`}
                                name="content"
                                value={commentFormData[post._id]?.content || ""}
                                style={{ height: "50px" }}
                                onChange={(e) =>
                                  handleCommentChange(post._id, e)
                                }
                              ></textarea>
                              <label htmlFor={`commentTextarea-${post._id}`}>
                                Comments Here...
                              </label>
                            </div>
                            <input type="hidden" name="post" value={post._id} />
                            <div className="d-flex justify-content-end mt-3">
                              <input
                                className="button"
                                type="submit"
                                value="Comment"
                              />
                            </div>
                          </form>
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                    {post.comments
                      .slice()
                      .reverse()
                      .map((c, index) => (
                        <div
                          className="post-item d-flex justify-content-end"
                          key={c._id}
                        >
                          <div className="d-flex gap-10">
                            <p className="mb-0">
                              {c.user.name}, {handleTime(c.createdAt)},{" "}
                              {handleDate(c.createdAt)}
                            </p>
                            <p>{c.content}</p>
                            <Link
                              onClick={(e) => handleDelCom(e, c._id)}
                              className="text-dark"
                            >
                              Delete Comment
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
