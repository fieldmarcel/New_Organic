
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { User, MessageCircle, Trash2, CornerDownLeft } from "lucide-react"; // Icons for logo and actions

const Comments = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { id } = useParams(); // Recipe ID from URL
  const [userId, setuserId] = useState(null); // Only keep userId

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BASE_URL + `/api/v1/comments/${id}`
        );
        setComments(res.data);
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    const storedUser = JSON.parse(localStorage.getItem("data"));
    if (storedUser) {
      try {
        if (storedUser && storedUser.id) {
          setuserId(storedUser.id); // Set userId
        } else {
          console.error("User ID not found in parsed localStorage data");
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    } else {
      console.error("User data not found in localStorage");
    }
    fetchComments();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting comment with data:", { comment, userId });

    if (!comment || !userId) {
      console.error("Missing comment or userId");
      return;
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + `/api/v1/comments/${id}`,
        {
          comment,
          userId, // Only send userId
        }
      );

      setComments([...comments, res.data]);
      setComment("");
      console.log("Comment submitted:", res.data);
    } catch (error) {
      console.error(
        "Error submitting comment:",
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8081/api/v1/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId)); 
      console.log("Comment deleted:", commentId);
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  // const handleReply = (commentId) => {
  //   console.log("Replying to comment:", commentId);
  // };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/90 backdrop-blur-lg shadow-2xl ">
      {/* Comment Input Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full">
            <MessageCircle className="w-5 h-5 text-emerald-600" /> {/* Icon for input */}
          </div>
          <input
            type="text"
            name="comment"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="flex-1 p-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div>
        <h3 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-emerald-600" /> 
          Comments
        </h3>
        {comments.length > 0 ? (
          comments.map((c) => (
            <div
              key={c._id}
              className="mb-4 p-5 bg-emerald-50 rounded-xl shadow-sm border border-emerald-100"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-full">
                    <User className="w-4 h-4 text-emerald-600" /> {/* User icon */}
                  </div>
                  <strong className="text-emerald-700 text-xl">{c.userId?.userName}</strong>
                </div>
                {c.userId?._id === userId && (
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="text-emerald-600 hover:text-emerald-800 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> {/* Delete icon */}
                    <span>Delete</span>
                  </button>
                )}
              </div>
              <p className="text-gray-800 pl-11">{c.comment}</p> {/* Comment text */}
              <div className="mt-3 pl-11">
                
              </div>
            </div>
          ))
        ) : (
          <p className="text-emerald-600">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default Comments;