import { Container } from 'Container/Container';
import styled from 'styled-components';
import Commission from 'Components/Commissions';
import { useParams } from 'react-router-dom';
import { getTagsSearch } from 'apis/api/tags';
import Typographies from 'Components/Typographies';
import LoadingComponent from 'Components/LoadingComponent';
import { useEffect, useState } from 'react';
import ToTheTop from 'Components/ToTheTop';

function SearchPage() {
  const [isPage, setIsPage] = useState(1);
  const [tagSearchCommissions, setTagSearchCommissions] = useState(null);
  const [tagCount, setTagCount] = useState(0);
  const [tagsPages, setTagsPages] = useState(1);
  const [isPrevTag, setIsPrevTag] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { result } = useParams();

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const totalHeight = document.documentElement.offsetHeight - 580;
    if (totalHeight > 200) {
      if (scrollPosition >= totalHeight && tagsPages > isPage && tagsPages > 1) {
        setIsPage(isPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    setIsPrevTag(result);
    const newSearch = isPrevTag !== result;
    if (newSearch) {
      setLoading(true);
    }
    const fetchData = async () => {
      setLoadingMore(true);
      const delay = 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      const { data, status } = await getTagsSearch(result, 20, isPage);
      if (status < 300) {
        if (isPage === 1 || newSearch) {
          setTagSearchCommissions(data.data);
          setTagCount(data.pageInfo.totalElements);
          setTagsPages(data.pageInfo.totalPages);
          setIsPage(1);
        } else {
          setTagSearchCommissions([...tagSearchCommissions, ...data.data]);
        }
        setLoading(false);
        setLoadingMore(false);
      }
    };
    fetchData();
  }, [result, isPage]);

  return (
    <Container>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <StyledTitleContainer>
            <Typographies text={result} variant="h2" typoStyle="title_1" />
            <Typographies text="에 대한 검색 결과" typoStyle="base_2" />
            <StyledCount>
              <Typographies text={tagCount} typoStyle="base" bold="bold" />
              <Typographies text="개의 커미션이 있습니다." typoStyle="base_2" />
            </StyledCount>
          </StyledTitleContainer>
          <Content>
            <CommissionBox>
              <Commission commissions={tagSearchCommissions} where="search" />
              {loadingMore && <LoadingComponent />}
            </CommissionBox>
          </Content>
        </>
      )}
      <ToTheTop />
    </Container>
  );
}

const Content = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(auto, minmax(3.5rem, auto));
`;

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledCount = styled.div`
  display: flex;
  flex: 1;
  justify-content: end;
  align-items: center;
  gap: 0.5rem;
`;

const CommissionBox = styled.div`
  display: grid;
  justify-content: center;
  grid-column: 1 / span 12;
  grid-row: 2 / span 1;
`;

export default SearchPage;
