import { Flex, Input, InputRef, Tag, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { deleteTagbyId, getListTags, postTag, putTag } from "../../api/tagApi";
import { PlusOutlined } from "@ant-design/icons";
import NavbarComponent from "../../component/Navbar";
import { dataNavbarDashboard } from "../../data/fakeData";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import LoadingComponent from "../../component/LoadingComponent";

export interface ITag {
  id: string;
  name: string;
  description: string;
}

const tagInputStyle: React.CSSProperties = {
  width: 150,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: 'top',
  borderRadius: 4
};

const tagPlusStyle: React.CSSProperties = {
  height: 22,
  background: '#fff',
  borderStyle: 'dashed',
};

const TagsComponent = () => {
  const [tags, setTags] = useState<ITag[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);
  const accessToken = useSelector((state: any) => state.login.accessToken)

  useEffect(() => {
    handleGetTags();
  }, [])

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    deleteTagbyId(removedTag, accessToken).then(() => {
      handleGetTags();
    })
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !(tags.filter((tag) => tag.name === inputValue).length > 0)) {
      postTag({
        name: inputValue,
        description: inputValue,
      }, accessToken).then(() => {
        handleGetTags();
      })
    } else {
      toast.warn('Tag đã bị trùng hoặc để trống')
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = async () => {
    if (tags[editInputIndex].name !== editInputValue) {
      putTag({
        name: editInputValue,
        description: editInputValue,
        id: tags[editInputIndex].id
      }, accessToken).then(() => {
        handleGetTags();
      })
    }
    setEditInputIndex(-1);
    setEditInputValue('');
  };

  const handleGetTags = () => {
    getListTags().then(tags => {
      setTags(tags)
    })
  }

  return (
    <>
      <NavbarComponent data={dataNavbarDashboard} />
      <LoadingComponent isLoading={isLoading}>
        <Flex style={{ marginLeft: 20 }} gap="4px 0" wrap>
          {tags.map<React.ReactNode>((tag, index) => {
            if (editInputIndex === index) {
              return (
                <Input
                  ref={editInputRef}
                  key={tag.id}
                  size="small"
                  style={tagInputStyle}
                  value={editInputValue}
                  onChange={handleEditInputChange}
                  onBlur={handleEditInputConfirm}
                  onPressEnter={handleEditInputConfirm}
                />
              );
            }
            const isLongTag = tag.name.length > 20;
            const tagElem = (
              <Tag
                key={tag.id}
                closable={true}
                style={{ userSelect: 'none', }}
                onClose={() => handleClose(tag.id)}
              >
                <span
                  onDoubleClick={(e) => {
                    if (index !== 0) {
                      setEditInputIndex(index);
                      setEditInputValue(tag.name);
                      e.preventDefault();
                    }
                  }}
                >
                  {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
                </span>
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag.name} key={tag.id}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
          {inputVisible ? (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              style={tagInputStyle}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          ) : (
            <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
              New Tag
            </Tag>
          )}
        </Flex>
      </LoadingComponent>
    </>
  );
}

export default TagsComponent;