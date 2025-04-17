import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import WordCloud from 'wordcloud';
import './index.less';

import axios from '../../utils/axios';

/**
 * render tags as [wordcloud](https://github.com/timdream/wordcloud2.js)
 */
const Tags = () => {
  const navigate = useNavigate();
  const wordcloudRef = useRef(null);

  useEffect(() => {
    axios
      .get('/tags')
      .then((res) => {
        console.log('WordCloud isSupported: ', res, WordCloud.isSupported);
        let tagsArr = res?.data?.data || [];
        tagsArr = tagsArr.map((tag: { tag: string; _id: number }) => [
          tag['tag'],
          tag['_id'],
        ]);
        const opts: WordCloud.Options = {
          drawOutOfBound: false,
          fontWeight: 600,
          gridSize: 42,
          list: tagsArr,
          shrinkToFit: true,
          weightFactor: 32,
          click: (item) => {
            navigate(item[2]);
          },
        };
        console.log('WordCloud list: ', tagsArr);
        WordCloud(wordcloudRef.current!, opts);
      })
      .catch((err) => console.error(err));

    return () => {
      WordCloud.stop();
    };
  }, []);

  return (
    <>
      <Header />
      <Banner>
        <h2>Tags Cloud</h2>
      </Banner>
      <Container className='pt-4'>
        <div className='wordcloud' ref={wordcloudRef} />
      </Container>
    </>
  );
};

export default Tags;
