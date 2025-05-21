"use client";
import { useState } from "react";

export default function CommentSection({ comments, isReadOnly = false }) {
  const [newComment, setNewComment] = useState("");
  const [displayComments, setDisplayComments] = useState(comments || []);
  const [currentUser, setCurrentUser] = useState("小明"); // Toggle between 小明 and 小美

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        user: currentUser,
        text: newComment,
      };
      setDisplayComments([...displayComments, comment]);
      setNewComment("");
      // Switch user for demo purposes
      setCurrentUser(currentUser === "小明" ? "小美" : "小明");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-blue-600 mb-4">留言區</h3>
      <div className="space-y-4 mb-6">
        {displayComments.map((comment, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              comment.user === "小明"
                ? "bg-blue-100 ml-12"
                : "bg-green-100 mr-12"
            }`}
          >
            <div className="font-medium mb-1">{comment.user}</div>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      {!isReadOnly && (
        <div>
          <div className="flex items-center mb-2">
            <span className="font-medium mr-2">目前身分:</span>
            <span className="bg-blue-100 px-2 py-1 rounded">{currentUser}</span>
          </div>
          <div className="flex">
            <input
              type="text"
              className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="寫下你的想法..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
              onClick={handleAddComment}
            >
              發送
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
