import { useState, useEffect } from 'react';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import UserSearchBox from '@/views/components/searchUser/UserSearchBox';
import { ButtonCheckBox } from '@/views/components/common/input/CheckBox';
import styled from 'styled-components';
import UserList from '@/views/components/searchUser/UserList';
import KmfFooter from '@/views/components/layouts/KmfFooter';
import useService from '@/hooks/useService';
import useScrollMove from '@/hooks/useScrollMove';
import { GetUserListResponse, UserListInfo } from '@/services/types/User';
import InfiniteScroll from '@/views/components/common/InfiniteScroll';

const SearchUser = () => {
    const services = useService();
    const [list, setList] = useState<UserListInfo[]>([]);
    const [totalCount, setTotalCount] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const { scrollInfos, scrollRemove } = useScrollMove({
    page: 'search-user',
    path: '/search/user',
  });

  const getUserList = (refresh : boolean = false) => {
    searchUser('', refresh ? 0 : list.length);
  } 

  const searchUser = async (searchKeyword : string = '', offset : number = 0) => {
    if (list.length && list.length === totalCount && offset) return;

    const { users, users_count } : GetUserListResponse =
      await services.user.getUserList({
        searchKeyword,
        orderBy,
        limit: 30,
        offset
      });

    if(totalCount !== users_count) setTotalCount(users_count);
    if(!offset) {
        window.scrollY = 0;
        setList(users);
    } else setList([...list, ...users]);
  };

  useEffect(() => {
    if (list.length === 0) getUserList(true);
  }, []);

  useEffect(() => {
    getUserList(true);
  }, [orderBy])

  useEffect(() => {
    if (scrollInfos) {
      window.scrollTo(0, scrollInfos);
      const scrollTop = Math.max(
        document.documentElement.scrollTop,
        document.body.scrollTop
      );
      //현재위치와 복구위치가 같다면
      if (scrollTop == scrollInfos) {
        scrollRemove();
      }
    }
    //의존성 배열에 fetching 해오는 데이터를 넣어준다.
  }, [scrollInfos, scrollRemove, list]);

  return (
    <SearchUserStyle>
      <KmfHeader headerText="회원검색" />
      <UserSearchBox search={searchUser} />
      <div className="cont">
        <div className="control-box">
          <span className="total-cnt">
            총 <em>{totalCount}</em>명
          </span>
          <div className="order-by">
            <ButtonCheckBox
              type="radio"
              label="기수순"
              name="orderBy"
              value="cardinal_num"
              data={orderBy}
              onChange={setOrderBy}
            />
            <ButtonCheckBox
              type="radio"
              label="이름순"
              name="orderBy"
              value="name"
              data={orderBy}
              onChange={setOrderBy}
            />
          </div>
        </div>
        <div className="list-holder">
        <InfiniteScroll loadMore={getUserList}>
          {list.map((user) => (
          <UserList key={user.id} user={user} />
          ))}
          </InfiniteScroll>
        </div>
      </div>
      <KmfFooter />
    </SearchUserStyle>
  );
};

const SearchUserStyle = styled.div`
  padding-bottom: 100px;
  .cont {
    padding: 16px;
  }
  .control-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .total-cnt {
      font-size: 12px;
      color: #353535;

      > em {
        color: #1574bd;
      }
    }
    .order-by {
      ${ButtonCheckBox} {
        input {
          &:checked {
            ~ label {
              color: #fff;
              background-color: #828282;
            }
          }
        }

        label {
          width: auto;
          height: auto;
          margin-left: 8px;
          padding: 4px 8px;
          font-size: 10px;
          color: #828282;
          line-height: 15px;
          background-color: transparent;
          border-radius: 3px;
        }
      }
    }
  }
`;

export default SearchUser;
