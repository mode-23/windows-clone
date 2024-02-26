import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import NoGmails from "./NoGmails";
import GmailRow from "./GmailRow";
import { TbTrash } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { CgInbox } from "react-icons/cg";
import { IoMdPricetag } from "react-icons/io";
import {
  MdOutlineMarkEmailRead,
  MdOutlineMarkEmailUnread,
  MdOutlineRefresh,
  MdLabelImportantOutline,
} from "react-icons/md";
import {
  arrayUnion,
  arrayRemove,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import GmailLoading from "./GmailLoading";
import Tooltip from "../Asset/Tooltip";

const GmailSharedComponent = ({ data, selectedItems, setSelectedItems, loading }) => {
  const { user, setRefresh } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.uid) {
      navigate("/");
    }
  }, [user]);
  const checkBoxSelected = (e, data) => {
    const { name } = e.target;
    if (name !== "selectAll") {
      if (!selectedItems.includes(name)) {
        setSelectedItems([...selectedItems, name]);
      } else {
        setSelectedItems(selectedItems.filter((item) => item !== name));
      }
    } else {
      setSelectedItems([]);
      if (selectedItems.length !== data?.length) {
        const list = [];
        data?.forEach((item) => {
          list.push(item?.id);
          setSelectedItems(list);
        });
      } else {
        setSelectedItems([]);
      }
    }
  };

  const handleMultipleActions = async (type) => {
    const collectionRef = collection(db, "message");
    const q = query(collectionRef, where("id", "in", selectedItems));
    const snapshot = await getDocs(q);
    const results = snapshot?.docs?.map((doc) => ({
      ...doc?.data(),
      id: doc?.id,
    }));
    results?.forEach(async (result) => {
      const docRef = doc(db, "message", result?.id);
      switch (type) {
        case "markasread":
          await updateDoc(docRef, {
            viewedBy: arrayUnion(user?.uid),
          });
          break;
        case "markasnotread":
          await updateDoc(docRef, {
            viewedBy: arrayRemove(user?.uid),
          });
          break;
        case "delete":
          await updateDoc(docRef, {
            deleted: "true",
          });
          break;
        case "favourite":
          await updateDoc(docRef, {
            favourite: "true",
          });
          break;
        case "important":
          await updateDoc(docRef, {
            important: "true",
          });
          break;
        default:
          break;
      }
    });
    setSelectedItems([]);
  };
  return (
    <>
      <nav className="gmail_header_body_content_nav">
        {data?.length > 0 && (
          <div>
            <input
              type="checkbox"
              id={"selectAll"}
              onChange={(e) => checkBoxSelected(e, data)}
              className="csBx"
              name={"selectAll"}
            />
            <label htmlFor="selectAll">
              <div
                className={
                  selectedItems?.length == data?.length && data?.length > 0
                    ? "customCheckBox checked"
                    : "customCheckBox"
                }
              ></div>
            </label>
          </div>
        )}
        <div className="icon_1">
          <MdOutlineRefresh
            onClick={() => setRefresh((prev) => !prev)}
            className="sm_refresh"
          />
        </div>
        {selectedItems.length > 0 && (
          <div className="df sm_icons">
            <div
              className="icon_1 toolholder"
              onClick={() => handleMultipleActions("markasnotread")}
            >
              <MdOutlineMarkEmailUnread />
              <Tooltip message={"Mark as unread"} direction={"bottom"} />
            </div>
            <div
              className="icon_1 toolholder"
              onClick={() => handleMultipleActions("markasread")}
            >
              <MdOutlineMarkEmailRead />
              <Tooltip message={"Mark as read"} direction={"bottom"} />
            </div>
            <div
              className="icon_1 toolholder"
              onClick={() => handleMultipleActions("delete")}
            >
              <TbTrash />
              <Tooltip message={"Move to bin"} direction={"bottom"} />
            </div>
            <div className="df">
              <div
                className="icon_1 toolholder"
                onClick={() => handleMultipleActions("favourite")}
              >
                <FaRegStar />
              <Tooltip message={"Add star"} direction={"bottom"} />
              </div>
              <div
                className="icon_1 toolholder"
                onClick={() => handleMultipleActions("important")}
              >
                <MdLabelImportantOutline />
              <Tooltip message={"Mark as important"} direction={"bottom"} />
              </div>
            </div>
          </div>
        )}
      </nav>
      <header className="gmail_tab_header">
        <ul>
          <li>
            <CgInbox /> Primary
          </li>
          <li>
            <IoMdPricetag  /> Promotion
          </li>
        </ul>
      </header>
      {loading ?
      <GmailLoading />
      :
      <>
      {data?.length > 0 ? (
        <div className="scrollable">
          {data?.map((item, index) => (
            <GmailRow
              data={data}
              user={user}
              item={item}
              key={index}
              checkBoxSelected={checkBoxSelected}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          ))}
        </div>
      ) : (
        <NoGmails />
      )}
      </>
      }
    </>
  );
};

export default GmailSharedComponent;
