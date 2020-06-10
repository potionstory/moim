import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { getAllCommunityAction } from '../../store/module/community';
import Card from '../../components/Card';
import { Title, TitleIcon, ContentWrap, Content, MoimList } from './style';

const Community = () => {
  const list = useSelector((state) => state.community.list);
  const dispatch = useDispatch();
  const onGetAllCommunity = useCallback(
    () => dispatch(getAllCommunityAction.REQUEST()),
    [dispatch],
  );

  useEffect(() => {
    onGetAllCommunity();
  }, []);

  return (
    <ContentWrap>
      <Title>
        <TitleIcon>
          <FontAwesomeIcon icon={faComments} />
        </TitleIcon>
        커뮤니티
      </Title>
      <Content>
        <MoimList>
          {list.map((item) => {
            return <Card key={item.communityId} item={item} />;
          })}
        </MoimList>
      </Content>
    </ContentWrap>
  );
};

export default Community;
