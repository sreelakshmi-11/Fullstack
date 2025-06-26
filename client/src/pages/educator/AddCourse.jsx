import React, { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import Quill from "quill";
import uniqid from "uniqid";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter chapter title");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, index) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(index, 1);
          }
          return chapter;
        })
      );
    }
  };
  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };

          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, newLecture],
          };
        }

        return chapter;
      })
    );

    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);
  return (
    <div className="w-[600px] px-10 py-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label>Course Title</label>
          <input
            type="text"
            placeholder="Type here"
            className="border border-gray-500 px-3 py-2 rounded"
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            required
          />
        </div>
        <h1>Course Description</h1>
        <div className="flex flex-col gap-2" ref={editorRef}></div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <label className="flex text-nowrap">Course Price</label>
            <input
              type="number"
              placeholder="0"
              className="border px-3 py-2 w-28"
              required
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
            />
          </div>
          <div className="flex gap-4">
            <h1 className="flex items-center justify-center text-nowrap">
              Course Thumbnail
            </h1>
            <div className="flex gap-2 items-center justify-center">
              <img src={assets.file_upload_icon} className="w-9 h-9" />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              {image && (
                <img
                  src={image ? URL.createObjectURL(image) : ""}
                  alt=""
                  className="max-h-10"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label>Discount %</label>
          <input
            type="number"
            placeholder="0"
            min="0"
            max="0"
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            className="border border-gray-500 px-3 py-2 rounded w-28"
          />
        </div>
        <div className="flex flex-col">
          {chapters.map((chapter, index) => (
            <div
              key={index}
              className="justify-between items-center p-4 border-b "
            >
              <div className="flex items-center gap-3">
                <img
                  onClick={() => handleChapter("toggle", chapter.chapterId)}
                  src={assets.down_arrow_icon}
                  className={` mr-2 cursor-pointer transition-all ${
                    chapter.collapsed && "-rotate-180"
                  }`}
                />
                <span>
                  {index + 1}
                  {"  "}
                  {chapter.chapterTitle}
                </span>
                <span className="text-gray-500">
                  {chapter.chapterContent.length}Lectures
                </span>
                <img
                  src={assets.cross_icon}
                  className="cursor-pointer"
                  onClick={() => handleChapter("remove", chapter.chapterId)}
                />
              </div>
              <div className="">
                {!chapter.collapsed &&
                  chapter.chapterContent.map((lecture, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>
                        {index + 1}
                        {lecture.lectureTitle} - {lecture.lectureDuration} mins
                        -
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          className="text-blue-500"
                        >
                          Link
                        </a>{" "}
                        -{lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>
                      <img
                        src={assets.cross_icon}
                        className="cursor-pointer"
                        onClick={() =>
                          handleLecture("remove", chapter.chapterId, index)
                        }
                      />
                    </div>
                  ))}
                <div
                  className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2"
                  onClick={() => handleLecture("add", chapter.chapterId)}
                >
                  +Add Lecture
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="bg-blue-200 py-2 px-4 flex items-center justify-center"
          onClick={() => handleChapter("add")}
        >
          +Add Chapter
        </div>
        <div>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white text-gray-700 p-4 rounded relative w-full max-w-80">
                <div className="mb-2">
                  <p>Lecture Title</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-2">
                  <p> Duration(minutes)</p>
                  <input
                    type="number"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-2">
                  <p>Lecture URL</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-2">
                  <p>Is Preview Free?</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                  />
                </div>
                <button
                  type="button"
                  className="w-full  bg-blue-400 text-white px-4 py-2 rounded"
                  onClick={addLecture}
                >
                  ADD
                </button>
                <img
                  src={assets.cross_icon}
                  className="absolute top-2 right-2 w-4 cursor-pointer"
                  onClick={() => setShowPopup(false)}
                />
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-black text-white w-max py-2.5 px-8 rounded my-4"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
