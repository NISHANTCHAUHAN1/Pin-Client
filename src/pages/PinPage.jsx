// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { pinData } from "../context/pinContext";
// import { Loading } from "../components/Loading";
// import { MdDelete } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";

// const PinPage = ({ user }) => {
//   const params = useParams();
//   const {
//     fetchPin,
//     pin,
//     loading,
//     updatePin,
//     addComment,
//     deleteComment,
//     deletePin,
//   } = pinData();
//   // console.log(pin);
//   const [edit, setEdit] = useState(false);
//   const [title, setTitle] = useState("");
//   const [pinValue, setPinValue] = useState("");
//   const [commnet, setComment] = useState("");

//   const editHandler = () => {
//     setTitle(pin.title);
//     setPinValue(pin.pin);
//     setEdit(!edit);
//   };

//   const updateHandler = () => {
//     updatePin(pin._id, title, pinValue, setEdit);
//   };

//   const sumbitHandler = (e) => {
//     e.preventDefault();
//     addComment(pin._id, commnet, setComment);
//   };

//   const deleteCommentHandler = (id) => {
//     if (confirm("Are you sure you want to delete this pin"))
//       deleteComment(pin._id, id);
//   };

//   const naviagte = useNavigate();
//   const deletePinHandler = () => {
//     if (confirm("Are you sure you want to delete this pin"))
//       deletePin(pin._id, naviagte);
//   };
//   useEffect(() => {
//     fetchPin(params.id);
//   }, [params.id]);
//   return (
//     <div>
//       {pin && (
//         <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
//           {loading ? (
//             <Loading />
//           ) : (
//             <div className="bg-white rounded-lg shadow-lg flex flex-wrap w-full max-w-4xl">
//               <div className="w-full md:w-1/2 bg-gray-200 rounded-t-lg md:rounded-l-lg md:rounded-t-none flex items-center justify-center lg:max-w-lg">
//                 {pin.image && (
//                   <img
//                     src={pin.image.url}
//                     alt=""
//                     className="object-contain w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none max-h-96"
//                   />
//                 )}
//               </div>

//               <div className="w-full md:w-1/2 p-6 flex flex-col">
//                 <div className="flex items-center justify-between mb-4">
//                   {edit ? (
//                     <input
//                       value={title}
//                       onChange={(e) => setTitle(e.target.value)}
//                       className="common-input"
//                       style={{ width: "200px" }}
//                       placeholder="Enter Title"
//                     />
//                   ) : (
//                     <h1 className="text-2xl font-bold">{pin.title}</h1>
//                   )}

//                   {pin.owner && pin.owner._id === user._id && (
//                     <button onClick={editHandler}>
//                       <FaEdit />
//                     </button>
//                   )}

//                   {pin.owner && pin.owner._id === user._id && (
//                     <button
//                       onClick={deletePinHandler}
//                       className="bg-red-500 text-white py-1 px-3 rounded"
//                     >
//                       <MdDelete />
//                     </button>
//                   )}
//                 </div>

//                 {edit ? (
//                   <input
//                     value={pinValue}
//                     onChange={(e) => setPinValue(e.target.value)}
//                     className="common-input"
//                     style={{ width: "200px" }}
//                     placeholder="Enter Pin"
//                   />
//                 ) : (
//                   <p className="mb-6">{pin.pin}</p>
//                 )}

//                 {edit && (
//                   <button
//                     style={{ width: "200px" }}
//                     className="bg-red-500 text-white py-1 px-3 mt-2 mb-2 rounded"
//                     onClick={updateHandler}
//                   >
//                     Update
//                   </button>
//                 )}

//                 {pin.owner && (
//                   <div className="flex items-center justify-between border-b pb-4 mb-4">
//                     <div className="flex items-center">
//                       <Link to={`/user/${pin.owner._id}`}>
//                         <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center">
//                           <span className="font-bold">
//                             {pin.owner.name.slice(0, 1)}
//                           </span>
//                         </div>
//                       </Link>
//                       <div className="ml-4">
//                         <h2 className="text-lg font-semibold">
//                           {pin.owner.name}
//                         </h2>
//                         <p className="text-gray-500">
//                           {pin.owner.followers.length} Followers
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex items-center mt-4">
                  
//                   <form className="flex-1 flex" onSubmit={sumbitHandler}>
//                     <input
//                       type="text"
//                       placeholder="Enter Comment"
//                       className="flex-1 border rounded-lg p-2"
//                       value={commnet}
//                       onChange={(e) => setComment(e.target.value)}
//                       required
//                     />
//                     <button
//                       type="submit"
//                       className="ml-2 bg-red-500 px-2 py-2 rounded-md text-white"
//                     >
//                       Add+
//                     </button>
//                   </form>
//                 </div>

//                 <hr className="font-bold text-gray-400 mt-3 mb-3" />

//                 <div className="overflow-y-auto h-64">
//                   {pin.comments && pin.comments.length > 0 ? (
//                     pin.comments.map((e, i) => (
//                       <div
//                         key={i}
//                         className="flex items-center justify-between mb-4"
//                       >
//                         <div className="flex items-center mb-4 justify-center gap-3">
//                           <Link to={`/user/${e.user}`}>
//                             <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center">
//                               <span className="font-bold">
//                                 {e.name.slice(0, 1)}
//                               </span>
//                             </div>
//                           </Link>

//                           <div className="ml-4">
//                             <div className="ml-4">
//                               <h2 className="text-lg font-semibold">
//                                 {e.name}
//                               </h2>
//                               <p className="text-gray-500">{e.comment}</p>
//                             </div>
//                           </div>

//                           {e.user === user._id && (
//                             <button
//                               onClick={() => deleteCommentHandler(e._id)}
//                               className="bg-red-500 text-white py-1 px-3 mt-2 mb-2 rounded"
//                             >
//                               {" "}
//                               <MdDelete />{" "}
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p>Be the first one to add comment</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PinPage;


import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { pinData } from "../context/pinContext";
import { Loading } from "../components/Loading";
import { MdDelete, MdClose } from "react-icons/md";
import { FaEdit, FaHeart, FaRegHeart, FaShare, FaDownload } from "react-icons/fa";
import { BiSolidComment } from "react-icons/bi";
import { IoSend } from "react-icons/io5";

const PinPage = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    fetchPin,
    pin,
    loading,
    updatePin,
    addComment,
    deleteComment,
    deletePin,
  } = pinData();

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [pinValue, setPinValue] = useState("");
  const [comment, setComment] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState(null);

  const editHandler = () => {
    setTitle(pin.title);
    setPinValue(pin.pin);
    setEdit(!edit);
  };

  const updateHandler = () => {
    updatePin(pin._id, title, pinValue, setEdit);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addComment(pin._id, comment, setComment);
  };

  const deleteCommentHandler = (id) => {
    setDeleteCommentId(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteComment = () => {
    deleteComment(pin._id, deleteCommentId);
    setShowDeleteModal(false);
    setDeleteCommentId(null);
  };

  const deletePinHandler = () => {
    if (confirm("Are you sure you want to delete this pin?")) {
      deletePin(pin._id, navigate);
    }
  };

  useEffect(() => {
    fetchPin(params.id);
  }, [params.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">Back to Pins</span>
        </button>
      </div>

      {pin && (
        <div className="max-w-6xl mx-auto px-4 pb-12">
          {loading ? (
            <Loading />
          ) : (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="lg:w-1/2 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8 relative group">
                  {pin.image && (
                    <>
                      <img
                        src={pin.image.url}
                        alt={pin.title}
                        className="object-contain w-full h-auto max-h-[600px] rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Image Actions Overlay */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white shadow-lg transform hover:scale-110 transition-all">
                          <FaDownload className="w-4 h-4 text-gray-700" />
                        </button>
                        <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white shadow-lg transform hover:scale-110 transition-all">
                          <FaShare className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Content Section */}
                <div className="lg:w-1/2 p-8 flex flex-col">
                  {/* Header with Title and Actions */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      {edit ? (
                        <input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="text-3xl font-bold border-b-2 border-gray-300 focus:border-red-500 outline-none transition-colors w-full pb-2"
                          placeholder="Enter Title"
                        />
                      ) : (
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                          {pin.title}
                        </h1>
                      )}
                    </div>

                    {pin.owner && pin.owner._id === user._id && (
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={editHandler}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all"
                          title="Edit Pin"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={deletePinHandler}
                          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all"
                          title="Delete Pin"
                        >
                          <MdDelete className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    {edit ? (
                      <textarea
                        value={pinValue}
                        onChange={(e) => setPinValue(e.target.value)}
                        className="w-full border-2 border-gray-300 focus:border-red-500 outline-none rounded-xl p-4 transition-colors resize-none"
                        rows="4"
                        placeholder="Enter Description"
                      />
                    ) : (
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {pin.pin}
                      </p>
                    )}

                    {edit && (
                      <button
                        className="mt-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all"
                        onClick={updateHandler}
                      >
                        Update Pin
                      </button>
                    )}
                  </div>

                  {/* Owner Info */}
                  {pin.owner && (
                    <div className="border-t border-b border-gray-200 py-6 mb-6">
                      <Link
                        to={`/user/${pin.owner._id}`}
                        className="flex items-center gap-4 group"
                      >
                        <div className="relative">
                          <div className="rounded-full h-14 w-14 bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <span className="font-bold text-white text-xl">
                              {pin.owner.name.slice(0, 1).toUpperCase()}
                            </span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 group-hover:text-red-500 transition-colors">
                            {pin.owner.name}
                          </h2>
                          <p className="text-gray-500 text-sm">
                            {pin.owner.followers.length} Followers
                          </p>
                        </div>
                      </Link>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 mb-6">
                    <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2">
                      <FaHeart className="w-4 h-4" />
                      Save
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-full font-semibold shadow-md transform hover:scale-105 transition-all">
                      <FaShare className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Comments Section */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <BiSolidComment className="w-5 h-5 text-gray-600" />
                      <h3 className="text-xl font-bold text-gray-900">
                        Comments ({pin.comments?.length || 0})
                      </h3>
                    </div>

                    {/* Add Comment Form */}
                    <form onSubmit={submitHandler} className="mb-6">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          className="flex-1 border-2 border-gray-200 focus:border-red-500 outline-none rounded-full px-6 py-3 transition-colors"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          required
                        />
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all"
                        >
                          <IoSend className="w-5 h-5" />
                        </button>
                      </div>
                    </form>

                    {/* Comments List */}
                    <div className="flex-1 overflow-y-auto max-h-96 space-y-4 pr-2 custom-scrollbar">
                      {pin.comments && pin.comments.length > 0 ? (
                        pin.comments.map((e, i) => (
                          <div
                            key={i}
                            className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors group"
                          >
                            <div className="flex items-start gap-3">
                              <Link to={`/user/${e.user}`}>
                                <div className="rounded-full h-10 w-10 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-md flex-shrink-0">
                                  <span className="font-bold text-white text-sm">
                                    {e.name.slice(0, 1).toUpperCase()}
                                  </span>
                                </div>
                              </Link>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <Link to={`/user/${e.user}`}>
                                    <h4 className="font-semibold text-gray-900 hover:text-red-500 transition-colors">
                                      {e.name}
                                    </h4>
                                  </Link>
                                </div>
                                <p className="text-gray-600 break-words">
                                  {e.comment}
                                </p>
                              </div>

                              {e.user === user._id && (
                                <button
                                  onClick={() => deleteCommentHandler(e._id)}
                                  className="opacity-0 group-hover:opacity-100 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full transition-all transform hover:scale-110"
                                >
                                  <MdDelete className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <BiSolidComment className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-400 text-lg">
                            Be the first one to add a comment
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all animate-scale-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Delete Comment
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this comment? This action cannot
              be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-full font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteComment}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-semibold transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PinPage;