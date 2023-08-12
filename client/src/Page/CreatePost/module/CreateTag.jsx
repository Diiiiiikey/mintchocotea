import { useState } from 'react';
import InputComponent from 'Components/InputComponent';
import styled from 'styled-components';
import { Alert } from '@mui/material';
import Tags from 'Components/Tags';

export function CreateTag({ setIsTags, defaultTags }) {
  const [tagItem, setTagItem] = useState('');
  const [tagList, setTagList] = useState([]);
  const [tagsMax, setTagsMax] = useState(false);
  const [isDuplication, setIsDuplication] = useState(false);

  const handleKeyPress = e => {
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      if (tagList.length > 9) setTagsMax(true);
      if (tagList.length < 10) {
        submitTagItem();
      }
      e.target.value = '';
    }
  };

  const submitTagItem = () => {
    if (tagList.includes(tagItem)) {
      setIsDuplication(true);
      return;
    } else if (!tagList.includes(tagItem)) {
      setIsDuplication(false);
    }
    let updatedTagList = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);
    setIsTags(updatedTagList);
    setTagItem('');
  };

  const deleteTagItem = e => {
    const filteredTagList = tagList.filter(tagItem => tagItem !== e.target.id);
    setTagList(filteredTagList);
    setIsTags(filteredTagList);
    if (tagList.length < 11) {
      setTagsMax(false);
    }
  };

  return (
    <div>
      <InputComponent
        label="태그"
        placeholder="태그를 입력한 후 Enter를 클릭하면 태그가 등록됩니다."
        onChange={e => setTagItem(e.target.value)}
        handleKeyPress={handleKeyPress}
        value={tagItem}
        handleSubmit={e => {
          e.preventDefault();
        }}
      />
      {isDuplication && <Alert severity="error">이미 사용된 태그입니다.</Alert>}
      {tagsMax && <Alert severity="error">태그는 10개까지 입력이 가능합니다.</Alert>}
      <TagContainer display={tagList.length || defaultTags}>
        {tagList && (
          <Tags tags={tagList} deleteTagItem={deleteTagItem} varient="div" where="creat" />
        )}
        {defaultTags && <Tags tags={defaultTags} deleteTagItem={deleteTagItem} varient="span" />}
      </TagContainer>
    </div>
  );
}

const TagContainer = styled.div`
  display: ${props => (props.display ? 'flex' : 'none')};
`;
