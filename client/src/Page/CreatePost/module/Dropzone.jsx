import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { RxFilePlus, RxCross2, RxCheckCircled } from 'react-icons/rx';
import { Alert } from '@mui/material';
import { imageProcess } from 'utils/imageProcess';
import Buttons from 'Components/Buttons';
import Typographies from 'Components/Typographies';
import Images from 'Components/Images';

export function Dropzone({ setIsImages, defaultImage }) {
  const [files, setFiles] = useState([]);
  const [isBigger, setIsBigger] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [isDuplication, setIsDuplication] = useState(false);
  const defaultImages = defaultImage ? imageProcess(defaultImage) : [];

  const onDrop = (acceptedFiles, rejectedFiles) => {
    // 파일 이름과 사이즈로 중복 체크하여 이미 있는 파일은 제거하기
    const newFiles = acceptedFiles.filter(newFile => {
      const isDuplicate = files.some(
        existingFile => existingFile.name === newFile.name && existingFile.size === newFile.size
      );
      if (isDuplicate) {
        setIsDuplication(true);
      }
      return !isDuplicate;
    });
    // 파일 개수가 12개 이상일떄 ondrop 중단
    if (files.length + newFiles.length > 12) {
      setIsFull(true);
    } else {
      setIsFull(false);
      if (newFiles?.length) {
        setFiles(previousFiles => [
          ...previousFiles,
          ...newFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) })),
        ]);
      }
    }

    if (rejectedFiles.length > 0) {
      setIsBigger(true);
    } else {
      setIsBigger(false);
    }
  };

  useEffect(() => {
    // 메모리 누수를 방지하기 위해 데이터 URL을 해지
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [setIsImages]);

  const removeFile = name => {
    setFiles(previousFiles => previousFiles.filter(file => file.name !== name));
  };

  const images = files.map(file => (
    <ImagesContainer key={file.name}>
      <Images url={file.preview} imageAlt={file.name} imgStyle="createPost" />
      <Remove onClick={() => removeFile(file.name)}>
        <RxCross2 size="20" />
      </Remove>
    </ImagesContainer>
  ));

  const editImages = defaultImages.map(item => (
    <ImagesContainer key={item.url}>
      <Images url={item.url} imageAlt={item.url} imgStyle="createPost" />
    </ImagesContainer>
  ));

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    noDragEventsBubbling: true,
    maxSize: 1024 * 1000,
    onDrop,
  });

  useEffect(() => {
    setIsImages(files);
  }, [files]);

  return (
    <Container>
      <Buttons text="내 PC" buttonStyle="write" handleClick={open} />
      <DropContainer {...getRootProps()}>
        <input {...getInputProps()} />
        <IconBox>
          {isDragActive ? (
            <RxCheckCircled size="50" color="green" />
          ) : (
            <>
              <RxFilePlus size="50" color="#666666" />
              <Typographies text="이미지를 마우스로 끌어 오세요." typoStyle="base_2" />
            </>
          )}
        </IconBox>
        {isDuplication && <Alert severity="error">중복된 이미지가 있습니다</Alert>}
        {isFull && <Alert severity="error">이미지는 최대 12개까지만 업로드할 수 있습니다</Alert>}
        {isBigger && <Alert severity="error">이미지의 크기가 너무 큽니다</Alert>}
      </DropContainer>
      <StyledHead>
        <Typographies text="첫번째 이미지가 프로필이 됩니다." typoStyle="base_2" />
        <Typographies text={`${files.length} / 12`} typoStyle="base_2" />
      </StyledHead>
      <ImgBox>
        {images}
        {editImages}
      </ImgBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const DropContainer = styled.div`
  background-color: #f6f6f6;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 0.25rem;
`;

const StyledHead = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImgBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 1rem;
  border-radius: 0.25rem;
  flex: 1;
`;

const ImagesContainer = styled.li`
  list-style: none;
  position: relative;
`;

const Remove = styled.button`
  display: flex;
  top: 0.25rem;
  right: 0.25rem;
  position: absolute;
  border: none;
  background-color: transparent;
  z-index: 1;

  cursor: pointer;
`;
