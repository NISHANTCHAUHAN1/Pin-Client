import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../utils/Axios";

const PinContext = createContext();

export const PinProvider = ({ children }) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);

  // hame bar bar ab page refresh karne ki jarurt nahi padegi fetchpins ki whaja se
  async function fetchPins() {
    try {
      const res = await axios.get("/api/pin/all");
      setPins(res.data || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchPins();
  }, []);

  const [pin, setPin] = useState(null);
  async function fetchPin(id) {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/pin/" + id);
      setPin(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // update
  async function updatePin(id, title, pin, setEdit) {
    try {
      const { data } = await axios.put("/api/pin/" + id, { title, pin });
      toast.success(data.message);
      await fetchPin(id);
      setEdit(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
    }
  }
  // commnet add
  async function addComment(id, comment, setComment) {
    try {
      const { data } = await axios.post("/api/pin/comment/" + id, { comment });
      toast.success(data.message);
      await fetchPin(id);
      setComment("");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
    }
  }

  // delete comment
  async function deleteComment(id, commentId) {
    try {
      const { data } = await axios.delete(
        `/api/pin/comment/${id}?commentId=${commentId}`
      );
      toast.success(data.message);
      await fetchPin(id);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
    }
  }

  //delete pin
  async function deletePin(id, navigate) {
    setLoading(true);
    try {
      const { data } = await axios.delete(`/api/pin/${id}`);
      toast.success(data.message);
      navigate("/");
      setLoading(false);
      await fetchPins();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
      setLoading(false);
    }
  }
  // addPin
  async function addPin(
    formData,
    setFilePrev,
    setFile,
    setTitle,
    setPin,
    navigate
  ) {
    try {
      const { data } = await axios.post("/api/pin/new", formData);

      toast.success(data.message);
      setFile([]);
      setFilePrev("");
      setPin("");
      setTitle("");
      await fetchPins();
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
    }
  }

  return (
    <PinContext.Provider
      value={{
        pins,
        loading,
        fetchPin,
        fetchPins,
        pin,
        updatePin,
        addComment,
        deleteComment,
        deletePin,
        addPin,
      }}
    >
      {children}
    </PinContext.Provider>
  );
};

export const pinData = () => useContext(PinContext);
